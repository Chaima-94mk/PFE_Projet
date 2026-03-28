import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Operateur from './components/Login/Matricule-opérateur';
import CartDechet from './components/cart-dechet/cart-dechet';
import Dashboard from './components/Dashboard/Dashboard';
import ChoixProcess from './components/choix-process/choix-process';
import IDproduit from './components/ID-produit/id-produit';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Operateur />} />
        <Route path="/operateur" element={<Operateur />} />
        <Route path="/cart-dechet" element={<CartDechet />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/choix-process" element={<ChoixProcess />} />
        <Route path="/id-produit" element={<IDproduit />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);

reportWebVitals();
