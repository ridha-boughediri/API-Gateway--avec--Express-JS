Guide d'installation du Microservice
Introduction
Ce guide fournit des instructions étape par étape pour configurer et exécuter le microservice en utilisant Docker et NGINX.

Prérequis
Docker et Docker Compose installés sur votre système
Assurez-vous qu'aucun autre service n'utilise le port 80 (ou soyez prêt à modifier la configuration pour utiliser un autre port)
Installation et Configuration
1. Cloner le Répertoire
Tout d'abord, clonez le répertoire sur votre machine locale :

sh
Copy code
git clone https://your_repo_url.git
cd your_repo_directory
2. Créer la Configuration NGINX
Créez un fichier nommé nginx.conf à la racine de votre répertoire de projet et ajoutez la configuration suivante :

nginx
Copy code
server {
    listen 80;

    server_name your_domain_or_ip;

    location / {
        proxy_pass http://your_microservice;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
Remplacez your_domain_or_ip par votre domaine ou adresse IP réel(le) et your_microservice par le nom ou l'URL approprié(e) du service.

3. Configuration Docker Compose
Assurez-vous que votre fichier docker-compose.yml inclut la configuration suivante pour le service NGINX :

yaml
Copy code
version: '3'
services:
  nginx:
    image: nginx:latest
    ports:
      - "80:80"
    volumes:
      - ./nginx.conf:/etc/nginx/conf.d/default.conf
    depends_on:
      - your_microservice

  your_microservice:
    image: your_microservice_image
    # Ajoutez d'autres configurations nécessaires pour votre microservice
4. Démarrer les Services
Exécutez Docker Compose pour démarrer les services :

sh
Copy code
docker-compose up
Cette commande démarrera le service NGINX ainsi que votre microservice.

5. Accéder au Service
Ouvrez votre navigateur et accédez à http://your_domain_or_ip. Vous devriez voir le microservice en cours d'exécution.

Dépannage
Erreur d'adresse déjà utilisée : Si vous rencontrez une erreur bind: address already in use, assurez-vous qu'aucun autre service n'utilise le port 80. Vous pouvez modifier le mappage des ports dans le fichier docker-compose.yml si nécessaire.
Logs : Vérifiez les journaux de Docker et NGINX pour toute erreur :
sh
Copy code
docker-compose logs nginx
Informations supplémentaires
Pour une personnalisation et des détails supplémentaires, consultez la documentation officielle de Docker, Docker Compose et NGINX.