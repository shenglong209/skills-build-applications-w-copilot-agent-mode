import { useEffect, useState } from 'react';
import { buildApiUrl, normalizeRecords } from '../api';

export default function Workouts() {
  const [workouts, setWorkouts] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const controller = new AbortController();

    async function loadWorkouts() {
      try {
        const response = await fetch(buildApiUrl('workouts'), { signal: controller.signal });
        if (!response.ok) {
          throw new Error(`Request failed with ${response.status}`);
        }

        const payload = await response.json();
        setWorkouts(normalizeRecords(payload));
        setError('');
      } catch (loadError) {
        if (loadError.name !== 'AbortError') {
          setError('Unable to load workouts.');
        }
      }
    }

    loadWorkouts();
    return () => controller.abort();
  }, []);

  return (
    <section>
      <h2>Workouts</h2>
      {error ? <div className="alert alert-danger">{error}</div> : null}
      <div className="list-group">
        {workouts.map((workout) => (
          <div key={workout._id || workout.id || workout.title} className="list-group-item">
            <h5 className="mb-1">{workout.title}</h5>
            <p className="mb-1">{workout.type} · {workout.durationMinutes} minutes</p>
            <small>{workout.focus || 'General training'} · {workout.difficulty || 'moderate'}</small>
          </div>
        ))}
      </div>
    </section>
  );
}
