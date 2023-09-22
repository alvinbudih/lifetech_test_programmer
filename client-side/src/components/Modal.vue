<script setup>
import { onMounted, ref, watch } from 'vue'
import { useUserStore } from '../stores/user'
import { storeToRefs } from 'pinia'
import axios from 'axios'
import swal from 'sweetalert'

let modal = ref({})
const { url, user } = storeToRefs(useUserStore())
const { getUsers } = useUserStore()

onMounted(() => {
  modal.value = new bootstrap.Modal(document.querySelector('#exampleModal'))
})

modal.value.dispose?.()

const isEditing = ref(false)

const data = ref({
  name: '',
  gender: '',
  email: '',
  phone: '',
  address: ''
})

watch(user, (newUser) => {
  if (newUser?.name) {
    data.value.name = newUser.name
    data.value.gender = newUser.gender
    data.value.email = newUser.email
    data.value.phone = newUser.phone
    data.value.address = newUser.address

    isEditing.value = true
  }
})

function resetForm() {
  user.value = {}

  data.value.name = ''
  data.value.gender = ''
  data.value.email = ''
  data.value.phone = ''
  data.value.address = ''

  isEditing.value = false
}

async function editUser(id) {
  try {
    const {
      data: { msg }
    } = await axios({
      url: `${url.value}/${id}`,
      method: 'PUT',
      data: data.value
    })

    modal.value.hide()

    getUsers()
    swal('Successfully', msg, 'success')
  } catch (error) {
    swal('Failed', error.response.data.msg, 'error')
  }
}

async function addUser() {
  try {
    await axios({
      url: url.value,
      method: 'POST',
      data: data.value
    })

    modal.value.hide()

    swal('Successfully', 'User Added Successfully', 'success')
    getUsers()
  } catch (error) {
    swal('Failed', error.response.data.msg, 'error')
  }
}
</script>

<template>
  <div
    class="modal fade"
    id="exampleModal"
    tabindex="-1"
    aria-labelledby="exampleModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <form id="form" @submit.prevent="isEditing ? editUser(user.id) : addUser()">
          <div class="modal-header">
            <h1 class="modal-title fs-5" id="exampleModalLabel">
              {{ isEditing ? 'Edit' : 'Add' }} User
            </h1>
            <button
              @click="resetForm"
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body">
            <div class="mb-3">
              <label for="name" class="form-label">Name</label>
              <input type="text" class="form-control" v-model="data.name" />
            </div>
            <div class="mb-3">
              <label for="gender" class="form-label">Gender</label>
              <select v-model="data.gender" class="form-select">
                <option value="" selected>--Choose Gender--</option>
                <option value="male">male</option>
                <option value="female">female</option>
              </select>
            </div>
            <div class="mb-3">
              <label for="email" class="form-label">Email</label>
              <input type="email" class="form-control" v-model="data.email" />
            </div>
            <div class="mb-3">
              <label for="phone" class="form-label">Phone</label>
              <input type="tel" class="form-control" v-model="data.phone" />
            </div>
            <div class="mb-3">
              <label for="address" class="form-label">Address</label>
              <textarea v-model="data.address" class="form-control"></textarea>
            </div>
          </div>
          <div class="modal-footer">
            <button
              @click="resetForm"
              type="button"
              class="btn btn-secondary"
              data-bs-dismiss="modal"
            >
              Close
            </button>
            <button type="submit" class="btn btn-primary">Save changes</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>
