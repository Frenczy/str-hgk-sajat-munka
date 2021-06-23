const controller = require('../controller/controller')

const router = {
    '/': function(response){controller.index(response)},
    '/about': function(response){controller.about(response)},
    '/contact': function(response){controller.contact(response)},
    '/404': function(response){controller.error404(response)}}

    
module.exports = router