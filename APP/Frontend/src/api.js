const BASE = 'http://localhost:3001/api';

const get = (endpoint) => fetch(`${BASE}/${endpoint}`).then(r => r.json());

const post = (endpoint, body) =>
  fetch(`${BASE}/${endpoint}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  }).then(r => r.json());

const del = (endpoint, id) =>
  fetch(`${BASE}/${endpoint}/${encodeURIComponent(id)}`, { method: 'DELETE' }).then(r => r.json());

const put = (endpoint, id, body) =>
  fetch(`${BASE}/${endpoint}/${encodeURIComponent(id)}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  }).then(r => r.json());

export const api = {
  // Login
  login: (matricule) => post('login', { matricule }),

  // Opérateurs
  getOperateurs: () => get('operateurs'),
  addOperateur: (data) => post('operateurs', data),
  deleteOperateur: (id) => del('operateurs', id),
  updateOperateur: (id, data) => put('operateurs', id, data),

  // Produits
  getProduits: () => get('produits'),
  addProduit: (data) => post('produits', data),
  deleteProduit: (id) => del('produits', id),
  updateProduit: (id, data) => put('produits', id, data),

  // Machines
  getMachines: () => get('machines'),

  // Processes
  getProcesses: () => get('processes'),
  addProcess: (data) => post('processes', data),
  deleteProcess: (id) => del('processes', id),
  updateProcess: (id, data) => put('processes', id, data),

  // Défauts
  getDefauts: () => get('defauts'),
  addDefaut: (data) => post('defauts', data),
  deleteDefaut: (id) => del('defauts', id),
  updateDefaut: (id, data) => put('defauts', id, data),
};
