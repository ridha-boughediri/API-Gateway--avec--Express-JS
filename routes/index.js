const express = require('express');
const router = express.Router();
const axios = require('axios');

router.all('/:apiName', (req, res) => {
    console.log(req.params.apiName);
    axios.get("http://localhost:3001/" + req.params.apiName)
        .then((response) => {
            res.send(response.data); 
        })
        .catch((error) => {
            console.error(error);
            res.status(500).send('Erreur lors de la requête à l\'API externe');
        });
});

module.exports = router;
