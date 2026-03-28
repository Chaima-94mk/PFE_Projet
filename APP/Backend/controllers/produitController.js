const produitService = require('../services/produitService');

const getProduits = (req, res) => {
  produitService.getAllProduits((err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(result);
  });
};

const addProduit = (req, res) => {
  produitService.createProduit(req.body, (err, produit) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(produit);
  });
};

const removeProduit = (req, res) => {
  produitService.deleteProduit(req.params.id, (err) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ success: true });
  });
};

const updateProduit = (req, res) => {
  produitService.updateProduit(req.params.id, req.body, (err, updated) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ success: true, ...updated });
  });
};

module.exports = { getProduits, addProduit, removeProduit, updateProduit };
