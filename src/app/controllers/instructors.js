const { age, date } = require('../../lib/utils');
const Instructor = require('../models/Instructor');

module.exports = {
  show(request, response) {
    const { id } = request.params;

    Instructor.findById(id, function (instructor) {
      if (!instructor) return response.send('Instructor not found!');

      instructor.age = age(instructor.birth);
      instructor.services = instructor.services.split(',');
      instructor.created_at = date(instructor.created_at).format;

      return response.render('instructors/show', { instructor });
    });
  },

  index(request, response) {
    Instructor.all(function (instructors) {
      return response.render('Instructors/index', { instructors });
    });
  },

  create(request, response) {
    return response.render('Instructors/create');
  },

  post(request, response) {
    const keys = Object.keys(request.body);

    for (key of keys) {
      if (request.body[key] === '')
        return response.send('Please, fill all fields!');
    }

    Instructor.create(request.body, function (instructor) {
      return response.redirect(`instructors/${instructor.id}`);
    });
  },

  edit(request, response) {
    return;
  },

  put(request, response) {
    const keys = Object.keys(request.body);

    for (key of keys) {
      if (request.body[key] === '')
        return response.send('Please, fill all fields!');
    }

    return;
  },

  delete(request, response) {
    return;
  },
};
