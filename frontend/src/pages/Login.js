import React, { useState } from 'react';
import { loginUser } from '../api/api';

function Login({ onLogin }) {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim()) {
      setError('נא למלא שם ומספר טלפון');
      return;
    }
    setLoading(true);
    setError('');
    try {
      const data = await loginUser(name, phone);
      if (data.user) {
        onLogin(data.user);
      } else {
        setError(data.error || 'שגיאה בהתחברות');
      }
    } catch {
      setError('לא ניתן להתחבר לשרת');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
      <div className="login-card">
        <h1>🎓 Learning Platform</h1>
        <p>פלטפורמת למידה מבוססת AI</p>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="שם מלא"
            value={name}
            onChange={e => setName(e.target.value)}
          />
          <input
            type="tel"
            placeholder="מספר טלפון"
            value={phone}
            onChange={e => setPhone(e.target.value)}
          />
          {error && <p className="error">{error}</p>}
          <button type="submit" disabled={loading}>
            {loading ? 'מתחבר...' : 'כניסה / הרשמה'}
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
