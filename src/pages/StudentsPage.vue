<template>
  <q-page>
    <q-card class="bg-grey-2 q-pl-md q-pr-md">
      <q-dialog v-model="dialogShow" backdrop-filter="brightness(60%)"><previe-students-vue/></q-dialog>
      <q-dialog v-model="dialogEdit" backdrop-filter="brightness(60%)"><previe-students-vue/></q-dialog>
      <q-dialog v-model="dialogDel" backdrop-filter="brightness(60%)"><previe-students-vue/></q-dialog>
      <q-card-section >
        <div class="text-h6">All Students: 4</div>
        
      </q-card-section>
      <q-table :rows="students" :columns="columns" row-key="LRN" :filter="search" >
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
            <q-td key="level" :props="props">
              <q-badge color="blue">
                {{ props.row.level }}
              </q-badge>
            </q-td>
            <q-td key="age" :props="props">
              {{ props.row.age }}
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
import {ref} from 'vue'
import PrevieStudentsVue from 'src/components/PrevieStudents.vue'

const  search = ref('')
const students = ref([
  { name: 'Jaylord Sison', LRN: '273642837459', level: 'Grade II', age: 11, gender: 'male', status: 'Present' },
  { name: 'Christopher Ian Mag-aso', LRN: '213517232893', level: 'Grade III', age: 11, gender: 'male', status: 'Present' },
  { name: 'Jeryme Magline', LRN: '263847925346', level: 'Grade V', age: 11, gender: 'male', status: 'Out of school' },
  { name: 'Roland Clarion', LRN: '637492735473', level: 'Grade V', age: 11, gender: 'male', status: 'Present' },
  { name: 'Rosemarie Panilagao', LRN: '8172638453937', level: 'Grade V', age: 11, gender: 'female', status: 'Out of school' }
])

const columns = ref([
  { name: 'name', required: true, label: 'Name', align: 'left', field: row => row.name },
  { name: 'LRN', align: 'left', label: 'LRN', field: 'LRN' },
  { name: 'level', align: 'left', label: 'Level', field: 'level' },
  { name: 'age', align: 'left', label: 'Age', field: 'age' },
  { name: 'gender', align: 'left', label: 'Gender', field: 'gender' },
  { name: 'status', align: 'left', label: 'Status', field: 'status' },
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
