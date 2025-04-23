<template>
  <div class="movie-detail">
    <div v-if="loading" class="text-center py-5">
      <div class="spinner-border text-primary" role="status">
        <span class="visually-hidden">Cargando...</span>
      </div>
      <p class="mt-3">Cargando información de la película...</p>
    </div>

    <div v-else-if="!movie" class="text-center py-5">
      <h2>Película no encontrada</h2>
      <p>La película que estás buscando no existe o ha sido eliminada.</p>
      <router-link to="/" class="btn btn-primary mt-3">Volver al inicio</router-link>
    </div>

    <div v-else>
      <div class="row mb-5">
        <div class="col-12">
          <router-link to="/" class="btn btn-outline-secondary mb-4">
            &laquo; Volver al listado
          </router-link>
        </div>
      </div>

      <MovieDetail :movie="movie" />

      <div class="mt-5">
        <h3 class="mb-4">Comentarios de usuarios</h3>
        <CommentSection :movie-id="movieId" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { useRoute } from 'vue-router'
import { MovieService } from '@/services/api'
import type { Movie } from '@/interfaces/Movie'
import MovieDetail from '@/components/MovieDetail.vue'
import CommentSection from '@/components/CommentSection.vue'

// Obtener ID de la película desde la ruta
const route = useRoute()
const movieId = computed(() => Number(route.params.id))

// Estado
const movie = ref<Movie | undefined>(undefined)
const loading = ref(true)

// Cargar información de la película
const loadMovie = async () => {
  loading.value = true
  try {
    movie.value = await MovieService.getMovie(movieId.value)
  } catch (error) {
    console.error('Error cargando información de la película:', error)
  } finally {
    loading.value = false
  }
}

// Cargar datos al montar el componente
onMounted(() => {
  loadMovie()
})
</script>
