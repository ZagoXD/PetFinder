<template>
    <div v-if="animal">
      <h1>{{ animal.name }}</h1>
      <img :src="animal.photo" alt="Foto do Animal" width="200" />
      <p><strong>Espécie:</strong> {{ animal.species }}</p>
      <p><strong>Nome do Dono:</strong> {{ animal.owner }}</p>
      <p><strong>Telefone do Dono:</strong> {{ animal.phone }}</p>
    </div>
    <p v-else>Carregando...</p>
  </template>
  
  <script setup>
  import { ref, onMounted } from "vue";
  import { useRoute } from "vue-router";
  import axios from "axios";
  
  const route = useRoute();
  const animal = ref(null);
  
  const fetchAnimal = async () => {
    try {
      const response = await axios.get(`http://127.0.0.1:8000/api/animals/${route.params.id}/`);
      animal.value = response.data;
    } catch (error) {
      console.error("Erro ao buscar o animal:", error);
    }
  };
  
  onMounted(fetchAnimal);
  </script>
  