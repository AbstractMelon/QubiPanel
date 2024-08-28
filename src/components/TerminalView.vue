<template>
    <div>
      <div ref="terminal" class="terminal"></div>
      <input
        v-model="command"
        @keyup.enter="runCommand"
        placeholder="Enter command"
        class="command-input"
      />
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue';
  import { Terminal } from 'xterm';
  import 'xterm/css/xterm.css';
  import axios from 'axios';
  
  const terminal = ref(null);
  const term = new Terminal();
  const command = ref('');
  
  const appPath = defineProps({
    path: String,
  });
  
  onMounted(() => {
    term.open(terminal.value);
  });
  
  const runCommand = async () => {
    if (command.value.trim() === '') return;
  
    try {
      const response = await axios.post('/api/terminal', { path: appPath, command: command.value });
      term.write(response.data.output + '\r\n');
      command.value = '';
    } catch (error) {
      console.error('Failed to execute command:', error);
    }
  };
  </script>
  
  <style>
  .terminal {
    height: 300px;
    margin-bottom: 10px;
    padding: 10px;
    border: 1px solid #ccc;
    background-color: #1e1e1e;
    color: #ffffff;
    border-radius: 5px;
    overflow-y: auto;
  }
  
  .command-input {
    width: 100%;
    padding: 10px;
    font-size: 1em;
    border: 1px solid #ccc;
    border-radius: 5px;
  }
  </style>
  