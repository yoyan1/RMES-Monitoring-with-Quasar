<script setup>
import { computed, onMounted, ref } from 'vue'
import { useRouter } from 'vue-router';
import { onFileChange, image, file } from 'app/composables/fileHandler';
import { query, where, collection, onSnapshot, setDoc, doc, getDocs, getDoc, updateDoc } from "firebase/firestore";
import { db } from 'src/config/firebase';
import { useCrud } from 'src/stores/crudsStrore';
import { useStorage } from 'src/stores/storageStore';

const route = useRouter()
const cruds = useCrud()
const imageStore = useStorage()
const step = ref(1)
const isLoading = ref(false)
const props = defineProps({
  student: Object
})

const idNumberGenerated = ref({})
const id = ref()
// const image = ref(null)
const studentData = ref({
  student_id: id.value,
  fullname: '',
  gender: '',
  date_of_birth: '',
  province: '',
  municipality: '',
  barangay: '',
  street: '',
  zone: '',
  parent: '',
  contact_number: 0,
  level: '',
  section: '',
  lrn: 0,
  imageUrl: '',
  status: 'pending',
})

const completeAddress = computed(() => {
return studentData.value.street + ', ' + studentData.value.barangay + ', ' +studentData.value.municipality + ', ' + studentData.value.province
})

onMounted(()=>{
  studentData.value = {...studentData.value, ...props.student}
})

let newId;
async function getNewId() {
    try {
        const docRef = doc(db, "idGenerator", 'yJf83yJpygmTCj7tg95V');
        const docSnap = await getDoc(docRef);

        idNumberGenerated.value = docSnap.data();
        newId = idNumberGenerated.value.count + 1;
        id.value = "RMES-SN-000" + newId.toString();

        isLoading.value = false
    } catch (error) {
        console.error("error fetching data", error);
    }
}
getNewId()
async function onSubmit(e) {
    isLoading.value = true;
    if (file) {
        await imageStore.upload('studentsImage/', file);
        const { imageUrl } = await imageStore.useFirebaseStorage('studentsImage/', file.name);
        studentData.value.imageUrl = imageUrl;

    } else if(!studentData.value.imageUrl){
        const { imageUrl } = await imageStore.useFirebaseStorage('studentsImage/', 'default.jpg');
        studentData.value.imageUrl = imageUrl;
        console.log("no file selected");
    }

    try {

        if(e){
            studentData.value = { ...studentData.value, ...{ student_id: id.value } };
            await cruds.setDocument("requests", id.value, studentData.value)
            // Increment idGenerator
            await cruds.updateDocument('idGenerator', 'yJf83yJpygmTCj7tg95V', { count: newId })
            
        } else{
            await cruds.updateDocument('students', studentData.value.student_id, studentData.value)
        }
    } catch (error) {
        console.error(error);
    } finally {
        isLoading.value = false;
        route.push('/admin/home')
    }
}
</script>
<template>
    <q-card class="q-pa-md q-mb-md">
      <q-card-section class="row items-center q-pa-none">
          <div class="text-h6">Add student</div>
        <q-space />
        <q-btn icon="close" flat round dense v-close-popup />
      </q-card-section>
      <q-separator/>
      <q-form @submit="onSubmit" class="full">
        <q-stepper v-model="step" vertical color="primary" animated flat>
          <q-step :name="1" title="Personal details" icon="settings" :done="step > 1" >
            <div class="fit row justify-between">
              <q-input filled outlined v-model="studentData.fullname" label="Full name" class="q-mb-md" dense/>
              <q-select filled dense outlined v-model="studentData.gender" :options="['male', 'female']" label="Gender" style="width: 183px"></q-select> 
              <q-input filled dense outlined v-model="studentData.date_of_birth" mask="date" :rules="['date']" style="width:183px" label="Date of Birth">
                <template v-slot:append>
                  <q-icon name="event" class="cursor-pointer">
                    <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                      <q-date v-model="studentData.date_of_birth">
                        <div class="row items-center justify-end">
                          <q-btn v-close-popup label="Close" color="primary" flat />
                        </div>
                      </q-date>
                    </q-popup-proxy>
                  </q-icon>
                </template>
              </q-input>
              <q-input filled dense outlined type="text" label="Parent/Guardian" v-model="studentData.parent" />
              <q-input filled dense v-model="studentData.contact_number" label="Phone" mask="09## ### ####" hint="ex. 12 324 6764" class="q-mb-sm"/>
            </div>
            <div>
              <span class="text-weight-bold">Address</span><br>
              <span class="text-grey-7 text-caption" v-if="studentData.province">complete address: "{{ completeAddress }}"</span>
              <div class="fit row justify-between">
                <q-input class="q-mt-sm" v-model="studentData.province" label="Province" dense />
                <q-input class="q-mt-sm" v-model="studentData.municipality" label="City" dense />
                <q-input class="q-mt-sm" v-model="studentData.barangay" label="Barangay" dense />
                <q-input class="q-mt-sm" v-model="studentData.street" label="Street" dense />
                <q-input class="q-mt-sm" v-model="studentData.zone" label="Zone" dense />
              </div>
            </div>
            <q-stepper-navigation>
              <q-btn @click="step = 2" color="primary" label="Continue" />
            </q-stepper-navigation>
          </q-step>
  
          <q-step :name="2" title="Educational details"  icon="create_new_folder" :done="step > 2" >
            <div class="fit row justify-between">
              <q-input  class="q-mb-sm" filled v-model="studentData.lrn" label="(LRN) Learners Reference Number" mask="###########" unmasked-value dense/>
              <q-select class="q-mb-sm"  filled dense v-model="studentData.level" :options="['Grade I', 'Grade II', 'Grade III', 'Grade IV', 'Grade V', 'Grade VI']" label="Grade Level" style="width: 183px" />
              <q-select class="q-mb-sm"  filled dense v-model="studentData.section" :options="['Kamatis', 'Sibuyas', 'Ahos', 'Bumbay', 'Sili']" label="Grade Level" style="width: 183px" />
            </div>
            <q-stepper-navigation>
              <q-btn @click="step = 4" color="primary" label="Continue" />
              <q-btn flat @click="step = 1" color="primary" label="Back" class="q-ml-sm" />
            </q-stepper-navigation>
          </q-step>

          <q-step :name="4" title="Upload" icon="add_comment" >
            <div class="w-full flex items-end gap-3">
              <div class="flex justify-center">
                <q-avatar square size="150px">
                  <img :src="studentData.imageUrl" v-if="!image">
                  <img :src="image" v-else>
                </q-avatar>
              </div>
              <div>
                <input type="file" @change="onFileChange" name="" id="">
              </div>
            </div>
            <q-stepper-navigation>
              <q-btn label="Submit" type="submit" color="primary" :loading="isLoading"/>
              <q-btn flat @click="step = 2" color="primary" label="Back" class="q-ml-sm" />
            </q-stepper-navigation>
          </q-step>
        </q-stepper>
      </q-form>
    </q-card>
</template>