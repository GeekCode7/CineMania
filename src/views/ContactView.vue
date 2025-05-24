<template>
  <div class="contact-page">
    <!-- Hero Section -->
    <div class="contact-hero">
      <div class="container text-center">
        <h1 class="display-4 mb-3">Contáctanos</h1>
        <p class="lead">¿Tienes alguna sugerencia, pregunta o quieres colaborar con CineReviews?</p>
        <p>Nos encanta escuchar a nuestra comunidad de amantes del cine</p>
      </div>
    </div>

    <div class="container py-5">
      <div class="row">
        <!-- Formulario de Contacto -->
        <div class="col-lg-8 mb-5">
          <div class="card contact-form-card">
            <div class="card-header">
              <h3 class="mb-0">
                <i class="bi bi-envelope-fill me-2"></i>
                Envíanos un mensaje
              </h3>
            </div>
            <div class="card-body">
              <form @submit.prevent="submitForm">
                <div class="row">
                  <div class="col-md-6 mb-3">
                    <label for="name" class="form-label">Nombre completo *</label>
                    <input
                      type="text"
                      class="form-control"
                      id="name"
                      v-model="form.name"
                      required
                    >
                  </div>
                  <div class="col-md-6 mb-3">
                    <label for="email" class="form-label">Correo electrónico *</label>
                    <input
                      type="email"
                      class="form-control"
                      id="email"
                      v-model="form.email"
                      required
                    >
                  </div>
                </div>

                <div class="mb-3">
                  <label for="subject" class="form-label">Tipo de consulta *</label>
                  <select class="form-select" id="subject" v-model="form.subject" required>
                    <option value="">Selecciona una opción</option>
                    <option value="sugerencia-pelicula">Sugerir una película</option>
                    <option value="error-informacion">Reportar error en información</option>
                    <option value="colaboracion">Propuesta de colaboración</option>
                    <option value="feedback-sitio">Feedback sobre el sitio</option>
                    <option value="problema-tecnico">Problema técnico</option>
                    <option value="otros">Otros</option>
                  </select>
                </div>

                <div class="mb-3" v-if="form.subject === 'sugerencia-pelicula'">
                  <label for="movieTitle" class="form-label">Título de la película</label>
                  <input
                    type="text"
                    class="form-control"
                    id="movieTitle"
                    v-model="form.movieTitle"
                    placeholder="Ej: El Padrino, Pulp Fiction..."
                  >
                </div>

                <div class="mb-3">
                  <label for="message" class="form-label">Mensaje *</label>
                  <textarea
                    class="form-control"
                    id="message"
                    rows="5"
                    v-model="form.message"
                    :placeholder="getMessagePlaceholder()"
                    required
                  ></textarea>
                </div>

                <div class="mb-3">
                  <div class="form-check">
                    <input
                      class="form-check-input"
                      type="checkbox"
                      id="newsletter"
                      v-model="form.newsletter"
                    >
                    <label class="form-check-label" for="newsletter">
                      Quiero recibir notificaciones sobre nuevas reseñas y actualizaciones del sitio
                    </label>
                  </div>
                </div>

                <button
                  type="submit"
                  class="btn btn-primary btn-lg"
                  :disabled="isSubmitting"
                >
                  <span v-if="isSubmitting" class="spinner-border spinner-border-sm me-2" role="status"></span>
                  <i class="bi bi-send-fill me-2" v-if="!isSubmitting"></i>
                  {{ isSubmitting ? 'Enviando...' : 'Enviar mensaje' }}
                </button>
              </form>
            </div>
          </div>

          <!-- Success Message -->
          <div v-if="showSuccess" class="alert alert-success mt-4" role="alert">
            <i class="bi bi-check-circle-fill me-2"></i>
            <strong>¡Mensaje enviado con éxito!</strong> Te responderemos pronto.
          </div>
        </div>

        <!-- Información de Contacto -->
        <div class="col-lg-4">
          <div class="contact-info">
            <h4 class="mb-4">Otras formas de contacto</h4>

            <div class="contact-method">
              <div class="contact-icon">
                <i class="bi bi-envelope-fill"></i>
              </div>
              <div class="contact-details">
                <h5>Email</h5>
                <p>info@cinemania.com</p>
              </div>
            </div>

            <div class="contact-method">
              <div class="contact-icon">
                <i class="bi bi-clock-fill"></i>
              </div>
              <div class="contact-details">
                <h5>Tiempo de respuesta</h5>
                <p>24-48 horas hábiles</p>
              </div>
            </div>

            <div class="contact-method">
              <div class="contact-icon">
                <i class="bi bi-people-fill"></i>
              </div>
              <div class="contact-details">
                <h5>Comunidad</h5>
                <p>Únete a nuestras discusiones sobre películas</p>
              </div>
            </div>
          </div>

          <!-- FAQ rápido -->
          <div class="faq-section mt-5">
            <h4 class="mb-3">Preguntas frecuentes</h4>

            <div class="accordion" id="faqAccordion">
              <div class="accordion-item">
                <h2 class="accordion-header" id="faq1">
                  <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapse1">
                    ¿Cómo puedo sugerir una película?
                  </button>
                </h2>
                <div id="collapse1" class="accordion-collapse collapse" data-bs-parent="#faqAccordion">
                  <div class="accordion-body">
                    Puedes usar el formulario de contacto seleccionando "Sugerir una película" o dejando un comentario en cualquier reseña existente.
                  </div>
                </div>
              </div>

              <div class="accordion-item">
                <h2 class="accordion-header" id="faq2">
                  <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapse2">
                    ¿Puedo escribir reseñas como colaborador?
                  </button>
                </h2>
                <div id="collapse2" class="accordion-collapse collapse" data-bs-parent="#faqAccordion">
                  <div class="accordion-body">
                    ¡Por supuesto! Selecciona "Propuesta de colaboración" en el formulario y cuéntanos sobre tu experiencia con el cine.
                  </div>
                </div>
              </div>

              <div class="accordion-item">
                <h2 class="accordion-header" id="faq3">
                  <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapse3">
                    ¿Con qué frecuencia se actualizan las reseñas?
                  </button>
                </h2>
                <div id="collapse3" class="accordion-collapse collapse" data-bs-parent="#faqAccordion">
                  <div class="accordion-body">
                    Publicamos nuevas reseñas semanalmente, priorizando los estrenos más recientes y las sugerencias de nuestra comunidad.
                  </div>
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
import { ref, reactive } from 'vue'

// Estado del formulario
const form = reactive({
  name: '',
  email: '',
  subject: '',
  movieTitle: '',
  message: '',
  newsletter: false
})

const isSubmitting = ref(false)
const showSuccess = ref(false)

// Métodos
const getMessagePlaceholder = (): string => {
  const placeholders: Record<string, string> = {
    'sugerencia-pelicula': 'Cuéntanos por qué crees que deberíamos reseñar esta película...',
    'error-informacion': 'Descríbenos el error que encontraste y en qué página...',
    'colaboracion': 'Cuéntanos sobre tu experiencia con el cine y qué tipo de colaboración te interesa...',
    'feedback-sitio': 'Comparte tus ideas para mejorar CineReviews...',
    'problema-tecnico': 'Describe el problema técnico que experimentaste...',
    'otros': 'Escribe tu mensaje aquí...'
  }

  return placeholders[form.subject] || 'Escribe tu mensaje aquí...'
}

const submitForm = async () => {
  isSubmitting.value = true

  try {
    // Simular envío del formulario
    await new Promise(resolve => setTimeout(resolve, 2000))


    console.log('Formulario enviado:', form)

    // Mostrar mensaje de éxito
    showSuccess.value = true

    // Limpiar formulario después de enviar
    form.name = ''
    form.email = ''
    form.subject = ''
    form.movieTitle = ''
    form.message = ''
    form.newsletter = false

    // Ocultar mensaje después de 5 segundos
    setTimeout(() => {
      showSuccess.value = false
    }, 5000)

  } catch (error) {
    console.error('Error enviando formulario:', error)
    alert('Hubo un error al enviar el mensaje. Por favor intenta de nuevo.')
  } finally {
    isSubmitting.value = false
  }
}
</script>

<style scoped lang="scss">
@use '@/assets/styles/variables' as vars;
@use '@/assets/styles/mixins' as mix;
@use 'sass:color';

// Anidación de selectores para la página de contacto
.contact-page {
  .contact-hero {
    background: linear-gradient(135deg, vars.$primary-color, mix.darken-color(vars.$primary-color, 20%));
    color: white;
    padding: vars.$spacing-xl 0;
    margin-bottom: vars.$spacing-lg;

    h1 {
      font-weight: vars.$font-weight-bold;
      margin-bottom: vars.$spacing-md;
    }

    p {
      font-size: vars.$font-size-base * 1.1;
      opacity: 0.9;
      max-width: 600px;
      margin: 0 auto vars.$spacing-sm;

      &.lead {
        font-size: vars.$font-size-base * 1.3;
        margin-bottom: vars.$spacing-md;
      }
    }
  }

  .contact-form-card {
    @include mix.card-shadow(2);
    border-radius: vars.$card-border-radius;
    border: none;

    .card-header {
      background: linear-gradient(90deg, vars.$primary-color, mix.lighten-color(vars.$primary-color, 10%));
      color: white;
      border-radius: vars.$card-border-radius vars.$card-border-radius 0 0;
      padding: vars.$spacing-lg;

      h3 {
        font-weight: vars.$font-weight-bold;

        i {
          color: mix.lighten-color(vars.$primary-color, 30%);
        }
      }
    }

    .card-body {
      padding: vars.$spacing-xl;

      .form-label {
        font-weight: vars.$font-weight-bold;
        color: vars.$dark-color;
        margin-bottom: vars.$spacing-sm;
      }

      .form-control, .form-select {
        border-radius: calc(vars.$card-border-radius * 0.7);
        border: 2px solid color.scale(vars.$secondary-color, $alpha: -70%);
        padding: vars.$spacing-sm vars.$spacing-md;
        font-size: vars.$font-size-base;

        &:focus {
          border-color: vars.$primary-color;
          box-shadow: 0 0 0 0.2rem color.scale(vars.$primary-color, $alpha: -75%);
        }
      }

      .btn-primary {
        background: linear-gradient(45deg, vars.$primary-color, mix.darken-color(vars.$primary-color, 10%));
        border: none;
        padding: vars.$spacing-md vars.$spacing-xl;
        font-weight: vars.$font-weight-bold;
        border-radius: calc(vars.$card-border-radius * 0.8);

        &:hover {
          background: linear-gradient(45deg, mix.darken-color(vars.$primary-color, 10%), mix.darken-color(vars.$primary-color, 20%));
          transform: translateY(-2px);
        }

        &:disabled {
          opacity: 0.7;
          transform: none;
        }
      }
    }
  }

  .contact-info {
    .contact-method {
      display: flex;
      align-items: flex-start;
      margin-bottom: vars.$spacing-lg;
      padding: vars.$spacing-lg;
      background: vars.$light-color;
      border-radius: vars.$card-border-radius;
      @include mix.card-shadow(1);

      .contact-icon {
        @include mix.flex-center;
        width: 50px;
        height: 50px;
        background: linear-gradient(45deg, vars.$primary-color, vars.$warning-color);
        border-radius: 50%;
        margin-right: vars.$spacing-md;
        flex-shrink: 0;

        i {
          color: white;
          font-size: vars.$font-size-base * 1.2;
        }
      }

      .contact-details {
        h5 {
          color: vars.$dark-color;
          font-weight: vars.$font-weight-bold;
          margin-bottom: vars.$spacing-xs;
        }

        p {
          color: vars.$secondary-color;
          margin-bottom: 0;
          line-height: 1.5;
        }
      }
    }
  }

  .faq-section {
    .accordion {
      .accordion-item {
        border: 1px solid color.scale(vars.$secondary-color, $alpha: -80%);
        border-radius: vars.$card-border-radius;
        margin-bottom: vars.$spacing-sm;

        .accordion-header {
          .accordion-button {
            font-weight: vars.$font-weight-bold;
            color: vars.$dark-color;
            background-color: vars.$light-color;
            border-radius: vars.$card-border-radius;

            &:not(.collapsed) {
              background-color: vars.$primary-color;
              color: white;
            }

            &:focus {
              box-shadow: 0 0 0 0.25rem color.scale(vars.$primary-color, $alpha: -75%);
            }
          }
        }

        .accordion-body {
          background-color: white;
          color: vars.$secondary-color;
          line-height: 1.6;
        }
      }
    }
  }

  .alert-success {
    background-color: mix.lighten-color(#198754, 40%);
    border-color: #198754;
    color: #0f5132;
    border-radius: vars.$card-border-radius;

    i {
      color: #198754;
    }
  }
}

// Uso de interpolación para responsive design
@include mix.respond-to(#{vars.$tablet}) {
  .contact-page {
    .contact-hero {
      padding: vars.$spacing-xl * 1.5 0;

      h1 {
        font-size: 3.5rem;
      }
    }

    .contact-form-card .card-body {
      padding: vars.$spacing-xl * 1.5;
    }
  }
}
</style>
