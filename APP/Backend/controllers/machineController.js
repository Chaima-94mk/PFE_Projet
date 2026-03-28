const machineService = require('../services/machineService');

const getMachines = (req, res) => {
  machineService.getAllMachines((err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(result);
  });
};

module.exports = { getMachines };
