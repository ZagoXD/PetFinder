<template>
  <div v-if="validToken" class="container">
    <h1>{{ animal.name }}</h1>
    <p><strong>Espécie:</strong> {{ animal.species }}</p>
    <p><strong>Dono:</strong> {{ animal.owner }}</p>
    <p><strong>Telefone:</strong> {{ animal.phone }}</p>
    <img :src="animal.photo" alt="Foto do Animal" class="animal-photo" />
  </div>

  <div v-else class="error-container">
    <h2>Acesso Negado</h2>
    <p>Você não tem permissão para acessar esta página.</p>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import axios from "axios";

const route = useRoute();
const animal = ref(null);
const validToken = ref(false);

onMounted(async () => {
  const animalId = route.params.id;
  const token = route.query.token;

  if (!token) {
    validToken.value = false;
    return;
  }

  try {
    const response = await axios.get(`http://127.0.0.1:8000/api/animals/${animalId}/`);
    if (response.data.access_token === token) {
      animal.value = response.data;
      validToken.value = true;
    } else {
      validToken.value = false;
    }
  } catch (error) {
    validToken.value = false;
  }
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
