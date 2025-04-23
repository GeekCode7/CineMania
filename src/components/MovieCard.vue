<template>
  <div class="card h-100 shadow-sm">
    <img :src="movie.posterPath" class="card-img-top" :alt="movie.title">
    <div class="card-body d-flex flex-column">
      <div class="d-flex justify-content-between align-items-start mb-2">
        <h5 class="card-title">{{ movie.title }}</h5>
        <span class="badge bg-warning text-dark">{{ movie.voteAverage.toFixed(1) }}</span>
      </div>

      <div class="mb-2">
        <small class="text-muted">{{ formatDate(movie.releaseDate) }}</small>
      </div>

      <p class="card-text flex-grow-1">{{ truncateText(movie.overview, 100) }}</p>

      <div class="mt-2">
        <div class="mb-2">
          <span v-for="genre in movie.genres.slice(0, 2)" :key="genre.id"
                class="badge bg-secondary me-1 mb-1">
            {{ genre.name }}
          </span>
        </div>
        <router-link :to="'/movie/' + movie.id" class="btn btn-primary w-100">
          Ver detalles
        </router-link>
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

// Métodos
const truncateText = (text: string, maxLength: number): string => {
  if (text.length <= maxLength) return text
  return text.substring(0, maxLength) + '...'
}

const formatDate = (dateString: string): string => {
  const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' }
  return new Date(dateString).toLocaleDateString('es-ES', options)
}
</script>

<style scoped>
.card {
  transition: transform 0.3s ease;
}

.card:hover {
  transform: translateY(-5px);
}
</style>
