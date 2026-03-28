const loginService = require('../services/loginService');

const login = (req, res) => {
  const matricule = String(req.body.matricule).trim();
  if (!matricule) return res.status(400).json({ error: 'Matricule requis' });
  loginService.loginAdmin(matricule, (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    if (result.length === 0) return res.status(401).json({ error: 'Matricule introuvable' });
    res.json({ success: true, admin: result[0] });
  });
};

module.exports = { login };
