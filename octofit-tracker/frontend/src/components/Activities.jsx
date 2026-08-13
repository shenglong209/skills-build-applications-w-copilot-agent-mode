import { useEffect, useState } from 'react';
import { buildApiUrl, normalizeRecords } from '../api';

export default function Activities() {
  const [activities, setActivities] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const controller = new AbortController();

    async function loadActivities() {
      try {
        const response = await fetch(buildApiUrl('activities'), { signal: controller.signal });
        if (!response.ok) {
          throw new Error(`Request failed with ${response.status}`);
        }

        const payload = await response.json();
        setActivities(normalizeRecords(payload));
        setError('');
      } catch (loadError) {
        if (loadError.name !== 'AbortError') {
          setError('Unable to load activities.');
        }
      }
    }

    loadActivities();
    return () => controller.abort();
  }, []);

  return (
    <section>
      <h2>Activities</h2>
      {error ? <div className="alert alert-danger">{error}</div> : null}
      <div className="list-group">
        {activities.map((activity) => (
          <div key={activity._id || activity.id || `${activity.type}-${activity.date}`} className="list-group-item">
            <h5 className="mb-1">{activity.type}</h5>
            <p className="mb-1">{activity.durationMinutes} minutes</p>
            <small>{activity.date ? new Date(activity.date).toLocaleDateString() : 'No date'} · {activity.distanceKm ? `${activity.distanceKm} km` : 'Distance not logged'}</small>
          </div>
        ))}
      </div>
    </section>
  );
}
