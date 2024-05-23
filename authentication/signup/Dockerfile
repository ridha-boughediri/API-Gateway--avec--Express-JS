# Utiliser l'image officielle Node.js
FROM node:18-alpine

# Définir le répertoire de travail à l'intérieur du conteneur
WORKDIR /usr/src/app

# Copier package.json et package-lock.json dans le répertoire de travail
COPY package*.json ./

# Installer les dépendances du projet
RUN npm install
RUN npm i -g @nestjs/cli

# Copier le reste du code de l'application
COPY . .

# Exposer le port sur lequel l'application NestJS s'exécute (par défaut, 3000)
EXPOSE 3000

# Environnement de production
ENV NODE_ENV production

# Construire l'application NestJS pour la production
RUN npm run build



FROM golang:1.18-alpine as builder

# Install MailHog:
RUN apk --no-cache add --virtual build-dependencies \
    git \
    && mkdir -p /root/gocode \
    && export GOPATH=/root/gocode \
    && go install github.com/mailhog/MailHog@latest

FROM alpine:3
# Add mailhog user/group with uid/gid 1000.
# This is a workaround for boot2docker issue #581, see
# https://github.com/boot2docker/boot2docker/issues/581
RUN adduser -D -u 1000 mailhog

COPY --from=builder /root/gocode/bin/MailHog /usr/local/bin/

USER mailhog

WORKDIR /home/mailhog

ENTRYPOINT ["MailHog"]

# Expose the SMTP and HTTP ports:
EXPOSE 1025 8025