const { getDB } = require('../config/db');

const loginAdmin = (matricule, callback) => {
  getDB().query('SELECT * FROM administrateur WHERE CAST(matricule AS CHAR) = ?', [matricule], callback);
};

module.exports = { loginAdmin };
