
// Load the fetchPriceCryptoCurrency handler
let corefetchPriceCryptoCurrency = require('./handlers/fetchCryptoPrice')


// Add the handler to the handlers object
// The keys are the name of the actions
// The values are the handlers
let handlers = {
  'fetchPriceCryptoCurrency': corefetchPriceCryptoCurrency
}


// Function that selects the appropriate handler based on the action triggered by the agent
const interactionHandler = interaction => {
    // Retrieve the handler of the triggered action
    let handler = handlers[interaction.action]
  
    // If the action has a handler, the Promise of the handler is returned
    if (handler) return handler(interaction)
  
    // If the action has no handler, a rejected Promise is returned
    else return Promise.reject(new Error(`unhandled action ${interaction.action}`))
  }

  // Function that handles the request of the agent and sends back the response
const requestHandler = (req, res) => {
    let body = req.body
  
    // Build the interaction object
    let interaction = {
      action: body.queryResult.action,
      parameters: body.queryResult.parameters,
      response: {}
    }
    console.log(interaction)
  
    // Handle the Promise returned by the action handler
    interactionHandler(interaction)
    .then(() => {
      // If the action handler succeeded, return the response to the agent
      console.log(interaction.response)
      res.json(interaction.response)
    })
    .catch(e => {
      // If the action handler failed, print the error and return the response to the agent
      console.log(e)
      res.json(interaction.response)
    })
    // In both cases, whether the Promise resolves or is rejected, the response is sent back
    // to the agent
  }

  module.exports = requestHandler