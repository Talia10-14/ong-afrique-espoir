# 🔐 Système d'Authentification Admin

## Vue d'ensemble

Le système d'authentification admin supporte **plusieurs administrateurs** avec des rôles différents. Les identifiants sont définis dans `/app/api/auth/login/route.ts` dans le tableau `DEFAULT_ADMINS`.

## Identifiants par défaut (Développement)

- **Email**: `admin@afrique-espoir.org`
- **Mot de passe**: `admin123`
- **Rôle**: `super_admin`

⚠️ **IMPORTANT**: Ces identifiants par défaut ne doivent être utilisés qu'en développement. En production, vous DEVEZ définir des mots de passe forts via des hashs bcrypt.

## 👥 Support de plusieurs administrateurs

Le système supporte **plusieurs admins** avec des rôles différents :

```typescript
const DEFAULT_ADMINS = [
  {
    email: "admin@afrique-espoir.org",
    passwordHash: null, // null = utiliser le mot de passe par défaut en dev
    name: "Administrateur",
    role: "super_admin",
  },
  {
    email: "moderateur@afrique-espoir.org",
    passwordHash: null,
    name: "Modérateur",
    role: "moderator",
  },
];
```

### Rôles disponibles

- **`super_admin`** : Accès complet
- **`moderator`** : Accès modéré
- Vous pouvez ajouter d'autres rôles selon vos besoins

## ➕ Ajouter un nouvel administrateur

### En développement

Modifiez `/app/api/auth/login/route.ts` :

```typescript
const DEFAULT_ADMINS = [
  {
    email: "admin@afrique-espoir.org",
    passwordHash: null,
    name: "Administrateur",
    role: "super_admin",
  },
  {
    email: "nouveau@afrique-espoir.org",
    passwordHash: null,
    name: "Nouveau Admin",
    role: "super_admin",
  },
];
```

En développement, tous les nouveaux admins utilisent le mot de passe par défaut : `admin123`

### En production

1. **Générez un hash sécurisé** pour chaque admin :

```bash
node scripts/hash-password.js
```

2. **Mettez à jour le code** avec les hashs :

```typescript
const DEFAULT_ADMINS = [
  {
    email: "admin@afrique-espoir.org",
    passwordHash: "$2a$10$...", // Hash bcrypt
    name: "Administrateur",
    role: "super_admin",
  },
  {
    email: "nouveau@afrique-espoir.org",
    passwordHash: "$2a$10$...", // Hash bcrypt différent
    name: "Nouveau Admin",
    role: "moderator",
  },
];
```

## 🔐 Configuration en production

### 1. Générer les hashs des mots de passe

```bash
node scripts/hash-password.js
```

Entrez votre mot de passe fort. Le script générera un hash bcrypt.

### 2. Mettre à jour les identifiants

Modifiez `/app/api/auth/login/route.ts` et remplacez les `passwordHash: null` par les hashs générés.

## Flux d'authentification

```
1. Utilisateur visite /admin/login
2. Entre son email et mot de passe
3. Envoie une requête POST à /api/auth/login
4. Le serveur cherche l'admin par email
5. Compare le mot de passe avec bcrypt
6. Si valide → Crée un cookie "admin_session" (httpOnly, secure)
7. Redirige vers /admin/dashboard
8. Le middleware (middleware.ts) protège les routes /admin/*
```

## 🔒 Sécurité

✅ Les identifiants de connexion sont vérifiés côté serveur
✅ Les mots de passe sont hachés avec bcrypt (10 tours)
✅ Le session cookie est httpOnly (non accessible via JavaScript)
✅ Le session cookie est secure (HTTPS seulement en production)
✅ Le session cookie a un SameSite strict (protection CSRF)
✅ La session expire après 24 heures
✅ Support de plusieurs administrateurs avec rôles

## 🚪 Déconnexion

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

## 📁 Fichiers importants

- **`/app/api/auth/login/route.ts`** - Point d'entrée de connexion (contient les identifiants)
- **`/app/admin/login/page.tsx`** - Page de connexion
- **`/middleware.ts`** - Protection des routes admin
- **`/scripts/hash-password.js`** - Génération des hashs
- **`/config/admins.example.json`** - Exemple de configuration multi-admin

## 💡 Cas d'usage avancés

### Utiliser une base de données pour les admins

Vous pouvez modifier `/api/auth/login/route.ts` pour vérifier les identifiants dans Prisma :

```typescript
import { prisma } from "@/lib/prisma";

const admin = await prisma.admin.findUnique({
  where: { email },
});

if (admin && await bcrypt.compare(password, admin.passwordHash)) {
  // Créer la session
}
```

### Ajouter un système de rate limiting

Implémenter un rate limiting pour prévenir les attaques brute-force :

```typescript
const attempts = rateLimitMap.get(email) || [];
if (attempts.filter(t => Date.now() - t < 15 * 60 * 1000).length >= 5) {
  return NextResponse.json(
    { success: false, message: "Trop de tentatives. Réessayez dans 15 minutes." },
    { status: 429 }
  );
}
```
