# 🔐 Gestion des administrateurs (Base de données Prisma)

## Vue d'ensemble

Les administrateurs sont maintenant stockés **directement dans la base de données Prisma**. Plus besoin de modifier le code pour ajouter un nouvel admin !

## 📍 Où sont les admins ?

**Base de données** : `dev.db` (SQLite)
**Modèle Prisma** : `prisma/schema.prisma` - `model Admin`
**Route de login** : `/app/api/auth/login/route.ts` - utilise Prisma pour chercher l'admin

## 🚀 Créer un nouvel administrateur

### Méthode 1 : Avec le script (Recommandé)

```bash
npm run create-admin
```

Le script va te demander :
- Email de l'admin
- Nom complet
- Mot de passe (8+ caractères)
- Rôle (super_admin ou moderator)

Exemple :
```bash
$ npm run create-admin

📋 Créer un nouvel administrateur

Email de l'admin: moderateur@afrique-espoir.org
Nom complet: Jean Dupont
Mot de passe (minimum 8 caractères): MonMotDePasse123
Rôles disponibles:
1. super_admin (Accès complet)
2. moderator (Modérateur)

Choisir un rôle (1 ou 2): 2

✓ Admin créé avec succès!
  Email: moderateur@afrique-espoir.org
  Nom: Jean Dupont
  Rôle: moderator
  Actif: true
```

### Méthode 2 : Via Prisma Studio

```bash
npx prisma studio
```

Cela ouvre une UI web pour gérer les données. Tu peux :
- Créer un nouvel admin
- Modifier les existants
- Supprimer ou désactiver

## 📋 Lister tous les administrateurs

```bash
npm run list-admins
```

Cela affiche une table avec tous les admins :

```
📋 Liste des administrateurs

┌─────┬──────────────────────────┬──────────────────────────┬─────────────┬────────┬─────────────────────┐
│ ID  │ Email                    │ Nom                      │ Rôle        │ Actif  │ Créé le             │
├─────┼──────────────────────────┼──────────────────────────┼─────────────┼────────┼─────────────────────┤
│ 1   │ admin@afrique-espoir.org │ Administrateur           │ super_admin  │ ✓      │ 14/12/2025         │
│ 2   │ moderateur@exemple.com   │ Jean Dupont              │ moderator    │ ✓      │ 14/12/2025         │
│ 3   │ ancien@exemple.com       │ Ancien Admin             │ super_admin  │ ✗      │ 13/12/2025         │
└─────┴──────────────────────────┴──────────────────────────┴─────────────┴────────┴─────────────────────┘
```

## 🔑 Identifiant par défaut

Au démarrage, le système crée automatiquement :
- **Email** : `admin@afrique-espoir.org`
- **Mot de passe** : `admin123`
- **Rôle** : `super_admin`

## 👥 Rôles disponibles

### `super_admin` (Administrateur)
- Accès complet au tableau de bord
- Peut créer/modifier/supprimer des actions
- Peut gérer les autres administrateurs (futur)

### `moderator` (Modérateur)
- Accès limité au tableau de bord
- Peut voir les actions
- Accès restreint (à définir selon les besoins)

## 🔐 Flux de connexion

```
1. Utilisateur visite /admin/login
2. Entre son email et mot de passe
3. Envoie POST à /api/auth/login
4. Le serveur cherche l'admin dans la BD avec Prisma
5. Vérifie le mot de passe avec bcrypt
6. Si valide → crée un cookie admin_session
7. Redirige vers /admin/dashboard
```

## 🗑️ Désactiver un admin

Pour désactiver un admin **sans le supprimer** :

```bash
npx prisma studio
```

Puis dans l'interface web :
- Ouvre la table `Admin`
- Clique sur l'admin à désactiver
- Change `isActive` de `true` à `false`
- L'admin ne pourra plus se connecter

## 🔄 Réinitialiser un mot de passe

Pour réinitialiser le mot de passe d'un admin via Prisma Studio :

```bash
npx prisma studio
```

Puis :
1. Ouvre la table `Admin`
2. Clique sur l'admin
3. Modifie le `passwordHash` avec un nouveau hash

**Mais comment générer un hash ?** Utilise le script :

```bash
npm run hash-password
```

Puis copie le hash généré dans Prisma Studio.

## 📝 Ajouter des colonnes au modèle Admin (Optionnel)

Si tu veux ajouter des propriétés supplémentaires (téléphone, département, etc.) :

1. Modifie `prisma/schema.prisma` :

```prisma
model Admin {
  id            Int     @id @default(autoincrement())
  email         String  @unique
  passwordHash  String
  name          String
  role          String  @default("moderator")
  phone         String?     // 👈 Nouveau champ
  department    String?     // 👈 Nouveau champ
  isActive      Boolean @default(true)
  createdAt     DateTime @default(now())
  updatedAt     DateTime @updatedAt
}
```

2. Crée une migration :

```bash
npx prisma migrate dev --name add_phone_department_to_admin
```

## 🛠️ Scripts disponibles

```bash
npm run create-admin    # Créer un nouvel admin
npm run list-admins     # Lister tous les admins
npm run hash-password   # Générer un hash bcrypt
```

## 🔗 Fichiers importants

- **`/app/api/auth/login/route.ts`** - Route de connexion (utilise Prisma)
- **`/prisma/schema.prisma`** - Modèle Admin
- **`/prisma/seed.ts`** - Initialisation avec l'admin par défaut
- **`/scripts/create-admin.ts`** - Créer un nouvel admin
- **`/scripts/list-admins.ts`** - Lister les admins
- **`/scripts/hash-password.js`** - Générer un hash

## 💡 Prochaines étapes

- [ ] Créer une page admin pour gérer les administrateurs
- [ ] Ajouter un système de logs pour les actions des admins
- [ ] Implémenter un système de réinitialisation de mot de passe
- [ ] Ajouter 2FA (authentification à deux facteurs)
