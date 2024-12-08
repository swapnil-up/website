<script setup>
import { ref, onMounted, computed, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { marked } from 'marked';

const route = useRoute();
const router = useRouter();

const articleContent = ref('');
const articleDetails = ref(null);
const articles = ref([]);

const fetchArticlesJson = async () => {
  try {
    const response = await fetch('/articles/articles.json');
    if (!response.ok) throw new Error('Failed to load articles metadata.');
    articles.value = await response.json();
  } catch (error) {
    console.error('Error loading articles.json:', error.message);
    articles.value = [];
  }
};

const fetchArticleContent = async (filename) => {
  try {
    const response = await fetch(`/articles/${filename}.md`);
    if (!response.ok) throw new Error('Article not found.');
    const markdown = await response.text();
    articleContent.value = marked(markdown);
  } catch (error) {
    console.error('Error loading article content:', error.message);
    articleContent.value = '<p>Article not found.</p>';
  }
};

const loadArticleData = async (filename) => {
  await fetchArticlesJson();
  articleDetails.value = articles.value.find((article) =>
    article.file.endsWith(`${filename}.md`)
  );
  await fetchArticleContent(filename);
};

onMounted(() => {
  const filename = route.params.filename;
  loadArticleData(filename);
});

watch(
  () => route.params.filename,
  async (newFilename) => {
    await loadArticleData(newFilename);
    window.scrollTo(0, 0);
  }
);

const tags = computed(() => articleDetails.value?.tags || []);

const currentIndex = computed(() => {
  return articles.value.findIndex(
    (article) => article.file === articleDetails.value?.file
  );
});

const nextArticleUrl = computed(() => {
  const nextArticle = articles.value[currentIndex.value + 1];
  return nextArticle ? `${nextArticle.file.replace('.md', '')}` : null;
});

const previousArticleUrl = computed(() => {
  const previousArticle = articles.value[currentIndex.value - 1];
  return previousArticle
    ? `${previousArticle.file.replace('.md', '')}`
    : null;
});
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

.navigation {
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
}

.navigation a {
  text-decoration: none;
  color: #1e90ff;
  font-weight: bold;
}

.navigation a:hover {
  text-decoration: underline;
}
</style>
