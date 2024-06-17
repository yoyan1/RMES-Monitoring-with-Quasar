<template>
    <q-page class="bg-grey-2 q-pt-md q-pl-md q-pr-md">
      <q-card>
        <q-card-section >
          <div class="text-h6">Students Attendance</div>
          
        </q-card-section>
            <q-table
            flat bordered
            title="Treats"
            :rows="list"
            :columns="columns"
            color="primary"
            row-key="name"
            :loading="loading"
            >
            <template v-slot:top-right>
                <q-btn
                color="primary"
                icon-right="archive"
                label="Export"
                no-caps
                @click="generatePDF"
                />
            </template>
            </q-table>
      </q-card>
    </q-page>
  </template>
  
<script setup>
import { ref, onBeforeMount } from 'vue';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

import { collection, getDocs, Timestamp } from "firebase/firestore"; 
import { db } from 'src/config/firebase';

const loading = ref(false)
const list = ref([])

onBeforeMount(async ()=> {
  loading.value = true
  try{
    const querySnapshot = await getDocs(collection(db, "students_record"));
    querySnapshot.forEach((doc) => {
      list.value.push(doc.data())
    });
    loading.value = false
  } catch(err){

  }
})

  const columns = [
    {
      name: 'name',
      required: true,
      label: 'Name',
      align: 'left',
      field: row => row.name,
      format: val => `${val}`,
      sortable: true
    },
    { name: 'status', align: 'center', label: 'Status', field: 'status', sortable: true },
    { name: 'time_in', label: 'Time in', field: 'time_in', sortable: true },
    { name: 'time_out', label: 'Time out', field: 'time_out', sortable:true },
    { name: 'date', label: 'date', field: 'date' },
  ]
  
  
  
    function generatePDF() {
        const doc = new jsPDF();
        // Extract column headers
        const headers = columns.map(col => col.label);

        const rows = list.value.map(item => columns.map(col => {
          if (typeof col.field === 'function') {
            return col.field(item);
          }
          return item[col.field];
        }));

        // Generate the table
        doc.autoTable(headers, rows, { startY: 20 });

        // Save the PDF
        doc.save('logs'+'.pdf');
    }
</script>  