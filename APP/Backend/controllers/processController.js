const processService = require('../services/processService');

const getProcesses = (req, res) => {
  processService.getAllProcesses((err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(result);
  });
};

const addProcess = (req, res) => {
  processService.createProcess(req.body, (err, process) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(process);
  });
};

const removeProcess = (req, res) => {
  processService.deleteProcess(req.params.id, (err) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ success: true });
  });
};

const updateProcess = (req, res) => {
  processService.updateProcess(req.params.id, req.body, (err) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ success: true });
  });
};

module.exports = { getProcesses, addProcess, removeProcess, updateProcess };
