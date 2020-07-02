const fs = require('fs')
const data = require('./data.json')

exports.post = (request, response) => {
  const keys = Object.keys(request.body)

  for (key of keys) {
    if (request.body[key] === '')
      return response.send('Please, fill all fields!')
  }

  let { avatar_url, birth, gender, name, services } = request.body

  birth = Date.parse(birth)
  const created_at = Date.now()
  const id = Number(data.instructors.length + 1)

  data.instructors.push({
    id,
    avatar_url,
    name,
    birth,
    gender,
    services,
    created_at,
  })

  fs.writeFile('data.json', JSON.stringify(data, null, 2), (err) => {
    if (err) return response.send('Error on file')

    return response.redirect('/instructors')
  })
}