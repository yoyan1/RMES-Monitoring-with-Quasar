<template>
    <q-card class="q-pa-md q-mb-md">
      <q-card-section>
        <div class="text-h6">Add student</div>
      </q-card-section>
      <q-separator/>
      <q-card-section>
        <q-form @submit="onSubmit" @reset="onReset">
            <div>
              <div class="fit flex">
                <q-input filled v-model="name" label="Your name *" hint="Name and surname" lazy-rules :rules="[ val => val && val.length > 0 || 'Please type something']" class="q-mr-md"/>
                <q-input filled type="number" v-model="age" label="Your age *" lazy-rules :rules="[   val => val !== null && val !== '' || 'Please type your age',   val => val > 0 && val < 100 || 'Please type a real age' ]"/>
              </div>
            </div>
          <div class="q-mt-md">
            <q-btn label="Submit" type="submit" color="primary"/>
            <q-btn label="Reset" type="reset" color="primary" flat class="q-ml-sm" />
          </div>
        </q-form>
      </q-card-section>
    </q-card>
  </template>
  
  <script>
  import { useQuasar } from 'quasar'
  import { ref } from 'vue'
  
  export default {
    setup () {
      const $q = useQuasar()
  
      const name = ref(null)
      const age = ref(null)
      const accept = ref(false)
  
      return {
        name,
        age,
        accept,
  
        onSubmit () {
          if (accept.value !== true) {
            $q.notify({
              color: 'red-5',
              textColor: 'white',
              icon: 'warning',
              message: 'You need to accept the license and terms first'
            })
          }
          else {
            $q.notify({
              color: 'green-4',
              textColor: 'white',
              icon: 'cloud_done',
              message: 'Submitted'
            })
          }
        },
  
        onReset () {
          name.value = null
          age.value = null
          accept.value = false
        }
      }
    }
  }
  </script>
  