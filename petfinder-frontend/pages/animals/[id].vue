<template>
  <div class="animal-view">
    <!-- Header com o mesmo estilo da navbar -->
    <header class="animal-header">
      <NuxtLink to="/" class="logo-link">
        <font-awesome-icon :icon="['fas', 'paw']" class="logo-icon" />
        <span class="logo-text">Petfinder</span>
      </NuxtLink>
    </header>

    <main class="animal-main">
      <div v-if="loading" class="loading-container">
        <div class="loading-spinner">
          <font-awesome-icon :icon="['fas', 'spinner']" spin />
        </div>
        <p class="loading-text">Carregando informações do pet...</p>
      </div>

      <div v-else-if="validToken" class="animal-card">
        <h1 class="animal-name">{{ animal?.name }}</h1>

        <div class="animal-photo-container">
          <img :src="animal?.photo" :alt="`Foto de ${animal?.name}`" class="animal-photo" />
        </div>

        <div class="animal-details">
          <div class="detail-item">
            <font-awesome-icon :icon="['fas', 'paw']" class="detail-icon" />
            <div>
              <h3 class="detail-label">Espécie</h3>
              <p class="detail-value">{{ animal?.species }}</p>
            </div>
          </div>

          <div class="detail-item">
            <font-awesome-icon :icon="['fas', 'user']" class="detail-icon" />
            <div>
              <h3 class="detail-label">Dono</h3>
              <p class="detail-value">{{ animal?.owner }}</p>
            </div>
          </div>

          <div class="detail-item">
            <font-awesome-icon :icon="['fas', 'phone']" class="detail-icon" />
            <div>
              <h3 class="detail-label">Telefone</h3>
              <p class="detail-value">{{ animal?.phone }}</p>
            </div>
          </div>
        </div>

        <div class="contact-box">
          <p>Se encontrou este animal, entre em contato com o dono imediatamente.</p>
          <a :href="`tel:${animal?.phone}`" class="contact-button">
            <font-awesome-icon :icon="['fas', 'phone']" /> Ligar para o dono
          </a>
        </div>
      </div>

      <div v-else class="error-container">
        <div class="error-icon">
          <font-awesome-icon :icon="['fas', 'exclamation-triangle']" />
        </div>
        <h2 class="error-title">Acesso Negado</h2>
        <p class="error-message">Você não tem permissão para acessar esta página.</p>
        <NuxtLink to="/" class="home-link">
          Voltar para a página inicial
        </NuxtLink>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import { useAnimalStore } from "@/store/animals";

const route = useRoute();
const store = useAnimalStore();

const animal = ref(null);
const validToken = ref(false);
const loading = ref(true);

onMounted(async () => {
  const animalId = route.params.id;
  const token = route.query.token;

  if (!token) {
    validToken.value = false;
    loading.value = false;
    return;
  }

  const { animal: fetchedAnimal, validToken: isValid } = await store.fetchAnimalById(animalId, token);

  animal.value = fetchedAnimal;
  validToken.value = isValid;
  loading.value = false;
});
</script>

<style scoped>
.animal-view {
  min-height: 100vh;
  background-color: #f8f9fa;
}

.animal-header {
  background-color: white;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  padding: 1rem 2rem;
}

.logo-link {
  display: flex;
  align-items: center;
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
  font-size: 1.25rem;
}

.animal-main {
  max-width: 1200px;
  margin: 2rem auto;
  padding: 0 1rem;
}

.loading-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 50vh;
}

.loading-spinner {
  font-size: 3rem;
  color: #4f46e5;
  margin-bottom: 1rem;
}

.loading-text {
  font-size: 1.25rem;
  color: #6b7280;
}

.animal-card {
  background-color: white;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  padding: 2rem;
  max-width: 600px;
  margin: 0 auto;
}

.animal-name {
  color: #1f2937;
  font-size: 2rem;
  font-weight: 700;
  text-align: center;
  margin-bottom: 1.5rem;
  position: relative;
}

.animal-name::after {
  content: '';
  display: block;
  width: 60px;
  height: 4px;
  background: linear-gradient(135deg, #6B73FF 0%, #000DFF 100%);
  margin: 0.5rem auto 0;
  border-radius: 2px;
}

.animal-photo-container {
  margin: 1.5rem 0;
  text-align: center;
}

.animal-photo {
  max-width: 100%;
  max-height: 400px;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  object-fit: cover;
}

.animal-details {
  margin: 2rem 0;
}

.detail-item {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1.5rem;
  padding: 1rem;
  background-color: #f9fafb;
  border-radius: 8px;
}

.detail-icon {
  font-size: 1.5rem;
  color: #4f46e5;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #e0e7ff;
  border-radius: 50%;
}

.detail-label {
  font-size: 0.875rem;
  color: #6b7280;
  margin-bottom: 0.25rem;
}

.detail-value {
  font-size: 1.125rem;
  color: #1f2937;
  font-weight: 600;
  margin: 0;
}

.contact-box {
  background-color: #f0f5ff;
  border-radius: 8px;
  padding: 1.5rem;
  margin-top: 2rem;
  text-align: center;
  border-left: 4px solid #4f46e5;
}

.contact-box p {
  color: #4b5563;
  margin-bottom: 1rem;
}

.contact-button {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.5rem;
  background: linear-gradient(135deg, #6B73FF 0%, #000DFF 100%);
  color: white;
  border-radius: 8px;
  text-decoration: none;
  font-weight: 600;
  transition: all 0.3s;
}

.contact-button:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 13, 255, 0.2);
}

.error-container {
  background-color: white;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  padding: 3rem 2rem;
  max-width: 600px;
  margin: 0 auto;
  text-align: center;
}

.error-icon {
  font-size: 3rem;
  color: #ef4444;
  margin-bottom: 1.5rem;
}

.error-title {
  color: #1f2937;
  font-size: 1.75rem;
  margin-bottom: 1rem;
}

.error-message {
  color: #6b7280;
  margin-bottom: 2rem;
}

.home-link {
  display: inline-block;
  padding: 0.75rem 1.5rem;
  background-color: #f3f4f6;
  color: #4f46e5;
  border-radius: 8px;
  text-decoration: none;
  font-weight: 600;
  transition: all 0.3s;
}

.home-link:hover {
  background-color: #e0e7ff;
}

@media (max-width: 640px) {
  .animal-card {
    padding: 1.5rem;
  }

  .animal-name {
    font-size: 1.75rem;
  }

  .detail-item {
    flex-direction: column;
    text-align: center;
  }

  .detail-icon {
    margin-bottom: 0.5rem;
  }
}
</style>