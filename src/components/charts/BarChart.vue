<!-- <template>
    <div>
      <Bar :chartData="chartData" :options="chartOptions" />
    </div>
  </template>
  
  <script>
  import { Bar } from 'vue-chartjs'
  import { Chart as ChartJS, Title, Tooltip, Legend, CategoryScale, LinearScale, BarElement } from 'chart.js'
  
  ChartJS.register(Title, Tooltip, Legend, CategoryScale, LinearScale, BarElement)
  
  export default {
    components: {
      Bar
    },
    props: {
      data: {
        type: Object,
        required: true
      },
      options: {
        type: Object,
        default: () => {}
      }
    },
    computed: {
      chartData() {
        return {
          labels: this.data.labels,
          datasets: this.data.datasets
        }
      },
      chartOptions() {
        return {
          responsive: true,
          maintainAspectRatio: false,
          ...this.options
        }
      }
    }
  }
  </script>
  
  <style scoped>
  </style>
   -->