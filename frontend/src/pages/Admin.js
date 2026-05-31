import React, { useEffect, useState } from 'react';
import { getAdminUsers } from '../api/api';

function Admin() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getAdminUsers().then(data => {
      setUsers(data.users || []);
      setLoading(false);
    });
  }, []);

  if (loading) return <div className="loading">טוען...</div>;

  return (
    <div className="admin-page">
      <h2>🛠️ לוח אדמין — כל המשתמשים</h2>
      {users.length === 0 ? (
        <p className="empty">אין משתמשים עדיין</p>
      ) : (
        users.map(user => (
          <div key={user.id} className="admin-user-card">
            <div className="admin-user-header">
              <strong>{user.name}</strong>
              <span>{user.phone}</span>
              <span className="prompt-count">{user.Prompts?.length || 0} שיעורים</span>
            </div>
            {user.Prompts && user.Prompts.length > 0 && (
              <table className="prompts-table">
                <thead>
                  <tr>
                    <th>נושא</th>
                    <th>תאריך</th>
                    <th>תשובה (קצרה)</th>
                  </tr>
                </thead>
                <tbody>
                  {user.Prompts.map(p => (
                    <tr key={p.id}>
                      <td>{p.SubCategory?.name || '-'}</td>
                      <td>{new Date(p.created_at).toLocaleDateString('he-IL')}</td>
                      <td>{p.response?.slice(0, 80)}...</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        ))
      )}
    </div>
  );
}

export default Admin;
