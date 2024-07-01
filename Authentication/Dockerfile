# Utiliser une image Node.js officielle comme image de base
FROM node:18-alpine

# Définir le répertoire de travail dans le conteneur
WORKDIR /usr/src/app

# Copier les fichiers package.json et package-lock.json
COPY package*.json ./

# Installer les dépendances de l'application
RUN npm install --only=production

# Copier le reste des fichiers de l'application
COPY . .

# Exposer le port sur lequel l'application écoutera
EXPOSE 9000

# Définir la commande par défaut pour démarrer l'application
CMD ["npm", "run", "start:prod"]
