import { useEffect, useState } from 'react';
import { buildApiUrl, normalizeRecords } from '../api';

export default function Users() {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const controller = new AbortController();

    async function loadUsers() {
      try {
        const response = await fetch(buildApiUrl('users'), { signal: controller.signal });
        if (!response.ok) {
          throw new Error(`Request failed with ${response.status}`);
        }

        const payload = await response.json();
        setUsers(normalizeRecords(payload));
        setError('');
      } catch (loadError) {
        if (loadError.name !== 'AbortError') {
          setError('Unable to load users.');
        }
      }
    }

    loadUsers();
    return () => controller.abort();
  }, []);

  return (
    <section>
      <h2>Users</h2>
      {error ? <div className="alert alert-danger">{error}</div> : null}
      <div className="list-group">
        {users.map((user) => (
          <div key={user._id || user.id || user.email} className="list-group-item">
            <h5 className="mb-1">{user.name}</h5>
            <p className="mb-1">{user.email}</p>
            <small>{user.fitnessLevel || 'active'} · {user.goals?.join(', ') || 'No goals set'}</small>
          </div>
        ))}
      </div>
    </section>
  );
}
