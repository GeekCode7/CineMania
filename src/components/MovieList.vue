<template>
  <div class="movie-list">
    <div class="row">
      <div v-for="movie in movies" :key="movie.id" class="col-sm-6 col-md-4 mb-4">
        <MovieCard :movie="movie" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps } from 'vue'
import type { Movie } from '@/interfaces/Movie'
import MovieCard from '@/components/MovieCard.vue'

defineProps<{
  movies: Movie[]
}>()
</script>
