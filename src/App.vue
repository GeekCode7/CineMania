<template>
  <div class="app-container">
    <nav class="navbar navbar-expand-md navbar-dark bg-dark">
      <div class="container">
        <router-link class="navbar-brand" to="/">
          <span class="fw-bold">CineMania</span>
        </router-link>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav ms-auto">
            <li class="nav-item">
              <router-link class="nav-link" to="/">Inicio</router-link>
            </li>
          </ul>
        </div>
      </div>
    </nav>

    <main class="container py-4">
      <router-view />
    </main>

    <footer class="bg-dark text-light py-4 mt-5">
      <div class="container text-center">
        <p class="mb-0">&copy; 2025 CineMania - Sitio de reseñas de películas</p>
      </div>
    </footer>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'App'
})
</script>

<style lang="scss">
@use '@/assets/styles/variables' as vars;
@use '@/assets/styles/mixins' as mix;
@use 'sass:color';

// Anidación de selectores 
.app-container {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background-color: mix.lighten-color(vars.$light-color, 2%);

  .navbar {
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

    .navbar-brand {
      font-size: vars.$font-size-base * 1.5;
      font-weight: vars.$font-weight-bold;

      &:hover {
        color: mix.lighten-color(vars.$primary-color, 20%) !important;
      }
    }

    .nav-link {
      font-weight: vars.$font-weight-normal;

      &:hover {
        color: mix.lighten-color(white, 10%) !important;
      }
    }
  }

  main {
    flex: 1;
    padding: vars.$spacing-lg;

    // Uso de interpolación para responsive design
    @include mix.respond-to(#{vars.$tablet}) {
      padding: vars.$spacing-xl;
    }
  }

  footer {
    padding: vars.$spacing-lg 0;
    margin-top: vars.$spacing-xl;

    p {
      font-size: vars.$font-size-base * 0.9;
      opacity: 0.9;
    }
  }
}
</style>
