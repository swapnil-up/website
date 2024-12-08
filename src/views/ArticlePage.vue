<script setup>
import { ref, onMounted, computed, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()
const articleContent = ref('')
const articleDetails = ref(null)
const articles = ref([])

const fetchArticleData = async (filename) => {
  const articlesResponse = await fetch('/articles/articles.json')
  articles.value = await articlesResponse.json()

  articleDetails.value = articles.value.find((article) => article.file.endsWith(filename))

  const contentResponse = await fetch(`/articles/${filename}.md`)
  if (contentResponse.ok) {
    const text = await contentResponse.text()
    articleContent.value = removeFrontMatter(text)
  } else {
    articleContent.value = 'Article not found.'
  }
}

onMounted(() => {
  const filename = route.params.filename
  fetchArticleData(filename)
})

watch(
  () => route.params.filename,
  (newFilename) => {
    fetchArticleData(newFilename)
    window.scrollTo(0, 0)
  },
)

const tags = computed(() => articleDetails.value?.tags || [])

function removeFrontMatter(text) {
  const frontMatterRegex = /^---\s*\n([\s\S]*?)\n---/
  return text.replace(frontMatterRegex, '').trim()
}

const currentIndex = computed(() => {
  return articles.value.findIndex((article) => article.file === articleDetails.value?.file)
})

const nextArticleUrl = computed(() => {
  const nextArticle = articles.value[currentIndex.value + 1]
  return nextArticle ? nextArticle.file.replace('.md', '') : null
})

const previousArticleUrl = computed(() => {
  const previousArticle = articles.value[currentIndex.value - 1]
  return previousArticle ? previousArticle.file.replace('.md', '') : null
})
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

  <div class="navigation" v-if="nextArticleUrl || previousArticleUrl">
    <RouterLink v-if="previousArticleUrl" :to="previousArticleUrl">Previous Article</RouterLink>
    <RouterLink v-if="nextArticleUrl" :to="nextArticleUrl">Next Article</RouterLink>
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
