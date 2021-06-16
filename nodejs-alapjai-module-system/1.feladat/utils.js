const increaseDate = function (date, days = 3) {
    let date1 = new Date(date)
    let day1 = date1.getDate()
    date1.setDate(day1 + days)
    return date1}

const increaseAndFormatDate = function ([...dates]) {
    return [...dates].map(e => Intl.DateTimeFormat('hu-HU', { year: 'numeric', month: 'long', day: 'numeric' })
        .format(increaseDate(e)))}

module.exports = increaseAndFormatDate