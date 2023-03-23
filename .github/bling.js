const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/webhook', async (req, res) => {
  // Recupera o número da ordem de serviço fornecido pelo usuário
  const orderId = req.body.queryResult.parameters['numero-os'];

  // Faz uma chamada à rota da sua aplicação no GitHub para recuperar as informações necessárias
  const response = await axios.get(``);

  // Recupera as informações necessárias da resposta da rota em sua aplicação no GitHub
  const informacoes = response.data.informacoes;

  // Cria uma mensagem de resposta formatada com as informações recuperadas
  const message = `A ordem de serviço ${orderId} está com o status ${informacoes.status}. Clique aqui para acessar: ${informacoes.link}`;

  // Retorna a mensagem de resposta para o chatbot
  res.json({
    fulfillmentText: message,
  });
});

app.listen(port, () => {
  console.log(`Servidor iniciado na porta ${port}`);
});
