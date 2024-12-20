<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const selectedTags = ref([])
const articles = ref([])

onMounted(async () => {
  const articlesResponse = await fetch('/articles/articles.json')
  articles.value = await articlesResponse.json()
})

const allTags = computed(() => {
  const allTagsSet = new Set()
  articles.value.forEach((article) => article.tags.forEach((tag) => allTagsSet.add(tag)))
  return Array.from(allTagsSet)
})

const emit = defineEmits(['tags-selected'])
watch(selectedTags, (newTags) => {
  emit('tags-selected', newTags)
})
</script>

<template>
  <div class="tag-filter">
    <strong>Filter by tags:</strong>
    <div v-for="tag in allTags" :key="tag">
      <label>
        <input type="checkbox" :value="tag" v-model="selectedTags" />
        {{ tag }}
      </label>
    </div>
  </div>
</template>

<style scoped>
.tag-filter {
  padding: 20px;
  max-width: 800px;
  margin: auto;
}

.tag-filter label {
  display: block;
  margin: 5px 0;
}
</style>
