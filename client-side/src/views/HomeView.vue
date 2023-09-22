<script setup>
import Table from '../components/Table.vue'
</script>

<template>
  <div class="d-flex justify-content-between">
    <h1>User</h1>
    <div class="mt-2">
      <button class="btn btn-light me-1">Export to XLSX</button>
      <button
        type="button"
        class="btn btn-primary"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
      >
        Add User
      </button>
    </div>
  </div>
  <Table />
</template>
