<template>
  <div class="filters card shadow-sm">
    <div class="card-header bg-primary text-white">
      <h5 class="mb-0">Filtros</h5>
    </div>
    <div class="card-body">
      <!-- Filtro por género -->
      <div class="mb-4">
        <label class="form-label fw-bold">Género</label>
        <select
          class="form-select"
          v-model="selectedGenre"
          @change="updateFilters({ genre: selectedGenre })"
        >
          <option :value="null">Todos los géneros</option>
          <option
            v-for="genre in genres"
            :key="genre.id"
            :value="genre.id"
          >
            {{ genre.name }}
          </option>
        </select>
      </div>

      <!-- Filtro por año -->
      <div class="mb-4">
        <label class="form-label fw-bold">Año</label>
        <select
          class="form-select"
          v-model="selectedYear"
          @change="updateFilters({ year: selectedYear })"
        >
          <option :value="null">Todos los años</option>
          <option
            v-for="year in years"
            :key="year"
            :value="year"
          >
            {{ year }}
          </option>
        </select>
      </div>

      <!-- Ordenar por -->
      <div>
        <label class="form-label fw-bold">Ordenar por</label>
        <div class="form-check mb-2">
          <input
            class="form-check-input"
            type="radio"
            id="sort-date"
            value="date"
            v-model="sortBy"
            @change="updateFilters({ sortBy })"
          >
          <label class="form-check-label" for="sort-date">
            Fecha (más recientes primero)
          </label>
        </div>
        <div class="form-check mb-2">
          <input
            class="form-check-input"
            type="radio"
            id="sort-rating"
            value="rating"
            v-model="sortBy"
            @change="updateFilters({ sortBy })"
          >
          <label class="form-check-label" for="sort-rating">
            Calificación (mayor primero)
          </label>
        </div>
        <div class="form-check">
          <input
            class="form-check-input"
            type="radio"
            id="sort-title"
            value="title"
            v-model="sortBy"
            @change="updateFilters({ sortBy })"
          >
          <label class="form-check-label" for="sort-title">
            Título (A-Z)
          </label>
        </div>
      </div>

      <!-- Botón para limpiar filtros -->
      <div class="mt-4">
        <button
          class="btn btn-outline-secondary w-100"
          @click="clearFilters"
        >
          Limpiar filtros
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import type { MovieFilter, Genre } from '@/interfaces/Movie'

const props = defineProps<{
  genres: Genre[]
  filters: MovieFilter
}>()

const emit = defineEmits<{
  (e: 'update:filters', filters: Partial<MovieFilter>): void
}>()

// Estado local
const selectedGenre = ref<number | null>(props.filters.genre)
const selectedYear = ref<number | null>(props.filters.year)
const sortBy = ref<'date' | 'rating' | 'title'>(props.filters.sortBy)

// Lista de años para el selector (de 1900 a actual)
const years = computed(() => {
  const currentYear = new Date().getFullYear()
  const years = []
  for (let year = currentYear; year >= 1900; year--) {
    years.push(year)
  }
  return years
})

// Método para actualizar filtros
const updateFilters = (newFilters: Partial<MovieFilter>) => {
  emit('update:filters', newFilters)
}

// Método para limpiar todos los filtros
const clearFilters = () => {
  selectedGenre.value = null
  selectedYear.value = null
  sortBy.value = 'date'

  updateFilters({
    genre: null,
    year: null,
    sortBy: 'date',
    // Mantener el término de búsqueda actual
    searchTerm: props.filters.searchTerm
  })
}

// Actualizar estado local cuando cambien los props
onMounted(() => {
  selectedGenre.value = props.filters.genre
  selectedYear.value = props.filters.year
  sortBy.value = props.filters.sortBy
})
</script>

<style scoped>
@media (max-width: 767.98px) {
  .filters {
    position: relative;
  }
}

@media (min-width: 768px) {
  .filters {
    position: sticky;
    top: 1rem;
  }
}
</style>
