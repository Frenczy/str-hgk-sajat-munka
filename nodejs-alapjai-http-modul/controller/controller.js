const htmlResponse = require('../utils/htmlResponse')

const index = function (response) {htmlResponse(response, 'index')}
const about = function (response) {htmlResponse(response, 'about')}
const contact = function (response) {htmlResponse(response, 'contact')}
const error404 = function (response) {htmlResponse(response, '404', 404)}

module.exports = Object.freeze({index, about, contact, error404})