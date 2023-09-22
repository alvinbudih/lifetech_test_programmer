<script setup>
import { useUserStore } from '../stores/user'
import { storeToRefs } from 'pinia'
import swal from 'sweetalert'
import axios from 'axios'
import { watch } from 'vue'

const store = useUserStore()

const { users, url, user } = storeToRefs(store)
const { getUsers } = store

async function getUser(id) {
  try {
    const { data } = await axios(`${url.value}/${id}`)

    user.value = data
  } catch (error) {
    swal('Failed', error.response.data.msg)
  }
}

async function deleteUser(id) {
  try {
    const {
      data: { msg }
    } = await axios({
      url: `${url.value}/${id}`,
      method: 'DELETE'
    })

    swal('Successfully', msg, 'success')
    getUsers()
  } catch (error) {
    swal('Failed', error.response.data.msg, 'error')
  }
}
</script>

<template>
  <table class="table">
    <thead class="table-dark">
      <tr>
        <th>#</th>
        <th>Name</th>
        <th>Gender</th>
        <th>Email</th>
        <th>Phone</th>
        <th>Action</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(user, index) in users" :key="user.id">
        <td>{{ index + 1 }}</td>
        <td>{{ user.name }}</td>
        <td>{{ user.gender }}</td>
        <td>{{ user.email }}</td>
        <td>{{ user.phone }}</td>
        <td>
          <button
            @click="getUser(user.id)"
            class="btn btn-warning btn-sm me-1"
            data-bs-toggle="modal"
            data-bs-target="#exampleModal"
          >
            Edit
          </button>
          <button @click="deleteUser(user.id)" class="btn btn-danger btn-sm">Delete</button>
        </td>
      </tr>
    </tbody>
  </table>
</template>
