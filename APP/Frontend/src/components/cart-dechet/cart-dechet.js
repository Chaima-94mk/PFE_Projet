import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { api } from '../../api';

const CartDechet = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const produit = location.state?.produit || null;

  const [processes, setProcesses] = useState([]);
  const [machines, setMachines] = useState([]);
  const [defauts, setDefauts] = useState([]);
  const [codeProcess, setCodeProcess] = useState(produit?.code_process || '');
  const [numMachine, setNumMachine] = useState(produit?.num_machine || '');
  const [codeDefaut, setCodeDefaut] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    api.getProcesses().then(setProcesses).catch(() => {});
    api.getMachines().then(setMachines).catch(() => {});
    api.getDefauts().then(setDefauts).catch(() => {});
  }, []);

  const handleSubmit = async () => {
    if (!codeProcess || !numMachine || !codeDefaut) {
      setError('Veuillez remplir tous les champs');
      return;
    }
    setError('');
    try {
      const body = {
        code_defaut: codeDefaut,
        code_process: codeProcess,
        num_machine: numMachine,
        ...(produit ? { id_produit: produit.id_produit } : {}),
      };
      const result = await api.addDefaut(body);
      if (result.error) { setError(result.error); return; }
      setSuccess('Défaut enregistré avec succès');
      setCodeDefaut('');
    } catch {
      setError('Erreur lors de l\'enregistrement');
    }
  };

  const selectStyle = {
    padding: '12px 16px', border: '2px solid white', borderRadius: '8px',
    fontSize: '15px', minWidth: '260px', background: 'white', color: '#1565c0', cursor: 'pointer'
  };

  return (
    <div style={{ display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', minHeight:'100vh', background:'#1565c0', gap:'20px' }}>
      <h1 style={{ color:'white', fontSize:'36px', fontWeight:'700' }}>MENTOR TUNISIE S.C.S</h1>
      <h2 style={{ color:'white', fontWeight:'400' }}>Cart Déchet</h2>

      {produit && (
        <div style={{ color:'white', fontSize:'14px', opacity:0.85 }}>
          Produit : <strong>{produit.id_produit}</strong> — PPA : <strong>{produit.ppa}</strong>
        </div>
      )}

      <div style={{ display:'flex', flexDirection:'column', gap:'16px', width:'300px' }}>

        <div style={{ display:'flex', flexDirection:'column', gap:'6px' }}>
          <label style={{ color:'white', fontWeight:'600' }}>Code Process :</label>
          <select value={codeProcess} onChange={e => setCodeProcess(e.target.value)} style={selectStyle}>
            <option value=''>-- Sélectionner --</option>
            {processes.map(p => (
              <option key={p.code_process} value={p.code_process}>
                {p.code_process} - {p.nom_process}
              </option>
            ))}
          </select>
        </div>

        <div style={{ display:'flex', flexDirection:'column', gap:'6px' }}>
          <label style={{ color:'white', fontWeight:'600' }}>Numéro Machine :</label>
          <select value={numMachine} onChange={e => setNumMachine(e.target.value)} style={selectStyle}>
            <option value=''>-- Sélectionner --</option>
            {machines.map(m => (
              <option key={m.num_machine} value={m.num_machine}>
                {m.num_machine} - {m.nom_machine}
              </option>
            ))}
          </select>
        </div>

        <div style={{ display:'flex', flexDirection:'column', gap:'6px' }}>
          <label style={{ color:'white', fontWeight:'600' }}>Code Défaut :</label>
          <select value={codeDefaut} onChange={e => setCodeDefaut(e.target.value)} style={selectStyle}>
            <option value=''>-- Sélectionner --</option>
            {defauts.map(d => (
              <option key={d.code_defaut} value={d.code_defaut}>
                {d.code_defaut} - {d.description_defaut}
              </option>
            ))}
          </select>
        </div>

      </div>

      {error && <div style={{ color:'#ffcdd2', fontSize:'14px' }}>{error}</div>}
      {success && <div style={{ color:'#c8e6c9', fontSize:'14px' }}>{success}</div>}

      <div style={{ display:'flex', gap:'16px' }}>
        <button onClick={handleSubmit} style={{ padding:'12px 36px', background:'white', color:'#1565c0', border:'none', borderRadius:'8px', fontSize:'15px', fontWeight:'700', cursor:'pointer' }}>
          Valider
        </button>
        <button onClick={() => navigate(-1)} style={{ padding:'12px 36px', background:'transparent', color:'white', border:'2px solid white', borderRadius:'8px', fontSize:'15px', cursor:'pointer' }}>
          Retour
        </button>
        <button onClick={() => navigate('/dashboard')} style={{ padding:'12px 36px', background:'white', color:'#1565c0', border:'none', borderRadius:'8px', fontSize:'15px', fontWeight:'700', cursor:'pointer' }}>
          Dashboard
        </button>
      </div>
    </div>
  );
};

export default CartDechet;
