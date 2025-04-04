# Guide de contribution

Merci de votre intérêt pour contribuer à l'Agence Digitale de Talent Artistique ! Ce document fournit des directives pour contribuer efficacement au projet.

## Processus de contribution

1. **Fork** du dépôt sur GitHub
2. **Clone** de votre fork en local
3. Création d'une **branche** pour votre contribution
4. **Développement** de vos modifications
5. **Commit** de vos changements avec des messages clairs
6. **Push** vers votre fork
7. Création d'une **Pull Request**

## Configuration du projet en local

```bash
# Cloner le dépôt
git clone https://github.com/votre-username/agence-digitale-talent-artistique.git
cd agence-digitale-talent-artistique

# Installer les dépendances
npm install

# Configurer les variables d'environnement
cp .env.example .env
# Modifier le fichier .env avec vos informations

# Démarrer le serveur de développement
npm run dev
```

## Structure du projet

- `src/` - Code source frontend React
- `server/` - Code source backend Node.js/Express
- `public/` - Fichiers statiques
- `uploads/` - Fichiers téléchargés par les utilisateurs

## Guidelines de code

- Suivre les conventions ESLint et Prettier du projet
- Écrire des tests pour les nouvelles fonctionnalités
- Documenter les nouvelles fonctionnalités ou les changements d'API
- Suivre la structure de code existante

## Pull Requests

- Ciblez la branche `develop` pour les nouvelles fonctionnalités
- Incluez une description détaillée de vos modifications
- Référencez les issues connexes en utilisant les mots-clés GitHub (fixes #123, etc.)
- Assurez-vous que les tests passent avant de soumettre

## Signaler des bugs

Si vous trouvez un bug, veuillez créer une issue en incluant:

- Description claire du problème
- Étapes pour reproduire
- Comportement attendu vs observé
- Screenshots si applicable
- Informations sur l'environnement (navigateur, OS, etc.)

## Proposer des améliorations

Nous sommes ouverts aux suggestions ! Pour proposer une nouvelle fonctionnalité:

1. Créez une issue avec le tag `enhancement`
2. Expliquez clairement la fonctionnalité et son intérêt
3. Discutez de l'implémentation possible

## Contact

Pour toute question sur le processus de contribution, contactez-nous à [contact@adta.ci](mailto:contact@adta.ci)

Merci de contribuer à faire de l'Agence Digitale de Talent Artistique une plateforme plus forte pour les artistes ivoiriens !
