import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

// Importar estilos principales (incluye Bootstrap)
import '@/assets/styles/main.scss'

// Importar Bootstrap Icons
import 'bootstrap-icons/font/bootstrap-icons.css'

// Importar JS de Bootstrap para componentes interactivos
import 'bootstrap/dist/js/bootstrap.bundle.min.js'

const app = createApp(App)
app.use(router)
app.mount('#app')
