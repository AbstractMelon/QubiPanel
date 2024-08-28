import { defineStore } from 'pinia';
import { importApp } from '../api';

export const useAppStore = defineStore('appStore', {
  state: () => ({
    applications: [],
  }),
  actions: {
    // Import application from GitHub and add it to the applications list
    async importAppFromGitHub(repoUrl) {
      try {
        console.log(`Starting import for repo: ${repoUrl}`);
        
        const response = await importApp(repoUrl);
        console.log('API response received:', response.data);

        // Destructure response to get the path
        const { path } = response.data;

        // Check if path is defined
        if (!path) {
          console.error('Path not returned from API:', response.data);
          throw new Error('Path not returned from the API');
        }

        // Create a new application object
        const app = {
          id: this.applications.length + 1,
          name: repoUrl.split('/').pop(), // Extract repo name from URL
          path, // Assign the path returned by the API
        };

        // Add the application to the list
        this.applications.push(app);
        console.log('Application successfully imported and added:', app);
      } catch (error) {
        console.error('Failed to import app:', error);
      }
    },

    // Get application by ID
    getAppById(id) {
      const app = this.applications.find(app => app.id === parseInt(id));
      if (!app) {
        console.error(`No application found with ID: ${id}`);
      } else {
        console.log(`Application found:`, app);
      }
      return app;
    },
  },
});
