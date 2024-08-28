import { defineStore } from 'pinia';
import { importApp } from '../api';

export const useAppStore = defineStore('appStore', {
  state: () => ({
    applications: [],
  }),
  actions: {
    async importAppFromGitHub(repoUrl) {
      try {
        const response = await importApp(repoUrl);
        const { path } = response.data;

        const app = {
          id: this.applications.length + 1,
          name: repoUrl.split('/').pop(),
          path,
        };

        this.applications.push(app);
      } catch (error) {
        console.error('Failed to import app:', error);
      }
    },
    getAppById(id) {
      return this.applications.find(app => app.id === parseInt(id));
    }
  }
});
