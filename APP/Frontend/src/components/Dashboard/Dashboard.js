import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../../api';
import './Dashboard.css';

const TABS = [
  {
    key: 'operateurs',
    label: 'Opérateurs',
    idKey: 'id',
    apiFns: { fetch: api.getOperateurs, add: api.addOperateur, delete: api.deleteOperateur, update: api.updateOperateur },
    fields: [
      { name: 'matricule_operateur', placeholder: 'Matricule' },
      { name: 'nom_operateur', placeholder: 'Nom' },
      { name: 'prenom_operateur', placeholder: 'Prénom' },
    ],
  },
  {
    key: 'produits',
    label: 'Les Produits',
    idKey: 'id',
    apiFns: { fetch: api.getProduits, add: api.addProduit, delete: api.deleteProduit, update: api.updateProduit },
    fields: [
      { name: 'ppa', placeholder: 'PPA', type: 'number' },
      { name: 'matricule_operateur', placeholder: 'Matricule Opérateur', type: 'number' },
      { name: 'code_process', placeholder: 'Code Process', type: 'select-process' },
      { name: 'num_machine', placeholder: 'Numéro Machine', type: 'select-machine' },
      { name: 'quantite', placeholder: 'Quantité', type: 'number' },
      { name: 'etat_produit', placeholder: 'Code Défaut', type: 'select-defaut' },
    ],
    editFields: [
      { name: 'ppa', placeholder: 'PPA', type: 'number' },
      { name: 'matricule_operateur', placeholder: 'Matricule Opérateur', type: 'number' },
      { name: 'code_process', placeholder: 'Code Process', type: 'select-process' },
      { name: 'num_machine', placeholder: 'Numéro Machine', type: 'select-machine' },
      { name: 'quantite', placeholder: 'Quantité', type: 'number' },
      { name: 'etat_produit', placeholder: 'Code Défaut', type: 'select-defaut' },
    ],
  },
  {
    key: 'defauts',
    label: 'Cart Défaut',
    idKey: 'id',
    apiFns: { fetch: api.getDefauts, add: api.addDefaut, delete: api.deleteDefaut, update: api.updateDefaut },
    fields: [
      { name: 'code_defaut', placeholder: 'Code défaut' },
      { name: 'description_defaut', placeholder: 'Description' },
      { name: 'code_process', placeholder: 'Code Process' },
      { name: 'num_machine', placeholder: 'Numéro Machine' },
    ],
  },
  {
    key: 'processes',
    label: 'Les Process',
    idKey: 'id',
    apiFns: { fetch: api.getProcesses, add: api.addProcess, delete: api.deleteProcess, update: api.updateProcess },
    fields: [
      { name: 'code_process', placeholder: 'Code Process' },
      { name: 'nom_process', placeholder: 'Nom Process' },
      { name: 'num_machine', placeholder: 'Numéro Machine' },
    ],
  },
];

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState(TABS[0]);
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [form, setForm] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [editRow, setEditRow] = useState(null);
  const [defautsList, setDefautsList] = useState([]);
  const [processesList, setProcessesList] = useState([]);
  const [machinesList, setMachinesList] = useState([]);
  const admin = JSON.parse(localStorage.getItem('admin') || '{}');

  useEffect(() => {
    api.getDefauts().then(setDefautsList).catch(() => {});
    api.getProcesses().then(setProcessesList).catch(() => {});
    api.getMachines().then(d => { console.log('machines:', d); setMachinesList(d); }).catch(e => console.error('machines error:', e));
  }, []);

  const fetchData = useCallback((tab) => {
    setLoading(true);
    setError('');
    tab.apiFns.fetch()
      .then(rows => { setData(rows); setLoading(false); })
      .catch(() => { setError('Erreur de connexion au serveur'); setLoading(false); });
  }, []);

  useEffect(() => {
    fetchData(activeTab);
    setForm({});
    setEditRow(null);
  }, [activeTab, fetchData]);

  const handleAdd = () => {
    const empty = activeTab.fields.some(f => !form[f.name]);
    if (empty) { setError('Veuillez remplir tous les champs'); return; }

    if (activeTab.key === 'produits') {
      const quantite = parseInt(form.quantite);
      if (!quantite || quantite < 1) { setError('Quantité invalide'); return; }
      const temps = new Date().toISOString().slice(0, 19).replace('T', ' ');
      const body = { ppa: form.ppa, matricule_operateur: form.matricule_operateur, code_process: form.code_process, num_machine: form.num_machine, temps, etat_produit: form.etat_produit };
      Promise.all(Array.from({ length: quantite }, () => api.addProduit(body)))
        .then(() => { fetchData(activeTab); setForm({}); setError(''); })
        .catch(() => setError('Erreur lors de l\'ajout'));
      return;
    }

    activeTab.apiFns.add(form)
      .then(row => {
        if (row.error) { setError(row.error); return; }
        setData(prev => [...prev, row]);
        setForm({});
        setError('');
      })
      .catch(() => setError('Erreur lors de l\'ajout'));
  };

  const handleDelete = (id) => {
    activeTab.apiFns.delete(id)
      .then(() => setData(prev => prev.filter(r => r[activeTab.idKey] !== id)))
      .catch(() => setError('Erreur lors de la suppression'));
  };

  const handleEdit = (row) => {
    setEditRow({ id: row[activeTab.idKey], data: { ...row } });
    setError('');
  };

  const handleUpdate = () => {
    const { id, data: editData } = editRow;
    const allowedFields = (activeTab.editFields || activeTab.fields).map(f => f.name);
    const body = {};
    allowedFields.forEach(k => { body[k] = editData[k]; });
    activeTab.apiFns.update(id, body)
      .then(res => {
        if (res.error) { setError(res.error); return; }
        fetchData(activeTab);
        setEditRow(null);
        setError('');
      })
      .catch(() => setError('Erreur lors de la modification'));
  };

  const renderField = (f, value, onChange) => {
    if (f.type === 'select-defaut') return (
      <select key={f.name} className="db-input" value={value} onChange={onChange}>
        <option value=''>-- Code Défaut --</option>
        {defautsList.map(d => <option key={d.code_defaut} value={d.code_defaut}>{d.code_defaut} - {d.description_defaut}</option>)}
      </select>
    );
    if (f.type === 'select-process') return (
      <select key={f.name} className="db-input" value={value} onChange={onChange}>
        <option value=''>-- Code Process --</option>
        {processesList.map(p => <option key={p.code_process} value={p.code_process}>{p.code_process} - {p.nom_process}</option>)}
      </select>
    );
    if (f.type === 'select-machine') return (
      <select key={f.name} className="db-input" value={value} onChange={onChange}>
        <option value=''>-- Numéro Machine --</option>
        {machinesList.map(m => <option key={m.num_machine} value={m.num_machine}>{m.num_machine}</option>)}
      </select>
    );
    return (
      <input key={f.name} className="db-input" type={f.type || 'text'} placeholder={f.placeholder} value={value} onChange={onChange} />
    );
  };

  const columns = data.length > 0 ? Object.keys(data[0]).filter(col => col !== 'id') : [];

  return (
    <div className="db-wrapper">
      <nav className="db-nav">
        <div className="db-nav-title">MENTOR TUNISIE</div>
        <div className="db-nav-admin">
          <div className="db-admin-avatar">
            {admin.nom ? admin.nom.charAt(0).toUpperCase() : 'A'}
          </div>
          <div>
            <div className="db-admin-name">{admin.nom} {admin.prenom}</div>
            <div className="db-admin-role">Opérateur</div>
          </div>
        </div>
        {TABS.map(tab => (
          <button
            key={tab.key}
            className={`db-nav-btn ${activeTab.key === tab.key ? 'active' : ''}`}
            onClick={() => setActiveTab(tab)}
          >
            {tab.label}
          </button>
        ))}
        <button className="db-logout-btn" onClick={() => { localStorage.removeItem('admin'); navigate('/'); }}>
          ⎋ Déconnexion
        </button>
      </nav>

      <main className="db-main">
        <h2 className="db-section-title">{activeTab.label}</h2>

        {error && <div className="db-error">{error}</div>}

        <div className="db-table-wrapper">
          {loading ? (
            <p className="db-msg">Chargement...</p>
          ) : data.length === 0 ? (
            <p className="db-msg">Aucune donnée disponible.</p>
          ) : (
            <table className="db-table">
              <thead>
                <tr>
                  {columns.map(col => <th key={col}>{col.toUpperCase()}</th>)}
                  <th>ACTION</th>
                </tr>
              </thead>
              <tbody>
                {data.map((row) => (
                  <tr key={row[activeTab.idKey]}>
                    {columns.map(col => <td key={col}>{row[col] ?? '-'}</td>)}
                    <td>
                      <button className="db-delete-btn" onClick={() => handleDelete(row[activeTab.idKey])} title="Supprimer">🗑️</button>
                      <button className="db-edit-btn" onClick={() => handleEdit(row)} title="Modifier">✏️</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        {editRow && (
          <div className="db-form db-edit-form">
            <strong>Modifier :</strong>
            {(activeTab.editFields || activeTab.fields).map(f =>
              renderField(
                f,
                editRow.data[f.name] ?? '',
                e => setEditRow(prev => ({ ...prev, data: { ...prev.data, [f.name]: e.target.value } }))
              )
            )}
            <button className="db-add-btn" onClick={handleUpdate}>✔ Modifier</button>
            <button className="db-delete-btn" onClick={() => setEditRow(null)}>✖ Annuler</button>
          </div>
        )}

        <div className="db-form">
          {activeTab.fields.map(f =>
            renderField(
              f,
              form[f.name] || '',
              e => setForm(prev => ({ ...prev, [f.name]: e.target.value }))
            )
          )}
          <button className="db-add-btn" onClick={handleAdd}>+ Ajouter</button>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
