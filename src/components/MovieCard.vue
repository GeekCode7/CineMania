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

<style scoped lang="scss">
@use '@/assets/styles/variables' as vars;
@use '@/assets/styles/mixins' as mix;
@use 'sass:color';
@use 'sass:math';

// Anidación de selectores para la tarjeta
.card {
  @include mix.hover-lift;
  @include mix.card-shadow(1);
  border-radius: vars.$card-border-radius;
  overflow: hidden;

  .card-img-top {
    height: 450px;
    object-fit: cover;
    transition: transform 0.3s ease;
  }

  .card-body {
    padding: vars.$spacing-lg;

    .card-title {
      color: vars.$dark-color;
      font-weight: vars.$font-weight-bold;
      font-size: vars.$font-size-base * 1.1;
    }

    .card-text {
      color: vars.$secondary-color;
      line-height: 1.5;
    }

    .badge {
      font-size: vars.$font-size-base * 0.9;

      &.bg-warning {
        background-color: vars.$warning-color !important;
        color: vars.$dark-color;
      }

      &.bg-secondary {
        background-color: vars.$secondary-color !important;
      }
    }

    .btn-primary {
      background-color: vars.$primary-color;
      border-color: vars.$primary-color;
      font-weight: vars.$font-weight-bold;

      &:hover {
        background-color: mix.darken-color(vars.$primary-color, 10%);
        border-color: mix.darken-color(vars.$primary-color, 10%);
      }
    }
  }

  &:hover {
    @include mix.card-shadow(2);

    .card-img-top {
      transform: scale(1.05);
    }
  }
}

// INTERPOLACIÓN 2: Generación dinámica de clases de rating
@for $i from 1 through 5 {
  .rating-#{$i} {
    .badge {
      $mix-percentage: math.percentage(math.div($i, 5));
      background-color: color.mix(vars.$warning-color, vars.$star-color, $mix-percentage) !important;
    }
  }
}
</style>
