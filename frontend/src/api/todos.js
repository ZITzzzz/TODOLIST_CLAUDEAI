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
  create: (title, { description = '', priority = 'moderate', dueDate = null } = {}) =>
    request(BASE, { method: 'POST', body: JSON.stringify({ title, description, priority, dueDate }) }),
  update: (id, patch) => request(`${BASE}/${id}`, { method: 'PATCH', body: JSON.stringify(patch) }),
  uploadImage: async (id, file) => {
    const form = new FormData();
    form.append('image', file);
    const res = await fetch(`${BASE}/${id}/image`, { method: 'PATCH', body: form });
    const json = await res.json();
    if (!res.ok) throw new Error(json.message || 'Upload failed');
    return json.data;
  },
  remove: (id) => request(`${BASE}/${id}`, { method: 'DELETE' }),
};
