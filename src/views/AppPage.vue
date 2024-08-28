<template>
    <div>
      <h2>{{ app.name }}</h2>
      <div>
        <button @click="activeTab = 'terminal'">Terminal</button>
        <button @click="activeTab = 'files'">File Structure</button>
      </div>
      <div v-if="activeTab === 'terminal'">
        <TerminalView :app="app" />
      </div>
      <div v-else>
        <FileStructure :files="app.files" />
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  import { useRoute } from 'vue-router';
  import { useAppStore } from '../stores/appStore.js';
  import TerminalView from '../components/TerminalView.vue';
  import FileStructure from '../components/FileStructure.vue';
  
  const route = useRoute();
  const appStore = useAppStore();
  const activeTab = ref('terminal');
  const app = ref(appStore.getAppById(route.params.id));
  </script>
  