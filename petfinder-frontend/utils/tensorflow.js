import * as tf from "@tensorflow/tfjs";
import * as mobilenet from "@tensorflow-models/mobilenet";

let model;

export const loadModel = async () => {
    if (!model) {
      console.log("Carregando modelo MobileNet...");
      model = await mobilenet.load();
      console.log("Modelo carregado com sucesso!");
    }
  };

/**
 * @param {HTMLImageElement} imgElement 
 * @returns {Boolean} 
 */
export const detectAnimal = async (imgElement) => {
    if (!model) {
      await loadModel();
    }
  
    const predictions = await model.classify(imgElement);
    console.log("Predições:", predictions);

    const nonAnimalKeywords = [
      "helmet", "van", "car", "bus", "train", "truck", "airplane", 
      "bicycle", "motorcycle", "boat", "keyboard", "cell phone", "laptop", 
      "chair", "sofa", "desk", "table", "cup", "bottle", "tv"
    ];

    const filteredPredictions = predictions.filter((p) => {
      const lowerClassName = p.className.toLowerCase();

      if (nonAnimalKeywords.some((keyword) => lowerClassName.includes(keyword))) {
        return false;
      }

      return p.probability > 0.3;
    });
  
    return filteredPredictions.length > 0;
  };
  
  


