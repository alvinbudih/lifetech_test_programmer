<script setup>
import { RouterView } from 'vue-router'
import Navbar from './components/Navbar.vue'
import { onMounted } from 'vue'
import { useUserStore } from './stores/user'
import Modal from './components/Modal.vue'
const store = useUserStore()

const { getUsers } = store

onMounted(() => {
  getUsers()
})
</script>

<template>
  <Navbar />
  <div class="container">
    <RouterView />
  </div>

  <Modal />
</template>
