const { getDB } = require('../config/db');

const getAllProduits = (callback) => {
  getDB().query('SELECT * FROM produit', callback);
};

const generateMatriculeProduit = (ppa, counter) => {
  const ppaStr = String(ppa);
  const counterStr = String(counter);
  const zeros = 12 - ppaStr.length - counterStr.length;
  if (zeros < 0) throw new Error(`Compteur trop grand pour le PPA ${ppa}`);
  return ppaStr + 'X'.repeat(zeros) + counterStr;
};

const createProduit = (data, callback) => {
  const { ppa, matricule_operateur, code_process, num_machine, temps, etat_produit } = data;
  const ppaStr = String(ppa);
  getDB().query(
    `SELECT matricule_produit FROM produit WHERE matricule_produit LIKE ? ORDER BY matricule_produit DESC LIMIT 1`,
    [`${ppaStr}%`],
    (err, rows) => {
      if (err) return callback(err);
      let counter = 1;
      if (rows.length > 0) {
        const last = String(rows[0].matricule_produit);
        const lastCounter = parseInt(last.slice(ppaStr.length).replace(/^X+/, ''), 10);
        counter = lastCounter + 1;
      }
      let matricule_produit;
      try { matricule_produit = generateMatriculeProduit(ppa, counter); }
      catch (e) { return callback(e); }
      const sql = `INSERT INTO produit (matricule_produit, ppa, matricule_operateur, code_process, num_machine, temps, etat_produit) VALUES (?,?,?,?,?,?,?)`;
      getDB().query(sql, [matricule_produit, parseInt(ppa), parseInt(matricule_operateur), code_process, num_machine, temps, etat_produit], (err2, result) => {
        callback(err2, { id: result?.insertId, matricule_produit, ppa, matricule_operateur, code_process, num_machine, temps, etat_produit });
      });
    }
  );
};

const deleteProduit = (id, callback) => {
  getDB().query('DELETE FROM produit WHERE id = ?', [id], callback);
};

const updateProduit = (id, data, callback) => {
  const allowed = ['ppa', 'matricule_operateur', 'code_process', 'num_machine', 'quantite', 'etat_produit'];
  const fields = Object.keys(data).filter(f => allowed.includes(f));
  const values = fields.map(f => data[f]);
  if (fields.length === 0) return callback(new Error('Champs invalides'));

  // Récupérer le produit actuel pour comparer le PPA
  getDB().query('SELECT ppa, matricule_produit FROM produit WHERE id = ?', [id], (err, current) => {
    if (err) return callback(err);
    if (current.length === 0) return callback(new Error('Produit introuvable'));

    const currentPpa = String(current[0].ppa);
    const newPpa = data.ppa ? String(data.ppa) : currentPpa;
    const ppaChanged = newPpa !== currentPpa;

    const doUpdate = (matricule_produit) => {
      const allFields = matricule_produit ? [...fields, 'matricule_produit'] : fields;
      const allValues = matricule_produit ? [...values, matricule_produit] : values;
      const sql = `UPDATE produit SET ${allFields.map(f => `${f}=?`).join(',')} WHERE id=?`;
      getDB().query(sql, [...allValues, id], (err2) => callback(err2, { ...data, ...(matricule_produit ? { matricule_produit } : {}) }));
    };

    if (ppaChanged) {
      // Nouveau PPA : générer une nouvelle matricule avec le prochain compteur
      getDB().query(
        `SELECT matricule_produit FROM produit WHERE matricule_produit LIKE ? AND id != ? ORDER BY matricule_produit DESC LIMIT 1`,
        [`${newPpa}%`, id],
        (err2, rows) => {
          if (err2) return callback(err2);
          let counter = 1;
          if (rows.length > 0) {
            const last = String(rows[0].matricule_produit);
            const lastCounter = parseInt(last.slice(newPpa.length).replace(/^X+/, ''), 10);
            if (!isNaN(lastCounter)) counter = lastCounter + 1;
          }
          let matricule_produit;
          try { matricule_produit = generateMatriculeProduit(newPpa, counter); }
          catch (e) { return callback(e); }
          doUpdate(matricule_produit);
        }
      );
    } else {
      // Même PPA : garder la même matricule, juste mettre à jour les autres champs
      doUpdate(null);
    }
  });
};

module.exports = { getAllProduits, createProduit, deleteProduit, updateProduit };
