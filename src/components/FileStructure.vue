<template>
    <div class="file-list">
      <ul>
        <li v-for="file in files" :key="file.path">
          <span v-if="file.isDirectory">📁</span>
          <span v-else>📄</span> {{ file.name }}
        </li>
      </ul>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue';
  import axios from 'axios';
  
  const files = ref([]);
  
  const appPath = defineProps({
    path: String,
  });
  
  onMounted(async () => {
    try {
      const response = await axios.get(`/api/files?path=${appPath}`);
      files.value = response.data;
    } catch (error) {
      console.error('Failed to fetch file structure:', error);
    }
  });
  </script>
  