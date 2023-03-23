const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.json());

app.post('/webhook', (req, res) => {
  const intentName = req.body.queryResult.intent.displayName;
  
  if (intentName === 'ordem de serviço') {
    const numeroOrdem = req.body.queryResult.parameters.numeroOrdem;
    const urlStatus = `https://seusite.com/status/${numeroOrdem}`;
    // Aqui você pode adicionar a lógica para buscar as informações da API Bling 
    // e adicionar o status do serviço na resposta ao usuário
    const mensagem = `O status do seu equipamento está disponível em: ${urlStatus}`;
    const resposta = {
      fulfillmentText: mensagem
    };
    res.json(resposta);
  } else {
    const resposta = {
      fulfillmentText: 'Desculpe, não entendi o que você quer dizer.'
    };
    res.json(resposta);
  }
});

app.listen(3000, () => {
  console.log('Servidor iniciado na porta 3000');
});
