import React from 'react';
import { useNavigate } from 'react-router-dom';

const ChoixProcess = () => {
  const navigate = useNavigate();
  return (
    <div style={{ display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', minHeight:'100vh', background:'#1565c0', gap:'30px' }}>
      <h1 style={{ color:'white', fontSize:'42px', fontWeight:'700', letterSpacing:'2px' }}>MENTOR TUNISIE S.C.S</h1>
      <button onClick={() => navigate('/operateur')}
        style={{ padding:'14px 48px', background:'white', color:'#1565c0', border:'none', borderRadius:'8px', fontSize:'16px', fontWeight:'700', cursor:'pointer' }}>
        Commencer
      </button>
    </div>
  );
};

export default ChoixProcess;
