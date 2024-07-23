import { defineStore } from 'pinia';
import { storage } from 'src/config/firebase';
import { ref as storageRef, uploadBytes, getDownloadURL } from 'firebase/storage';
import { ref, onMounted } from 'vue';

export const useStorage = defineStore('imageUpload', () => {
    
    const upload = async (path, file) => {
        const storageRefObj = storageRef(storage, path + file.name); // Reference to the file location
        // Upload the file to Firebase Storage
        await uploadBytes(storageRefObj, file)
    }

    const useFirebaseStorage = async (imagePath, image) => {
      const imageUrl = ref(null);
        try {
          const imageRef = storageRef(storage, imagePath + image);
          const url = await getDownloadURL(imageRef);
          imageUrl.value = url;
        } catch (error) {
          console.log("no image found in database:");
        }
    
      return {
        imageUrl
      };
    }

    return{
        upload,
        useFirebaseStorage
    }
})