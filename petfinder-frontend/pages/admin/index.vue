<template>
  <div>
    <div v-if="!isAuthenticated">
      <h2>Login de Administrador</h2>
      <form @submit.prevent="login">
        <label for="username">Usuário:</label>
        <input type="text" id="username" v-model="username" required />

        <label for="password">Senha:</label>
        <input type="password" id="password" v-model="password" required />

        <button type="submit">Entrar</button>
      </form>

      <p v-if="errorMessage" class="error">{{ errorMessage }}</p>
    </div>

    <div v-else>
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

      <button @click="logout">Sair</button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useAnimalStore } from "~/store/animals";
import axios from "axios";

const store = useAnimalStore();
const username = ref("");
const password = ref("");
const isAuthenticated = ref(false);
const errorMessage = ref("");

const login = async () => {
  try {
    const response = await axios.post("http://localhost:8000/api/token/", {
      username: username.value,
      password: password.value,
    });

    localStorage.setItem("token", response.data.access);

    const superUserResponse = await axios.get("http://localhost:8000/api/check-superuser/", {
      headers: { Authorization: `Bearer ${response.data.access}` },
    });

    if (superUserResponse.data.is_superuser) {
      isAuthenticated.value = true;
      errorMessage.value = "";
      await store.fetchAnimals();
    } else {
      errorMessage.value = "Você não tem permissão para acessar esta página.";
      logout();
    }
  } catch (error) {
    errorMessage.value = "Usuário ou senha inválidos.";
  }
};

const logout = () => {
  localStorage.removeItem("token");
  isAuthenticated.value = false;
};

onMounted(async () => {
  const token = localStorage.getItem("token");
  if (token) {
    try {
      const superUserResponse = await axios.get("http://localhost:8000/api/check-superuser/", {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (superUserResponse.data.is_superuser) {
        isAuthenticated.value = true;
        await store.fetchAnimals();
      } else {
        logout();
      }
    } catch {
      logout();
    }
  }
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

.error {
  color: red;
  font-weight: bold;
}

form {
  display: flex;
  flex-direction: column;
  max-width: 300px;
  margin: auto;
}

input {
  margin-bottom: 10px;
  padding: 8px;
}
</style>
