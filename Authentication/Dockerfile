# Utilisation de l'image Node.js version 18 basée sur Alpine Linux comme image de base
FROM node:18-alpine

# Définition du répertoire de travail à l'intérieur du conteneur
WORKDIR /usr/src/app

# Copie du fichier package.json et package-lock.json pour installer les dépendances
COPY package*.json ./

# Installation des dépendances
RUN npm install --production

# Copie du reste du code source de l'application
COPY . .

# Exposition du port sur lequel l'application s'exécute
EXPOSE 9000

# Commande à exécuter lorsque le conteneur démarre
CMD ["npm", "run", "start:prod"]
