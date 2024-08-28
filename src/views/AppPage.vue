<template>
  <div v-if="app">
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
  <div v-else>
    <p>Application not found.</p>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { useAppStore } from '../stores/appStore.js';
import TerminalView from '../components/TerminalView.vue';
import FileStructure from '../components/FileStructure.vue';

const route = useRoute();
const appStore = useAppStore();
const activeTab = ref('terminal');

const app = ref(null);

onMounted(() => {
  console.log(`Route params ID: ${route.params.id}`);
  const appData = appStore.getAppById(route.params.id);
  if (!appData) {
    console.error(`Application with ID ${route.params.id} not found.`);
  } else {
    console.log('Loaded application:', appData);
    app.value = appData;
  }
});
</script>
