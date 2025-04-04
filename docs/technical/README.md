# Documentation Technique

Cette documentation fournit des informations détaillées sur l'architecture technique et l'implémentation du projet Agence Digitale de Talent Artistique.

## Architecture

Le projet utilise une architecture full-stack JavaScript avec:

- **Frontend**: React.js (web), React Native (mobile)
- **Backend**: Node.js + Express.js
- **Base de données**: PostgreSQL
- **Authentification**: JWT + Firebase Auth
- **Stockage médias**: AWS S3
- **Hébergement**: AWS EC2 (API) + Vercel (Frontend)

## Structure du Projet

```
/
├── src/                  # Code source frontend React
│   ├── components/       # Composants React réutilisables
│   ├── context/          # Contextes React (authentification, etc.)
│   ├── pages/            # Pages/Écrans de l'application
│   ├── utils/            # Utilitaires et fonctions helper
│   └── App.js            # Point d'entrée de l'application React
│
├── server/               # Backend Node.js/Express
│   ├── config/           # Configuration (base de données, etc.)
│   ├── models/           # Modèles Sequelize
│   ├── routes/           # Routes API
│   ├── middleware/       # Middleware Express
│   └── index.js          # Point d'entrée du serveur
│
├── public/               # Fichiers statiques
├── uploads/              # Fichiers médias téléchargés
└── build/                # Code frontend compilé pour production
```

## Base de données

### Schéma

Le schéma de base de données est composé des tables principales suivantes:

1. **Users**: Informations utilisateur et authentification
2. **ArtistProfiles**: Profils des artistes
3. **ClientProfiles**: Profils des clients
4. **Bookings**: Réservations de prestations
5. **Contracts**: Contrats générés
6. **PortfolioMedia**: Médias du portfolio de l'artiste
7. **Reviews**: Avis et évaluations
8. **Availability**: Disponibilité des artistes
9. **Notifications**: Notifications système

Voir le schéma complet dans `/server/models/`.

## Flux d'authentification

1. L'utilisateur s'inscrit ou se connecte via l'API `/auth`
2. Le serveur génère un JWT contenant l'ID utilisateur et son type
3. Le token est stocké localement et envoyé avec chaque requête
4. Le middleware `authMiddleware` valide les token pour les routes protégées

## Système de paiement

Le processus de paiement suit ces étapes:

1. Client effectue une demande de réservation
2. Artiste accepte la demande
3. Contrat est généré et signé par les deux parties
4. Client paie un acompte (30% du montant total)
5. Prestation est réalisée
6. Client paie le solde restant

Les paiements sont sécurisés via un système d'escrow, utilisant:
- Mobile Money (MTN, Orange)
- Carte bancaire (via Stripe/Flutterwave)

## Modèle de sécurité

- **Authentification**: JWT + validation côté serveur
- **Autorisation**: Middleware de vérification des rôles et permissions
- **Données**: Validation des entrées avec Joi/Express-validator
- **API**: Protection CSRF et rate limiting
- **Base de données**: Paramètres préparés pour éviter les injections SQL

## Performance et Mise à l'échelle

- **Caching**: Redis pour les données fréquemment accédées
- **Mise à l'échelle**: AWS Auto Scaling pour le backend
- **CDN**: Cloudfront pour les actifs statiques et médias
- **Base de données**: Stratégies d'indexation et requêtes optimisées

## Développement et Tests

### Environnements

- **Développement**: Local, avec hot-reloading
- **Test**: Serveur de staging pour les tests d'intégration
- **Production**: Environnement de production avec monitoring

### Tests

- **Tests unitaires**: Jest pour le frontend et backend
- **Tests d'intégration**: Supertest pour l'API
- **Tests E2E**: Cypress pour le frontend

## Déploiement

### CI/CD

Utilisation de GitHub Actions pour:

1. Exécuter les tests automatisés
2. Construire les assets de production
3. Déployer sur les environnements appropriés

### Infrastructure

- **Backend**: AWS EC2 avec équilibrage de charge
- **Frontend**: Vercel ou Netlify
- **Base de données**: AWS RDS (PostgreSQL)
- **Médias**: AWS S3 + CloudFront

## Monitoring et Logs

- Sentry pour le suivi des erreurs
- CloudWatch pour les métriques et logs
- Datadog pour les tableaux de bord et alertes

## Ressources additionnelles

- [Documentation API](/docs/api/README.md)
- [Guide de l'administrateur](/docs/admin/README.md)
- [Diagrammes d'architecture](/docs/diagrams/)
