<!-- <template>
    <div>
      <Pie :chartData="chartData" :options="chartOptions" />
    </div>
  </template>
  
  <script>
  import { Pie } from 'vue-chartjs'
  import { Chart as ChartJS, Title, Tooltip, Legend, ArcElement } from 'chart.js'
  
  ChartJS.register(Title, Tooltip, Legend, ArcElement)
  
  export default {
    components: {
      Pie
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
          datasets: [
            {
              label: this.data.label,
              backgroundColor: ['#41B883', '#E46651', '#00D8FF'],
              data: this.data.values
            }
          ]
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