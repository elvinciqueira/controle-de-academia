const { age, date } = require('../../lib/utils');

const Member = require('../models/Member');

module.exports = {
  show(request, response) {
    const { id } = request.params;

    Member.findById(id, function (member) {
      if (!member) return response.send('Member not found!');

      member.birth = date(member.birth).birthDay;

      return response.render('members/show', { member });
    });
  },

  index(request, response) {
    Member.all(function (members) {
      return response.render('Members/index', { members });
    });
  },

  create(request, response) {
    return response.render('Members/create');
  },

  post(request, response) {
    const keys = Object.keys(request.body);

    for (key of keys) {
      if (request.body[key] === '')
        return response.send('Please, fill all fields!');
    }

    Member.create(request.body, function (member) {
      return response.redirect(`members/${member.id}`);
    });
  },

  edit(request, response) {
    const { id } = request.params;

    Member.findById(id, function (member) {
      if (!member) return response.send('Member not found!');

      member.birth = date(member.birth).iso;

      return response.render('members/edit', { member });
    });
  },

  put(request, response) {
    const keys = Object.keys(request.body);

    for (key of keys) {
      if (request.body[key] === '')
        return response.send('Please, fill all fields!');
    }

    const { id } = request.body;

    Member.update(request.body, function () {
      return response.redirect(`/members/${id}`);
    });
  },

  delete(request, response) {
    const { id } = request.body;

    Member.delete(id, function () {
      return response.redirect(`/members`);
    });
  },
};
