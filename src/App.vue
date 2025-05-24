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
          <ul class="navbar-nav ms-auto gap-2">
            <li class="nav-item">
              <router-link class="nav-link" to="/" :class="{ active: $route.name === 'home' }">
                <i class="bi bi-house-fill me-1"></i>
                Inicio
              </router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link" to="/contacto" :class="{ active: $route.name === 'contact' }">
                <i class="bi bi-envelope-fill me-1"></i>
                Contacto
              </router-link>
            </li>
          </ul>
        </div>
      </div>
    </nav>

    <main class="container py-4">
      <router-view />
    </main>

    <footer class="bg-dark text-light py-4 mt-5">
      <div class="container">
        <div class="row">
          <div class="col-md-6">
            <h5 class="fw-bold mb-3">CineMania</h5>
            <p class="mb-2">Tu sitio de confianza para descubrir y reseñar las mejores películas.</p>
            <p class="mb-0">&copy; 2025 CineMania - Todos los derechos reservados</p>
          </div>
          <div class="col-md-6">
            <h6 class="fw-bold mb-3">Enlaces rápidos</h6>
            <ul class="list-unstyled">
              <li class="mb-2">
                <router-link to="/" class="text-light text-decoration-none">
                  <i class="bi bi-house me-2"></i>Inicio
                </router-link>
              </li>
              <li class="mb-2">
                <router-link to="/contacto" class="text-light text-decoration-none">
                  <i class="bi bi-envelope me-2"></i>Contacto
                </router-link>
              </li>
              <li class="mb-2">
                <a href="mailto:info@cinereviews.com" class="text-light text-decoration-none">
                  <i class="bi bi-envelope-at me-2"></i>info@cinemania.com
                </a>
              </li>
            </ul>
          </div>
        </div>
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
      position: relative;
      padding: vars.$spacing-sm vars.$spacing-md !important;
      border-radius: calc(vars.$card-border-radius * 0.6);
      transition: all 0.3s ease;

      &:hover {
        color: white !important;
        background-color: color.scale(vars.$primary-color, $alpha: -50%);
      }

      &.active {
        color: white !important;
        background-color: vars.$primary-color;
        font-weight: vars.$font-weight-bold;
      }

      i {
        opacity: 0.8;
      }
    }

    .navbar-toggler {
      border: none;
      padding: vars.$spacing-xs;

      &:focus {
        box-shadow: 0 0 0 0.25rem color.scale(vars.$primary-color, $alpha: -75%);
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
    padding: vars.$spacing-xl 0;
    margin-top: vars.$spacing-xl;

    h5, h6 {
      color: white;
      margin-bottom: vars.$spacing-md;
    }

    p {
      font-size: vars.$font-size-base * 0.9;
      opacity: 0.9;
      line-height: 1.6;
    }

    .list-unstyled {
      li {
        a {
          opacity: 0.8;
          transition: opacity 0.3s ease;

          &:hover {
            opacity: 1;
            color: mix.lighten-color(vars.$primary-color, 20%) !important;
          }

          i {
            opacity: 0.7;
          }
        }
      }
    }
  }
}
</style>
