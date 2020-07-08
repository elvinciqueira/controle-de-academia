const fs = require('fs')
const data = require('../data.json')
const { date } = require('../utils')

exports.show = (request, response) => {
  const { id } = request.params

  const foundMembers = data.members.find(members => members.id == id)

  if (!foundMembers) {
    return response.send('Members not found')
  }

  const member = {
    ...foundMembers,
    birth: date(foundMembers.birth).birthDay,
  }

  return response.render('members/show', { member })
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

  birth = Date.parse(request.body.birth)

  let id = 1;
  const lastMember = data.members[data.members.length - 1]

  if (lastMember) {
    id = lastMember.id + 1
  }

  data.members.push({
    id,
    ...request.body,
    birth,
  })

  fs.writeFile('data.json', JSON.stringify(data, null, 2), (err) => {
    if (err) return response.send('Error on file')

    return response.redirect(`members/${id}`)
  })
}

exports.edit = (request, response) => {
  const { id } = request.params

  const foundMembers = data.members.find(members => members.id == id)

  if (!foundMembers) {
    return response.send('Members not found')
  }


  const member = {
    ...foundMembers,
    birth: date(foundMembers.birth).iso,
  }

  return response.render('members/edit', { member })
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

  const member = {
    ...foundMembers,
    ...request.body,
    birth: Date.parse(request.body.birth),
    id: Number(request.body.id)
  }

  data.members[index] = member

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