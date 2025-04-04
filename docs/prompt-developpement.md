# Prompt de développement: Agence Digitale de Talent Artistique

## Contexte du projet

Je travaille sur le développement d'une plateforme numérique appelée "Agence Digitale de Talent Artistique" destinée au marché ivoirien. Cette plateforme a pour objectif de connecter les artistes locaux (musiciens, DJs, danseurs, humoristes, peintres, performeurs) avec des clients potentiels (organisateurs d'événements, entreprises, particuliers) qui souhaitent les réserver pour des prestations.

## Objectifs principaux

1. Créer un écosystème digital intuitif, sécurisé et optimisé pour mobile
2. Permettre aux artistes ivoiriens de se faire connaître
3. Faciliter les réservations et paiements de prestations artistiques
4. Digitaliser le marché des prestations artistiques en Côte d'Ivoire

## Spécifications techniques

- **Front-end**: React.js (Web), React Native (Mobile)
- **Back-end**: Node.js avec Express.js ou Django
- **Base de données**: PostgreSQL ou Firebase
- **Authentification**: Firebase Auth ou OAuth2 (Google, Facebook)
- **Paiement**: Intégration des API Mobile Money (MTN, Orange), Stripe, Flutterwave
- **Cloud & Hébergement**: AWS ou Google Cloud

## Fonctionnalités requises

### A. Architecture globale

1. Développer une application web responsive et mobile (iOS & Android)
2. Créer deux parcours utilisateurs distincts: Artiste et Client
3. Implémenter une interface utilisateur moderne, intuitive et fluide
4. Assurer la sécurité des données et des transactions

### B. Parcours Artiste

#### 1. Inscription et Création du Profil
- Formulaire d'inscription complet avec:
  - Nom de scène
  - Type d'artiste (sélection parmi musicien, humoriste, DJ, etc.)
  - Biographie et expérience
  - Upload de portfolio multimédia (vidéos, extraits audio, images)
  - Tarification indicative (par prestation ou par heure)
  - Coordonnées et préférences de contact
- Système de validation administrative des profils
- Calendrier intégré pour la gestion des disponibilités

#### 2. Gestion des Réservations
- Système de notifications pour les demandes de réservation
- Possibilité d'accepter, refuser ou proposer des modifications aux demandes
- Génération automatique de contrats électroniques
- Tableau de bord pour suivre les réservations

#### 3. Exécution de la Prestation
- Accès aux détails complets de l'événement (date, heure, lieu)
- Affichage des exigences techniques et contact de l'organisateur
- Option d'assistance logistique (déplacement, hébergement)

#### 4. Paiement et Sécurisation
- Système d'escrow pour sécuriser les paiements (acompte et solde)
- Intégration de multiples méthodes de paiement:
  - Mobile Money (MTN, Orange)
  - Carte bancaire
  - Virement bancaire
- Versement du solde après validation de l'événement

#### 5. Évaluation et Visibilité
- Système de notation et d'avis post-prestation
- Algorithme de classement basé sur la qualité des avis, nombre de prestations et réactivité
- Système de recommandation d'événements adaptés au profil

### C. Parcours Client

#### 1. Recherche et Sélection d'Artistes
- Filtres de recherche avancés:
  - Type d'artiste
  - Budget
  - Type d'événement (corporate, mariage, festival, etc.)
- Affichage détaillé des profils d'artistes avec:
  - Biographie
  - Portfolio multimédia
  - Tarifs indicatifs
  - Avis et notes des clients précédents

#### 2. Réservation d'un Talent
- Formulaire de réservation détaillé:
  - Date et heure
  - Lieu de l'événement
  - Exigences spécifiques
- Affichage du coût estimatif avant validation
- Génération automatique des contrats de prestation

#### 3. Paiement Sécurisé
- Système d'acompte obligatoire via escrow
- Multiples options de paiement
- Règlement final après validation de la prestation

#### 4. Suivi et Organisation
- Tableau de bord client pour suivre les réservations
- Option d'assistance logistique

#### 5. Évaluation Post-Événement
- Système de notation et d'avis sur la prestation
- Accès à l'historique des réservations

### D. Système de Commission et Paiement

- Implémenter un modèle hybride de commission:
  - 10% prélevé sur l'artiste
  - 5% de frais de service pour le client
- Développer un système d'abonnement premium pour les artistes avec fonctionnalités avancées
- Gérer le flux de paiement complet (acompte, escrow, libération des fonds)

### E. Exigences de Sécurité

- Chiffrement des données utilisateurs
- Protection des paiements via 3D Secure
- Mise en place d'audits de sécurité réguliers
- Gestion sécurisée des contrats électroniques

## Livrables attendus

1. Code source complet de l'application web et mobile
2. Documentation technique détaillée
3. Documentation utilisateur (guides pour artistes et clients)
4. API endpoints documentés
5. Schéma de la base de données
6. Tests unitaires et d'intégration
7. Plan de déploiement et de mise en production

## Architecture des données

Veuillez concevoir et implémenter une architecture de base de données qui prend en compte:

1. Gestion des profils utilisateurs (artistes et clients)
2. Gestion des portfolios et médias
3. Système de réservation et statuts
4. Système de paiement et transactions
5. Contrats électroniques
6. Système d'évaluation et avis
7. Gestion des disponibilités

## Exigences spécifiques UI/UX

1. Interface utilisateur moderne, intuitive et responsive
2. Expérience mobile optimisée
3. Temps de chargement rapide, même avec des connexions instables
4. Design adapté au marché ivoirien
5. Supports multilingues (français prioritairement)
6. Accessibilité pour tous types d'utilisateurs

## Planification du développement

Proposez une feuille de route détaillée pour le développement selon les phases suivantes:

1. Phase 1: Conception et Prototype (2 mois)
2. Phase 2: Développement du MVP (3 mois)
3. Phase 3: Test et Optimisation (2 mois)
4. Phase 4: Lancement Officiel (2 mois)

Pour chaque phase, détaillez les sprints, les milestones et les livrables spécifiques.

## Défis techniques à résoudre

1. Intégration des systèmes de paiement locaux (Mobile Money)
2. Performance de l'application dans un contexte de connexion internet instable
3. Système de génération et signature des contrats électroniques
4. Gestion sécurisée des paiements via escrow
5. Algorithme de recommandation et de classement des artistes

Merci de développer cette application complète avec toutes les fonctionnalités détaillées ci-dessus, en fournissant des explications claires sur les choix techniques et l'architecture proposée.
