const express = require("express");
const app = express();
const PORT = 3001;

app.use(express.json());

app.get('/fakeapi', (req, res, next) => {
    res.send('Bonjour de la fake API pour test');
});

app.post('/bogusapi', (req, res, next) => {
    res.send('Bogus API dit shalom');
});




app.listen(PORT, () => {
    console.log('Le serveur de l\'API fake est sur le port ' + PORT);
});
