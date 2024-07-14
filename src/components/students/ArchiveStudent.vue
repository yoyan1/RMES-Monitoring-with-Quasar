<script setup>
  const props = defineProps({
    student: Object
  })

</script>
<template>    
  <q-card style="min-width: 350px">
    <q-card-section>
      <div class="text-h6">Save to Archive</div>
    </q-card-section>
    <q-card-section class="q-pt-none">
      <q-input filled label="Enter batch (ex. 2023-2024)" v-model="address" autofocus @keyup.enter="prompt = false" />
    </q-card-section>
    <q-card-actions align="right" class="text-primary">
      <q-btn flat label="Cancel" v-close-popup />
      <q-btn flat label="Add address" v-close-popup />
    </q-card-actions>
  </q-card>
</template>