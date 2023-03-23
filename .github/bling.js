const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.post('/', async (req, res) => {
  const intent = req.body.queryResult.intent.displayName;
  const osNumber = req.body.queryResult.parameters.osNumber;

  if (intent === 'ordem-de-servico') {
    try {
      const response = await axios.get(`https://bling.com.br/api/v2/servico/${osNumber}/json`);

      const serviceStatus = response.data.retorno.servico.status;
      const serviceLink = response.data.retorno.servico.link;

      let message = `A sua ordem de serviço ${osNumber} está ${serviceStatus}. `;
      message += `Acesse o link a seguir para mais informações: ${serviceLink}`;

      res.json({
        fulfillmentText: message,
      });
    } catch (error) {
      console.error(error);
      res.json({
        fulfillmentText: 'Não foi possível encontrar a ordem de serviço solicitada. Por favor, verifique o número informado e tente novamente.',
      });
    }
  }
});

app.listen(process.env.PORT || 3000, () => {
  console.log('Webhook running on port 3000');
});
