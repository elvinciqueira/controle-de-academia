const express = require('express')
const routes = express.Router()

routes.get('/', (request, response) => {
  return response.redirect('/instructors')
})

routes.get('/instructors', (request, response) => {
  return response.render('Instructors/index')
})

routes.post('/instructors', (request, response) => {
  return response.send('recebido')
})

routes.get('/instructors/create', (request, response) => {
  return response.render('Instructors/create')
})

routes.get('/members', (request, response) => {
  return response.send('/members')
})

module.exports = routes