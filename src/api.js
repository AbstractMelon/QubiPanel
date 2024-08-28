import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000/api',
});

export const importApp = (repoUrl) => api.post('/apps/import', { repoUrl });
