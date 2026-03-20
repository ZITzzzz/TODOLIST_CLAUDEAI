const BASE = '/api/todos';

async function request(url, options = {}) {
  const res = await fetch(url, {
    headers: { 'Content-Type': 'application/json' },
    ...options,
  });
  const json = await res.json();
  if (!res.ok) throw new Error(json.message || 'Request failed');
  return json.data;
}

export const todosApi = {
  getAll: () => request(BASE),
  create: (title) => request(BASE, { method: 'POST', body: JSON.stringify({ title }) }),
  update: (id, patch) => request(`${BASE}/${id}`, { method: 'PATCH', body: JSON.stringify(patch) }),
  remove: (id) => request(`${BASE}/${id}`, { method: 'DELETE' }),
};
