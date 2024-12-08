<script setup>
import { ref, computed, onMounted } from 'vue'
import tagFilter from '@/components/tagFilter.vue'

const articles = ref([])
const selectedTags = ref([])

onMounted(async () => {
  const articlesResponse = await fetch('/articles/articles.json')
  articles.value = await articlesResponse.json()
})

const filteredArticles = computed(() => {
  if (selectedTags.value.length === 0) {
    return articles.value 
  }
  return articles.value.filter((article) =>
    selectedTags.value.every((tag) => article.tags.includes(tag)),
  )
})

const reversedArticlesList = computed(() => {
  return [...filteredArticles.value].reverse()
})

const handleTagSelection = (tags) => {
  selectedTags.value = tags
}
</script>

<template>
  <div class="tags-page">
    <h1>Filter Articles by Tags</h1>

    <tagFilter @tags-selected="handleTagSelection" />

    <div v-if="filteredArticles.length" class="articles-list">
      <h2>Matching Articles:</h2>
      <ul>
        <li v-for="article in reversedArticlesList" :key="article.file">
          <RouterLink :to="`${article.file.replace('.md', '')}`">{{ article.title }}</RouterLink>
        </li>
      </ul>
    </div>

    <div v-else class="no-articles">
      <p>No articles match the selected tags.</p>
    </div>
  </div>
</template>

<style scoped>
.tags-page {
  padding: 20px;
  max-width: 800px;
  margin: auto;
}

.articles-list {
  margin-top: 20px;
}

.no-articles {
  margin-top: 20px;
  color: gray;
  font-style: italic;
}
ul {
  list-style-type: none;
  padding: 0;
}

li {
  margin-bottom: 10px;
}

RouterLink {
  text-decoration: none;
  color: #007acc;
}

RouterLink:hover {
  text-decoration: underline;
}

h1 {
  margin-bottom: 20px;
}

h2 {
  margin-top: 20px;
}
</style>
