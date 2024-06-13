# Microservice PostgreSQL dans un Conteneur Docker

Ce projet configure un microservice utilisant PostgreSQL dans un conteneur Docker. Il permet de facilement démarrer, arrêter et gérer une instance PostgreSQL pour vos applications.

## Prérequis

- Docker installé sur votre machine
- Docker Compose (optionnel mais recommandé)

## Contenu du Répertoire

- `Dockerfile`: Fichier de configuration Docker pour PostgreSQL
- `docker-compose.yml`: Fichier de configuration pour Docker Compose
- `init.sql`: Script SQL d'initialisation de la base de données (optionnel)

## Configuration

### Dockerfile

Le `Dockerfile` utilise l'image officielle de PostgreSQL :

```dockerfile
FROM postgres:13

# Ajoutez un script d'initialisation, si nécessaire
COPY init.sql /docker-entrypoint-initdb.d/

# Configuration par défaut de PostgreSQL
ENV POSTGRES_USER=admin
ENV POSTGRES_PASSWORD=secret
ENV POSTGRES_DB=mydatabase

EXPOSE 5432
