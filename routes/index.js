const express = require('express');
const router = express.Router();
const axios = require('axios');
const registry = require('./registry.json');
const fs = require("fs");

// Route pour gérer les requêtes vers les API enregistrées
router.all('/:apiName/:path', async (req, res) => {
    console.log(`Nom de l'API : ${req.params.apiName}`); // Journaliser le nom de l'API

    if (registry.services && registry.services[req.params.apiName]) {
        // Vérifier si le registre existe et si le nom de l'API est valide
        try {
            const response = await axios({
                method: req.method, // Récupérer la méthode de la requête
                url: registry.services[req.params.apiName].url + req.params.path, // Construire l'URL de l'API cible
                headers: req.headers, // Récupérer les en-têtes de la requête
                data: req.body, // Récupérer le corps de la requête
            });
            res.status(response.status).json(response.data); // Définir le statut et envoyer les données de la réponse
        } catch (error) {
            console.error(`Erreur lors du transfert de la requête : ${error}`); // Journaliser l'erreur de transfert
            res.status(500).json({ message: 'Erreur lors du transfert de la requête' }); // Envoyer une réponse d'erreur au client
        }
    } else {
        console.log("Nom d'API introuvable dans le registre"); // Journaliser l'absence de l'API dans le registre
        res.status(404).json({ message: 'API introuvable' }); // Envoyer un message d'erreur JSON
    }
});

// Route pour enregistrer une nouvelle API ou mettre à jour une existante
router.post('/register', async (req, res) => {
    const registrationInfo = req.body;
    registry.services[registrationInfo.apiName] = { ...registrationInfo };

    fs.writeFile('./routes/registry.json', JSON.stringify(registry), (error) => {
        if (error) {
            console.error(`Erreur lors de l'enregistrement de l'API : ${error}`);
            res.status(500).json({ message: "Erreur lors de l'enregistrement de l'API" });
        } else {
            console.log(`API enregistrée avec succès : ${registrationInfo.apiName}`);
            res.status(200).json({ message: `API enregistrée avec succès : ${registrationInfo.apiName}` });
        }
    });
});

module.exports = router;
