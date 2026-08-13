const getCodespaceName = () => import.meta.env.VITE_CODESPACE_NAME?.trim();

export function getApiBaseUrl() {
  const codespaceName = getCodespaceName();
  return codespaceName
    ? `https://${codespaceName}-8000.app.github.dev`
    : 'http://localhost:8000';
}

export function buildApiUrl(resource) {
  const safeResource = String(resource || '').replace(/^\/+|\/+$/g, '');
  return `${getApiBaseUrl()}/api/${safeResource}/`;
}

export function normalizeRecords(payload) {
  if (Array.isArray(payload)) {
    return payload;
  }

  if (!payload || typeof payload !== 'object') {
    return [];
  }

  const candidates = [
    payload.users,
    payload.teams,
    payload.activities,
    payload.leaderboard,
    payload.workouts,
    payload.items,
    payload.results,
    payload.data,
  ];

  for (const candidate of candidates) {
    if (Array.isArray(candidate)) {
      return candidate;
    }
  }

  for (const value of Object.values(payload)) {
    if (Array.isArray(value)) {
      return value;
    }
  }

  return [];
}
