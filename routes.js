const express = require('express')
const routes = express.Router()
const instructors = require('./instructors')

routes.get('/', (request, response) => {
  return response.redirect('/instructors')
})

routes.get('/instructors', (request, response) => {
  return response.render('Instructors/index')
})

routes.post('/instructors', instructors.post)

routes.get('/instructors/create', (request, response) => {
  return response.render('Instructors/create')
})

routes.get('/instructors/:id', instructors.show)

routes.get('/instructors/:id/edit', instructors.edit)

routes.get('/members', (request, response) => {
  return response.send('/members')
})

module.exports = routes