# 🔐 Système d'Authentification Admin

## Vue d'ensemble

Le système d'authentification admin utilise un email et un mot de passe sécurisé avec hachage bcrypt.

## Identifiants par défaut (Développement)

- **Email**: `admin@afrique-espoir.org`
- **Mot de passe**: `admin123`

⚠️ **IMPORTANT**: Ces identifiants par défaut ne doivent être utilisés qu'en développement. En production, vous DEVEZ définir un mot de passe fort via la variable d'environnement `ADMIN_PASSWORD_HASH`.

## Configuration en production

### 1. Générer le hash du mot de passe

```bash
node scripts/hash-password.js
```

Entrez votre mot de passe fort. Le script générera un hash bcrypt.

### 2. Ajouter la variable d'environnement

Ajoutez à votre fichier `.env.local` (ou à votre système de gestion des secrets):

```
ADMIN_PASSWORD_HASH=<hash généré>
```

### 3. (Optionnel) Modifier l'email admin

Par défaut, l'email est `admin@afrique-espoir.org`. Vous pouvez le modifier via:

```
ADMIN_EMAIL=votre-email@domaine.com
```

## Flux d'authentification

```
1. Utilisateur visite /admin/login
2. Entre son email et mot de passe
3. Envoie une requête POST à /api/auth/login
4. Le serveur vérifie l'email et compare le mot de passe avec bcrypt
5. Si valide → Crée un cookie "admin_session" (httpOnly, secure)
6. Redirige vers /admin/dashboard
7. Le middleware (middleware.ts) protège les routes /admin/*
```

## Sécurité

✅ Les identifiants de connexion sont vérifiés côté serveur
✅ Les mots de passe sont hachés avec bcrypt (10 tours)
✅ Le session cookie est httpOnly (non accessible via JavaScript)
✅ Le session cookie est secure (HTTPS seulement en production)
✅ Le session cookie a un SameSite strict (protection CSRF)
✅ La session expire après 24 heures

## Déconnexion

Pour ajouter une fonctionnalité de déconnexion, créez une route `/api/auth/logout`:

```typescript
import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function POST() {
  const cookieStore = await cookies();
  cookieStore.delete("admin_session");
  return NextResponse.json({ success: true });
}
```

Puis appelez-la depuis le dashboard avec:

```typescript
const handleLogout = async () => {
  await fetch("/api/auth/logout", { method: "POST" });
  router.push("/admin/login");
};
```

## Cas d'usage avancés

### Utiliser une base de données pour les admins

Vous pouvez modifier `/api/auth/login/route.ts` pour vérifier les identifiants dans Prisma:

```typescript
const admin = await prisma.admin.findUnique({
  where: { email },
});

if (admin && await bcrypt.compare(password, admin.passwordHash)) {
  // Créer la session
}
```

### Ajouter un système de rate limiting

Implémenter un rate limiting pour prévenir les attaques brute-force:

```typescript
const attempts = rateLimitMap.get(email) || [];
if (attempts.filter(t => Date.now() - t < 15 * 60 * 1000).length >= 5) {
  return NextResponse.json(
    { success: false, message: "Trop de tentatives. Réessayez dans 15 minutes." },
    { status: 429 }
  );
}
```
