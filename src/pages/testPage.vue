<template>
  <div>
    <canvas ref="doughnutChart"></canvas>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue';
import { Doughnut } from 'chart.js';

const doughnutChart = ref(null);
let chartInstance = null;

onMounted(() => {
  chartInstance = new Doughnut(doughnutChart.value, {
    type: 'doughnut',
    data: {
      labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
      datasets: [
        {
          label: 'Dataset 1',
          backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF', '#FF9F40'],
          data: [12, 19, 3, 5, 2, 3]
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: 'top'
        },
        title: {
          display: true,
          text: 'Doughnut Chart Example'
        }
      }
    }
  });
});

onBeforeUnmount(() => {
  if (chartInstance) {
    chartInstance.destroy();
  }
});
</script>

<style scoped>
/* Optional: Add some styles */
</style>
