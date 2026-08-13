import { useEffect, useState } from 'react';
import { normalizeRecords } from '../api';

const leaderboardEndpoint = import.meta.env.VITE_CODESPACE_NAME
  ? `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/leaderboard/`
  : 'http://localhost:8000/api/leaderboard/';

export default function Leaderboard() {
  const [entries, setEntries] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const controller = new AbortController();

    async function loadLeaderboard() {
      try {
        const response = await fetch(leaderboardEndpoint, { signal: controller.signal });
        if (!response.ok) {
          throw new Error(`Request failed with ${response.status}`);
        }

        const payload = await response.json();
        setEntries(normalizeRecords(payload));
        setError('');
      } catch (loadError) {
        if (loadError.name !== 'AbortError') {
          setError('Unable to load leaderboard.');
        }
      }
    }

    loadLeaderboard();
    return () => controller.abort();
  }, []);

  return (
    <section>
      <h2>Leaderboard</h2>
      {error ? <div className="alert alert-danger">{error}</div> : null}
      <div className="list-group">
        {entries.map((entry) => (
          <div key={entry._id || entry.id || entry.name} className="list-group-item d-flex justify-content-between align-items-center">
            <div>
              <h5 className="mb-1">#{entry.rank || 1} · {entry.name}</h5>
              <small>{entry.teamName || 'No team'}</small>
            </div>
            <span className="badge bg-primary rounded-pill">{entry.points || 0}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
