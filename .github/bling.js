const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');

const app = express();
app.use(bodyParser.json());

const API_KEY = 'b7eeeaa9513217cafe7daf5ad5fc7be83d28e2d861b89076ff6a1b7782af793877693bc2'; // insira aqui sua chave de API do Bling

// rota do webhook que receberá as solicitações do Dialogflow
app.post('/webhook', async (req, res) => {
  const { queryResult } = req.body;

  // verifica se a intenção acionada é a de buscar o status do serviço
  if (queryResult.intent.displayName === 'Status do Serviço') {
    const ordemServico = queryResult.parameters.ordem_servico;

    // busca o status do serviço usando a API do Bling
    const response = await axios.get(`https://bling.com.br/Api/v2/os.json?filters=num=${ordemServico}&apikey=${API_KEY}`);

    // extrai o status do serviço do JSON retornado pela API do Bling
    const status = response.data.retorno.ordensservico[0].situacao;

    // cria o link do status do equipamento baseado no status do serviço
    let statusLink;
    if (status === 'Aguardando Aprovação') {
      statusLink = 'https://meusite.com/status/aprovacao';
    } else if (status === 'Em Andamento') {
      statusLink = 'https://meusite.com/status/andamento';
    } else if (status === 'Finalizado') {
      statusLink = 'https://meusite.com/status/finalizado';
    }

    // cria a resposta do chatbot com o link do status do equipamento
    const message = {
      text: `O status do equipamento para a ordem de serviço ${ordemServico} é ${status}. Veja o status do equipamento em ${statusLink}.`,
    };

    // retorna a resposta do chatbot no formato esperado pelo Dialogflow
    res.json({ fulfillmentMessages: [message] });
  } else {
    res.json({});
  }
});

// inicia o servidor na porta 3000
app.listen(3000, () => {
  console.log('Webhook iniciado na porta 3000');
});
