Microservice Data avec PostgreSQL et pgAdmin
Ce projet configure un microservice de données utilisant PostgreSQL pour la base de données et pgAdmin pour la gestion de la base de données. Les conteneurs sont orchestrés à l'aide de Docker Compose.

Prérequis
Assurez-vous que Docker et Docker Compose sont installés sur votre machine. Vous pouvez les installer en suivant les instructions sur les sites officiels :

Installer Docker
Installer Docker Compose
Configuration
Le fichier docker-compose.yml définit deux services :

PostgreSQL : La base de données.
pgAdmin : Une interface web pour gérer PostgreSQL.
docker-compose.yml


Configurer une connexion à PostgreSQL dans pgAdmin
Cliquez avec le bouton droit sur "Servers" dans le panneau de navigation de pgAdmin et sélectionnez "Create" -> "Server".
Dans l'onglet "General", donnez un nom à votre serveur (par exemple, "My PostgreSQL").
Dans l'onglet "Connection", entrez les informations suivantes :
Host : postgres
Port : 5432
Maintenance database : mydatabase
Username : myuser
Password : mypassword
