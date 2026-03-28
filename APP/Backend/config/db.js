const mysql = require('mysql2');

const DB_CONFIG = {
  host: '127.0.0.1',
  port: 3306,
  user: 'root',
  password: 'Chaima@2003',
  database: 'pfe_projet'
};

let db;

function connectDB() {
  db = mysql.createConnection(DB_CONFIG);
  db.connect(err => {
    if (err) { console.error('Erreur connexion MySQL :', err.message); setTimeout(connectDB, 2000); return; }
    console.log('MySQL connecté ✅');
  });
  db.on('error', err => {
    if (err.code === 'PROTOCOL_CONNECTION_LOST') connectDB();
    else throw err;
  });
}

connectDB();

module.exports = { getDB: () => db };
