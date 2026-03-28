const operateurService = require('../services/operateurService');

const getOperateurs = (req, res) => {
  operateurService.getAllOperateurs((err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(result);
  });
};

const addOperateur = (req, res) => {
  operateurService.createOperateur(req.body, (err, operateur) => {
    if (err) return res.status(err.message === 'Champs invalides' ? 400 : 500).json({ error: err.message });
    res.json(operateur);
  });
};

const removeOperateur = (req, res) => {
  operateurService.deleteOperateur(req.params.id, (err) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ success: true });
  });
};

const updateOperateur = (req, res) => {
  operateurService.updateOperateur(req.params.id, req.body, (err) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ success: true });
  });
};

module.exports = { getOperateurs, addOperateur, removeOperateur, updateOperateur };
