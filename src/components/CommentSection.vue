<template>
  <div class="comment-section">
    <!-- Formulario para añadir comentario -->
    <div class="card mb-4 shadow-sm">
      <div class="card-header bg-light">
        <h5 class="mb-0">Deja tu opinión</h5>
      </div>
      <div class="card-body">
        <form @submit.prevent="submitComment">
          <div class="mb-3">
            <label for="userName" class="form-label">Nombre</label>
            <input
              type="text"
              class="form-control"
              id="userName"
              v-model="newComment.userName"
              required
            >
          </div>

          <div class="mb-3">
            <label class="form-label">Calificación</label>
            <div class="rating-input">
              <div class="d-flex">
                <template v-for="i in 5" :key="i">
                  <div
                    class="star-rating me-2"
                    @click="newComment.rating = i"
                    :class="{ 'active': newComment.rating >= i }"
                  >
                    <i class="bi bi-star-fill fs-4"></i>
                  </div>
                </template>
                <span class="ms-2 align-self-center" v-if="newComment.rating > 0">
                  {{ newComment.rating }} de 5
                </span>
              </div>
            </div>
          </div>

          <div class="mb-3">
            <label for="commentText" class="form-label">Comentario</label>
            <textarea
              class="form-control"
              id="commentText"
              rows="3"
              v-model="newComment.text"
              required
            ></textarea>
          </div>

          <button type="submit" class="btn btn-primary" :disabled="isSubmitting">
            <span v-if="isSubmitting" class="spinner-border spinner-border-sm me-2" role="status"></span>
            Publicar comentario
          </button>
        </form>
      </div>
    </div>

    <!-- Lista de comentarios -->
    <div v-if="loading" class="text-center py-3">
      <div class="spinner-border text-primary" role="status"></div>
      <p>Cargando comentarios...</p>
    </div>

    <div v-else-if="comments.length === 0" class="text-center py-4">
      <p class="text-muted">Aún no hay comentarios. ¡Sé el primero en opinar!</p>
    </div>

    <div v-else class="comments-list">
      <div v-for="comment in comments" :key="comment.id" class="card mb-3 shadow-sm">
        <div class="card-body">
          <div class="d-flex justify-content-between align-items-center mb-2">
            <h5 class="card-title mb-0">{{ comment.userName }}</h5>
            <div class="d-flex align-items-center">
              <div class="me-2">
                <template v-for="i in 5" :key="i">
                  <i :class="[
                    'bi',
                    i <= comment.rating ? 'bi-star-fill' : 'bi-star',
                    'text-warning'
                  ]"></i>
                </template>
              </div>
              <small class="text-muted">{{ formatDate(comment.date) }}</small>
            </div>
          </div>
          <p class="card-text">{{ comment.text }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue'
import { CommentService } from '@/services/api'
import type { Comment } from '@/interfaces/Comments'

// Props
const props = defineProps<{
  movieId: number
}>()

// Estado
const comments = ref<Comment[]>([])
const loading = ref(true)
const isSubmitting = ref(false)
const newComment = reactive({
  userName: '',
  text: '',
  rating: 0,
  movieId: props.movieId
})

// Cargar comentarios
const loadComments = async () => {
  loading.value = true
  try {
    comments.value = await CommentService.getComments(props.movieId)
  } catch (error) {
    console.error('Error cargando comentarios:', error)
  } finally {
    loading.value = false
  }
}

// Enviar un nuevo comentario
const submitComment = async () => {
  if (newComment.rating === 0) {
    alert('Por favor, selecciona una calificación')
    return
  }

  isSubmitting.value = true
  try {
    const comment = await CommentService.addComment({
      movieId: props.movieId,
      userName: newComment.userName,
      text: newComment.text,
      rating: newComment.rating
    })

    // Añadir el nuevo comentario a la lista
    comments.value.unshift(comment)

    // Reiniciar formulario
    newComment.text = ''
    newComment.rating = 0

  } catch (error) {
    console.error('Error enviando comentario:', error)
    alert('Ocurrió un error al enviar tu comentario. Por favor, intenta de nuevo.')
  } finally {
    isSubmitting.value = false
  }
}

// Formatear fecha
const formatDate = (dateString: string): string => {
  const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' }
  return new Date(dateString).toLocaleDateString('es-ES', options)
}

// Cargar comentarios al montar el componente
onMounted(() => {
  loadComments()
})
</script>

<style scoped lang="scss">
@use '@/assets/styles/variables' as vars;
@use '@/assets/styles/mixins' as mix;

// Anidación de selectores para el componente de comentarios
.comment-section {
  .card {
    @include mix.card-shadow(1);
    border-radius: vars.$card-border-radius;

    .card-header {
      background-color: vars.$light-color;

      h5 {
        color: vars.$dark-color;
        font-weight: vars.$font-weight-bold;
      }
    }

    .card-body {
      padding: vars.$spacing-lg;

      .form-label {
        font-weight: vars.$font-weight-bold;
        color: vars.$dark-color;
        margin-bottom: vars.$spacing-sm;
      }

      .form-control {
        border-radius: calc(vars.$card-border-radius * 0.7);

        &:focus {
          border-color: vars.$primary-color;
          box-shadow: 0 0 0 0.2rem rgba(vars.$primary-color, 0.25);
        }
      }

      .btn-primary {
        background-color: vars.$primary-color;
        border-color: vars.$primary-color;
        font-weight: vars.$font-weight-bold;

        &:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }
      }
    }
  }

  .star-rating {
    cursor: pointer;
    color: vars.$star-inactive-color;
    transition: color 0.2s ease;

    &.active {
      color: vars.$star-color;
    }

    &:hover {
      color: mix.lighten-color(vars.$star-color, 10%);
    }
  }

  .comments-list {
    max-height: 600px;
    overflow-y: auto;

    .card {
      margin-bottom: vars.$spacing-md;

      .card-body {
        padding: vars.$spacing-md;

        .card-title {
          color: vars.$dark-color;
          font-weight: vars.$font-weight-bold;
        }

        .card-text {
          color: vars.$secondary-color;
          line-height: 1.6;
        }

        .text-muted {
          font-size: vars.$font-size-base * 0.9;
        }
      }
    }
  }
}
</style>
