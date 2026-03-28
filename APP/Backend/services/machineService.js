const { getDB } = require('../config/db');

const getAllMachines = (callback) => {
  getDB().query('SELECT * FROM machine', callback);
};

module.exports = { getAllMachines };
