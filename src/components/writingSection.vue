<script setup>
import { ref, onMounted, computed } from 'vue'

const articles = ref([])

onMounted(async () => {
  const response = await fetch('/articles/articles.json')
  articles.value = await response.json()
})

const reversedArticlesList = computed(() => {
  return [...articles.value].reverse()
})
</script>

<template>
  <div>
    <h1>Articles</h1>
    <ul>
      <li v-for="article in reversedArticlesList" :key="article.file">
        <RouterLink :to="`${article.file.replace('.md','')}`">{{ article.title }}</RouterLink>
      </li>
    </ul>
  </div>
</template>

<style scoped>
ul {
  list-style-type: none;
}
</style>
