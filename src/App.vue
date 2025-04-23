<template>
  <div class="app-container">
    <nav class="navbar navbar-expand-md navbar-dark bg-dark">
      <div class="container">
        <router-link class="navbar-brand" to="/">
          <span class="fw-bold">CineReviews</span>
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
        <p class="mb-0">&copy; 2023 CineReviews - Sitio de reseñas de películas</p>
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

<style>
.app-container {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

main {
  flex: 1;
}
</style>
