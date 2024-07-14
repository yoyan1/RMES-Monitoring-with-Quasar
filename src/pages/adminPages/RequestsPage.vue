<template>
    <q-page class="bg-grey-2 q-pt-md q-pl-md q-pr-md">
      <q-card class="no-shadow">
        <q-dialog v-model="dialogShow" backdrop-filter="brightness(60%)"><previe-students-vue/></q-dialog>
        <q-dialog v-model="dialogEdit" backdrop-filter="brightness(60%)"><previe-students-vue/></q-dialog>
        <q-dialog v-model="dialogDel" backdrop-filter="brightness(60%)"><previe-students-vue/></q-dialog>
        <q-card-section >
          <div class="text-h6">All Requests: {{ students.length }}</div>
          
        </q-card-section>
        <q-table :rows="students" :columns="columns" row-key="LRN" :filter="search" loading>
          <template v-slot:body="props">
            <q-tr :props="props" @click="onRowClick(props.row)">
              <q-td key="name" :props="props">
                <q-item>
                  <q-item-section side>
                    <q-avatar rounded-full size="40px">
                      <img src="https://cdn.quasar.dev/img/avatar.png">
                    </q-avatar>
                  </q-item-section>
                  <q-item-section>
                    <q-item-label>{{ props.row.name }}</q-item-label>
                  </q-item-section>
                </q-item>
              </q-td>
              <q-td key="LRN" :props="props">
                {{ props.row.LRN }}
              </q-td>
              <q-td key="age" :props="props">
                  {{ props.row.age }}
                </q-td>
                <q-td key="gender" :props="props">
                    {{ props.row.gender }}
                </q-td>
                <q-td key="status" :props="props">
                  <q-badge color="red" class="">
                    {{ props.row.status }}
                  </q-badge>
                </q-td>
                <q-td key="action" :props="props">
                <q-btn size="sm" color="primary" icon="done" class="q-mr-sm" @click="toggleEdit"/>
                <q-btn size="sm" color="negative" icon="cancel" @click="toggleDel"/>
              </q-td>
            </q-tr>
          </template>
          
        </q-table>
      </q-card>
    </q-page>
  </template>
  
  <script setup>
  import {ref} from 'vue'
  import PrevieStudentsVue from 'src/components/PreviewStudents.vue'
  
  const  search = ref('')
  const students = ref([
    { name: 'Jaylord Sison', LRN: '273642837459',  age: 11, gender: 'male', status: 'pending' },
    { name: 'Christopher Ian Mag-aso', LRN: '213517232893',  age: 11, gender: 'male', status: 'pending' },
    { name: 'Jeryme Magline', LRN: '263847925346', age: 11, gender: 'male', status: 'pending' },
    { name: 'Roland Clarion', LRN: '637492735473',  age: 11, gender: 'male', status: 'Pending' },
    { name: 'Rosemarie Panilagao', LRN: '8172638453937',  age: 11, gender: 'female', status: 'pending' }
  ])
  
  const columns = ref([
    { name: 'name', required: true, label: 'Name', align: 'left', field: row => row.name },
    { name: 'LRN', align: 'left', label: 'LRN', field: 'LRN' },
    { name: 'age', align: 'left', label: 'Age', field: 'age' },
    { name: 'gender', align: 'left', label: 'Gender', field: 'gender' },
    { name: 'status', align: 'left', label: 'Gender', field: 'status' },
    { name: 'action', align: 'center', label: 'Action', field: 'action' }
  ])
  function  addStudent() {
        console.log('Add student clicked')
      }
  
  function  deleteAll() {
        console.log('Delete all clicked')
      }
  
  const onRowClick =(row) => {dialogShow.value = true}
  
  const dialogShow = ref(false)
  const dialogEdit = ref(false)
  const dialogDel = ref(false)
  
  const togglePreview = () =>{dialogShow.value = true}
  const toggleEdit = () =>{dialogEdit.value = true}
  const toggleDel = () =>{dialogDel.value = true}
  
  </script>
  
  <style scoped>
  </style>
  