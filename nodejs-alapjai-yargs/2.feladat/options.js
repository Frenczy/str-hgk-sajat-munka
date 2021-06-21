// factory function
const option = function({alias, describe, type, demandOption})
  {return {alias, describe, type, demandOption}}
  
  const id = option({ alias: 'i', describe: 'Product ID', type: 'number', demandOption: "true"})
  
  const name = option({ alias: 'n', describe: 'Product name', type: 'string', demandOption: "true"})
  
  const price = option({ alias: 'p', describe: 'Product price', type: 'number', demandOption: "true"})

  const count = option({ alias: 'c', describe: 'Product count', type: 'number', demandOption: "true"})
  
  module.exports = Object.freeze({id, name, price, count})

