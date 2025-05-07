<template>
  <div class="petfinder-app">
    <!-- Navbar fixa -->
    <nav class="navbar default-navbar" :class="{ 'hidden-nav': scrolled }">
      <div class="nav-container">
        <div class="nav-flex">
          <div class="nav-logo">
            <a href="#" class="logo-link" @click.prevent="scrollToTop">
              <font-awesome-icon :icon="['fas', 'paw']" class="logo-icon" />
              <span class="logo-text">Petfinder</span>
            </a>
          </div>
          <div class="nav-links">
            <a href="#features" class="nav-link" @click.prevent="scrollToSection('features')">Recursos</a>
            <a href="#how-it-works" class="nav-link" @click.prevent="scrollToSection('how-it-works')">Como funciona</a>
            <a href="#testimonials" class="nav-link" @click.prevent="scrollToSection('testimonials')">Depoimentos</a>
          </div>
          <div class="mobile-menu-button">
            <button @click="toggleMenu" class="menu-btn">
              <font-awesome-icon :icon="['fas', 'bars']" class="menu-icon" />
            </button>
          </div>
        </div>
      </div>

      <div class="mobile-menu" :class="{ 'mobile-menu-open': menuOpen }">
        <ul class="mobile-menu-list">
          <li><a href="#features" class="mobile-menu-link" @click.prevent="scrollToSection('features')">Recursos</a>
          </li>
          <li><a href="#how-it-works" class="mobile-menu-link" @click.prevent="scrollToSection('how-it-works')">Como
              funciona</a></li>
          <li><a href="#testimonials" class="mobile-menu-link"
              @click.prevent="scrollToSection('testimonials')">Depoimentos</a></li>
        </ul>
      </div>
    </nav>

    <nav class="navbar scrolled-navbar" :class="{ 'visible-nav': scrolled }">
      <div class="nav-container">
        <div class="nav-flex">
          <div class="nav-logo">
            <a href="#" class="logo-link" @click.prevent="scrollToTop">
              <font-awesome-icon :icon="['fas', 'paw']" class="logo-icon" />
              <span class="logo-text">Petfinder</span>
            </a>
          </div>
          <div class="nav-links">
            <a href="#features" class="nav-link" @click.prevent="scrollToSection('features')">Recursos</a>
            <a href="#how-it-works" class="nav-link" @click.prevent="scrollToSection('how-it-works')">Como funciona</a>
            <a href="#testimonials" class="nav-link" @click.prevent="scrollToSection('testimonials')">Depoimentos</a>
          </div>
          <div class="mobile-menu-button">
            <button @click="toggleMenu" class="menu-btn">
              <font-awesome-icon :icon="['fas', 'bars']" class="menu-icon" />
            </button>
          </div>
        </div>
      </div>

      <div class="mobile-menu" :class="{ 'mobile-menu-open': menuOpen }">
        <ul class="mobile-menu-list">
          <li><a href="#features" class="mobile-menu-link" @click.prevent="scrollToSection('features')">Recursos</a>
          </li>
          <li><a href="#how-it-works" class="mobile-menu-link" @click.prevent="scrollToSection('how-it-works')">Como
              funciona</a></li>
          <li><a href="#testimonials" class="mobile-menu-link"
              @click.prevent="scrollToSection('testimonials')">Depoimentos</a></li>
        </ul>
      </div>
    </nav>

    <section class="hero-section">
      <div class="hero-container">
        <div class="hero-content">
          <h1 class="hero-title">Nunca mais perca seu pet!</h1>
          <p class="hero-text">Cadastre seu animal de estimação e gere um QR Code único para colocar na coleira. Se
            alguém encontrar seu pet, poderá escanear e entrar em contato com você imediatamente.</p>
          <button class="hero-button" @click="navigateToRegister">
            Cadastrar meu pet
          </button>
        </div>
        <div class="hero-image">
          <img src="https://cdn-icons-png.flaticon.com/512/616/616408.png" alt="Dog with QR Code" class="hero-img">
        </div>
      </div>
    </section>

    <section id="features" class="features-section">
      <div class="features-container">
        <h2 class="section-title">Recursos do Petfinder</h2>
        <div class="features-grid">
          <div class="feature-card">
            <div class="feature-icon">
              <font-awesome-icon :icon="['fas', 'qrcode']" class="menu-icon" />
            </div>
            <h3 class="feature-title">QR Code Único</h3>
            <p class="feature-text">Cada pet recebe um QR Code exclusivo que contém todas as informações importantes.
            </p>
          </div>
          <div class="feature-card">
            <div class="feature-icon">
              <font-awesome-icon :icon="['fas', 'mobile-alt']" />
            </div>
            <h3 class="feature-title">Notificação Instantânea</h3>
            <p class="feature-text">Receba uma notificação imediata quando alguém escanear o QR Code do seu pet.</p>
          </div>
          <div class="feature-card">
            <div class="feature-icon">
              <font-awesome-icon :icon="['fas', 'shield-alt']" />
            </div>
            <h3 class="feature-title">Segurança</h3>
            <p class="feature-text">Suas informações pessoais são protegidas e só são reveladas quando você desejar.</p>
          </div>
        </div>
      </div>
    </section>

    <section id="how-it-works" class="how-it-works-section">
      <div class="how-it-works-container">
        <h2 class="section-title">Como funciona</h2>
        <div class="how-it-works-content">
          <div class="how-it-works-image">
            <img src="https://cdn-icons-png.flaticon.com/512/2171/2171991.png" alt="Steps illustration"
              class="how-it-works-img">
          </div>
          <div class="how-it-works-steps">
            <div class="step">
              <div class="step-number">1</div>
              <div class="step-content">
                <h3 class="step-title">Cadastre seu pet</h3>
                <p class="step-text">Preencha o formulário com as informações do seu animal de estimação.</p>
              </div>
            </div>
            <div class="step">
              <div class="step-number">2</div>
              <div class="step-content">
                <h3 class="step-title">Gere o QR Code</h3>
                <p class="step-text">Nosso sistema gera automaticamente um QR Code personalizado.</p>
              </div>
            </div>
            <div class="step">
              <div class="step-number">3</div>
              <div class="step-content">
                <h3 class="step-title">Imprima e cole</h3>
                <p class="step-text">Imprima o QR Code e cole na coleira do seu pet. Pronto para usar!</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section id="testimonials" class="testimonials-section">
      <div class="testimonials-container">
        <h2 class="section-title">O que dizem sobre nós</h2>
        <div class="testimonials-grid">
          <div class="testimonial-card">
            <div class="testimonial-author">
              <img src="https://randomuser.me/api/portraits/women/44.jpg" alt="User" class="author-avatar">
              <div class="author-info">
                <h4 class="author-name">Ana Silva</h4>
                <p class="author-title">Dona do Bob</p>
              </div>
            </div>
            <p class="testimonial-text">"O Petfinder salvou meu Bob duas vezes! Graças ao QR Code na coleira, ele sempre
              volta para casa."</p>
          </div>
          <div class="testimonial-card">
            <div class="testimonial-author">
              <img src="https://randomuser.me/api/portraits/men/32.jpg" alt="User" class="author-avatar">
              <div class="author-info">
                <h4 class="author-name">Carlos Oliveira</h4>
                <p class="author-title">Dono da Luna</p>
              </div>
            </div>
            <p class="testimonial-text">"Encontrei um gato com o QR Code do Petfinder e pude entrar em contato com os
              donos em minutos. Sistema incrível!"</p>
          </div>
          <div class="testimonial-card">
            <div class="testimonial-author">
              <img src="https://randomuser.me/api/portraits/women/68.jpg" alt="User" class="author-avatar">
              <div class="author-info">
                <h4 class="author-name">Mariana Costa</h4>
                <p class="author-title">Dona do Thor</p>
              </div>
            </div>
            <p class="testimonial-text">"Meu cachorro é muito curioso e sempre foge. Com o Petfinder, tenho paz de
              espírito sabendo que ele pode ser encontrado facilmente."</p>
          </div>
        </div>
      </div>
    </section>

    <section class="cta-section">
      <div class="cta-container">
        <h2 class="cta-title">Proteja seu pet hoje mesmo!</h2>
        <p class="cta-text">Cadastre seu animal de estimação e tenha a tranquilidade de saber que ele sempre poderá
          voltar para casa.</p>
        <button @click="navigateToRegister" class="cta-button">Começar agora</button>
      </div>
    </section>

    <footer class="footer">
      <div class="footer-container">
        <div class="footer-content">
          <div class="footer-logo">
            <a href="#" class="footer-logo-link">
              <font-awesome-icon :icon="['fas', 'paw']" class="footer-logo-icon" />
              <span class="footer-logo-text">Petfinder</span>
            </a>
          </div>
          <div class="footer-copyright">
            <p>&copy; 2023 Petfinder. Todos os direitos reservados.</p>
          </div>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const menuOpen = ref(false)
const showModal = ref(false)
const scrolled = ref(false)

const handleScroll = () => {
  scrolled.value = window.scrollY > 100
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})

const navigateToRegister = () => {
  navigateTo('/register')
}


const toggleMenu = () => {
  menuOpen.value = !menuOpen.value
}

const scrollToSection = (sectionId) => {
  if (menuOpen.value) {
    menuOpen.value = false
  }

  const section = document.getElementById(sectionId)
  if (section) {
    const navbarHeight = document.querySelector('.fixed-navbar').offsetHeight
    const sectionPosition = section.getBoundingClientRect().top + window.pageYOffset - navbarHeight

    window.scrollTo({
      top: sectionPosition,
      behavior: 'smooth'
    })
  }
}

const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  })
}
</script>

<style>
.fixed-navbar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
}

.default-navbar {
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  background-color: transparent;
  transition: all 0.4s ease-out;
}

.default-navbar.hidden-nav {
  opacity: 0;
  transform: translateY(-100%);
}

.scrolled-navbar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  background-color: rgba(0, 0, 0, 0.9);
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
  opacity: 0;
  transform: translateY(-100%);
  transition: all 0.4s ease-out;
}

.scrolled-navbar.visible-nav {
  opacity: 1;
  transform: translateY(0);
}

.content-wrapper {
  padding-top: 70px;
}

html {
  scroll-behavior: smooth;
}

@media (prefers-reduced-motion: reduce) {
  html {
    scroll-behavior: auto;
  }
}

.navbar {
  transition: all 0.3s ease;
}

.scrolled-nav {
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  background-color: rgba(255, 255, 255, 0.98);
}

.petfinder-app {
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  line-height: 1.6;
  color: #333;
}

.navbar {
  background-color: white;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
}

.nav-container {
  max-width: 72rem;
  margin: 0 auto;
  padding: 0 1rem;
}

.nav-flex {
  display: flex;
  justify-content: space-between;
}

.nav-logo {
  display: flex;
  align-items: center;
}

.logo-link {
  display: flex;
  align-items: center;
  padding: 1rem 0.5rem;
  text-decoration: none;
}

.logo-icon {
  color: #4f46e5;
  font-size: 1.5rem;
  margin-right: 0.5rem;
}

.logo-text {
  font-weight: 600;
  color: #111827;
  font-size: 1.125rem;
}

.nav-links {
  display: none;
  align-items: center;
  gap: 0.25rem;
}

@media (min-width: 768px) {
  .nav-links {
    display: flex;
  }
}

.nav-link {
  padding: 1rem 0.5rem;
  color: #374151;
  text-decoration: none;
  transition: color 0.3s;
}

.nav-link:hover {
  color: #4f46e5;
}

.mobile-menu-button {
  display: flex;
  align-items: center;
}

@media (min-width: 768px) {
  .mobile-menu-button {
    display: none;
  }
}

.menu-btn {
  outline: none;
  background: none;
  border: none;
  cursor: pointer;
}

.menu-icon {
  color: #374151;
  font-size: 1.25rem;
}

.mobile-menu {
  display: none;
}

.mobile-menu-open {
  display: block;
}

.mobile-menu-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.mobile-menu-link {
  display: block;
  padding: 0.5rem 1rem;
  font-size: 0.875rem;
  color: #374151;
  text-decoration: none;
  transition: all 0.3s;
}

.mobile-menu-link:hover {
  background-color: #4f46e5;
  color: white;
}

.hero-section {
  background: linear-gradient(135deg, #6B73FF 0%, #000DFF 100%);
  color: white;
  padding: 5rem 0;
}

.hero-container {
  max-width: 72rem;
  margin: 0 auto;
  padding: 0 1.5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
}

@media (min-width: 768px) {
  .hero-container {
    flex-direction: row;
  }
}

.hero-content {
  width: 100%;
  margin-bottom: 2.5rem;
}

@media (min-width: 768px) {
  .hero-content {
    width: 50%;
    margin-bottom: 0;
  }
}

.hero-title {
  font-size: 2.25rem;
  font-weight: 700;
  line-height: 1.2;
  margin-bottom: 1.5rem;
}

@media (min-width: 768px) {
  .hero-title {
    font-size: 3.75rem;
  }
}

.hero-text {
  font-size: 1.25rem;
  margin-bottom: 2rem;
}

.hero-button {
  background-color: white;
  color: #4f46e5;
  padding: 0.75rem 2rem;
  border-radius: 9999px;
  font-weight: 700;
  text-transform: uppercase;
  border: none;
  cursor: pointer;
  transition: background-color 0.3s;
}

.hero-button:hover {
  background-color: #f3f4f6;
}

.hero-image {
  width: 100%;
  display: flex;
  justify-content: center;
}

@media (min-width: 768px) {
  .hero-image {
    width: 50%;
  }
}

.hero-img {
  width: 16rem;
  height: 16rem;
}

@media (min-width: 768px) {
  .hero-img {
    width: 20rem;
    height: 20rem;
  }
}

@media (max-width: 768px) {
  .hero-img {
    display: none;
  }
}

.features-section {
  padding: 5rem 0;
  background-color: #f9fafb;
}

.features-container {
  max-width: 72rem;
  margin: 0 auto;
  padding: 0 1.5rem;
}

.section-title {
  font-size: 1.875rem;
  font-weight: 700;
  text-align: center;
  color: #1f2937;
  margin-bottom: 3rem;
}

.features-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 2rem;
}

@media (min-width: 768px) {
  .features-grid {
    grid-template-columns: repeat(3, 1fr);
  }
}

.feature-card {
  background-color: white;
  padding: 1.5rem;
  border-radius: 0.5rem;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  transition: all 0.3s;
}

.feature-card:hover {
  transform: translateY(-0.3125rem);
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
}

.feature-icon {
  color: #4f46e5;
  margin-bottom: 1rem;
  font-size: 2.25rem;
}

.feature-title {
  font-size: 1.25rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
  color: #1f2937;
}

.feature-text {
  color: #6b7280;
}

.how-it-works-section {
  padding: 5rem 0;
}

.how-it-works-container {
  max-width: 72rem;
  margin: 0 auto;
  padding: 0 1.5rem;
}

.how-it-works-content {
  display: flex;
  flex-direction: column;
  align-items: center;
}

@media (min-width: 768px) {
  .how-it-works-content {
    flex-direction: row;
  }
}

.how-it-works-image {
  width: 100%;
  margin-bottom: 2.5rem;
}

@media (min-width: 768px) {
  .how-it-works-image {
    width: 50%;
    margin-bottom: 0;
  }
}

.how-it-works-img {
  width: 100%;
  max-width: 24rem;
  margin: 0 auto;
  display: block;
}

@media (max-width: 768px) {
  .how-it-works-image {
    display: none;
  }
}

.how-it-works-steps {
  width: 100%;
}

@media (min-width: 768px) {
  .how-it-works-steps {
    width: 50%;
    padding-left: 2rem;
  }
}

.step {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 2rem;
}

.step-number {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 3rem;
  height: 3rem;
  border-radius: 9999px;
  background-color: #4f46e5;
  color: white;
  font-weight: 700;
  font-size: 1.25rem;
  flex-shrink: 0;
}

.step-content {
  margin-left: 1rem;
}

.step-title {
  font-size: 1.125rem;
  font-weight: 600;
  color: #1f2937;
}

.step-text {
  color: #6b7280;
  margin-top: 0.5rem;
}

.testimonials-section {
  padding: 5rem 0;
  background-color: #f9fafb;
}

.testimonials-container {
  max-width: 72rem;
  margin: 0 auto;
  padding: 0 1.5rem;
}

.testimonials-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 2rem;
}

@media (min-width: 768px) {
  .testimonials-grid {
    grid-template-columns: repeat(3, 1fr);
  }
}

.testimonial-card {
  background-color: white;
  padding: 1.5rem;
  border-radius: 0.5rem;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
}

.testimonial-author {
  display: flex;
  align-items: center;
  margin-bottom: 1rem;
}

.author-avatar {
  width: 3rem;
  height: 3rem;
  border-radius: 9999px;
  margin-right: 1rem;
}

.author-name {
  font-weight: 600;
  color: #1f2937;
}

.author-title {
  color: #6b7280;
  font-size: 0.875rem;
}

.testimonial-text {
  color: #6b7280;
  font-style: italic;
}

.cta-section {
  background: linear-gradient(135deg, #6B73FF 0%, #000DFF 100%);
  color: white;
  padding: 4rem 0;
  text-align: center;
}

.cta-container {
  max-width: 72rem;
  margin: 0 auto;
  padding: 0 1.5rem;
}

.cta-title {
  font-size: 1.875rem;
  font-weight: 700;
  margin-bottom: 1.5rem;
}

.cta-text {
  font-size: 1.25rem;
  margin-bottom: 2rem;
  max-width: 42rem;
  margin-left: auto;
  margin-right: auto;
}

.cta-button {
  background-color: white;
  color: #4f46e5;
  padding: 0.75rem 2rem;
  border-radius: 9999px;
  font-weight: 700;
  text-transform: uppercase;
  border: none;
  cursor: pointer;
  transition: background-color 0.3s;
}

.cta-button:hover {
  background-color: #f3f4f6;
}

.footer {
  background-color: #1f2937;
  color: white;
  padding: 2rem 0;
}

.footer-container {
  max-width: 72rem;
  margin: 0 auto;
  padding: 0 1.5rem;
}

.footer-content {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
}

@media (min-width: 768px) {
  .footer-content {
    flex-direction: row;
  }
}

.footer-logo {
  margin-bottom: 1rem;
}

@media (min-width: 768px) {
  .footer-logo {
    margin-bottom: 0;
  }
}

.footer-logo-link {
  display: flex;
  align-items: center;
  text-decoration: none;
}

.footer-logo-icon {
  color: #818cf8;
  font-size: 1.5rem;
  margin-right: 0.5rem;
}

.footer-logo-text {
  font-weight: 600;
  font-size: 1.25rem;
  color: white;
}

.footer-copyright {
  font-size: 0.875rem;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>