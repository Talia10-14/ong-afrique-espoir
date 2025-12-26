# Soul Connection - Plateforme de Coaching Holistique

Soul Connection est une application de gestion de coaching conçue pour aider les coachs à gérer leurs clients, planifier des rendez-vous et offrir des services personnalisés incluant l'astrologie et le conseil en image.

![Dashboard](docs/images/dashboard.png)

## 🚀 Fonctionnalités

### Gestion des Clients
- **Suivi complet** : Profils clients détaillés avec informations personnelles et notes.
- **Rendez-vous** : Planification et historique des séances.
- **Documents et Paiements** : Gestion centralisée.
- **Upload de Photos** : Ajout de photos de profil pour les clients.

### Outils de Coaching
- **Astrologie** : Module de compatibilité et horoscopes personnalisés.
- **Vêtements & Style** : Suggestions de looks et gestion de garde-robe.
- **Conseils** : Base de connaissances de conseils de coaching filtrables.

### Gestion Événementielle
- **Calendrier** : Vue d'ensemble des événements à venir.
- **Inscriptions** : Gestion des participations aux ateliers et soirées.

## 🛠 Technologies

- **Frontend** : [Next.js](https://nextjs.org/) (React), Tailwind CSS, Shadcn/ui
- **Backend** : API Routes Next.js
- **Base de données** : SQLite avec [Prisma](https://www.prisma.io/)
- **Authentification** : NextAuth.js (Configuration actuelle: Credentials)

## 📦 Installation

1.  **Prérequis** : Node.js (v18+) et pnpm (ou npm/yarn).

2.  **Cloner le dépôt** :
    ```bash
    git clone <votre-repo-url>
    cd soul-connection-clean
    ```

3.  **Installer les dépendances** :
    ```bash
    pnpm install
    ```

4.  **Configurer la base de données** :
    ```bash
    npx prisma generate
    npx prisma db push
    ```

5.  **Lancer le serveur de développement** :
    ```bash
    npm run dev
    ```
    L'application sera accessible sur `http://localhost:3000`.

## 📸 Aperçu

### Dashboard & Clients
| Dashboard | Liste des Clients |
|-----------|-------------------|
| ![Dashboard](docs/images/dashboard.png) | ![Clients](docs/images/clients.png) |

### Profil Client
![Profil Client](docs/images/client_profile.png)

### Modules Spécialisés
| Astrologie | Vêtements |
|------------|-----------|
| ![Astrologie](docs/images/astrology.png) | ![Vêtements](docs/images/clothing.png) |

## 🤝 Contribution

Les contributions sont les bienvenues. Merci d'ouvrir une issue pour discuter des changements majeurs avant de soumettre une pull request.

## 📄 Licence

[MIT](LICENSE)
