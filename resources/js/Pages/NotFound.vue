<script setup>
import { useRoute } from 'vue-router'

const route = useRoute()
</script>

<template>
  <div class="not-found">
    <h1>404 - Page Not Found</h1>
    <p>The page you're looking for doesn't exist.</p>
    <p><router-link to="/">Go back to the homepage</router-link></p>
  </div>
</template>

<style scoped>
.not-found {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  text-align: center;
  background-color: #f0f0f0;
  color: #333;
}

h1 {
  font-size: 2.5rem;
  font-weight: bold;
}

p {
  font-size: 1.2rem;
}

router-link {
  color: #007bff;
  text-decoration: none;
}

router-link:hover {
  text-decoration: underline;
}
</style>
