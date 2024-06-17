<template>
    <q-layout view="hHh lpR fFf">
        <q-page class="flex flex-center">
          <StudentChart />
        </q-page>
    </q-layout>
  </template>
  
  <script>
  import StudentChart from 'pages/Analytics/LivePreview.vue';
  
  export default {
    name: 'IndexPage',
    components: {
      StudentChart
    }
  };
  </script>
  
  <style scoped>
  .q-page {
    max-width: 800px;
    margin: 0 auto;
  }
  </style>
  