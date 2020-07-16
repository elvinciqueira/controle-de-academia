const { date } = require('../../lib/utils');
const db = require('../../config/db');

module.exports = {
  all(callback) {
    db.query(`SELECT * FROM instructors`, function (err, results) {
      if (err) throw `Database Error! ${err}`;

      callback(results.rows);
    });
  },

  create(data, callback) {
    const query = `
      INSERT INTO instructors (
        name,
        avatar_url,
        birth,
        gender,
        email,
        blood,
        weight,
        height
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
      RETURNING id
    `;

    const {
      name,
      avatar_url,
      birth,
      gender,
      email,
      weight,
      height,
      blood,
    } = data;

    const values = [
      name,
      avatar_url,
      date(birth).iso,
      gender,
      email,
      blood,
      weight,
      height,
      date(Date.now()).iso,
    ];

    db.query(query, values, function (err, results) {
      if (err) throw `Database Error! ${err}`;

      callback(results.rows[0].id);
    });
  },

  findById(id, callback) {
    db.query(`SELECT * FROM instructors WHERE id = $1`, [id], function (
      err,
      results
    ) {
      if (err) throw `Database Error! ${err}`;

      callback(results.rows[0]);
    });
  },

  update(data, callback) {
    const query = `
      UPDATE instructors SET
        avatar_url=($1),
        name=($2),
        birth=($3),
        gender=($4),
        email=($5)
        blood=($6)
        weight=($7)
        height=($8)
      WHERE id = $9
    `;

    const {
      avatar_url,
      name,
      birth,
      gender,
      email,
      id,
      weight,
      height,
      blood,
    } = data;

    const values = [
      avatar_url,
      name,
      date(birth).iso,
      gender,
      email,
      blood,
      weight,
      height,
      id,
    ];

    db.query(query, values, function (err, results) {
      if (err) throw `Database error! ${err}`;

      callback();
    });
  },

  delete(id, callback) {
    db.query(`DELETE FROM instructors WHERE id = $1`, [id], function (
      err,
      results
    ) {
      if (err) throw `Database Error! ${err}`;

      return callback();
    });
  },
};
