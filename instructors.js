const fs = require('fs')
const data = require('./data.json')

exports.post = (request, response) => {
  const keys = Object.keys(request.body)

  for (key of keys) {
    if (request.body[key] === '')
      return response.send('Please, fill all fields!')
  }

  data.instructors.push(request.body)

  fs.writeFile('data.json', JSON.stringify(data, null, 2), (err) => {
    if (err) return response.send('Error on file')

    return response.redirect('/instructors')
  })
}