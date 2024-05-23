const express = require("express");
const axios = require("axios");
const { Kafka } = require("kafkajs");

const app = express();
const PORT = 3002;
const HOST = "localhost";

// Configuration Kafka
const kafka = new Kafka({
  clientId: "microservice",
  brokers: ["localhost:9092"],
});

const producer = kafka.producer();
const consumer = kafka.consumer({ groupId: "microservice-group" });

app.use(express.json());

// Initialisation du producteur Kafka
const initKafkaProducer = async () => {
  await producer.connect().catch(error => {
    console.error('Erreur lors de la connexion au producteur Kafka:', error);
    process.exit(1);
  });
};

// Initialisation du consommateur Kafka
const initKafkaConsumer = async () => {
  await consumer.connect();
  await consumer.subscribe({ topic: "gateway-topic", fromBeginning: true });

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

// Endpoints du microservice
app.get('/fakeapi', (req, res) => {
    res.send('Bonjour de la fake API pour test');
});

app.post('/bogusapi', (req, res) => {
    res.send('Bogus API dit shalom');
});

// Endpoint pour envoyer un message à Kafka
app.post('/sendKafkaMessage', async (req, res) => {
    const { topic, message } = req.body;
    try {
        await producer.send({
            topic,
            messages: [{ value: message }],
        });
        res.status(200).json({ message: 'Message envoyé avec succès à Kafka' });
    } catch (error) {
        console.error('Erreur lors de l\'envoi du message à Kafka:', error);
        res.status(500).json({ error: 'Erreur lors de l\'envoi du message à Kafka' });
    }
});

// Fonction pour enregistrer le microservice auprès de l'API Gateway
async function registerMicroservice(retryCount = 0) {
    try {
        const response = await axios.post(`http://localhost:3000/register`, {
            apiName: "registrytest",
            protocol: "http",
            host: HOST,
            port: PORT,
            url: `http://${HOST}:${PORT}/`,
        });
        console.log("Microservice enregistré avec succès :", response.data);
    } catch (error) {
        console.error("Erreur lors de l'enregistrement du microservice :", error.message);
        if (retryCount < 5) {
            console.log(`Tentative de reconnexion ${retryCount + 1}...`);
            setTimeout(() => registerMicroservice(retryCount + 1), 5000);
        }
    }
}

// Fonction pour désenregistrer le microservice
async function unregisterMicroservice() {
    try {
        const response = await axios.post(`http://localhost:3000/unregister`, {
            apiName: "registrytest",
            url: `http://${HOST}:${PORT}/`,
        });
        console.log("Microservice désenregistré avec succès :", response.data);
    } catch (error) {
        console.error("Erreur lors du désenregistrement du microservice :", error.message);
    }
}

// Capture des signaux de terminaison pour désenregistrer le microservice
process.on('SIGINT', async () => {
    console.log('Signal SIGINT reçu. Désenregistrement du microservice...');
    await unregisterMicroservice();
    process.exit(0);
});

process.on('SIGTERM', async () => {
    console.log('Signal SIGTERM reçu. Désenregistrement du microservice...');
    await unregisterMicroservice();
    process.exit(0);
});

// Démarrage du serveur
app.listen(PORT, async () => {
    console.log(`Le serveur de l'API fake est sur le port ${PORT}`);
    await initKafkaProducer();
    await initKafkaConsumer();
    registerMicroservice();
});
