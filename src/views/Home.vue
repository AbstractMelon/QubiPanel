<template>
    <div class="container">
      <h1>Application Manager</h1>
      <form @submit.prevent="importAppFromGitHub" class="import-form">
        <input
          v-model="repoUrl"
          type="url"
          placeholder="Enter GitHub Repo URL"
          required
        />
        <button type="submit">Import</button>
      </form>
      <AppList :applications="applications" />
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  import { useAppStore } from '../stores/appStore';
  import AppList from '../components/AppList.vue';
  
  const repoUrl = ref('');
  const appStore = useAppStore();
  const applications = appStore.applications;
  
  const importAppFromGitHub = async () => {
    await appStore.importAppFromGitHub(repoUrl.value);
    repoUrl.value = '';
  };
  </script>
  