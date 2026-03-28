const defautService = require('../services/defautService');

const getDefauts = (req, res) => {
  defautService.getAllDefauts((err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(result);
  });
};

const addDefaut = (req, res) => {
  defautService.createDefaut(req.body, (err, defaut) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(defaut);
  });
};

const removeDefaut = (req, res) => {
  defautService.deleteDefaut(req.params.id, (err) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ success: true });
  });
};

const updateDefaut = (req, res) => {
  defautService.updateDefaut(req.params.id, req.body, (err) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ success: true });
  });
};

module.exports = { getDefauts, addDefaut, removeDefaut, updateDefaut };
