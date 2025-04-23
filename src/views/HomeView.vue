<template>
<div class="home">
    <header class="bg-dark bg-gradient text-white p-5 mb-4 rounded">
      <div class="container text-center">
        <h1 class="display-4 fw-bold ">CineMania</h1>
        <p class="lead">Encuentra la próxima película que quieres ver o añádela a tus favoritas</p>
      </div>
    </header>

    <div class="row mb-4">
      <div class="col-12">
        <SearchBar
          @search="updateSearchTerm"
          :initial-term="filters.searchTerm"
        />
      </div>
    </div>

    <div class="row">
      <div class="col-md-3 mb-4">
        <MovieFilters
          :genres="genres"
          :filters="filters"
          @update:filters="updateFilters"
        />
      </div>

      <div class="col-md-9">
        <div v-if="loading" class="text-center py-5">
          <div class="spinner-border text-primary" role="status">
            <span class="visually-hidden">Cargando...</span>
          </div>
          <p class="mt-3">Cargando películas...</p>
        </div>
        <div v-else-if="movies.length === 0" class="text-center py-5">
          <p class="lead">No se encontraron películas con los filtros seleccionados.</p>
        </div>
        <div v-else>
          <MovieList :movies="movies" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted, watch } from 'vue'
import { MovieService } from '@/services/api'
import type { Movie, MovieFilter, Genre } from '@/interfaces/Movie'
import MovieList from '@/components/MovieList.vue'
import MovieFilters from '@/components/MovieFilters.vue'
import SearchBar from '@/components/SearchBar.vue'

// Estado
const movies = ref<Movie[]>([])
const genres = ref<Genre[]>([])
const loading = ref(true)
const filters = reactive<MovieFilter>({
  searchTerm: '',
  genre: null,
  sortBy: 'date',
  year: null
})

// Métodos
const loadMovies = async () => {
  loading.value = true
  try {
    movies.value = await MovieService.getMovies(filters)
  } catch (error) {
    console.error('Error cargando películas:', error)
  } finally {
    loading.value = false
  }
}

const loadGenres = async () => {
  try {
    genres.value = await MovieService.getGenres()
  } catch (error) {
    console.error('Error cargando géneros:', error)
  }
}

const updateSearchTerm = (term: string) => {
  filters.searchTerm = term
}

const updateFilters = (newFilters: Partial<MovieFilter>) => {
  Object.assign(filters, newFilters)
}

// Efectos
onMounted(async () => {
  await Promise.all([loadGenres(), loadMovies()])
})

// Observar cambios en los filtros para actualizar películas
watch(filters, () => {
  loadMovies()
}, { deep: true })
</script>

<style scoped>
</style>
