import { useEffect, useState } from 'react';
import { buildApiUrl, normalizeRecords } from '../api';

export default function Teams() {
  const [teams, setTeams] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const controller = new AbortController();

    async function loadTeams() {
      try {
        const response = await fetch(buildApiUrl('teams'), { signal: controller.signal });
        if (!response.ok) {
          throw new Error(`Request failed with ${response.status}`);
        }

        const payload = await response.json();
        setTeams(normalizeRecords(payload));
        setError('');
      } catch (loadError) {
        if (loadError.name !== 'AbortError') {
          setError('Unable to load teams.');
        }
      }
    }

    loadTeams();
    return () => controller.abort();
  }, []);

  return (
    <section>
      <h2>Teams</h2>
      {error ? <div className="alert alert-danger">{error}</div> : null}
      <div className="list-group">
        {teams.map((team) => (
          <div key={team._id || team.id || team.name} className="list-group-item">
            <h5 className="mb-1">{team.name}</h5>
            <p className="mb-1">Sport: {team.sport || 'General fitness'}</p>
            <small>{team.members?.length || 0} members</small>
          </div>
        ))}
      </div>
    </section>
  );
}
