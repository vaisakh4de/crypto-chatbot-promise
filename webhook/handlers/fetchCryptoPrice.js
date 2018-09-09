'use strict'

const https = require('https');

const handler = (interaction) => {
  return new Promise((resolve, reject) => {
    // Check for parameters
    if (!interaction.parameters.hasOwnProperty('fsym')) {
      reject(new Error('missing fsym parameter for action fetchPriceCryptoCurrency'))
    }
    
    let symbol = interaction.parameters['fsym']
    let country = interaction.parameters['tsyms']
    symbol = symbol.toUpperCase()
    country = country.toUpperCase()

    // Fetch the price of the cryptocurrency
    const reqUrl = encodeURI(`https://min-api.cryptocompare.com/data/price?fsym=${symbol}&tsyms=${country}`);
        https.get(reqUrl, (res) => {
            let completeResponse = '';
            res.on('data', (chunk) => {
                completeResponse += chunk;
            });
            res.on('end', () => {
                const movie = JSON.parse(completeResponse);
                console.log(movie);
                
                let dataToSend
                for (var key in movie)
                {
                    dataToSend = `value of ${symbol} in ${country} is  ${movie[key]}`;
                }
                
                interaction.response = {
                    source: 'webhook',
                    fulfillmentText: dataToSend
                  }
                  resolve(interaction.response)
            });
        }, (error) => {
            interaction.response = {
                source: 'webhook',
                fulfillmentText: {
                    dataToSend
                }
              }
        });  
        // Resolve the Promise to say that the handler performed the action without any error
        
      
  })
}

module.exports = handler