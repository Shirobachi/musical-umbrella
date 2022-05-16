import App from './App.vue'
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import router from './router'
import './index.css'
import Toast from "vue-toastification";
import "vue-toastification/dist/index.css";
import 'sweetalert2/dist/sweetalert2.min.css';

const app = createApp(App)
const pinia = createPinia()

app.use(pinia)
app.use(router)
app.use(Toast, {
	position: "bottom-right",
	timeout: 3000,
})

app.mount('#app')