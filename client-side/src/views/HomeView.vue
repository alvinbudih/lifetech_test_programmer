<script setup>
import Table from '../components/Table.vue'
import FileSaver from 'file-saver'
import axios from 'axios'
import { useUserStore } from '../stores/user'
import { storeToRefs } from 'pinia'

const { url } = storeToRefs(useUserStore())

// async function exportExcel() {
//   try {
//     const sheet = await (
//       await fetch(`${url.value}/excel`, {
//         headers: {
//           Accept: 'application/vnd.ms-excel'
//         },
//         responseType: 'blob'
//       })
//     ).blob()
//     const blob = new Blob([JSON.stringify(sheet)], {
//       type: 'application/vnd.ms-excel;charset=utf-8'
//     })

//     FileSaver.saveAs(blob, 'coba.xlsx')
//   } catch (error) {
//     console.log(error)
//   }
// }

async function downloadExcel() {
  try {
    const response = await axios.get(`${url.value}/excel`, {
      responseType: 'blob' // Specify response type as blob
    })
    const blob = response.data
    saveAs(blob, 'users.xlsx') // Use the FileSaver library to save the file
  } catch (error) {
    console.error(error)
  }
}
</script>

<template>
  <div class="d-flex justify-content-between">
    <h1>User</h1>
    <div class="mt-2">
      <button @click="downloadExcel" class="btn btn-light me-1">Export to XLSX</button>
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
