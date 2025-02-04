import { defineStore } from "pinia";
import axios from "axios";

export const useAnimalStore = defineStore("animalStore", {
  state: () => ({
    animals: [],
  }),

  actions: {
    async fetchAnimals() {
      try {
        const response = await axios.get("http://127.0.0.1:8000/api/animals/");
        this.animals = response.data;
      } catch (error) {
        console.error("Erro ao buscar animais:", error);
      }
    },

    async deleteAnimal(id) {
      try {
        await axios.delete(`http://127.0.0.1:8000/api/animals/${id}/`);
        this.animals = this.animals.filter((animal) => animal.id !== id);
      } catch (error) {
        console.error("Erro ao remover o animal:", error);
      }
    },
  },
});
