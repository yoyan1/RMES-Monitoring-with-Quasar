<template>
    <div>
      <input type="text" v-model="barcodeInput" @keydown="handleKeyDown" ref="barcodeInputField" />
      <p v-if="barcode">Scanned Barcode: {{ barcode }}</p>
    </div>
  </template>
  
<script setup>
import { onMounted } from 'vue';
import { ref } from 'vue';
import { doc, getDoc } from 'firebase/firestore';
import { db } from 'src/config/firebase';

const barcodeInput = ref('');
const barcode = ref(null);
const barcodeInputField = ref(null);
const student = ref()

const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
        processBarcode();
    }
};

const processBarcode = async() => {
    barcode.value = barcodeInput.value;
    const docRef = doc(db, "students", barcode.value);
    const docSnap = await getDoc(docRef);   

    if (docSnap.exists()) {
        console.log("Document data:", docSnap.data());
        student.value = docSnap.data()
    } else {
        // docSnap.data() will be undefined in this case
        console.log("No such document!");
    }

    barcodeInput.value = ''; // Clear the input field for the next scan
    barcodeInputField.value.focus(); // Refocus the input field
};

onMounted(() => {
    barcodeInputField.value.focus(); // Focus the input field on mount
});


  </script>
  
  <style scoped>
  /* Add any required styles here */
  </style>
  