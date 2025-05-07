import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faCamera, faPaw, faSpinner, faCheckCircle, faDownload, faPlus, faQrcode, faMobileAlt, faShieldAlt, faBars, faUser, faPhone } from '@fortawesome/free-solid-svg-icons' 

library.add(faCamera)
library.add(faPaw)
library.add(faSpinner)
library.add(faCheckCircle)
library.add(faDownload)
library.add(faPlus)
library.add(faQrcode)
library.add(faMobileAlt)
library.add(faShieldAlt)
library.add(faBars)
library.add(faUser)
library.add(faPhone)

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.component('font-awesome-icon', FontAwesomeIcon)
})
