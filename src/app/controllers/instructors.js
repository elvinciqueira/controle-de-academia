const { age, date } = require('../../lib/utils');

module.exports = {
  show(request, response) {
    return;
  },

  index(request, response) {
    return response.render('Instructors/index');
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

    return;
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
