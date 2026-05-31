import React, { useState } from 'react';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Admin from './pages/Admin';
import './App.css';

function App() {
  const [user, setUser] = useState(null);
  const [page, setPage] = useState('dashboard');

  if (!user) {
    return <Login onLogin={setUser} />;
  }

  return (
    <div className="app">
      <nav className="navbar">
        <h1 className="nav-logo">🎓 Learning Platform</h1>
        <div className="nav-links">
          <button onClick={() => setPage('dashboard')} className={page === 'dashboard' ? 'active' : ''}>לומד</button>
          <button onClick={() => setPage('history')} className={page === 'history' ? 'active' : ''}>היסטוריה</button>
          <button onClick={() => setPage('admin')} className={page === 'admin' ? 'active' : ''}>אדמין</button>
          <button onClick={() => setUser(null)} className="logout">יציאה</button>
        </div>
        <span className="nav-user">שלום, {user.name}</span>
      </nav>

      {(page === 'dashboard' || page === 'history') && (
        <Dashboard user={user} initialPage={page} />
      )}
      {page === 'admin' && <Admin />}
    </div>
  );
}

export default App;
