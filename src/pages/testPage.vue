<template>
  <div class="q-pa-md q-gutter-y-sm column items-center">
    <div>
      <div class="row q-gutter-sm">
        <q-btn round size="sm" color="accent" @click="showNotif('top')">
          <q-icon name="arrow_upward" />
        </q-btn>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useQuasar } from 'quasar'

const alerts = [
  { color: 'n', message: 'Woah! Danger! You are getting good at this!', icon: 'report_problem' },
]


const $q = useQuasar()

const showNotif = (position) => {
  $q.notify({
    icon: 'report_problem',
    color: 'negative',
    message: 'error',
    position,
  })
}
</script>
