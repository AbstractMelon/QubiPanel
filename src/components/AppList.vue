<template>
    <div>
      <ul class="app-list">
        <li v-for="app in applications" :key="app.id">
          <router-link :to="`/app/${app.id}`">{{ app.name }}</router-link>
        </li>
      </ul>
    </div>
  </template>
  
  <script setup>
  const applications = defineProps({
    applications: Array,
  });
  </script>
  
  <style>
  .app-list {
    list-style: none;
    padding: 0;
    margin: 20px 0;
  }
  
  .app-list li {
    background-color: #f8f9fa;
    margin-bottom: 10px;
    padding: 10px;
    border: 1px solid #dee2e6;
    border-radius: 5px;
  }
  
  .app-list li a {
    text-decoration: none;
    color: #3498db;
    font-weight: bold;
    transition: color 0.3s ease;
  }
  
  .app-list li a:hover {
    color: #2980b9;
  }
  </style>
  