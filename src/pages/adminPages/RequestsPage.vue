<template>
    <q-page class="bg-grey-2 q-pt-md q-pl-md q-pr-md">
      <q-card class="no-shadow">
        <q-dialog v-model="dialogShow" backdrop-filter="brightness(60%)"><previe-students-vue :student="student" :request="true"/></q-dialog>
        <q-dialog v-model="dialogEdit" backdrop-filter="brightness(60%)"><previe-students-vue/></q-dialog>
        <q-dialog v-model="dialogDel" backdrop-filter="brightness(60%)"><previe-students-vue/></q-dialog>
        <q-card-section >
          <div class="text-h6">All Requests: {{ students.length }}</div>
          
        </q-card-section>
        <q-table color="primary" :rows="students" :columns="columns" row-key="LRN" :filter="search" :loading="loading">
          <template v-slot:body="props">
            <q-tr :props="props" @click="onRowClick(props.row)">
              <q-td key="name" :props="props">
                <q-item>
                  <q-item-section side>
                    <q-avatar rounded-full size="40px">
                      <img :src="props.row.imageUrl">
                    </q-avatar>
                  </q-item-section>
                  <q-item-section>
                    <q-item-label>{{ props.row.fullname }}</q-item-label>
                  </q-item-section>
                </q-item>
              </q-td>
              <q-td key="LRN" :props="props">
                {{ props.row.lrn }}
              </q-td>
              <q-td key="level" :props="props">
                {{ props.row.level }}
              </q-td>
              <q-td key="age" :props="props">
                {{ props.row.date_of_birth }}
              </q-td>
              <q-td key="gender" :props="props">
                  {{ props.row.gender }}
              </q-td>
              <q-td key="status" :props="props">
                  {{ props.row.status }}
              </q-td>
              <q-td key="action" :props="props">
                <q-btn size="sm" color="primary" icon="done" class="q-mr-sm" @click="accept(props.row)"/>
                <Confirm :row="props.row" :size="'sm'" :color="'red-5'" :icon="'fa-solid fa-x'" :message="'Are you sure you want to delete this?'" :label="''" :path="'requests'"/>
              </q-td>
            </q-tr>
          </template>
          
        </q-table>
      </q-card>
    </q-page>
  </template>
  
<script setup>
import {ref, onBeforeMount} from 'vue'
import { useQuasar } from 'quasar'
import { collection, getDocs } from 'firebase/firestore';
import { db } from 'src/config/firebase';
import { useCrud } from 'src/stores/crudsStrore';
import Confirm from 'src/components/actions/confirmAlert.vue';
import PrevieStudentsVue from 'src/components/students/PreviewStudents.vue';

const $q = useQuasar()
const cruds = useCrud();
const loading = ref(false);
const students = ref([]);
const student = ref()

onBeforeMount(async ()=> {
  loading.value = true
  try{
    const querySnapshot = await getDocs(collection(db, "requests"));
    querySnapshot.forEach((doc) => {
      students.value.push({...{ id:doc.id }, ...doc.data()})
    });
    loading.value = false
  } catch(err){
    console.error("error fecthing data", err)
  }
})
    
  const  search = ref('')
  
const columns = ref([
  { name: 'name', required: true, label: 'Name', align: 'left', field: row => row.name },
  { name: 'LRN', align: 'left', label: 'LRN', field: 'LRN' },
  { name: 'level', align: 'left', label: 'Grade Level', field: 'level' },
  { name: 'age', align: 'left', label: 'Age', field: 'age' },
  { name: 'gender', align: 'left', label: 'Gender', field: 'gender' },
  { name: 'status', align: 'left', label: 'Status', field: 'status' },
  { name: 'action', align: 'center', label: 'Action', field: 'action' }
])

const load = ref(false)
const accept = async (row) => {
  load.value = true
  try{
    // await cruds.setDocument('students', row.id, row);
    // await cruds.deleteDocument('requests', row.id);
    $q.notify({
      type: 'positive',
      message: 'Successfuly added to students list',
      position: 'top',
    })
    load.value = false
  } catch (err){
    console.log("error accepting:", err);
  }
}
  
const onRowClick =(row) => {
  dialogShow.value = true
  student.value = row
}

const dialogShow = ref(false)
const dialogEdit = ref(false)
const dialogDel = ref(false)

const togglePreview = () =>{dialogShow.value = true}
const toggleEdit = () =>{dialogEdit.value = true}
const toggleDel = () =>{dialogDel.value = true}
  
  </script>
  
  <style scoped>
  </style>
  