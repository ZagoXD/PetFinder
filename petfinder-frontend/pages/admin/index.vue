<template>
    <div>
      <h1>Animais Cadastrados</h1>
      <ul v-if="store.animals.length > 0">
        <li v-for="animal in store.animals" :key="animal.id">
          <img :src="animal.photo" alt="Foto do animal" width="100" />
          <p><strong>Nome:</strong> {{ animal.name }}</p>
          <p><strong>Espécie:</strong> {{ animal.species }}</p>
          <p><strong>Telefone do Dono:</strong> {{ animal.phone }}</p>
          <img v-if="animal.qr_code" :src="animal.qr_code" alt="QR Code" width="100" />
  
          <button @click="removeAnimal(animal.id)">Remover</button>
        </li>
      </ul>
      <p v-else>Nenhum animal cadastrado ainda.</p>
    </div>
  </template>
  
  <script setup>
  import { onMounted } from "vue";
  import { useAnimalStore } from "~/store/animals";
  
  const store = useAnimalStore();
  
  const removeAnimal = async (id) => {
    if (confirm("Tem certeza que deseja remover este animal?")) {
      await store.deleteAnimal(id);
    }
  };
  
  onMounted(async () => {
    await store.fetchAnimals();
  });
  </script>
  
  <style scoped>
  button {
    background-color: red;
    color: white;
    padding: 5px 10px;
    border: none;
    cursor: pointer;
    margin-top: 5px;
  }
  
  button:hover {
    background-color: darkred;
  }
  </style>
  