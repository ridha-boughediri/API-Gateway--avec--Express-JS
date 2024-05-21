# Utiliser l'image officielle Node.js comme image de base
FROM node:14

# Définir le répertoire de travail dans le conteneur
WORKDIR /app

# Copier package.json et package-lock.json dans le répertoire de travail
COPY package*.json ./

# Installer les dépendances de l'application
RUN npm install

# Copier le reste du code source dans le conteneur
COPY . .

# Construire l'application NestJS
RUN npm run build

# Exposer le port que l'application utilise
EXPOSE 3000

# Démarrer l'application
CMD ["npm", "run", "start:prod"]
