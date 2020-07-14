const { age, date } = require('../../lib/utils');
const db = require('../../config/db');

module.exports = {
  show(request, response) {
    return;
  },

  index(request, response) {
    db.query(`SELECT * FROM instructors`, function (err, results) {
      if (err) return response.send('Database Error!');

      return response.render('Instructors/index', {
        instructors: results.rows,
      });
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

    const query = `
      INSERT INTO instructors (
        name,
        avatar_url,
        birth,
        gender,
        services,
        created_at
      ) VALUES ($1, $2, $3, $4, $5, $6)
      RETURNING id
    `;

    const { name, avatar_url, birth, gender, services } = request.body;

    const values = [
      name,
      avatar_url,
      date(birth).iso,
      gender,
      services,
      date(Date.now()).iso,
    ];

    db.query(query, values, function (err, results) {
      if (err) return response.send('Database Error!');

      return response.redirect(`instructors/${results.rows[0].id}`);
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
