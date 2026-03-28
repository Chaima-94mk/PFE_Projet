const { getDB } = require('../config/db');

const getAllProcesses = (callback) => {
  getDB().query('SELECT * FROM process', callback);
};

const createProcess = (data, callback) => {
  const fields = Object.keys(data);
  const values = Object.values(data);
  const sql = `INSERT INTO process (${fields.join(',')}) VALUES (${fields.map(() => '?').join(',')})`;
  getDB().query(sql, values, (err, result) => {
    callback(err, err ? null : { id: result.insertId, ...data });
  });
};

const deleteProcess = (id, callback) => {
  getDB().query('DELETE FROM process WHERE id = ?', [id], callback);
};

const updateProcess = (id, data, callback) => {
  const fields = Object.keys(data);
  const values = Object.values(data);
  const sql = `UPDATE process SET ${fields.map(f => `${f}=?`).join(',')} WHERE id=?`;
  getDB().query(sql, [...values, id], callback);
};

module.exports = { getAllProcesses, createProcess, deleteProcess, updateProcess };
