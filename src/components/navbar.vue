<script setup>
import { RouterLink } from 'vue-router'

const toggleDarkMode = () => {
  document.body.classList.toggle('dark-mode')
}
</script>

<template>
  <header class="navbar">
    <div class="navbar-container">
      <div class="logo">
        <RouterLink to="/">
          <img src="/favicon.png" alt="Logo" class="logo-img" />
        </RouterLink>
      </div>

      <nav class="nav-links">
        <RouterLink to="/articles">Articles</RouterLink>
        <RouterLink to="/about">About</RouterLink>
        <RouterLink to="/now">Now</RouterLink>
        <RouterLink to="/contact">Contact</RouterLink>
        <RouterLink to="/tags">Tags</RouterLink>
      </nav>

      <button @click="toggleDarkMode" class="dark-mode-toggle">🌙</button>
    </div>
  </header>
</template>

<style scoped>
.navbar {
  background-color: var(--navbar-bg, #fff);
  color: var(--navbar-text, #000);
  padding: 10px 20px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.navbar-container {
  display: flex;
  align-items: center;
  width: 100%;
  justify-content: space-between;
}

.logo {
  flex-shrink: 0;
}

.logo-img {
  height: 30px;
  width: auto;
}

.nav-links {
  display: flex;
  gap: 15px;
}

.nav-links a {
  text-decoration: none;
  color: inherit;
  font-weight: bold;
}

.dark-mode-toggle {
  border: none;
  background: none;
  cursor: pointer;
  font-size: 1.2rem;
}

@media (max-width: 600px) {
  .nav-links {
    display: none;
  }

  .nav-links {
    display: flex;
    gap: 10px;
  }

  .nav-links > :not(:nth-child(1), :nth-child(2)) {
    display: none;
  }
}
</style>
