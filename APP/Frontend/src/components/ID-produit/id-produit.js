import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../../api';

const IDproduit = () => {
  const [idProduit, setIdProduit] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleValider = async () => {
    if (!idProduit) { setError('Veuillez saisir un ID produit'); return; }
    try {
      const produits = await api.getProduits();
      const found = produits.find(p => String(p.id_produit) === String(idProduit));
      if (!found) { setError('ID produit introuvable'); return; }
      navigate('/cart-dechet', { state: { produit: found } });
    } catch {
      setError('Erreur de connexion au serveur');
    }
  };

  return (
    <div style={{ display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', minHeight:'100vh', background:'#1565c0', gap:'24px' }}>
      <h1 style={{ color:'white', fontSize:'36px', fontWeight:'700' }}>MENTOR TUNISIE S.C.S</h1>
      <div style={{ display:'flex', flexDirection:'column', gap:'10px' }}>
        <label style={{ color:'white', fontWeight:'600' }}>ID Produit :</label>
        <input
          type="text"
          value={idProduit}
          onChange={e => { setIdProduit(e.target.value); setError(''); }}
          placeholder="Entrer ID produit"
          style={{ padding:'12px 16px', border:'2px solid white', borderRadius:'8px', fontSize:'15px', minWidth:'240px' }}
        />
      </div>
      {error && <div style={{ color:'#ffcdd2', fontSize:'14px' }}>{error}</div>}
      <div style={{ display:'flex', gap:'16px' }}>
        <button onClick={handleValider} style={{ padding:'12px 36px', background:'white', color:'#1565c0', border:'none', borderRadius:'8px', fontSize:'15px', fontWeight:'700', cursor:'pointer' }}>
          Valider
        </button>
        <button onClick={() => window.history.back()} style={{ padding:'12px 36px', background:'transparent', color:'white', border:'2px solid white', borderRadius:'8px', fontSize:'15px', cursor:'pointer' }}>
          Retour
        </button>
      </div>
    </div>
  );
};

export default IDproduit;
