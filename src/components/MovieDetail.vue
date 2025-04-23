<template>
  <div class="movie-detail">
    <div class="row">
      <!-- Poster y datos básicos -->
      <div class="col-md-4 mb-4">
        <img :src="movie.posterPath" alt="Poster" class="img-fluid rounded shadow">

        <div class="mt-4">
          <div class="d-flex align-items-center mb-3">
            <h4 class="me-2 mb-0">Calificación:</h4>
            <div class="rating-stars">
              <template v-for="i in 5" :key="i">
                <i :class="[
                  'bi',
                  i <= Math.round(movie.voteAverage / 2) ? 'bi-star-fill' : 'bi-star',
                  'text-warning fs-4'
                ]"></i>
              </template>
            </div>
            <span class="ms-2 fs-4 fw-bold">{{ movie.voteAverage.toFixed(1) }}/10</span>
          </div>

          <div class="mb-3">
            <h4>Géneros:</h4>
            <div>
              <span v-for="genre in movie.genres" :key="genre.id"
                    class="badge bg-secondary me-1 mb-1 p-2">
                {{ genre.name }}
              </span>
            </div>
          </div>

          <div class="mb-3">
            <h4>Duración:</h4>
            <p>{{ formatRuntime(movie.runtime) }}</p>
          </div>

          <div>
            <h4>Director:</h4>
            <p>{{ movie.director }}</p>
          </div>
        </div>
      </div>

      <!-- Información de la película -->
      <div class="col-md-8">
        <h1 class="mb-2">{{ movie.title }}</h1>
        <p class="text-muted mb-4">
          <strong>Estreno:</strong> {{ formatDate(movie.releaseDate) }}
        </p>

        <div class="mb-4">
          <h3>Sinopsis</h3>
          <p class="lead">{{ movie.overview }}</p>
        </div>

        <div class="mb-4">
          <h3>Reparto principal</h3>
          <div class="row">
            <div v-for="actor in movie.cast" :key="actor.id" class="col-6 col-md-4 col-lg-3 mb-3">
              <div class="card h-100">
                <img :src="actor.profilePath" class="card-img-top" :alt="actor.name">
                <div class="card-body text-center p-2">
                  <h6 class="card-title mb-0">{{ actor.name }}</h6>
                  <small class="text-muted">{{ actor.character }}</small>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Movie } from '@/interfaces/Movie'

// Props
defineProps<{
  movie: Movie
}>()

// Métodos para formatear datos
const formatRuntime = (minutes: number): string => {
  const hours = Math.floor(minutes / 60)
  const mins = minutes % 60
  return `${hours}h ${mins}min`
}

const formatDate = (dateString: string): string => {
  const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' }
  return new Date(dateString).toLocaleDateString('es-ES', options)
}
</script>

<style scoped>
.movie-detail {
  animation: fadeIn 0.5s ease;
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}
</style>
