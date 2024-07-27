<template>
  <q-page class="bg-grey-1 q-pt-md q-pl-md q-pr-md">
    <q-card class="no-shadow">
      <q-dialog v-model="dialogShow" backdrop-filter="brightness(60%)"><previe-students-vue :student="student"/></q-dialog>
      <q-dialog v-model="dialogEdit" backdrop-filter="brightness(60%)" persistent><add-or-update :student="student"/></q-dialog>
      <q-dialog v-model="confirm" persistent><confirm-message :student="student"/></q-dialog>
      <q-card-section >
        <div class="text-h6">All Students: {{ students.length }}</div>
        
      </q-card-section>
      <q-table flat color="primary" :rows="filteredRows" :columns="columns"  :loading="loading" v-model:selected="selected">
        <template v-slot:top>
          <div class="fit row wrap justify-between items-center">
            <div class="" style=" min-width: 50%; max-width: 50%;">
              <q-input  v-model="search" placeholder="Search..." input-class="q-pa-sm">
                <template v-slot:prepend>
                  <q-icon name="search"/>
                </template>
              </q-input>
            </div>
            <div>
              <q-btn size="sm" flat text-color="white" color="primary" label="Add Student" @click="toggleEdit" class="q-mr-sm bg-blue-6" />
              <q-btn size="md" flat text-color="primary" color="primary"  @click="archive" class="q-mr-sm" ><i class="fa-solid fa-box-archive"></i></q-btn>
              <q-btn size="md" flat text-color="primary" color="primary"  @click="archive" class="q-mr-sm" ><i class="fa-solid fa-file-import"></i></q-btn>
            </div>
          </div>
        </template>
        <template v-slot:body="props">
          <q-tr :props="props">
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
              <q-badge color="green" v-if="props.row.status == 'Present'">{{ props.row.status }}</q-badge>
              <q-badge color="red" v-else-if="props.row.status == 'Out of school'">{{ props.row.status }}</q-badge>
              <q-badge color="grey" v-else>{{ props.row.status }}</q-badge>
            </q-td>
            <q-td key="action" :props="props">
              <q-btn flat>
                <i class="fa-solid fa-ellipsis-vertical"></i>
                <q-menu>
                  <q-list dense style="min-width: 100px">
                    <q-item clickable v-close-popup  @click="togglePreview(props.row)">
                      <q-item-section>Preview</q-item-section>
                      <q-item-section side><i class="fa-regular fa-eye"></i></q-item-section>
                    </q-item>
                    <q-item clickable v-close-popup @click="toggleEdit(props.row)">
                      <q-item-section>Edit</q-item-section>
                      <q-item-section side ><i class="fa-solid fa-pen-to-square"></i></q-item-section>
                    </q-item>
                    <q-separator />
                    <q-separator />
                    <q-item clickable v-close-popup @click="archive(props.row)">
                      <q-item-section>Archive</q-item-section>
                      <q-item-section side><i class="fa-solid fa-box-archive"></i></q-item-section>
                    </q-item>
                  </q-list>
                </q-menu>
              </q-btn>
            </q-td>
          </q-tr>
        </template>
        
      </q-table>
    </q-card>
  </q-page>
</template>

<script setup>
import {onBeforeMount, ref, computed} from 'vue';
import PrevieStudentsVue from 'src/components/students/PreviewStudents.vue';
import AddOrUpdate from 'src/components/students/AddOrUpdate.vue';
import ConfirmMessage from 'src/components/students/ArchiveStudent.vue';
import { collection, getDocs } from "firebase/firestore"; 
import { db } from 'src/config/firebase';

const loading = ref(false)
const students = ref([])

onBeforeMount(async ()=> {
  loading.value = true
  try{
    const querySnapshot = await getDocs(collection(db, "students"));
    querySnapshot.forEach((doc) => {
      students.value.push({...{ id:doc.id }, ...doc.data()})
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

const filteredRows = computed(() => {
      const filterString = search.value.toLowerCase()
      return students.value.filter(row => 
        Object.values(row).some(value =>
          String(value).toLowerCase().includes(filterString)
        )
      )
    })

function  addStudent() {
  console.log('Add student clicked')
}

function  deleteAll() {
  console.log('Delete all clicked')
}

const onRowClick =(row) => {dialogShow.value = true}

const dialogShow = ref(false)
const dialogEdit = ref(false)
const confirm = ref(false)

const student = ref()
const togglePreview = (row) =>{
  dialogShow.value = true
  student.value = row
}

const toggleEdit = (row) =>{
  student.value = row
  dialogEdit.value = true
}

const archive = (row) =>{
  confirm.value = true
  student.value = row
}

</script>

<style scoped>
</style>
