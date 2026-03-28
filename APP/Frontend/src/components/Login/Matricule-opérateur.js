import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../../api';
import './Matricule-opérateur.css';

const Operateur = () => {
  const [matricule, setMatricule] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleMatriculeChange = (e) => {
    const value = e.target.value;
    if (value === '' || /^[0-9]+$/.test(value)) {
      setMatricule(value);
      setError('');
    } else {
      setError('Le matricule doit contenir uniquement des chiffres');
    }
  };

  const handleAjouter = async () => {
    if (!matricule) { setError('Veuillez saisir un matricule'); return; }
    try {
      const data = await api.login(String(matricule).trim());
      if (data.error) { setError('Matricule introuvable dans la base de données'); return; }
      localStorage.setItem('admin', JSON.stringify(data.admin));
      navigate('/dashboard');
    } catch {
      setError('Erreur de connexion au serveur');
    }
  };

  return (
    <div className="operateur-container">
      <h1 className="company-title">MENTOR TUNISIE S.C.S</h1>
      <div className="input-group">
        <label htmlFor="matricule">Matricule opérateur :</label>
        <input
          type="text"
          id="matricule"
          value={matricule}
          onChange={handleMatriculeChange}
        />
      </div>
      {error && <div className="error-message">{error}</div>}
      <div className="buttons">
        <button className="btn-ajouter" onClick={handleAjouter}>Ajouter</button>
        <button className="btn-retour" onClick={() => navigate(-1)}>Retour</button>
      </div>
    </div>
  );
};

export default Operateur;
