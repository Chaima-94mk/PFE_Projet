const { getDB } = require('../config/db');

const getAllDefauts = (callback) => {
  getDB().query('SELECT * FROM defaut', callback);
};

const createDefaut = (data, callback) => {
  const fields = Object.keys(data);
  const values = Object.values(data);
  const sql = `INSERT INTO defaut (${fields.join(',')}) VALUES (${fields.map(() => '?').join(',')})`;
  getDB().query(sql, values, (err, result) => {
    callback(err, err ? null : { id: result.insertId, ...data });
  });
};

const deleteDefaut = (id, callback) => {
  getDB().query('DELETE FROM defaut WHERE id = ?', [id], callback);
};

const updateDefaut = (id, data, callback) => {
  const fields = Object.keys(data);
  const values = Object.values(data);
  const sql = `UPDATE defaut SET ${fields.map(f => `${f}=?`).join(',')} WHERE id=?`;
  getDB().query(sql, [...values, id], callback);
};

module.exports = { getAllDefauts, createDefaut, deleteDefaut, updateDefaut };
