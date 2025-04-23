<template>
  <div class="search-bar">
    <div class="input-group">
      <input
        type="text"
        class="form-control"
        placeholder="Buscar películas por título, descripción..."
        v-model="searchTerm"
        @keyup.enter="emitSearch"
      >
      <button
        class="btn btn-primary"
        type="button"
        @click="emitSearch"
      >
        <i class="bi bi-search me-1"></i> Buscar
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'

const props = defineProps<{
  initialTerm?: string
}>()

const emit = defineEmits<{
  (e: 'search', term: string): void
}>()

const searchTerm = ref(props.initialTerm || '')

const emitSearch = () => {
  emit('search', searchTerm.value)
}

onMounted(() => {
  // Si hay un término inicial, emitir la búsqueda al montar el componente
  if (props.initialTerm) {
    emitSearch()
  }
})
</script>
