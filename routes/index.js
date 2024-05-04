const express = require('express');
const router = express.Router();
const axios = require('axios');
const registry = require("./registry.json");

router.all('/:apiName/:path', (req, res) => {
    const apiName = req.params.apiName;
    const path = req.params.path;

    if (registry.services.hasOwnProperty(apiName)) {
        const service = registry.services[apiName];
        axios.get(`${service.url}/${path}`)
            .then((response) => {
                res.send(response.data); 
            })
            .catch((error) => {
                console.error(error);
                res.status(500).send('Erreur lors de la requête à l\'API externe');
            });
    } else {
        res.status(404).send('Service non trouvé dans le registre');
    }
});

module.exports = router;
