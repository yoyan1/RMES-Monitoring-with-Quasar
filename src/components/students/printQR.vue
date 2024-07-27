<script setup>
import qrCodeVue from '../QR/qrCode.vue';
const props = defineProps({
    student: Object
})
</script>
<template>
    <div class="bg-blue-400 flex flex-col gap-5">
        <div class="row items-center q-pb-none bg-white q-pa-sm">
            <div class="text-h6">Print QR</div>
            <q-space />
            <q-btn icon="close" color="red-5" flat round dense v-close-popup />
        </div>
        <div class="fit row wrap justify-around items-center py-5">
            <div class="flex gap-20" style="height: 75vh">
                <div class="bg-gray-100">
                    <div class="flex items-center bg-blue-600 p-2">
                        <img src="/RMES-logo.png" class="h-16 w-16 rounded-full">
                        <div class="flex flex-col  text-white">
                            <b class="text-base">RAMON MAGSAYSAY ELEMENTARY SCHOOL</b>
                            <i>San Carlos City, Negros Occidental</i>
                        </div>
                    </div>
                    <div class="flex flex-col items-center py-8">
                        <img :src="props.student.imageUrl" class="h-24 w-24 rounded-full" alt="">
                        <div class="text-center">
                            <b class="text-xl">{{ props.student.fullname }}</b><br>
                            <i>{{ props.student.level }}</i>
                        </div>
                    </div>
                    <div class="flex justify-center items-center ">
                        <qrCodeVue :id="props.student.id"/>
                    </div>
                </div>
                <!-- <div class="bg-gray-100 p-2 " style="width: 56vh">
                </div> -->
            </div>
            <!-- <q-card class="my-card ">
                <q-img src="https://cdn.quasar.dev/img/chicken-salad.jpg" />
                <q-card-section>
                <q-btn
                    fab
                    color="primary"
                    icon="place"
                    class="absolute"
                    style="top: 0; right: 12px; transform: translateY(-50%);"
                />
    
                <div class="row no-wrap items-center">
                    <div class="col text-h6 ellipsis">
                    Cafe Basilico
                    </div>
                    <div class="col-auto text-grey text-caption q-pt-md row no-wrap items-center">
                    <q-icon name="place" />
                    250 ft
                    </div>
                </div>
    
                <q-rating v-model="stars" :max="5" size="32px" />
                </q-card-section>
    
                <q-card-section class="q-pt-none">
                <div class="text-subtitle1">
                    $・Italian, Cafe
                </div>
                <div class="text-caption text-grey">
                    Small plates, salads & sandwiches in an intimate setting.
                </div>
                </q-card-section>
    
                <q-separator />
    
                <q-card-actions align="right">
                <q-btn v-close-popup flat color="primary" label="Reserve" />
                <q-btn v-close-popup flat color="primary" round icon="event" />
                </q-card-actions>
            </q-card>
            <q-card class="my-card">
                <q-img src="https://cdn.quasar.dev/img/chicken-salad.jpg" />
    
                <q-card-section>
                <q-btn
                    fab
                    color="primary"
                    icon="place"
                    class="absolute"
                    style="top: 0; right: 12px; transform: translateY(-50%);"
                />
    
                <div class="row no-wrap items-center">
                    <div class="col text-h6 ellipsis">
                    Cafe Basilico
                    </div>
                    <div class="col-auto text-grey text-caption q-pt-md row no-wrap items-center">
                    <q-icon name="place" />
                    250 ft
                    </div>
                </div>
    
                <q-rating v-model="stars" :max="5" size="32px" />
                </q-card-section>
    
                <q-card-section class="q-pt-none">
                <div class="text-subtitle1">
                    $・Italian, Cafe
                </div>
                <div class="text-caption text-grey">
                    Small plates, salads & sandwiches in an intimate setting.
                </div>
                </q-card-section>
    
                <q-separator />
    
                <q-card-actions align="right">
                <q-btn v-close-popup flat color="primary" label="Reserve" />
                <q-btn v-close-popup flat color="primary" round icon="event" />
                </q-card-actions>
          </q-card> -->
        </div>
    </div>
</template>