<template>
  <div class="container">
    <h1>Cadastrar Animal</h1>

    <div v-if="step === 1">
      <form @submit.prevent="proceedToNextStep">
        <div class="form-group">
          <label for="photo">Foto do Animal:</label>
          <input type="file" @change="handleFileUpload" id="photo" required />
        </div>

        <button type="submit" :disabled="!file">
          Continuar
        </button>
      </form>
    </div>

    <div v-if="step === 2">
      <form @submit.prevent="submitAnimal">
        <div class="form-group">
          <label for="name">Nome do Animal:</label>
          <input v-model="animal.name" type="text" id="name" required />
        </div>

        <div class="form-group">
          <label for="owner">Nome do Dono:</label>
          <input v-model="animal.owner" type="text" id="owner" required />
        </div>

        <div class="form-group">
          <label for="species">Espécie:</label>
          <select v-model="animal.species" id="species" required>
            <option value="Cachorro">Cachorro</option>
            <option value="Gato">Gato</option>
            <option value="Outro">Outro</option>
          </select>
        </div>

        <div class="form-group">
          <label for="phone">Telefone do Dono:</label>
          <input v-model="animal.phone" type="tel" id="phone" required />
        </div>

        <div class="form-group preview">
          <p><strong>Pré-visualização da Foto:</strong></p>
          <img :src="previewImage" alt="Pré-visualização da foto" v-if="previewImage" width="150" />
        </div>

        <button type="submit" :disabled="loading">
          {{ loading ? "Cadastrando..." : "Cadastrar Animal" }}
        </button>

        <p v-if="message" class="success-message">{{ message }}</p>
        <p v-if="error" class="error-message">{{ error }}</p>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import axios from "axios";
import { useRouter } from "vue-router";

const router = useRouter();
const step = ref(1);
const animal = ref({
  name: "",
  owner: "",
  species: "",
  phone: "",
});
const file = ref(null);
const previewImage = ref("");
const loading = ref(false);
const message = ref("");
const error = ref("");

const handleFileUpload = (event) => {
  const selectedFile = event.target.files[0];

  if (selectedFile) {
    file.value = selectedFile;
    previewImage.value = URL.createObjectURL(selectedFile);
  }
};

const proceedToNextStep = () => {
  if (file.value) {
    step.value = 2;
  }
};

const submitAnimal = async () => {
  loading.value = true;
  message.value = "";
  error.value = "";

  try {
    const formData = new FormData();
    formData.append("name", animal.value.name);
    formData.append("owner", animal.value.owner);
    formData.append("species", animal.value.species);
    formData.append("phone", animal.value.phone);
    formData.append("photo", file.value); 

    await axios.post("http://127.0.0.1:8000/api/animals/", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    message.value = "Animal cadastrado com sucesso!";
  } catch (err) {
    error.value = "Erro ao cadastrar o animal. Tente novamente.";
  } finally {
    loading.value = false;
  }
};
</script>

<style scoped>
.container {
  max-width: 500px;
  margin: auto;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 8px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  background: white;
}

h1 {
  text-align: center;
  margin-bottom: 20px;
}

.form-group {
  margin-bottom: 15px;
}

label {
  display: block;
  font-weight: bold;
  margin-bottom: 5px;
}

input, select {
  width: 100%;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

button {
  width: 100%;
  padding: 10px;
  background: #28a745;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

button:disabled {
  background: #ccc;
}

.preview img {
  margin-top: 10px;
  border-radius: 8px;
}

.success-message {
  color: green;
  text-align: center;
  margin-top: 10px;
}

.error-message {
  color: red;
  text-align: center;
  margin-top: 10px;
}
</style>
