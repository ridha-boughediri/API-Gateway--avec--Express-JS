# Utiliser une image de base. Ici, on prend l'exemple d'une image Debian.
FROM debian:latest

# Mettre à jour les paquets et installer les dépendances nécessaires.
RUN apt-get update && apt-get install -y \
    curl \
    vim \
    # ajouter d'autres paquets selon les besoins
    && rm -rf /var/lib/apt/lists/*

# Définir l'environnement nécessaire pour le service.
ENV MY_ENVIRONMENT_VARIABLE valeur

# Copier les fichiers de configuration ou les scripts depuis votre machine hôte vers l'image.
COPY ./monscript.sh /usr/local/bin/monscript.sh
COPY ./maconfig.cfg /etc/maconfig.cfg

# Exposer les ports nécessaires. Par exemple, si votre service écoute sur le port 1234.
EXPOSE 1234

# Définir le point d'entrée ou la commande par défaut qui s'exécutera au démarrage du conteneur.
CMD ["monscript.sh"]
