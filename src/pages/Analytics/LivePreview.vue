<template>
    <q-page class="q-pa-md">
      <q-card>
        <q-card-section>
          <div class="text-h6">Student Enrollment (Grades 1-6)</div>
        </q-card-section>
        <q-card-section>
          <canvas ref="chart"></canvas>
        </q-card-section>
      </q-card>
    </q-page>
  </template>
  
  <script>
  import { ref, onMounted, reactive } from 'vue';
  import { Chart } from 'chart.js';
  
  export default {
    name: 'StudentChart',
    setup() {
      const chartRef = ref(null);
      const studentData = reactive({
        labels: ['Grade 1', 'Grade 2', 'Grade 3', 'Grade 4', 'Grade 5', 'Grade 6'],
        datasets: [{
          label: 'Number of Students',
          data: [30, 45, 28, 55, 42, 60],
          backgroundColor: 'rgba(75, 192, 192, 0.2)',
          borderColor: 'rgba(75, 192, 192, 1)',
          borderWidth: 1
        }]
      });
  
      let chart;
  
      const updateChartData = () => {
        // Simulate data update
        studentData.datasets[0].data = studentData.datasets[0].data.map(num => num + Math.floor(Math.random() * 10 - 5));
        chart.update();
      };
  
      onMounted(() => {
        chart = new Chart(studentData, {
          type: 'bar',
          data: studentData,
          options: {
            responsive: true,
            scales: {
              y: {
                beginAtZero: true
              }
            }
          }
        });
  
        // Update data every 5 seconds
        setInterval(updateChartData, 5000);
      });
  
      return {
        chartRef,
        studentData
      };
    }
  };
  </script>
  
  <style scoped>
  canvas {
    max-width: 100%;
  }
  </style>
  