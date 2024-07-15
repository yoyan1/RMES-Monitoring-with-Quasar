
<template>
  <q-layout view="hHh lpR fFf">
    <q-header class="bg-white">
      <q-toolbar>
        <q-toolbar-title class="text-dark text-weight-bold">
          <q-avatar>
            <img src="/RMES-logo.png">
          </q-avatar>
          RMES-SM
          <q-btn flat @click="leftDrawerOpen = !leftDrawerOpen" round dense icon="menu" />
        </q-toolbar-title>
        <div class="row items-center">
          <!-- <q-icon name="assignment" class="q-mr-sm" /> -->
        <q-btn round flat :outlined="false">
          <q-avatar>
            <img src="https://cdn.quasar.dev/img/avatar.png">
          </q-avatar>
          <q-menu>
            <div class="row no-wrap q-pa-md ">
              <div class="column items-center">
                <q-avatar size="72px">
                  <img src="https://cdn.quasar.dev/img/avatar4.jpg">
                </q-avatar>

                <div class="text-subtitle1 q-mt-md q-mb-xs">John Doe</div>

                <q-btn color="primary" label="Logout" push size="sm" v-close-popup/>
              </div>
            </div>
          </q-menu>
        </q-btn>
        </div>
      </q-toolbar>
    </q-header>

    <q-drawer show-if-above v-model="leftDrawerOpen">
      <q-card class="fit bg-blue-7">
        <q-list padding class="rounded-borders text-primary q-pl-sm">
          <span class="text-subtitle1 text-white font-weight-bold"> Home</span>
          <q-item to="home" :is="$q.platform.is.ssr ? 'div' : 'router-link'" class="text-white" clickable tag="router-link" active-class="my-menu-link" exact-active-class="my-menu-link">
            <q-item-section avatar>
              <q-icon name="dashboard" />
            </q-item-section>
            <q-item-section> Dashboard</q-item-section>
          </q-item>
        </q-list>
        <q-list padding class="rounded-borders text-primary q-pl-sm">
          <span class="text-subtitle1 text-white font-weight-bold"> Pages</span>
          <q-item v-for="list in lists" :key="list.name" :to="list.to" :is="$q.platform.is.ssr ? 'div' : 'router-link'" class="text-white" clickable tag="router-link" active-class="my-menu-link" exact-active-class="my-menu-link">
            <q-item-section avatar>
              <q-icon :name="list.icon" />
            </q-item-section>
            <q-item-section>{{ list.name }}</q-item-section>
          </q-item>
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

<style>
.my-menu-link {
  background-color: #83bff0; /* Background color for active link */
  color: #1976D2; /* Text color for active link */
}
</style>