import { ref } from "vue";
    const image = ref(null);
    let file;

    // Method to handle file change
    function onFileChange (e) {
      file = e.target.files[0];
      if (!file) {
        console.log("no image selected/ or invalid image");
      }
      const reader = new FileReader();

      reader.onload = (e) => {
        image.value = e.target.result;
      };

      reader.readAsDataURL(file);
    };

    function clear(){
      image.value = null
      file = ''
    }
  
  export {image, file, onFileChange, clear}