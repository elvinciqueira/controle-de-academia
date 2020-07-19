const { date } = require('../../lib/utils');
const db = require('../../config/db');

module.exports = {
  all(callback) {
    db.query(`SELECT * FROM members`, function (err, results) {
      if (err) throw `Database Error! ${err}`;

      callback(results.rows);
    });
  },

  create(data, callback) {
    const query = `
      INSERT INTO members (
        name,
        avatar_url,
        birth,
        gender,
        email,
        blood,
        weight,
        height,
        instructor_id
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
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
      instructor,
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
      instructor,
    ];

    db.query(query, values, function (err, results) {
      if (err) throw `Database Error! ${err}`;

      callback(results.rows[0].id);
    });
  },

  findById(id, callback) {
    db.query(
      `
     SELECT members.*, instructors.name AS instructor_name
     FROM members 
     LEFT JOIN instructors ON (members.instructor_id = instructors.id)
     WHERE members.id = $1`,
      [id],
      function (err, results) {
        if (err) throw `Database Error! ${err}`;

        callback(results.rows[0]);
      }
    );
  },

  update(data, callback) {
    const query = `
      UPDATE members SET
        avatar_url=($1),
        name=($2),
        birth=($3),
        gender=($4),
        email=($5),
        blood=($6),
        weight=($7),
        height=($8),
        instructor_id=($9)
      WHERE id = $10
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
      instructor,
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
      instructor,
      id,
    ];

    db.query(query, values, function (err, results) {
      if (err) throw `Database error! ${err}`;

      callback();
    });
  },

  delete(id, callback) {
    db.query(`DELETE FROM members WHERE id = $1`, [id], function (
      err,
      results
    ) {
      if (err) throw `Database Error! ${err}`;

      return callback();
    });
  },

  instructorsSelectOptions(callback) {
    db.query(`SELECT name, id FROM instructors`, function (err, results) {
      if (err) throw `Database error! ${err}`;

      callback(results.rows);
    });
  },

  paginate(params) {
    const { filter, limit, offset, callback } = params;

    let query = '',
      filterQuery = '',
      totalQuery = `(
          SELECT count(*) FROM members
        ) AS total`;

    if (filter) {
      filterQuery = `${query}
      WHERE members.name ILIKE '%${filter}%'
      OR members.email ILIKE '%${filter}%'
      `;

      totalQuery = `(
        SELECT count(*) FROM members
        ${filterQuery} AS total
      )`;
    }

    query = `
    SELECT members.*, ${totalQuery}
    FROM members
    ${filterQuery}
    LIMIT $1 OFFSET $2
    `;

    db.query(query, [limit, offset], function (err, results) {
      if (err) throw `Database error! ${err}`;

      callback(results.rows);
    });
  },
};
