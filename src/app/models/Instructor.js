const { date } = require('../../lib/utils');
const db = require('../../config/db');

module.exports = {
  all(callback) {
    db.query(
      `
    SELECT instructors.*, count(members) AS total_students
    FROM instructors
    LEFT JOIN members ON (instructors.id = members.instructor_id)
    GROUP BY instructors.id
    ORDER BY total_students DESC`,
      function (err, results) {
        if (err) throw `Database Error! ${err}`;

        callback(results.rows);
      }
    );
  },

  create(data, callback) {
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

    const { name, avatar_url, birth, gender, services } = data;

    const values = [
      name,
      avatar_url,
      date(birth).iso,
      gender,
      services,
      date(Date.now()).iso,
    ];

    db.query(query, values, function (err, results) {
      if (err) throw `Database Error! ${err}`;

      callback(results.rows[0]);
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

  findBy(filter, callback) {
    db.query(
      `
    SELECT instructors.*, count(members) AS total_students
    FROM instructors
    LEFT JOIN members ON (instructors.id = members.instructor_id)
    WHERE instructors.name ILIKE '%${filter}%'
    OR instructors.services ILIKE '%${filter}%'
    GROUP BY instructors.id
    ORDER BY total_students DESC`,
      function (err, results) {
        if (err) throw `Database Error! ${err}`;

        callback(results.rows);
      }
    );
  },

  update(data, callback) {
    const query = `
      UPDATE instructors SET
        avatar_url=($1),
        name=($2),
        birth=($3),
        gender=($4),
        services=($5)
      WHERE id = $6
    `;

    const { avatar_url, name, birth, gender, services, id } = data;

    const values = [avatar_url, name, date(birth).iso, gender, services, id];

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

  paginate(params) {
    const { filter, limit, offset, callback } = params;

    let query = '',
      filterQuery = '',
      totalQuery = `(
          SELECT count(*) FROM instructors
        ) AS total`;

    if (filter) {
      filterQuery = `${query}
      WHERE instructors.name ILIKE '%${filter}%'
      OR instructors.services ILIKE '%${filter}%'
      `;

      totalQuery = `(
        SELECT count(*) FROM instructors
        ${filterQuery} AS total
      )`;
    }

    query = `
    SELECT instructors.*, ${totalQuery}, count(members) AS total_students 
    FROM instructors
    LEFT JOIN members ON (instructors.id = members.instructor_id)
    ${filterQuery}
    GROUP BY instructors.id LIMIT $1 OFFSET $2
    `;

    db.query(query, [limit, offset], function (err, results) {
      if (err) throw `Database error! ${err}`;

      callback(results.rows);
    });
  },
};
