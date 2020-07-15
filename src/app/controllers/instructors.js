const Instructor = require('../models/Instructor');

module.exports = {
  show(request, response) {
    return;
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
