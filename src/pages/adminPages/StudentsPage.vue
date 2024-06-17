<template>
  <q-page class="bg-grey-2 q-pt-md q-pl-md q-pr-md">
    <q-card>
      <q-dialog v-model="dialogShow" backdrop-filter="brightness(60%)"><previe-students-vue/></q-dialog>
      <q-dialog v-model="dialogEdit" backdrop-filter="brightness(60%)"><previe-students-vue/></q-dialog>
      <q-dialog v-model="dialogDel" backdrop-filter="brightness(60%)"><previe-students-vue/></q-dialog>
      <q-card-section >
        <div class="text-h6">All Students: {{ students.length }}</div>
        
      </q-card-section>
      <q-table :rows="students" :columns="columns" row-key="LRN" :filter="search" :loading="loading" v-model:selected="selected">
        <template v-slot:top>
          <div class="fit row wrap justify-between items-center">
            <div class="" style=" min-width: 50%; max-width: 50%;">
              <q-input outlined v-model="search" placeholder="Search name or LRN" size="sm">
                <template v-slot:prepend>
                  <q-icon name="search"/>
                </template>
              </q-input>
            </div>
            <div>
              <q-btn color="primary" label="Add Student" @click="addStudent" class="q-mr-sm" />
              <q-btn color="negative" label="Delete all" @click="deleteAll" />
            </div>
          </div>
        </template>
        <template v-slot:body="props">
          <q-tr :props="props">
            <q-td key="name" :props="props">
              <q-item>
                <q-item-section side>
                  <q-avatar rounded-full size="40px">
                    <img src="https://cdn.quasar.dev/img/avatar.png">
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
              <q-badge color="blue-3 text-dark" class="">
                Grade {{ props.row.level }}
              </q-badge>
            </q-td>
            <q-td key="age" :props="props">
              {{ calculateAge(props.row.date_of_birth) }}
            </q-td>
            <q-td key="gender" :props="props">
              {{ props.row.gender }}
            </q-td>
            <q-td key="status" :props="props">
              <q-badge :color="props.row.status == 'Present'? 'green' : 'red'">
                {{ props.row.status }}
              </q-badge>
            </q-td>
            <q-td key="action" :props="props">
              <q-btn size="sm" color="primary" icon="visibility" class="q-mr-sm" @click="togglePreview"/>
              <q-btn size="sm" color="primary" icon="edit" class="q-mr-sm" @click="toggleEdit"/>
              <q-btn size="sm" color="negative" icon="delete" @click="toggleDel"/>
            </q-td>
          </q-tr>
        </template>
        
      </q-table>
    </q-card>
  </q-page>
</template>

<script setup>
import {onBeforeMount, ref} from 'vue'
import PrevieStudentsVue from 'src/components/PrevieStudents.vue'
import { collection, getDocs } from "firebase/firestore"; 
import { db } from 'src/config/firebase';

const loading = ref(false)
const students = ref([])

onBeforeMount(async ()=> {
  loading.value = true
  try{
    const querySnapshot = await getDocs(collection(db, "students"));
    querySnapshot.forEach((doc) => {
      students.value.push(doc.data())
    });
    loading.value = false
  } catch(err){

  }
})

const  search = ref('')
const selected= ref([])

const columns = ref([
  { name: 'name', required: true, label: 'Name', align: 'left', field: row => row.name },
  { name: 'LRN', align: 'left', label: 'LRN', field: 'LRN' },
  { name: 'level', align: 'left', label: 'Level', field: 'level' },
  { name: 'age', align: 'left', label: 'Age', field: 'age' },
  { name: 'gender', align: 'left', label: 'Gender', field: 'gender' },
  { name: 'status', align: 'left', label: 'Status', field: 'status' },
  { name: 'action', align: 'center', label: 'Action', field: 'action' }
])

function calculateAge(birthDate) {
    var today = new Date();
    var birthDate = new Date(birthDate);
    var age = today.getFullYear() - birthDate.getFullYear();
    var m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }
    return age;
}

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
