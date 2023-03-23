const request = require('request');
const xml2js = require('xml2js');

function getStatusOrdemServico(numeroOrdemServico) {
    // Monta a URL de chamada à API do Bling
    const apiKey = 'b7eeeaa9513217cafe7daf5ad5fc7be83d28e2d861b89076ff6a1b7782af793877693bc2';
    const url = `https://bling.com.br/Api/v2/ordensservico/${numeroOrdemServico}/json/?apikey=${apiKey}`;

    // Faz a chamada à API do Bling usando o módulo request
    request(url, function(error, response, body) {
        if (!error && response.statusCode === 200) {
            // Converte a resposta XML em um objeto JavaScript usando o módulo xml2js
            xml2js.parseString(body, function(err, result) {
                if (!err) {
                    // Extrai o status da ordem de serviço do objeto JavaScript retornado pela API
                    const status = result.retorno.ordens[0].ordem[0].situacao[0].situacao[0];

                    // Retorna o status da ordem de serviço
                    return status;
                } else {
                    // Trata o erro de conversão do XML para JavaScript
                    console.log(err);
                }
            });
        } else {
            // Trata o erro de chamada à API do Bling
            console.log(error);
        }
    });
}
