const express = require('express');
const router = express.Router();
const axios = require('axios');
const path = require('path');
const fs = require('fs');

// Chemin correct vers registry.json
const registryPath = path.join(__dirname, 'registry.json');
let registry = JSON.parse(fs.readFileSync(registryPath, 'utf8'));
const loadbalancer = require('../utils/loadbalancer');

// Route pour gérer les requêtes vers les API enregistrées
router.all('/:apiName/:path', async (req, res) => {
  const { apiName, path: apiPath } = req.params;
  const service = registry.services[apiName];

  if (service && loadbalancer[service.loadBalanceStrategy]) {
    try {
      const instance = loadbalancer[service.loadBalanceStrategy](service);
      const url = `${instance.protocol}://${instance.host}:${instance.port}/${apiPath}`;
      const response = await axios({
        method: req.method,
        url,
        headers: req.headers,
        data: req.body,
        timeout: 30000,
      });
      res.status(response.status).json(response.data);
    } catch (error) {
      console.error(`Erreur lors du transfert de la requête : ${error}`);
      res.status(500).json({ message: 'Erreur lors du transfert de la requête' });
    }
  } else {
    res.status(404).json({ message: 'API ou stratégie de load balancing non trouvée' });
  }
});

// Fonction pour vérifier si une instance d'API existe déjà
const apiAlreadyExists = (registrationInfo) => {
  return registry.services[registrationInfo.apiName]?.instances.some(
    (instance) => instance.url === registrationInfo.url
  );
};

// Route pour enregistrer une nouvelle API ou mettre à jour une existante
router.post('/register', (req, res) => {
  const registrationInfo = req.body;

  if (!registry.services[registrationInfo.apiName]) {
    registry.services[registrationInfo.apiName] = { 
      loadBalanceStrategy: registrationInfo.loadBalanceStrategy || 'ROUND_ROBIN',
      index: 0,
      instances: []
    };
  }

  if (!apiAlreadyExists(registrationInfo)) {
    registry.services[registrationInfo.apiName].instances.push({ ...registrationInfo });

    fs.writeFile(registryPath, JSON.stringify(registry), (error) => {
      if (error) {
        console.error(`Erreur lors de l'enregistrement de l'API : ${error}`);
        res.status(500).json({ message: "Erreur lors de l'enregistrement de l'API" });
      } else {
        res.status(200).json({ message: `API enregistrée avec succès : ${registrationInfo.apiName}` });
      }
    });
  } else {
    res.status(409).json({ message: `L'instance existe déjà : ${registrationInfo.apiName}` });
  }
});

// Route pour désenregistrer une API existante
router.post('/unregister', (req, res) => {
  const { apiName, url } = req.body;

  if (registry.services && registry.services[apiName]) {
    registry.services[apiName].instances = registry.services[apiName].instances.filter(instance => instance.url !== url);

    if (registry.services[apiName].instances.length === 0) {
      delete registry.services[apiName];
    }

    fs.writeFile(registryPath, JSON.stringify(registry), (error) => {
      if (error) {
        console.error(`Erreur lors du désenregistrement de l'API : ${error}`);
        res.status(500).json({ message: "Erreur lors du désenregistrement de l'API" });
      } else {
        res.status(200).json({ message: `API désenregistrée avec succès : ${apiName}` });
      }
    });
  } else {
    res.status(404).json({ message: 'API ou URL introuvable' });
  }
});

module.exports = router;
