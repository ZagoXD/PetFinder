<template>
  <div class="register-container">
    <header class="register-header">
      <NuxtLink to="/" class="logo-link">
        <font-awesome-icon :icon="['fas', 'paw']" class="logo-icon" />
        <span class="logo-text">Petfinder</span>
      </NuxtLink>
    </header>

    <main class="register-content">
      <div class="register-card">
        <h1 class="register-title">Cadastrar Animal</h1>

        <div v-if="step === 1" class="register-step">
          <form @submit.prevent="validateAnimalImage" class="register-form">
            <div class="form-group">
              <label for="photo" class="form-label">Foto do Animal</label>
              <div class="file-upload">
                <input type="file" @change="handleFileUpload" id="photo" required class="file-input" />
                <label for="photo" class="file-label">
                  <font-awesome-icon :icon="['fas', 'camera']" class="logo-icon" />
                  <span>{{ file ? 'Arquivo selecionado' : 'Selecionar foto' }}</span>
                </label>
              </div>
            </div>

            <div class="preview-container" v-if="previewImage">
              <img :src="previewImage" alt="Pré-visualização da foto" class="preview-image" />
            </div>

            <button type="submit" :disabled="!file || loading" class="action-button gradient-button">
              {{ buttonText }}
              <font-awesome-icon v-if="loading || buttonText === 'Verificando...' || buttonText === 'Uau! Que pet fofo'"
                :icon="['fas', 'spinner']" spin class="loading-icon" />
            </button>

            <p v-if="error" class="error-message">{{ error }}</p>
          </form>
        </div>

        <div v-if="step === 2" class="register-step">
          <form @submit.prevent="submitAnimal" class="register-form">
            <div class="form-group">
              <label for="name" class="form-label">Nome do Animal</label>
              <input v-model="animal.name" type="text" id="name" required class="form-input" />
            </div>

            <div class="form-group">
              <label for="owner" class="form-label">Nome do Dono</label>
              <input v-model="animal.owner" type="text" id="owner" required class="form-input" />
            </div>

            <div class="form-group">
              <label for="species" class="form-label">Espécie</label>
              <select v-model="animal.species" id="species" required class="form-select">
                <option value="" disabled selected>Selecione uma opção</option>
                <option value="Cachorro">Cachorro</option>
                <option value="Gato">Gato</option>
                <option value="Outro">Outro</option>
              </select>
            </div>

            <div class="form-group">
              <label for="phone" class="form-label">Telefone do Dono</label>
              <input v-model="animal.phone" type="tel" id="phone" required class="form-input" />
            </div>

            <button type="submit" :disabled="loading" class="action-button gradient-button">
              {{ loading ? "Cadastrando..." : "Finalizar Cadastro" }}
              <font-awesome-icon v-if="loading" :icon="['fas', 'spinner']" spin class="loading-icon" />
            </button>

            <p v-if="message" class="success-message">{{ message }}</p>
            <p v-if="error" class="error-message">{{ error }}</p>
          </form>
        </div>

        <div v-if="step === 3" class="register-step qr-code-step">
          <div class="success-animation">
            <font-awesome-icon :icon="['fas', 'check-circle']" />
          </div>
          <h2 class="success-title">Animal Cadastrado com Sucesso!</h2>
          <p class="success-text">Baixe o QR Code para colocar na coleira do seu pet:</p>

          <div class="qr-code-wrapper">
            <img :src="qrCodeUrl" alt="QR Code do Animal" class="qr-code-image" />
          </div>

          <div class="action-buttons">
            <button @click="downloadQRCode" class="action-button gradient-button">
              <font-awesome-icon :icon="['fas', 'download']" /> Baixar QR Code
            </button>
            <button @click="resetForm" class="action-button outline-button">
              <font-awesome-icon :icon="['fas', 'plus']" /> Novo Cadastro
            </button>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import { useAnimalStore } from "@/store/animals";
import { useRouter } from "vue-router";
import { detectAnimal, loadModel } from "@/utils/tensorflow";

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
.register-container {
  min-height: 100vh;
  background-color: #f8f9fa;
}

.register-header {
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

.register-content {
  max-width: 1200px;
  margin: 2rem auto;
  padding: 0 1rem;
}

.register-card {
  background-color: white;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  padding: 2rem;
  max-width: 600px;
  margin: 0 auto;
}

.register-title {
  color: #1f2937;
  font-size: 2rem;
  font-weight: 700;
  text-align: center;
  margin-bottom: 2rem;
  position: relative;
}

.register-title::after {
  content: '';
  display: block;
  width: 60px;
  height: 4px;
  background: linear-gradient(135deg, #6B73FF 0%, #000DFF 100%);
  margin: 0.5rem auto 0;
  border-radius: 2px;
}

.register-form {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.form-label {
  font-weight: 600;
  color: #374151;
  font-size: 0.95rem;
}

.form-input,
.form-select {
  padding: 0.75rem 1rem;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  font-size: 1rem;
  transition: all 0.3s;
  background-color: #f9fafb;
}

.form-input:focus,
.form-select:focus {
  border-color: #4f46e5;
  outline: none;
  box-shadow: 0 0 0 3px rgba(79, 70, 229, 0.1);
}

.file-upload {
  position: relative;
}

.file-input {
  position: absolute;
  width: 0.1px;
  height: 0.1px;
  opacity: 0;
  overflow: hidden;
  z-index: -1;
}

.file-label {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 0.75rem 1rem;
  background-color: #f9fafb;
  border: 2px dashed #e5e7eb;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s;
}

.file-label:hover {
  border-color: #4f46e5;
  background-color: #f0f1ff;
}

.file-label i {
  color: #4f46e5;
  font-size: 1.25rem;
}

.preview-container {
  margin-top: 1rem;
  text-align: center;
}

.preview-image {
  max-width: 100%;
  max-height: 300px;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.action-button {
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  font-weight: 600;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.3s;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
}

.gradient-button {
  background: linear-gradient(135deg, #6B73FF 0%, #000DFF 100%);
  color: white;
  border: none;
}

.gradient-button:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 13, 255, 0.2);
}

.outline-button {
  background: transparent;
  border: 2px solid #4f46e5;
  color: #4f46e5;
}

.outline-button:hover {
  background-color: #f0f1ff;
}

.loading-icon {
  animation: spin 1s linear infinite;
}

@keyframes spin {
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
}

.error-message {
  color: #ef4444;
  text-align: center;
  margin-top: 1rem;
}

.success-message {
  color: #10b981;
  text-align: center;
  margin-top: 1rem;
}

.qr-code-step {
  text-align: center;
  padding: 2rem 0;
}

.success-animation {
  font-size: 4rem;
  color: #10b981;
  margin-bottom: 1.5rem;
  animation: bounce 1s;
}

@keyframes bounce {

  0%,
  20%,
  50%,
  80%,
  100% {
    transform: translateY(0);
  }

  40% {
    transform: translateY(-20px);
  }

  60% {
    transform: translateY(-10px);
  }
}

.success-title {
  color: #1f2937;
  font-size: 1.75rem;
  margin-bottom: 1rem;
}

.success-text {
  color: #6b7280;
  margin-bottom: 2rem;
}

.qr-code-wrapper {
  background-color: white;
  padding: 1.5rem;
  border-radius: 12px;
  display: inline-block;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  margin-bottom: 2rem;
}

.qr-code-image {
  width: 200px;
  height: 200px;
}

.action-buttons {
  display: flex;
  gap: 1rem;
  justify-content: center;
  flex-wrap: wrap;
}

@media (max-width: 640px) {
  .register-card {
    padding: 1.5rem;
  }

  .action-buttons {
    flex-direction: column;
  }

  .action-button {
    width: 100%;
  }
}
</style>