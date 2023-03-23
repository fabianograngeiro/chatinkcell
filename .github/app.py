//Nesse código, estamos criando uma rota / que aceita solicitações do método POST. 
Quando o webhook é acionado pelo Dialogflow, o código verifica se a intenção é status_ordem_servico,
extrai o número da ordem de serviço do corpo da solicitação e chama a função obter_status_ordem_servico
que criamos anteriormente. O resultado da função é então retornado para o Dialogflow em formato JSON.

Você deve substituir a linha from sua_funcao import obter_status_ordem_servico pelo nome do arquivo e da
função que você criou anteriormente. Lembre-se também de substituir a porta do servidor se necessário.



from flask import Flask, request
import json
from sua_funcao import obter_status_ordem_servico

app = Flask(__name__)

@app.route('/', methods=['POST'])
def webhook():
    req = request.get_json(silent=True, force=True)

    intent_name = req['queryResult']['intent']['displayName']
    if intent_name == 'status_ordem_servico':
        ordem_servico = req['queryResult']['parameters']['ordem_servico']
        status = obter_status_ordem_servico(ordem_servico)
        response = {'fulfillmentMessages': [{'text': {'text': [status]}}]}
        return json.dumps(response)
    else:
        response = {'fulfillmentMessages': [{'text': {'text': ['Não entendi sua pergunta. Por favor, tente novamente.']}}]}
        return json.dumps(response)

if __name__ == '__main__':
    app.run(port=5000) 
