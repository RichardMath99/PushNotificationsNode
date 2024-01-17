const express = require("express");
const bodyParser = require("body-parser");
const admin = require("firebase-admin");
const http = require('http');

const serviceAccount = require("./firebase.json");
const yup = require('yup');
const cors = require('cors');
const app = express();
const crypto = require('crypto');
const jwt = require('jsonwebtoken');


admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});


app.use(cors());
app.use(express.json());


app.get('/', (req, res) => res.send('Aplicativo em execução...'));


app.post('/register/tokens', async (req, res) => {
  const schema = yup.object().shape({
    topic: yup.string().required(),
    tokens: yup.array().of(yup.string()).required(),
  });

  if(!( await schema.isValid(req.body)))
    return res.status(203).json({ error: 'Ops, o campo tokens são obrigatórios.' });

    const { tokens, topic } = await req.body;

    admin.messaging().subscribeToTopic(tokens, topic).then(function (response) {
      res.json({ res: 'Inscrito no tópico com sucesso' });

  })
  .catch(function (error) {
      res.status(203).json({ error: error })
  });

})

app.post('/remove/tokens', async (req, res) => {
  const schema = yup.object().shape({
    topic: yup.string().required(),
    tokens: yup.array().of(yup.string()).required(),
  });

  if(!( await schema.isValid(req.body)))
    return res.status(203).json({ error: 'Ops, o campo tokens são obrigatórios.' });

    const { tokens, topic } = await req.body;

    admin.messaging().unsubscribeFromTopic(tokens, topic).then(function (response) {
      res.json({ res: 'Inscrição cancelada no tópico com sucesso' });

  })
  .catch(function (error) {
      res.status(203).json({ error: error })
  });

})

app.get('/tokens/:topic', async (req, res) => {
  const { topic } = req.params;

  const schema = yup.object().shape({
    topic: yup.string().required(),
  });

  try {
    await schema.validate({ topic });

    const response = await admin.messaging().getTopicSubscriptions(topic);

    if (response && response.subscriptions) {
      const tokens = response.subscriptions.map(subscription => subscription.token);
      res.json({ tokens });
    } else {
      res.status(404).json({ error: 'Tópico não encontrado ou sem inscrições.' });
    }
  } catch (error) {
    console.error('Erro ao obter tokens do tópico:', error);
    res.status(203).json({ error: error.message });
  }
});


app.post('/send-push', async (req, res) => {
    const schema = yup.object().shape({
      title: yup.string().required(),
      description: yup.string().required(),
      topic: yup.string().required(),
    });
  
    if (!(await schema.isValid(req.body))) {
      return res.status(203).json({ error: 'Ops, os campos title, description e topic são obrigatórios.' });
    }

    const { title, description, topic } = await req.body;
  
    const message = {
      notification: {
        title: title,
        body: description,
      },
      topic: topic,
    };
  
    admin.messaging().send(message).then(function (response) {
      res.json({ res: 'Mensagem enviada com sucesso' });
    })
    .catch(function (error) {
      res.status(203).json({ error: error });
    });
  });
  
  const httpServer = http.createServer(app);

httpServer.listen(3000, () => {
    console.log('Servidor HTTP em execução na porta 3000');
});

