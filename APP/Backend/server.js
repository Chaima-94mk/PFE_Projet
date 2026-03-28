const express = require('express');
const cors = require('cors');
const produitController = require('./controllers/produitController');
const operateurController = require('./controllers/operateurController');
const machineController = require('./controllers/machineController');
const processController = require('./controllers/processController');
const defautController = require('./controllers/defautController');
const loginController = require('./controllers/loginController');

const app = express();
app.use(cors());
app.use(express.json());

// OPERATEURS
app.get('/api/operateurs', operateurController.getOperateurs);
app.post('/api/operateurs', operateurController.addOperateur);
app.put('/api/operateurs/:id', operateurController.updateOperateur);
app.delete('/api/operateurs/:id', operateurController.removeOperateur);

// PRODUITS
app.get('/api/produits', produitController.getProduits);
app.post('/api/produits', produitController.addProduit);
app.put('/api/produits/:id', produitController.updateProduit);
app.delete('/api/produits/:id', produitController.removeProduit);

// MACHINES
app.get('/api/machines', machineController.getMachines);

// PROCESSES
app.get('/api/processes', processController.getProcesses);
app.post('/api/processes', processController.addProcess);
app.put('/api/processes/:id', processController.updateProcess);
app.delete('/api/processes/:id', processController.removeProcess);

// DEFAUTS
app.get('/api/defauts', defautController.getDefauts);
app.post('/api/defauts', defautController.addDefaut);
app.put('/api/defauts/:id', defautController.updateDefaut);
app.delete('/api/defauts/:id', defautController.removeDefaut);

// LOGIN
app.post('/api/login', loginController.login);

app.listen(3001, () => console.log('Server running on port 3001'));
