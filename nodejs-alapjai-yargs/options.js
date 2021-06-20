// factory function
const option = function({alias, describe, type='string', demand=true})
  {return {alias, describe, type, demand}}
// alternatív megoldás
const option2 = ({ alias, describe, type = 'string', demandOption = true } = {}) => ({
    alias, describe, type, demandOption})
  
  const id = option({
    alias: 'i',
    describe: 'Movie ID',
    type: 'number'
  })
  
  const producer = option({
    alias: 'p',
    describe: 'Film producer'
  })
  
  const title = option({
    alias: 't',
    describe: 'Movie title'
  })
  
  module.exports = Object.freeze({id, producer, title})

