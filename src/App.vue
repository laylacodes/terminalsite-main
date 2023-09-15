<template>
  <div id="app" v-on:click="focus()" :class="{ 'dark-mode': isDarkMode, 'light-mode': !isDarkMode }">
    <div class="toggle-container">
      <label class="switch">
        <span class="mode-label">{{ isDarkMode ? " " : " " }}</span>
        <input type="checkbox" v-model="isDarkMode" @input="toggleMode" />
        <span class="slider round"></span>
      </label>
    </div>
    
    <Terminal ref="terminal" :is-dark-mode="isDarkMode" />
  </div>
</template>

<script>
import Terminal from './components/Terminal.vue'

export default {
  name: 'app',
  components: {
    Terminal
  },
  data () {
    return {
      isDarkMode: true
    }
  },
  methods: {
    toggleMode () {
      this.isDarkMode = !this.isDarkMode
    },
    focus () {
      this.$refs.terminal.$refs.prompt.focus()
    }
  }
}
</script>

<style>
/* Your global styles here */
@import 'https://fonts.googleapis.com/css?family=Source+Code+Pro';
@import '~reset-css/reset.css';

html,
body {
  margin: 0;
}

#app {
  font-family: 'Source Code Pro', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  font-size: 14px;
  font-weight: bold;
  height: 100%;
  width: 100%;
  line-height: 1.35rem;
}

/* Media Query for Mobile Devices */
@media (max-width: 599px) {
  #app {
    font-size: 2.8vw;
  }
}

@media (min-width: 950px) {
  #app {
    font-size: 2.7vw;
  }
}

/* Media Query for Wider Screens */
@media (min-width: 1000px) {
  #app {
    font-size: 13px;
    padding: 1rem;
  }
}

/* Minimum font size for larger screens */
@media (min-width: 1400px) {
  #app {
    font-size: 14px;
    padding: 1rem;
  }
}
</style>

<style scoped>
:root {
  padding: 0.85rem;
}

.dark-mode  {
  background: #42395D !important;
  color: white;
}

.light-mode  {
  background: #E8E8E8!important;
  color: #26272D;
}

.terminal {
  background-color: var(--background-color);
  color: var(--text-color);
  min-height: 100vh; /* Make the terminal at least 100% viewport height */
  overflow: auto; /* Enable scrolling if content exceeds the viewport */
  padding: 0.85rem; /* Add padding as needed */
}
</style>
