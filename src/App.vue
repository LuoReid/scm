<script setup lang="ts">
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://vuejs.org/api/sfc-script-setup.html#script-setup  
// export default { }
</script>

<template>
  <p>
    <img alt="Vue logo" src="./assets/logo.png" />
    <router-link to="/">Go to home</router-link>
    <router-link to="/about">Go to About</router-link>
  </p>
  <router-view />
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
