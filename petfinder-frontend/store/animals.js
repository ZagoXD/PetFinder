import { defineStore } from "pinia";
import axios from "axios";

export const useAnimalStore = defineStore("animalStore", {
  state: () => ({
    animals: [],
    loading: false,
    error: null,
    message: "",
    qrCodeUrl: "",
  }),

  actions: {
    async fetchAnimals() {
      try {
        const response = await axios.get("http://localhost:8000/api/animals/");
        this.animals = response.data;
      } catch (error) {
        console.error("Erro ao buscar animais:", error);
      }
    },

    async fetchAnimalById(id, token) {
      this.loading = true;
      this.error = null;
      this.selectedAnimal = null;
      this.validToken = false;
    
      try {
        const response = await axios.get(`http://localhost:8000/api/animals/${id}/`);
    
        if (response.data.access_token === token) {
          this.selectedAnimal = response.data;
          this.validToken = true;
        } else {
          this.validToken = false;
        }
      } catch (error) {
        this.error = "Erro ao buscar o animal.";
        this.validToken = false;
      } finally {
        this.loading = false;
      }
    
      return { 
        animal: this.selectedAnimal, 
        validToken: this.validToken 
      };
    },
    
    async deleteAnimal(id) {
      try {
        await axios.delete(`http://localhost:8000/api/animals/${id}/`);
        this.animals = this.animals.filter((animal) => animal.id !== id);
      } catch (error) {
        console.error("Erro ao remover o animal:", error);
      }
    },

    async submitAnimal(animalData, file) {
      this.loading = true;
      this.message = "";
      this.error = "";

      try {
        const formData = new FormData();
        formData.append("name", animalData.name);
        formData.append("owner", animalData.owner);
        formData.append("species", animalData.species);
        formData.append("phone", animalData.phone);
        formData.append("photo", file);

        const response = await axios.post(
          "http://localhost:8000/api/animals/",
          formData,
          { headers: { "Content-Type": "multipart/form-data" } }
        );

        this.message = "Animal cadastrado com sucesso!";
        this.qrCodeUrl = response.data.qr_code;
        this.animals.push(response.data);
      } catch (error) {
        this.error = "Erro ao cadastrar o animal. Tente novamente.";
      } finally {
        this.loading = false;
      }
    },
  },
});
