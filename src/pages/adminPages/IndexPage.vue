<template>
  <q-page class="bg-grey-2 q-pt-md q-pl-md q-pr-md">
    <div>
      <q-card>
        <q-card-section class="text-h6">
          Dashboard
        </q-card-section>
        <q-separator />
        <q-card-section>
          <!-- Dashboard content -->
          <div class="fit row ">
              <q-card class="q-mr-md">
                <q-card-section>
                  <q-icon name="school" />
                  Students: {{ students }}
                </q-card-section>
              </q-card>
              <q-card  class="q-mr-md">
                <q-card-section>
                  <q-icon name="person" />
                  Teachers: {{ teachers }}
                </q-card-section>
              </q-card>
              <q-card>
                <q-card-section>
                  <q-icon name="mail" />
                  Requests: {{ requests }}
                </q-card-section>
              </q-card>
            </div>
          <q-row>
            <q-col cols="12" md="6">
              <q-chart :options="pieChartOptions" />
            </q-col>
            <q-col cols="12" md="6">
              <q-chart :options="barChartOptions" />
            </q-col>
          </q-row>
        </q-card-section>
      </q-card>
    </div>
  </q-page>
</template>

<script>
import { defineComponent } from 'vue';
import { useQuasar } from 'quasar';

export default defineComponent({
  setup() {
    const $q = useQuasar();
    
    const students = 6;
    const teachers = 2;
    const requests = 0;
    
    const pieChartOptions = {
      // Define your pie chart options here
    };
    
    const barChartOptions = {
      // Define your bar chart options here
    };

    return {
      students,
      teachers,
      requests,
      pieChartOptions,
      barChartOptions
    };
  }
});
</script>

<style scoped>
/* Add your styles here */
</style>
