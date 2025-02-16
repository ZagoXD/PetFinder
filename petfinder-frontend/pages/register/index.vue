<template>
    <div class="container">
      <h1>Cadastrar Animal</h1>
  
      <div v-if="step === 1">
        <form @submit.prevent="validateAnimalImage">
          <div class="form-group">
            <label for="photo">Foto do Animal:</label>
            <input type="file" @change="handleFileUpload" id="photo" required />
          </div>
  
          <div class="preview-container" v-if="previewImage">
            <p><strong>Pré-visualização:</strong></p>
            <img :src="previewImage" alt="Pré-visualização da foto" />
          </div>
  
          <button type="submit" :disabled="!file || loading">
            {{ buttonText }}
            <img v-if="loading || buttonText === 'Verificando...' || buttonText === 'Uau! Que pet fofo'" 
                :src="loadingGif" 
                alt="Loading..." 
                class="loading-icon" />
          </button>
  
          <p v-if="error" class="error-message">{{ error }}</p>
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
  
          <button type="submit" :disabled="loading">
            {{ loading ? "Cadastrando..." : "Cadastrar Animal" }}
            <img v-if="loading" :src="loadingGif" alt="Loading..." class="loading-icon" />
          </button>
  
          <p v-if="message" class="success-message">{{ message }}</p>
          <p v-if="error" class="error-message">{{ error }}</p>
        </form>
      </div>
  
      <div v-if="step === 3" class="qr-code-container">
        <h2>Animal Cadastrado com Sucesso!</h2>
        <p>Baixe o QR Code do animal abaixo:</p>
        
        <img :src="qrCodeUrl" alt="QR Code do Animal" class="qr-code" />
  
        <button @click="downloadQRCode">Baixar QR Code</button>
        <button @click="resetForm">Novo Cadastro</button>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, computed } from "vue";
  import { useAnimalStore } from "@/store/animals";
  import { useRouter } from "vue-router";
  import { detectAnimal, loadModel } from "@/utils/tensorflow";
  import loadingGif from "@/assets/teste.gif";
  
  const store = useAnimalStore();
  const router = useRouter();
  const step = ref(1);
  const file = ref(null);
  const previewImage = ref("");
  const buttonText = ref("Continuar");
  
  const animal = ref({
    name: "",
    owner: "",
    species: "",
    phone: "",
  });
  
  const loading = computed(() => store.loading);
  const message = computed(() => store.message);
  const error = computed(() => store.error);
  const qrCodeUrl = computed(() => store.qrCodeUrl);
  
  const handleFileUpload = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      file.value = selectedFile;
      previewImage.value = URL.createObjectURL(selectedFile);
    }
  };
  
  const validateAnimalImage = async () => {
    if (!file.value) {
      store.error = "Selecione uma foto antes de continuar.";
      return;
    }
  
    store.loading = true;
    buttonText.value = "Verificando...";
    store.error = "";
  
    try {
      const imgElement = new Image();
      imgElement.src = previewImage.value;
  
      imgElement.onload = async () => {
        const isAnimal = await detectAnimal(imgElement);
  
        if (isAnimal) {
          buttonText.value = "Uau! Que pet fofo";
          setTimeout(() => {
            step.value = 2;
          }, 2000);
        } else {
          store.error = "A imagem não parece ser de um animal.";
          buttonText.value = "Continuar";
        }
      };
    } catch (err) {
      store.error = "Erro ao verificar a imagem. Tente novamente.";
      buttonText.value = "Continuar";
    } finally {
      store.loading = false;
    }
  };
  
  const submitAnimal = async () => {
    await store.submitAnimal(animal.value, file.value);
    if (!store.error) {
      step.value = 3;
    }
  };
  
  const downloadQRCode = () => {
    const link = document.createElement("a");
    link.href = qrCodeUrl.value;
    link.download = "qrcode_animal.png";
    link.click();
  };
  
  const resetForm = () => {
    window.location.reload();
  };
  </script>
  
  <style scoped>
  .qr-code-container {
    text-align: center;
  }
  
  .qr-code {
    margin: 20px auto;
    width: 200px;
    height: 200px;
  }
  </style>
  
  <style scoped>
  .container {
    max-width: 500px;
    margin: auto;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    background: #fff;
    font-family: "Arial", sans-serif;
    text-align: center;
  }
  
  .loading-icon {
    width: 20px;
    height: 20px;
    margin-right: 8px;
    vertical-align: middle;
  }
  
  h1 {
    color: #333;
    margin-bottom: 20px;
  }
  
  .form-group {
    margin-bottom: 15px;
    text-align: left;
  }
  
  label {
    display: block;
    font-weight: bold;
    margin-bottom: 5px;
    color: #444;
  }
  
  input, select {
    width: 100%;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
    font-size: 16px;
    transition: all 0.3s;
  }
  
  input:focus, select:focus {
    border-color: #007bff;
    outline: none;
  }
  
  button {
    width: 100%;
    padding: 12px;
    margin: 10px;
    background: #28a745;
    color: white;
    font-size: 16px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: background 0.3s, transform 0.2s;
  }
  
  button:hover {
    background: #218838;
    transform: scale(1.05);
  }
  
  button:disabled {
    background: #ccc;
    cursor: not-allowed;
  }
  
  .success-message {
    color: green;
    font-weight: bold;
    margin-top: 10px;
  }
  
  .error-message {
    color: red;
    font-weight: bold;
    margin-top: 10px;
  }
  
  .preview-container {
    text-align: center;
    margin-top: 15px;
  }
  
  .preview-container img {
    max-width: 100%;
    height: auto;
    border-radius: 10px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  }
  </style>
  