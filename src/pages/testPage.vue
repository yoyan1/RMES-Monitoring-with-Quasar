<template>
  <q-list padding class="rounded-borders text-primary">
    <q-item
      v-for="list in lists"
      :key="list.name"
      :to="list.path"
      :is="$q.platform.is.ssr ? 'div' : 'router-link'"
      clickable
      tag="router-link"
      active-class="my-menu-link"
      exact-active-class="my-menu-link"
    >
      <q-item-section avatar>
        <q-icon :name="list.icon" />
      </q-item-section>
      <q-item-section>{{ list.name }}</q-item-section>
    </q-item>
  </q-list>
</template>

<script>
export default {
  data() {
    return {
      lists: [
        { name: 'Inbox', path: '/inbox', icon: 'inbox' },
        { name: 'Sent', path: '/sent', icon: 'send' },
        { name: 'Drafts', path: '/drafts', icon: 'drafts' }
      ]
    }
  }
}
</script>

<style>
.my-menu-link {
  background-color: #f0f0f0; /* Background color for active link */
  color: #1976D2; /* Text color for active link */
}
</style>
