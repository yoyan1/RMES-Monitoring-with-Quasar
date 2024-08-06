<template>
  <q-page class="bg-grey-1 q-pt-md q-pl-md q-pr-md">
    <q-card flat class="q-mb-md q-px-md q-py-lg rounded-md">
      <div>
        <h1 class="text-xl text-bold">Good Evening sir</h1>
        <span class="text-sm">Welcome to students page</span>
      </div>
      <!-- <div class="text-h6">All Students: {{ students.length }}</div> -->
    </q-card>
    <q-card class="no-shadow q-px-md">
      <q-dialog v-model="dialogShow" backdrop-filter="brightness(60%)"><previe-students-vue :student="student"/></q-dialog>
      <q-dialog v-model="dialogEdit" backdrop-filter="brightness(60%)" persistent><add-or-update :student="student"/></q-dialog>
      <q-dialog v-model="confirm" persistent><confirm-message :student="student"/></q-dialog>
      <div class="fit row wrap justify-between items-center q-mb-md">
        <div class="flex gap-5" style=" min-width: 50%; max-width: 50%;">
          <q-input dense outlined v-model="search" placeholder="Search..." input-class="q-pa-sm">
            <template v-slot:prepend>
              <q-icon name="search"/>
            </template>
          </q-input>
          <q-select outlined dense v-model="model" use-input input-debounce="0" label=" Select level" :options="options" @filter="filterFn" style="width: 150px">
            <template v-slot:no-option>
              <q-item>
                <q-item-section class="text-grey">
                  No results
                </q-item-section>
              </q-item>
            </template>
          </q-select>
        </div>
        <div>
          <q-btn size="sm" flat text-color="white" color="primary" label="Add Student" @click="toggleEdit" class="q-mr-sm bg-blue-6" />
          <q-btn size="sm" outline color="grey-8"  @click="archive" class="q-mr-sm" ><i class="fa-solid fa-box-archive q-pr-sm"></i>Archive all</q-btn>
          <q-btn size="sm" outline color="grey-8"  @click="archive" class="q-mr-sm" ><i class="fa-solid fa-file-import q-pr-sm"></i>import</q-btn>
        </div>
      </div>
      <q-table dense color="primary" :rows="filteredRows" :columns="columns"  :loading="loading" v-model:selected="selected">

        <template v-slot:body="props">
          <q-tr :props="props">
            <q-td key="name" :props="props">
              <q-item>
                <q-item-section side>
                  <q-avatar rounded-full size="20px">
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
                {{ props.row.level }}
              </q-badge>
            </q-td>
            <q-td key="age" :props="props">
              {{ calculateAge(props.row.date_of_birth) }}
            </q-td>
            <q-td key="gender" :props="props">
              {{ props.row.gender }}
            </q-td>
            <q-td key="status" :props="props">
              <q-badge color="green-6" class="bg-green-2" outline v-if="props.row.status == 'Present'">{{ props.row.status }}</q-badge>
              <q-badge color="red-4" class="bg-red-2"  outline v-else-if="props.row.status == 'Out of school'">{{ props.row.status }}</q-badge>
              <q-badge color="grey-6" class="bg-grey-2" outline  v-else>{{ props.row.status }}</q-badge>
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

const stringOptions = [
  'Grade I', 'Grade II', 'Grade III', 'Grade IV', 'Grade V', 'Grade VI'
]

const model = ref(null)
const options = ref(stringOptions)
const  search = ref('')
const selected= ref([])

function filterFn (val, update) {
        if (val === '') {
          update(() => {
            options.value = stringOptions

            // here you have access to "ref" which
            // is the Vue reference of the QSelect
          })
          return
        }

        update(() => {
          const needle = val.toLowerCase()
          options.value = stringOptions.filter(v => v.toLowerCase().indexOf(needle) > -1)
        })
      }


const columns = ref([
  { name: 'name', required: true, label: 'Name', align: 'left', field: row => row.name },
  { name: 'LRN', align: 'left', label: 'LRN', field: 'LRN' },
  { name: 'level', align: 'left', label: 'Grade level', field: 'level' },
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
