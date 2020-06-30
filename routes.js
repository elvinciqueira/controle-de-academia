const express = require('express')
const routes = express.Router()

routes.get('/', (request, response) => {
  return response.redirect('/intructors')
})

routes.get('/intructors', (request, response) => {
  return response.render('Intructors/index')
})

routes.get('/members', (request, response) => {
  return response.send('/members')
})

module.exports = routes