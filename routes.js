const express = require('express')
const routes = express.Router()

routes.get('/', (request, response) => {
  return response.redirect('/instructors')
})

routes.get('/instructors', (request, response) => {
  return response.render('Instructors/index')
})

routes.post('/instructors', (request, response) => {
  const keys = Object.keys(request.body)

  for (key of keys) {
    if (request.body[key] === '')
      return response.send('Please, fill all fields!')
  }

  return response.send(request.body)
})

routes.get('/instructors/create', (request, response) => {
  return response.render('Instructors/create')
})

routes.get('/members', (request, response) => {
  return response.send('/members')
})

module.exports = routes