const fs = require('fs')
const data = require('./data.json')
const { age } = require('./utils')

exports.show = (request, response) => {
  const { id } = request.params

  const foundInstructor = data.instructors.find(instructor => instructor.id == id)

  if (!foundInstructor) {
    return response.send('Instructor not found')
  }

  const instructor = {
    ...foundInstructor,
    age: age(foundInstructor.birth),
    services: foundInstructor.services.split(','),
    created_at: Intl.DateTimeFormat('pt-BR').format(foundInstructor.created_at),
  }

  return response.render('Instructors/show', { instructor })
}

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