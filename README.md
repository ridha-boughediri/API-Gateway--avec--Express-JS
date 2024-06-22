# Projet API Gateway avec Express JS

![Résumé du Projet](image_url)
![Microservices Architecture](images/several%20microse.webp)


Ce projet implémente un API Gateway en utilisant Express JS, une infrastructure web pour Node.js.

## Fonctionnalités

### API Gateway

- Point d'entrée unique pour les requêtes
- Routage des requêtes vers les Microservices appropriés
- Accès centralisé aux API avec des fonctionnalités de sécurité

### Microservices

- Services indépendants et autonomes
- Modularité, évolutivité et tolérance aux pannes



## les liens 
curl -X POST -H 'Content-Type: application/json' -d '{"apiName":"registrytest", "host":"http://localhost", "port":"3001", "url":"http://localhost:3001/"}' http://localhost:3000/register

## Installation

Pour installer ce projet, suivez les étapes suivantes :

1. Clonez ce dépôt sur votre machine.
2. Installez les dépendances avec `npm install`.
3. Lancez le serveur principal avec `npm run dev`.
4. Lancez le microservice avec `npm run start`.

## Utilisation

Une fois le serveur démarré, vous pouvez accéder à l'API Gateway via le point d'entrée spécifié dans le fichier de configuration.

## Contributeurs

- Ridha.Boughediri