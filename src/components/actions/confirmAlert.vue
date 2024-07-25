<script setup>
import { ref } from 'vue';
import { useCrud } from 'src/stores/crudsStrore';

const cruds = useCrud()
const confirm = ref(false)
const props = defineProps({
  size: String,
  color: String,
  icon: String,
  label: String,
  message: String,
  row: Object, 
  path: String,
})

const decline = (row) => {
  cruds.deleteDocument(props.path, row.id)
}

</script>
<template>
  <q-btn :size="props.size" :label="props.label" :color="props.color" @click="confirm = true" >
    <q-icon :name="props.icon"/>
  </q-btn>

  <q-dialog v-model="confirm" persistent>
    <q-card>
      <q-card-section class="row items-center">
        <q-avatar size="md" icon="warning" :color="props.color" text-color="white" />
        <span class="q-ml-sm">{{ props.message }}</span>
      </q-card-section>

      <q-card-actions align="right">
        <q-btn flat label="Cancel" color="primary" v-close-popup />
        <q-btn flat label="Yes" :color="props.color" @click="decline(props.row)" v-close-popup />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>
  
  