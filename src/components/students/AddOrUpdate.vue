<template>
    <q-card class="q-pa-md q-mb-md">
      <q-card-section class="row items-center q-pb-none">
          <div class="text-h6">Close icon</div>
          <q-space />
          <q-btn icon="close" flat round dense v-close-popup />
        </q-card-section>
      <q-separator/>
      <q-form >
        <q-stepper v-model="step" vertical color="primary" animated >
          <q-step :name="1" title="Personal details" icon="settings" :done="step > 1" >
            <div class="fit row justify-between">
              <q-input type="text" placeholder="Name" class="q-mx-sm"/>
              <q-input type="text" placeholder="Name" class="q-mx-sm"/>
            </div>
            <q-stepper-navigation>
              <q-btn @click="step = 2" color="primary" label="Continue" />
            </q-stepper-navigation>
          </q-step>
  
          <q-step :name="2" title="Educational details"  icon="create_new_folder" :done="step > 2" >
            <div class="fit row justify-between">
              <q-input type="text" placeholder="Name" class="q-mx-sm"/>
              <q-input type="text" placeholder="Name" class="q-mx-sm"/>
            </div>
            <q-stepper-navigation>
              <q-btn @click="step = 4" color="primary" label="Continue" />
              <q-btn flat @click="step = 1" color="primary" label="Back" class="q-ml-sm" />
            </q-stepper-navigation>
          </q-step>

          <q-step :name="4" title="Upload" icon="add_comment" >
            <q-uploader
      url="http://localhost:4444/upload"
    />
            <q-stepper-navigation>
              <q-btn color="primary" label="Finish" />
              <q-btn flat @click="step = 2" color="primary" label="Back" class="q-ml-sm" />
            </q-stepper-navigation>
          </q-step>
        </q-stepper>
      </q-form>
    </q-card>
  </template>
  
  <script>
  import { ref } from 'vue'
  
  export default {
    setup () {
      return {
        step: ref(1)
      }
    }
  }
  </script>