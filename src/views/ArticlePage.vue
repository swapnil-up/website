<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const articleContent = ref('')

onMounted(async () => {
  const filename = route.params.filename
  const response = await fetch(`../../articles/${filename}`)
  if (response.ok) {
    const text = await response.text()
    articleContent.value = text
  } else {
    articleContent.value = 'Article not found.'
  }
})

</script>

<template>
  <div class="article-page">
    <h1>{{ route.params.filename }}</h1>
    <div v-html="articleContent"></div>
  </div>
  <div class="navigation">
    <RouterLink :to="nextArticleUrl">Next Article</RouterLink>
    <RouterLink :to="previousArticleUrl">Previous Article</RouterLink>
  </div>
</template>

<style scoped>
.article-page {
  padding: 20px;
  max-width: 800px;
  margin: auto;
}

h1 {
  font-size: 2rem;
  margin-bottom: 20px;
}

div {
  font-size: 1rem;
  white-space: pre-wrap;
}
</style>
