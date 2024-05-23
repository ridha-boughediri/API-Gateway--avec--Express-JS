Projet Kanban avec Nest.js, Prisma et MailHog
Ce projet vise à créer une application Kanban en utilisant Nest.js comme framework backend, Prisma comme ORM pour la gestion de la base de données, et MailHog pour simuler l'envoi d'e-mails dans un environnement de développement. L'ensemble du projet est conteneurisé avec Docker.

Table des matières
Environnement de Développement
Docker Compose
Services
Nest.js (Kanban)
MySQL
MailHog
phpMyAdmin
Prérequis
Installation
Utilisation
Contribuer
Licence
Environnement de Développement
Ce projet utilise Nest.js comme backend, Prisma pour interagir avec la base de données MySQL, et MailHog pour simuler l'envoi d'e-mails.

Docker Compose
Le fichier docker-compose.yml définit les services nécessaires et configure les conteneurs Docker pour une exécution aisée.

yaml
Copy code
version: '3'

services:

# Service Node.js

web:
image: node:18-alpine
build: ./kanban
working_dir: /usr/src/app
ports: - "4000:4000"
environment:
NODE_ENV: production
command: ["npm", "run", "start:prod"]
volumes: - ./kanban:/usr/src/app

# Service MySQL

mysql:
image: mysql:latest
environment:
MYSQL_ROOT_PASSWORD: 1234
MYSQL_DATABASE: kanban
MYSQL_USER: root2
MYSQL_PASSWORD: 1234
ports: - "3307:3306"

# Service MailHog

mailhog:
image: mailhog/mailhog:latest
ports: - "1025:1025" - "8025:8025"

# Service phpMyAdmin

phpmyadmin:
image: phpmyadmin/phpmyadmin
environment:
PMA_HOST: mysql
PMA_PORT: 3306
PMA_USER: root
PMA_PASSWORD: 1234
ports: - "8080:80"
depends_on: - mysql
Services
Nest.js (Kanban)
Le service Nest.js représente le backend de l'application Kanban.

MySQL
Le service MySQL est utilisé pour stocker les données de l'application Kanban.

MailHog
Le service MailHog simule un serveur de messagerie pour le développement et le test des fonctionnalités liées aux e-mails.

phpMyAdmin
phpMyAdmin est utilisé pour gérer la base de données MySQL via une interface web.

Prérequis
Assurez-vous d'avoir Docker et Docker Compose installés sur votre machine.

Docker Installation Guide
Docker Compose Installation Guide
Installation
Copiez le fichier .env.example en .env et configurez les variables d'environnement nécessaires.
bash
Copy code
cp .env.example .env
Exécutez la commande suivante pour installer les dépendances du backend.
bash
Copy code
docker-compose run web npm install
Utilisation
Utilisez la commande suivante pour démarrer l'application Kanban et les services associés.

bash
Copy code
docker-compose up -d
L'application sera accessible à http://localhost:4000, et les autres services auront des ports spécifiques définis dans le fichier docker-compose.yml.

Contribuer
Les contributions sont les bienvenues! Ouvrez une issue ou proposez une Pull Request.

Licence
Ce projet est sous licence MIT.
