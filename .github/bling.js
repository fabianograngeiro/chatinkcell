const express = require('express');
const app = express();
const axios = require('axios');
const PORT = process.env.PORT || 5000;

app.use(express.json());

app.post('/webhook', async (req, res) => {
  const intentName = req.body.queryResult.intent.displayName;
  
  if (intentName === 'Saber do meu notebook') {
    const userId = req.body.originalDetectIntentRequest.payload.data.source.userId;
    const blingApiKey = 'b7eeeaa9513217cafe7daf5ad5fc7be83d28e2d861b89076ff6a1b7782af793877693bc2'; // Substitua com sua API Key do Bling
    const serviceStatus = await getServiceStatus(blingApiKey, userId);
    const message = `O status do seu notebook é ${serviceStatus}. Para mais informações, acesse: https://www.meuservico.com/status`;

    res.json({
      fulfillmentText: message
    });
  }
});

async function getServiceStatus(apiKey, userId) {
  // Use a API do Bling para buscar o status do serviço
  const response = await axios.get(`https://bling.com.br/api/v2/servico/status?apikey=${apiKey}&userId=${userId}`);
  const status = response.data.status;

  return status;
}

app.listen(PORT, () => {
  console.log(`Servidor iniciado na porta ${PORT}`);
})
