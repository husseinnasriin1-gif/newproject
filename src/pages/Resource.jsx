import React, { useState, useEffect } from 'react';

const CATEGORIES = [
  { key: 'Robotics', label: 'Robotics', icon: '🤖', accent: '#FB4444', desc: 'Building and programming robots to perform tasks automatically' },
  { key: 'Virtual Reality', label: 'Virtual Reality', icon: '🕶️', accent: '#7C5CFC', desc: 'Immersive digital environments you can explore and interact with in real time' },
  { key: '3D Gaming and animation', label: '3D Gaming & Animation', icon: '🎮', accent: '#00B4A6', desc: 'Interactive games and life-like animation using 3-dimensional digital models' },
  { key: 'Artificial Intelligence', label: 'Artificial Intelligence', icon: '🧠', accent: '#2E7DFB', desc: 'How machines learn to reason, predict, and make decisions' },
  { key: 'Software development', label: 'Software Development', icon: '💻', accent: '#F5A623', desc: 'Designing, building, and maintaining computer programs and applications' },
];

const BACKEND_URL = 'http://localhost:8080';
// authRoutes is mounted at app.use("/", authRoutes) in server.js, so the real path is just "/login"
const LOGIN_URL = `${BACKEND_URL}/api/students/login`;

function Resource() {
  const [resourcesByCategory, setResourcesByCategory] = useState({});
  const [isLoadingResources, setIsLoadingResources] = useState(true);
  const [token, setToken] = useState(() => localStorage.getItem('studentToken') || null);

  // Login modal state — only shown when a guest clicks a locked download
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [pendingItem, setPendingItem] = useState(null); // item they tried to download
  const [admissionNumber, setAdmissionNumber] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  const fetchResources = async (authToken) => {
    setIsLoadingResources(true);
    await Promise.all(
      CATEGORIES.map(async (cat) => {
        try {
          const headers = authToken ? { Authorization: `Bearer ${authToken}` } : {};
          const res = await fetch(
            `${BACKEND_URL}/api/resources/category/${encodeURIComponent(cat.key)}`,
            { method: 'GET', headers }
          );
          // Backend always returns 200 now (masked data for guests), so this
          // should basically never throw — but guard anyway.
          if (!res.ok) throw new Error('Failed to load resources');
          const data = await res.json();
          setResourcesByCategory((prev) => ({ ...prev, [cat.key]: data }));
        } catch (err) {
          console.error(`Could not fetch ${cat.key}:`, err);
        }
      })
    );
    setIsLoadingResources(false);
  };

  // Always load resources on mount — no login gate
  useEffect(() => {
    fetchResources(token);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleDownloadClick = (item) => {
    if (item.file_url === '#') {
      // Locked item — prompt login instead of navigating
      setPendingItem(item);
      setLoginError('');
      setShowLoginModal(true);
      return;
    }
    // Real link — let the browser handle the download via the <a> wrapper
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoginError('');
    setIsLoggingIn(true);

    try {
      const res = await fetch(LOGIN_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ admissionNumber, password }),
      });

      const contentType = res.headers.get('content-type');
      if (!contentType || !contentType.includes('application/json')) {
        throw new Error('Unexpected response from server.');
      }

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || data.message || 'Invalid login details');
      }

      localStorage.setItem('studentToken', data.token);
      setToken(data.token);
      await fetchResources(data.token);

      setShowLoginModal(false);
      setAdmissionNumber('');
      setPassword('');

      // If they had a specific item queued up, try to open it now that
      // resourcesByCategory should contain the real file_url.
      if (pendingItem) {
        setTimeout(() => {
          const updated = document.getElementById(`download-${pendingItem.id}`);
          if (updated) updated.click();
        }, 0);
        setPendingItem(null);
      }
    } catch (err) {
      setLoginError(err.message);
    } finally {
      setIsLoggingIn(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('studentToken');
    setToken(null);
    fetchResources(null);
  };

  return (
    <div className="resource" style={{ padding: '48px 16px', fontFamily: "'Inter', Arial, sans-serif", background: '#FAFAF9', minHeight: '100vh', maxWidth: '100vw' }}>
      <style>{`
        .resource, .resource *, .resource *::before, .resource *::after {
          box-sizing: border-box;
        }
        .resource {
          width: 100%;
          overflow-x: hidden;
        }
        .resource-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 28px;
          width: 100%;
          max-width: 1400px;
          margin: 0 auto;
        }
        .resource-card {
          padding: 36px 40px;
        }
        .resource-card {
          background: #fff;
          border-radius: 16px;
          border: 1px solid #ECECEA;
          padding: 24px 20px;
          box-shadow: 0 2px 8px rgba(20, 20, 20, 0.04);
          transition: transform 0.18s ease, box-shadow 0.18s ease;
          position: relative;
          overflow: hidden;
          width: 100%;
          min-width: 0;
        }
        @media (max-width: 640px) {
          .resource-grid {
            grid-template-columns: 1fr;
          }
        }
        .resource-card::before {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 4px;
          background: var(--accent);
        }
        .resource-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 10px 24px rgba(20, 20, 20, 0.09);
        }
        .resource-icon {
          font-size: 28px;
          width: 52px;
          height: 52px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 12px;
          background: color-mix(in srgb, var(--accent) 14%, white);
          margin-bottom: 16px;
        }
        .resource-card h2 {
          font-size: 19px;
          font-weight: 700;
          color: #1A1A1A;
          margin-bottom: 8px;
        }
        .resource-card p.desc {
          font-size: 14.5px;
          color: #6B6B6B;
          line-height: 1.55;
          margin-bottom: 18px;
          min-height: 44px;
        }
        .resource-empty {
          font-size: 13px;
          color: #B0B0AE;
          font-style: italic;
        }
        .resource-download-btn {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          width: 100%;
          justify-content: center;
          padding: 10px 16px;
          margin-top: 6px;
          border-radius: 8px;
          border: none;
          font-size: 14px;
          font-weight: 600;
          cursor: pointer;
          background: var(--accent);
          color: #fff;
          transition: filter 0.15s ease;
        }
        .resource-download-btn:hover {
          filter: brightness(0.92);
        }
        .resource-download-btn.locked {
          background: #F2F2F0;
          color: #4A4A4A;
        }
        .resource-download-btn.locked:hover {
          filter: brightness(0.97);
        }
        .resource-header {
          max-width: 1200px;
          margin: 0 auto 32px auto;
          display: flex;
          justify-content: flex-end;
        }
      `}</style>

      {token && (
        <div className="resource-header">
          <button
            onClick={handleLogout}
            style={{
              backgroundColor: '#dc3545',
              color: 'white',
              border: 'none',
              padding: '8px 14px',
              borderRadius: '8px',
              cursor: 'pointer',
              fontWeight: 'bold',
              fontSize: '14px',
            }}
          >
            Log Out
          </button>
        </div>
      )}

      {isLoadingResources && <p style={{ opacity: 0.6, textAlign: 'center' }}>Loading resources…</p>}

      <div className="resource-grid">
        {CATEGORIES.map((cat) => {
          const items = resourcesByCategory[cat.key] || [];
          return (
            <div className="resource-card" key={cat.key} style={{ '--accent': cat.accent }}>
              <div className="resource-icon">{cat.icon}</div>
              <h2>{cat.label}</h2>
              <p className="desc">{cat.desc}</p>
              {!isLoadingResources && items.length === 0 ? (
                <p className="resource-empty">No resources yet — check back soon</p>
              ) : (
                items.map((item) => {
                  const isLocked = item.file_url === '#';
                  return isLocked ? (
                    <button
                      key={item.id}
                      onClick={() => handleDownloadClick(item)}
                      className="resource-download-btn locked"
                    >
                      🔒 {item.title}
                    </button>
                  ) : (
                    <a
                      key={item.id}
                      href={item.file_url.startsWith('http') ? item.file_url : `${BACKEND_URL}${item.file_url}`}
                      download
                      id={`download-${item.id}`}
                      style={{ textDecoration: 'none' }}
                    >
                      <button className="resource-download-btn">⬇ {item.title}</button>
                    </a>
                  );
                })
              )}
            </div>
          );
        })}
      </div>

      {/* Login modal — only appears when a guest tries to download a locked item */}
      {showLoginModal && (
        <div
          style={{
            position: 'fixed',
            top: 0, left: 0, right: 0, bottom: 0,
            backgroundColor: 'rgba(0,0,0,0.5)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000,
          }}
          onClick={() => setShowLoginModal(false)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              background: '#fff',
              padding: '30px',
              borderRadius: '8px',
              maxWidth: '360px',
              width: '90%',
            }}
          >
            <h2 style={{ textAlign: 'center', color: '#2c3e50', marginBottom: '8px' }}>🔒 Student Login Required</h2>
            <p style={{ textAlign: 'center', color: '#666', fontSize: '0.9em', marginBottom: '16px' }}>
              Log in with your student account to download{pendingItem ? ` "${pendingItem.title}"` : ' this resource'}.
            </p>

            {loginError && (
              <p style={{ color: 'red', fontSize: '0.9em', fontWeight: 'bold', textAlign: 'center' }}>
                ⚠️ {loginError}
              </p>
            )}

            <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <input
                type="text"
                placeholder="Admission Number"
                value={admissionNumber}
                onChange={(e) => setAdmissionNumber(e.target.value)}
                required
                style={{ padding: '10px', borderRadius: '4px', border: '1px solid #ccc' }}
              />
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                style={{ padding: '10px', borderRadius: '4px', border: '1px solid #ccc' }}
              />
              <button
                type="submit"
                disabled={isLoggingIn}
                style={{
                  padding: '10px',
                  backgroundColor: '#007bff',
                  color: 'white',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer',
                  fontWeight: 'bold',
                  opacity: isLoggingIn ? 0.7 : 1,
                }}
              >
                {isLoggingIn ? 'Logging in…' : 'Log In'}
              </button>
              <button
                type="button"
                onClick={() => setShowLoginModal(false)}
                style={{
                  padding: '8px',
                  background: 'transparent',
                  border: 'none',
                  color: '#666',
                  cursor: 'pointer',
                }}
              >
                Cancel
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default Resource;