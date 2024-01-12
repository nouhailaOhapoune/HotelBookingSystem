# Utiliser le runtime officiel Node.js comme image de base
FROM node:latest as mundia_node

# Définir le répertoire de travail dans le conteneur
WORKDIR /app

# Copier package.json dans le répertoire de travail
COPY package.json ./

# Installer les dépendances
RUN npm install

# Copier l'intégralité du code de l'application dans le conteneur
COPY ./ /app/

# Créer l'application React pour la production
RUN npm run build

# Utiliser Nginx comme serveur de production
FROM nginx:latest

# Copier l'application React construite dans le répertoire du serveur Web de Nginx
COPY --from=mundia_node /app/build /usr/share/nginx/html

# Exposer le port 80 pour le serveur Nginx
EXPOSE 80

# Démarrer Nginx lorsque le conteneur s'exécute
CMD ["nginx", "-g", "daemon off;"]
