const dataLogger = function(request){
    const time = new Intl.DateTimeFormat('hu-HU').format(Date.now())
    const time2 = new Date().toLocaleDateString('hu-HU')
    console.log(`Date: ${time} Url: ${request.url} Method: ${request.method}`)}

module.exports = dataLogger