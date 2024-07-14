<template>
  <!-- <q-page padding> -->
    <q-dialog v-model="edit" backdrop-filter="brightness(60%)"><add-or-update :student="student"/></q-dialog>
    <q-dialog v-model="print" full-width><printQR/></q-dialog>
    <q-dialog v-model="confirm" persistent><archive-student :student="student"/></q-dialog>
    <q-card class="q-pa-md q-mb-md">
      <q-card-section>
        <div class="text-h6">Preview student</div>
      </q-card-section>
      <q-card-section class="q-gutter-md row">
        <q-img
          :src="student.imageUrl"
          class="q-ml-md"
          style="width: 150px; height: 150px"
          :ratio="1"
        />
        <div>
          <div class="text-h6">{{ student.fullname }}</div>
          <div>
            <q-badge color="green" v-if="student.status == 'Present'">{{ student.status }}</q-badge>
            <q-badge color="red" v-else-if="student.status == 'Out of school'">{{ student.status }}</q-badge>
            <q-badge color="grey" v-else>{{ student.status }}</q-badge>
          </div>
          <div class="text-body1">Grade {{student.level }}</div>
          <div class="text-body2 text-grey"> {{ student.street }}</div>
        </div>
      </q-card-section>

      <q-card-section>
        <q-separator />
        <div class="text-subtitle2">Student Details</div>
        <div class="row justify-between">
          <q-list>
            <q-item>
              <q-item-section>
                <q-item-label>Fullname</q-item-label>
                <q-item-label caption>{{ student.fullname }}</q-item-label>
              </q-item-section>
            </q-item>
            <q-item>
              <q-item-section>
                <q-item-label>Grade/Section</q-item-label>
                <q-item-label caption>Grade: {{student.level}} - {{ student.section }}</q-item-label>
              </q-item-section>
            </q-item>
            <q-item>
              <q-item-section>
                <q-item-label>LRN (learner's Reference Number)</q-item-label>
                <q-item-label caption>{{ student.lrn }}</q-item-label>
              </q-item-section>
            </q-item>
            <q-item>
              <q-item-section>
                <q-item-label>Status</q-item-label>
                <q-item-label caption>{{ student.status }}</q-item-label>
              </q-item-section>
            </q-item>
            <q-item>
              <q-item-section>
                <q-item-label>Adviser</q-item-label>
                <q-item-label caption>Rosmarie Panilagao</q-item-label>
              </q-item-section>
            </q-item>
            <q-item>
              <q-item-section>
                <q-item-label>Date of Birth</q-item-label>
                <q-item-label caption>{{ formatDate(student.date_of_birth )}}</q-item-label>
              </q-item-section>
            </q-item>
          </q-list>
        <q-list>
          <q-item>
            <q-item-section class="bg-grey-2 q-pt-md q-pl-md q-pr-md q-pb-md">
              <q-item-label>Parent/Guardian</q-item-label>
              <q-item-label>{{ student.parent }}</q-item-label>
            </q-item-section>
          </q-item>
          <q-item>
            <q-item-section class="bg-grey-2 q-pt-md q-pl-md q-pr-md q-pb-md">
              <q-item-label>Contact Number</q-item-label>
              <q-item-label caption>{{ student.contact_number }}</q-item-label>
            </q-item-section>
          </q-item>
          <q-item>
            <q-item-section class="bg-grey-2 q-pt-md q-pl-md q-pr-md q-pb-md">
              <q-item-label>Address</q-item-label>
              <q-item-label caption style="max-width: 170px">{{ student.street }}, {{ student.barangay }}, {{student.city}}, {{student.province}} zone: {{ student.zone }}</q-item-label>
            </q-item-section>
          </q-item>
        </q-list>
        </div>
      </q-card-section>

      <q-card-section>
        <q-separator />
        <div class="text-subtitle2">Attendance Record</div>
        <q-select label="Select date" />
        <q-table
          :loading="loading" flat
          :rows="records"
          :columns="[
            { name: 'date', required: true, label: 'Date', align: 'left', field: row => row.date },
            { name: 'status', required: true, label: 'Status', align: 'left', field: row => row.status },
            { name: 'time_in', required: true, label: 'Time In', align: 'left', field: row => row.time_in },
            { name: 'time_out', required: true, label: 'Time Out', align: 'left', field: row => row.time_out },
          ]"
        />
      </q-card-section>


      <q-card-actions align="right">
        <q-btn flat icon="edit" @click="edit = !edit" />
        <q-btn flat icon="archive" @click="confirm = !confirm"/>
        <q-btn flat icon="print" @click="print = !print"/>
      </q-card-actions>
    </q-card>
</template>

<script setup>
import { query, collection, where, getDocs } from 'firebase/firestore';
import { db } from 'src/config/firebase';
import { ref, onMounted } from 'vue';
import AddOrUpdate from './AddOrUpdate.vue';
import printQR from './printQR.vue';
import ArchiveStudent from './ArchiveStudent.vue';
import { formatDate } from 'app/composables/formateDate';

  const props = defineProps({
    student: Object
  })

  const edit = ref(false)
  const print = ref(false)
  const confirm = ref(false)
  const loading = ref(false)
  const records = ref([])

  onMounted(async () => {
    loading.value = true
    try{

      const query_students_record = query(
                collection(db, 'students_record'),
                where('studentId', '==', props.student.id),
      );
      const student_record = await getDocs(query_students_record);
      if(!student_record.empty){
        student_record.forEach(res => {
          records.value.push(res.data())
        })
      } else{
        console.log("no record found");
      }
      loading.value = false
    } catch(err){
      loading.value = false
      console.error(err);
    }

  })

  const printQr = (row) =>{
    print.value = true
  }
</script>

<style scoped>
.q-pa-md {
  padding: 16px;
}
.q-mb-md {
  margin-bottom: 16px;
}
</style>
