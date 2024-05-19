const express = require('express');
const router = express.Router();
const axios = require('axios');
const path = require('path');
const fs = require('fs');

// Chemin correct vers registry.json
const registryPath = path.join(__dirname, 'registry.json');
const registry = JSON.parse(fs.readFileSync(registryPath, 'utf8'));
const loadbalancer = require('../utils/loadbalancer'); // Chemin vers utils/loadbalancer

// Route pour gérer les requêtes vers les API enregistrées
router.all('/:apiName/:path', async (req, res) => {
    console.log(`Nom de l'API : ${req.params.apiName}`); // Journaliser le nom de l'API

    const service = registry.services[req.params.apiName];
    if (service) {
        try {
            // Utiliser le load balancer pour obtenir la nouvelle instance basée sur la stratégie
            const instance = loadbalancer[service.loadBalanceStrategy](service);

            // Construire l'URL de la requête
            const url = `${instance.protocol}://${instance.host}:${instance.port}/${req.params.path}`;

            // Faire la requête vers l'instance de service sélectionnée
            const response = await axios({
                method: req.method,
                url: url,
                headers: req.headers,
                data: req.body,
            });

            // Retourner la réponse à l'utilisateur
            res.status(response.status).json(response.data);
        } catch (error) {
            console.error(`Erreur lors du transfert de la requête : ${error}`);
            res.status(500).json({ message: 'Erreur lors du transfert de la requête' });
        }
    } else {
        console.log("Nom d'API introuvable dans le registre");
        res.status(404).json({ message: 'API introuvable' });
    }
});

// Fonction pour vérifier si une instance d'API existe déjà
const apiAlreadyExists = (registrationInfo) => {
    let exists = false;
    registry.services[registrationInfo.apiName].forEach(instance => {
        if (instance.url === registrationInfo.url) {
            exists = true;
            return;
        }
    });
    return exists;
};

// Route pour enregistrer une nouvelle API ou mettre à jour une existante
router.post('/register', async (req, res) => {
    const registrationInfo = req.body;

    if (!registry.services[registrationInfo.apiName]) {
        registry.services[registrationInfo.apiName] = [];
    }

    if (!apiAlreadyExists(registrationInfo)) {
        registry.services[registrationInfo.apiName].push({ ...registrationInfo });

        fs.writeFile(registryPath, JSON.stringify(registry), (error) => {
            if (error) {
                console.error(`Erreur lors de l'enregistrement de l'API : ${error}`);
                res.status(500).json({ message: "Erreur lors de l'enregistrement de l'API" });
            } else {
                console.log(`API enregistrée avec succès : ${registrationInfo.apiName}`);
                res.status(200).json({ message: `API enregistrée avec succès : ${registrationInfo.apiName}` });
            }
        });
    } else {
        console.log(`L'instance existe déjà : ${registrationInfo.apiName}`);
        res.status(409).json({ message: `L'instance existe déjà : ${registrationInfo.apiName}` });
    }
});

// Route pour désenregistrer une API existante
router.post('/unregister', async (req, res) => {
    const { apiName, protocol } = req.body;

    if (registry.services && registry.services[apiName]) {
        registry.services[apiName] = registry.services[apiName].filter(instance => instance.protocol !== protocol);

        if (registry.services[apiName].length === 0) {
            delete registry.services[apiName];
        }

        fs.writeFile(registryPath, JSON.stringify(registry), (error) => {
            if (error) {
                console.error(`Erreur lors du désenregistrement de l'API : ${error}`);
                res.status(500).json({ message: "Erreur lors du désenregistrement de l'API" });
            } else {
                console.log(`API désenregistrée avec succès : ${apiName}`);
                res.status(200).json({ message: `API désenregistrée avec succès : ${apiName}` });
            }
        });
    } else {
        console.log("Nom d'API ou protocole introuvable dans le registre");
        res.status(404).json({ message: 'API ou protocole introuvable' });
    }
});

module.exports = router;
