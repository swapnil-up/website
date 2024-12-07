<script setup>
import { ref, onMounted, computed } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const articleContent = ref('')
const articleDetails = ref(null)

onMounted(async () => {
  const filename = route.params.filename

  const articlesResponse = await fetch('../../articles/articles.json')
  const articles = await articlesResponse.json()

  articleDetails.value = articles.find((article) => article.file.endsWith(filename))

  const contentResponse = await fetch(`../../articles/${filename}.md`)
  if (contentResponse.ok) {
    const text = await contentResponse.text()
    articleContent.value = removeFrontMatter(text)
  } else {
    articleContent.value = 'Article not found.'
  }
})

const tags = computed(() => articleDetails.value?.tags || [])

function removeFrontMatter(text) {
  const frontMatterRegex = /^---\s*\n([\s\S]*?)\n---/
  return text.replace(frontMatterRegex, '').trim()
}
</script>

<template>
  <div class="article-page">
    <h1>{{ articleDetails?.title || 'Untitled' }}</h1>
    <div v-if="tags.length" class="tags">
      <strong>Tags:</strong>
      <span v-for="tag in tags" :key="tag" class="tag">{{ tag }}</span>
    </div>
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

.tags {
  margin-bottom: 20px;
}

.tag {
  display: inline-block;
  background-color: #f0f0f0;
  border-radius: 3px;
  padding: 3px 8px;
  margin-right: 5px;
  font-size: 0.9rem;
  color: #333;
}

div {
  font-size: 1rem;
  white-space: pre-wrap;
}
</style>
