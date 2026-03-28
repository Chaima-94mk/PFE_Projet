const { getDB } = require('../config/db');

const FIELDS = ['matricule_operateur', 'nom_operateur', 'prenom_operateur'];

const getAllOperateurs = (callback) => {
  getDB().query('SELECT * FROM operateur', callback);
};

const createOperateur = (data, callback) => {
  const fields = Object.keys(data).filter(f => FIELDS.includes(f));
  const values = fields.map(f => data[f]);
  if (fields.length === 0) return callback(new Error('Champs invalides'));
  const sql = `INSERT INTO operateur (${fields.join(',')}) VALUES (${fields.map(() => '?').join(',')})`;
  getDB().query(sql, values, (err, result) => {
    callback(err, err ? null : { id: result.insertId, ...data });
  });
};

const deleteOperateur = (id, callback) => {
  getDB().query('DELETE FROM operateur WHERE id = ?', [id], callback);
};

const updateOperateur = (id, data, callback) => {
  const fields = Object.keys(data).filter(f => FIELDS.includes(f));
  const values = fields.map(f => data[f]);
  if (fields.length === 0) return callback(new Error('Champs invalides'));
  const sql = `UPDATE operateur SET ${fields.map(f => `${f}=?`).join(',')} WHERE id=?`;
  getDB().query(sql, [...values, id], callback);
};

module.exports = { getAllOperateurs, createOperateur, deleteOperateur, updateOperateur };
