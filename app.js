const express = require('express');
const helmet = require('helmet');
const path = require('path');
const fs = require('fs');
const { Kafka } = require('kafkajs');

const app = express();
const PORT = 3000;

// Configuration du client Kafka
const kafka = new Kafka({
  clientId: 'api-gateway',
  brokers: ['localhost:9092'] // Assurez-vous d'utiliser les bons brokers
});

const producer = kafka.producer();
const consumer = kafka.consumer({ groupId: 'api-gateway-group' });

const initKafka = async () => {
  await producer.connect().catch(error => {
    console.error('Erreur lors de la connexion au producteur Kafka:', error);
    process.exit(1);
  });
  await consumer.connect();
  await consumer.subscribe({ topic: 'gateway-topic', fromBeginning: true });

  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      console.log({
        topic,
        partition,
        value: message.value.toString(),
      });
      // Traitez ici les messages Kafka reçus
    },
  });
};

// Initialisation de Kafka
initKafka();

// Chemin correct vers registry.json
const registryPath = path.join(__dirname, 'routes', 'registry.json');
let registry;

try {
    const registryData = fs.readFileSync(registryPath, 'utf8');
    registry = JSON.parse(registryData);
} catch (error) {
    console.error('Erreur lors de la lecture ou de l\'analyse de registry.json:', error);
    process.exit(1);
}

// Importer les modules nécessaires
const loadbalancer = require('./utils/loadbalancer');
const router = require('./routes/index');

// Middleware de sécurité
app.use(helmet());
app.use(express.json());

// Utiliser les routes définies dans index.js
app.use('/', router);

// Route exemple pour envoyer un message à Kafka
app.post('/publish', async (req, res) => {
  const { topic, message } = req.body;
  try {
    await producer.send({
      topic,
      messages: [{ value: message }]
    });
    res.status(200).json({ message: 'Message envoyé avec succès' });
  } catch (error) {
    console.error('Erreur lors de la publication du message:', error);
    res.status(500).json({ error: 'Erreur lors de l\'envoi du message' });
  }
});

app.listen(PORT, () => {
    console.log('Gateway a démarré sur le port ' + PORT);
});
