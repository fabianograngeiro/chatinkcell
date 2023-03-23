const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');



const app = express();
const port = process.env.PORT || 3000;
import dialogflow
from flask import flask, request, make_response
import requests
app = Flask(__name__)
import requests

app.route('/webhook', methods=['POST'])
def webhook():
    req = request.get_json(force=True)

    action = req.get('queryResult').get('action')
    parameters = req.get('queryResult').get('parameters')

    if action == 'ordem-de-servico':
        numero_os = parameters.get('numero')
        link_os = obter_link_os(numero_os)

        message = f"O link da ordem de serviço é {link_os}"

    else:
        message = "Desculpe, não entendi o que você quer."

    fulfillment = dialogflow.FulfillmentText(message)
    return make_response(fulfillment.to_dict())

bling_api_key = 'SUA_CHAVE_API_AQUI'

def obter_link_os(numero_os):
    url = f'https://bling.com.br/Api/v2/os/{numero_os}/{bling_api_key}/json'
    response = requests.get(url)
    response_json = response.json()
    link_os = response_json['retorno']['pedidos'][0]['pedido']['linkPagamento']
    return link_os

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/webhook', async (req, res) => {
  // Recupera o número da ordem de serviço fornecido pelo usuário
  const orderId = req.body.queryResult.parameters['numero-os'];

  // Faz uma chamada à rota da sua aplicação no GitHub para recuperar as informações necessárias
  const response = await axios.get(`https://github.com/fabianograngeiro/chatinkcell.git`);

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
