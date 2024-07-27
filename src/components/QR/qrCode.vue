<script setup>
import QrcodeVue from 'qrcode.vue'

const props = defineProps({
    id: String,
})
</script>
<template>
    <div>
        <qrcode-vue value="sdhasdha" :size="150" level="H" />
    </div>
  </template>
  