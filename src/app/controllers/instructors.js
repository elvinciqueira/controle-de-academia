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
    const { filter } = request.query;

    if (filter) {
      Instructor.findBy(filter, function (instructors) {
        return response.render('Instructors/index', { instructors, filter });
      });
    } else {
      Instructor.all(function (instructors) {
        return response.render('Instructors/index', { instructors });
      });
    }
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
    const { id } = request.params;

    Instructor.findById(id, function (instructor) {
      if (!instructor) return response.send('Instructor not found!');

      instructor.birth = date(instructor.birth).iso;

      return response.render('instructors/edit', { instructor });
    });
  },

  put(request, response) {
    const keys = Object.keys(request.body);

    for (key of keys) {
      if (request.body[key] === '')
        return response.send('Please, fill all fields!');
    }

    const { id } = request.body;

    Instructor.update(request.body, function () {
      return response.redirect(`/instructors/${id}`);
    });
  },

  delete(request, response) {
    const { id } = request.body;

    Instructor.delete(id, function () {
      return response.redirect(`/instructors`);
    });
  },
};
