const express = require('express');
const helmet = require('helmet');
const path = require('path');
const fs = require('fs');
const app = express();
const PORT = 3000;

// Chemin correct vers registry.json
const registryPath = path.join(__dirname, 'routes', 'registry.json');
const registry = JSON.parse(fs.readFileSync(registryPath, 'utf8'));

// Importer les modules nécessaires
const loadbalancer = require('./utils/loadbalancer'); // Chemin vers loadbalancer
const router = require('./routes/index'); // Chemin vers index.js dans routes

// Middleware de sécurité
app.use(helmet()); 
app.use(express.json());

// Utiliser les routes définies dans index.js
app.use('/', router);

app.listen(PORT, () => {
    console.log('Gateway a démarré sur le port ' + PORT);
});
