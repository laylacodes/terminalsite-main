<template>
  <div id="app" v-on:click="focus()">
    <Terminal ref="terminal" />
  </div>
</template>

<script>
import Terminal from './components/Terminal.vue'

export default {
  name: 'app',
  components: {
    Terminal
  },
  methods: {
    focus: function () {
      // is that good practice?
      this.$refs.terminal.$refs.prompt.focus()
    }
  }
}
</script>

<style>
@import 'https://fonts.googleapis.com/css?family=Source+Code+Pro';
@import '~reset-css/reset.css';

html, body {
  height: 100%;
  margin: 0;
}

#app {
  font-family: 'Source Code Pro', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  background: #42395D;
  font-size: 14px; /* Adjust font size relative to viewport height */
  font-weight: bold;
  height: 100%;
  width: 100%;/* Adjust line height relative to font size */
  line-height: 1.35rem; /* Adjust padding relative to viewport height */
}

/* Media Query for Mobile Devices */
@media (max-width: 599px) {
  #app {
    font-size: 2.7vw; /* Adjust font size for mobile */
  }
}
@media (min-width: 950px) {
  #app {
    font-size: 2.7vw; /* Adjust font size for wider screens */ /* Adjust padding for wider screens */
  }
}

/* Media Query for Wider Screens */
@media (min-width: 1000px) {
  #app {
    font-size: 15px;
    padding: 1rem; /* Adjust font size for wider screens */
 /* Adjust padding for wider screens */
  }
}
  /* Minimum font size for larger screens */
  @media (min-width: 1400px) {
    #app {
      font-size: 17px;
      padding: 1rem;
 /* Set a minimum font size for larger screens */
    }
  }
</style>
