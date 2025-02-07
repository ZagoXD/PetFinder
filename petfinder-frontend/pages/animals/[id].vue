<template>
  <div v-if="loading" class="loading-container">
    <p>Carregando...</p>
  </div>

  <div v-else-if="validToken" class="container">
    <h1>{{ animal?.name }}</h1>
    <p><strong>Espécie:</strong> {{ animal?.species }}</p>
    <p><strong>Dono:</strong> {{ animal?.owner }}</p>
    <p><strong>Telefone:</strong> {{ animal?.phone }}</p>
    <img :src="animal?.photo" alt="Foto do Animal" class="animal-photo" />
  </div>

  <div v-else class="error-container">
    <h2>Acesso Negado</h2>
    <p>Você não tem permissão para acessar esta página.</p>
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
.container {
  max-width: 500px;
  margin: auto;
  padding: 20px;
  text-align: center;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  background: #fff;
}

.loading-container {
  text-align: center;
  font-size: 18px;
  font-weight: bold;
  color: #555;
  margin-top: 50px;
}

.animal-photo {
  max-width: 100%;
  height: auto;
  border-radius: 8px;
  margin-top: 10px;
}

.error-container {
  text-align: center;
  color: red;
  font-weight: bold;
  margin-top: 50px;
}
</style>
