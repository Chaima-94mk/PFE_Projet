// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom';// Fix 5 : idéalement utiliser dotenv, ici centralisé en constantes
const DB_CONFIG = {
  host: '127.0.0.1',
  port: 3306,
  user: 'root',
  password: 'Chaima@2003',
  database: 'pfe_projet'
};
exports.DB_CONFIG = DB_CONFIG;

