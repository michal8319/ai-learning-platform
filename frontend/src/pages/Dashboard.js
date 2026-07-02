import React, { useState, useEffect } from 'react';
import { getCategories, getSubCategories, generateLesson, getHistory } from '../api/api';

function Dashboard({ user, initialPage }) {
  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedSubCategory, setSelectedSubCategory] = useState('');
  const [lesson, setLesson] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [history, setHistory] = useState([]);
  const [page, setPage] = useState(initialPage || 'dashboard');

  useEffect(() => {
    getCategories().then(data => setCategories(data.categories || []));
  }, []);

  useEffect(() => {
    if (page === 'history') {
      getHistory(user.id).then(data => setHistory(data.history || []));
    }
  }, [page, user.id]);

  const handleCategoryChange = async (e) => {
    const catId = e.target.value;
    setSelectedCategory(catId);
    setSelectedSubCategory('');
    setSubCategories([]);
    if (catId) {
      const data = await getSubCategories(catId);
      setSubCategories(data.subCategories || []);
    }
  };

  const handleGenerate = async () => {
    if (!selectedCategory || !selectedSubCategory) {
      setError('נא לבחור קטגוריה ותת-קטגוריה');
      return;
    }
    setLoading(true);
    setLesson('');
    setError('');
    try {
      const data = await generateLesson(user.id, Number(selectedCategory), Number(selectedSubCategory));
      if (data.success) {
        setLesson(data.data);
      } else {
        setError(data.error || 'שגיאה בקבלת שיעור');
      }
    } catch {
      setError('שגיאה בתקשורת עם השרת');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="dashboard">
      <div className="tabs">
        <button onClick={() => setPage('dashboard')} className={page === 'dashboard' ? 'tab active' : 'tab'}>לומד</button>
        <button onClick={() => setPage('history')} className={page === 'history' ? 'tab active' : 'tab'}>היסטוריה</button>
      </div>

      {page === 'dashboard' && (
        <div className="learn-section">
          <h2>מה תרצה ללמוד היום?</h2>
          <div className="selectors">
            <select value={selectedCategory} onChange={handleCategoryChange}>
              <option value="">בחר קטגוריה</option>
              {categories.map(cat => (
                <option key={cat.id} value={cat.id}>{cat.name}</option>
              ))}
            </select>

            <select
              value={selectedSubCategory}
              onChange={e => setSelectedSubCategory(e.target.value)}
              disabled={!subCategories.length}
            >
              <option value="">בחר נושא</option>
              {subCategories.map(sub => (
                <option key={sub.id} value={sub.id}>{sub.name}</option>
              ))}
            </select>
          </div>

          {error && <p className="error">{error}</p>}

          <button className="generate-btn" onClick={handleGenerate} disabled={loading}>
            {loading ? '⏳ מייצר שיעור...' : '✨ צור שיעור'}
          </button>

          {lesson && (
            <div className="lesson-box">
              <h3>השיעור שלך:</h3>
              <p>{lesson}</p>
            </div>
          )}
        </div>
      )}

      {page === 'history' && (
        <div className="history-section">
          <h2>היסטוריית למידה</h2>
          {history.length === 0 ? (
            <p className="empty">עדיין אין שיעורים. לך ללמוד!</p>
          ) : (
            history.map(item => (
              <div key={item.id} className="history-card">
                <div className="history-header">
                  <span className="topic">📚 {item.SubCategory?.name}</span>
                  <span className="date">{new Date(item.created_at).toLocaleDateString('he-IL')}</span>
                </div>
                <p className="history-response">{item.response?.slice(0, 200)}...</p>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}

export default Dashboard;
