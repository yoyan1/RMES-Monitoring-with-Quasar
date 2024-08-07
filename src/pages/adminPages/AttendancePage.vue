<template>
    <q-page class="bg-grey-2 q-pt-md q-pl-md q-pr-md">
      <q-card class="no-shadow q-mb-md q-py-md">
        <div class="q-pa-md flex items-center">
          <q-icon class="fa-solid fa-bullhorn p-2 rounded-full bg-gray-700 mr-3" color="white" size="sm"/>
          <div>
            <h1 class="text-lg text-bold">Today, August 6, 2024</h1>
            <span class="text-sm text-grey-7">This show daily data in realtime</span>
          </div>
        </div>
        <div class="flex gap-5 q-px-md">
          <div class="q-pa-md w-32 border border-gray-300 rounded-md">
            <span class="text-grey-7">Total Students</span>
            <div class="flex justify-between items-center">
              <h1 class="text-lg text-bold">25</h1>
              <q-icon class="fa-solid fa-user-graduate p-1 rounded-md bg-blue-500 text-white"/>
            </div>
          </div>
          <div class="q-pa-md w-32 border border-gray-300 rounded-md">
            <span class="text-grey-7">On Time</span>
            <div class="flex justify-between items-center">
              <h1 class="text-lg text-bold">25</h1>
              <q-icon class="fa-solid fa-arrow-up p-1 rounded-md bg-green-500 text-white"/>
            </div>
          </div>
          <div class="q-pa-md w-32 border border-gray-300 rounded-md">
            <span class="text-grey-7">Late</span>
            <div class="flex justify-between items-center">
              <h1 class="text-lg text-bold">25</h1>
              <q-icon class="fa-solid fa-arrow-down p-1 rounded-md bg-red-500 text-white"/>
            </div>
          </div>
          <div class="q-pa-md w-32 border border-gray-300 rounded-md">
            <span class="text-grey-7">Absent</span>
            <div class="flex justify-between items-center">
              <h1 class="text-lg text-bold">25</h1>
              <q-icon class="fa-solid fa-arrow-down p-1 rounded-md bg-red-500 text-white"/>
            </div>
          </div>
          <div class="q-pa-md w-32 border border-gray-300 rounded-md">
            <span class="text-grey-7">Time out</span>
            <div class="flex justify-between items-center">
              <h1 class="text-lg text-bold">25</h1>
              <q-icon class="fa-solid fa-arrow-up p-1 rounded-md bg-green-500 text-white"/>
            </div>
          </div>
        </div>
      </q-card>
      <q-card class="no-shadow">
        <div class="flex justify-between items-center">
          <div class="q-pa-md">
            <h1 class="text-lg text-bold">Students Attendance</h1>
            <span class="text-sm text-gray-500">Keep track student attendance on daily basis</span>
          </div>
          <div class="flex items-center gap-5 p-3">
            <q-input dense size="sm" flat outlined color="primary" v-model="date" mask="date" :rules="['date']">
              <template v-slot:append>
                <q-icon name="event" class="cursor-pointer">
                  <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                    <q-date v-model="date">
                      <div class="row items-center justify-end">
                        <q-btn v-close-popup label="Close" color="primary" flat />
                      </div>
                    </q-date>
                  </q-popup-proxy>
                </q-icon>
              </template>
            </q-input>
            <q-btn size="md" dense color="primary" class="mb-5" no-caps @click="generatePDF">
              <i class="fa-solid fa-download pr-2"/>
              Export
            </q-btn>
          </div>
        </div>
        <div class="mx-5 mb-3">
          <q-tabs dense v-model="tab" inline-label class="bg-blue-500 text-white shadow-2" >
            <q-tab  name="students"  label="All Student" />
            <q-tab  name="grade I"  label="Grade I" />
            <q-tab  name="grade II"  label="Grade II" />
            <q-tab  name="grade III"  label="Grade III" />
            <q-tab  name="grade IV"  label="Grade IV" />
            <q-tab  name="grade V"  label="Grade V" />
            <q-tab  name="grade VI"  label="Grade VI" />
          </q-tabs>
        </div>
        <q-table flat dense bordered  :rows="list" :columns="columns" color="primary" row-key="name" :loading="loading" >
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
const date = ref('2019/02/01')
const tab = ref('students')
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
    { name: 'student_id', align: 'center', label: 'Student ID', field: 'student_id', sortable: true },
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
    { name: 'date', label: 'date', field: 'date', sortable:true },
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