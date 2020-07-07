const fs = require('fs')
const data = require('../data.json')
const { age, date } = require('../utils')

exports.show = (request, response) => {
  const { id } = request.params

  const foundMembers = data.members.find(members => members.id == id)

  if (!foundMembers) {
    return response.send('Members not found')
  }

  const members = {
    ...foundMembers,
    age: age(foundMembers.birth),
  }

  return response.render('members/show', { members })
}

exports.index = (request, response) => {
  return response.render('members/index', { members: data.members })
}

exports.create = (request, response) => {
  return response.render('members/create')
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
  const id = Number(data.members.length + 1)

  data.members.push({
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

    return response.redirect('/members')
  })
}

exports.edit = (request, response) => {
  const { id } = request.params

  const foundMembers = data.members.find(members => members.id == id)

  if (!foundMembers) {
    return response.send('Members not found')
  }


  const members = {
    ...foundMembers,
    birth: date(foundMembers.birth),
  }

  console.log(members)

  return response.render('members/edit', { members })
}

exports.put = (request, response) => {
  const { id } = request.body
  let index = 0

  const foundMembers = data.members.find((members, foundIndex) => {
    if (members.id == id) {
      index = foundIndex

      return true
    }
  })

  if (!foundMembers) {
    return response.send('Members not found')
  }

  const members = {
    ...foundMembers,
    ...request.body,
    birth: Date.parse(request.body.birth),
    id: Number(request.body.id)
  }

  data.members[index] = members

  fs.writeFile('data.json', JSON.stringify(data, null, 2), (err) => {
    if (err) return response.send('Write error!')

    return response.redirect(`members/${id}`)
  })
}

exports.delete = (request, response) => {
  const { id } = request.body;

  const filteredMembers = data.members.filter(members => members.id != id)

  data.members = filteredMembers

  fs.writeFile('data.json', JSON.stringify(data, null, 2), (err) => {
    if (err) return response.send('Write file error')

    return response.redirect('/members')
  })
}