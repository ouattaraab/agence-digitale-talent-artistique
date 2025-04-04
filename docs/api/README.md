# Documentation API

Ce document fournit une référence complète pour l'API RESTful de l'Agence Digitale de Talent Artistique.

## Base URL

```
https://api.adta.ci/api
```

En développement local:
```
http://localhost:5000/api
```

## Authentification

Toutes les requêtes authentifiées doivent inclure un token JWT dans l'en-tête HTTP:

```
x-auth-token: votre_token_jwt
```

## Endpoints

### Authentification

#### POST /auth/register
Crée un nouveau compte utilisateur.

**Requête:**
```json
{
  "firstName": "John",
  "lastName": "Doe",
  "email": "john@example.com",
  "password": "password123",
  "userType": "client"
}
```

**Réponse:**
```json
{
  "token": "jwt_token",
  "user": {
    "id": "user_id",
    "firstName": "John",
    "lastName": "Doe",
    "email": "john@example.com",
    "userType": "client"
  }
}
```

#### POST /auth/login
Authentifie un utilisateur et retourne un token JWT.

**Requête:**
```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

**Réponse:**
```json
{
  "token": "jwt_token",
  "user": {
    "id": "user_id",
    "firstName": "John",
    "lastName": "Doe",
    "email": "john@example.com",
    "userType": "client",
    "profilePicture": "url_to_image"
  }
}
```

### Artistes

#### GET /artists
Retourne une liste d'artistes avec filtrage et pagination.

**Paramètres de requête:**
- `artistType` (optionnel): Filtre par type d'artiste (musician, dj, etc.)
- `search` (optionnel): Recherche par nom ou biographie
- `minRating` (optionnel): Note minimum (0-5)
- `minRate` & `maxRate` (optionnel): Fourchette de tarifs
- `page` & `limit`: Pagination (défaut: page=1, limit=10)

**Réponse:**
```json
{
  "artists": [
    {
      "id": "artist_id",
      "stageName": "DJ Example",
      "artistType": "dj",
      "averageRating": 4.8,
      "baseRate": 100000,
      "user": {
        "firstName": "John",
        "lastName": "Doe",
        "profilePicture": "url_to_image"
      },
      "portfolioMedia": []
    }
  ],
  "pagination": {
    "total": 50,
    "page": 1,
    "pages": 5
  }
}
```

#### GET /artists/:id
Retourne les détails complets d'un artiste.

**Réponse:**
```json
{
  "id": "artist_id",
  "stageName": "DJ Example",
  "artistType": "dj",
  "biography": "Biographie détaillée...",
  "experience": "10 ans d'expérience...",
  "baseRate": 100000,
  "rateType": "per_event",
  "genres": ["House", "Electro"],
  "languages": ["Français", "Anglais"],
  "equipment": "Équipement fourni...",
  "requirements": "Exigences techniques...",
  "averageRating": 4.8,
  "totalBookings": 42,
  "user": {
    "firstName": "John",
    "lastName": "Doe",
    "email": "john@example.com",
    "profilePicture": "url_to_image"
  },
  "portfolioMedia": [
    {
      "id": "media_id",
      "mediaType": "image",
      "title": "Performance au festival",
      "url": "url_to_media"
    }
  ]
}
```

### Réservations

#### POST /bookings
Crée une nouvelle demande de réservation.

**Requête:**
```json
{
  "artistId": "artist_id",
  "clientProfileId": "client_profile_id",
  "eventDate": "2025-05-15",
  "startTime": "19:00",
  "endTime": "23:00",
  "eventType": "wedding",
  "eventLocation": "Hôtel Ivoire, Abidjan",
  "eventDetails": "Description de l'événement",
  "specialRequirements": "Exigences spéciales"
}
```

**Réponse:**
```json
{
  "message": "Demande de réservation créée avec succès",
  "booking": { /* Détails de la réservation */ }
}
```

## Codes d'erreur

- `400` - Requête invalide
- `401` - Non authentifié
- `403` - Non autorisé
- `404` - Ressource non trouvée
- `500` - Erreur serveur

## Limites de rate

Les API sont limitées à 100 requêtes par minute par IP.

## Support

Pour toute question concernant l'API, contactez `api-support@adta.ci`.
