
<template>
  <q-layout view="hHh lpR fFf">

    <q-header elevated class="bg-blue">
      <q-toolbar>
        <q-toolbar-title>
          <q-avatar>
            <img src="https://cdn.quasar.dev/img/avatar.png">
          </q-avatar>
          RMES-SM
        </q-toolbar-title>
        <div class="row items-center">
          <q-icon name="group" class="q-mr-sm" />
          <q-avatar>
            <img src="https://cdn.quasar.dev/img/avatar.png">
          </q-avatar>
        </div>
      </q-toolbar>
    </q-header>

    <q-drawer show-if-above v-model="leftDrawerOpen" bordered>
      <q-card class="fit">
        <q-list>
          <div class="q-pt-sm q-pl-sm">
            <span class="text-subtitle1">Home</span>
            <router-link to="/" class="text-dark" style="text-decoration: none">
            <q-item clickable v-ripple>
                <q-item-section avatar>
                  <q-icon name="dashboard" />
                </q-item-section>
                <q-item-section> Dashboard</q-item-section>
              </q-item>
            </router-link>
          </div>
        </q-list>
        <q-list>
          <div class="q-pt-sm q-pl-sm">
            <span class="text-subtitle1"> Pages</span>
            <router-link  v-for="list in lists" :key="list.name" :to="list.to" class="text-dark" style="text-decoration: none">
            <q-item clickable v-ripple>
                <q-item-section avatar>
                  <q-icon :name="list.icon" />
                </q-item-section>
                <q-item-section> {{list.name}}</q-item-section>
              </q-item>
            </router-link>
          </div>
        </q-list>

      </q-card>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>

  </q-layout>
</template>

<script setup>
import { ref } from 'vue';

const leftDrawerOpen = ref(true)

const lists = ref([
  {
    icon: 'school',
    name: 'Students',
    to: 'students',
  },
  {
    icon: 'event_note',
    name: 'Attendance',
    to: 'attendance',
  },
  {
    icon: 'assignment',
    name: 'Requests',
    to: 'requests',
  },
  {
    icon: 'archive',
    name: 'Archives',
    to: 'archives',
  },
  {
    icon: 'people',
    name: 'Account',
    to: 'accounts',
  },
  {
    icon: 'settings',
    name: 'Settings',
    to: 'setting',
  },
])

</script>
