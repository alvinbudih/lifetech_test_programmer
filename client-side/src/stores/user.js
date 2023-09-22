import { defineStore } from "pinia";
import { ref } from "vue";
import axios from "axios";

export const useUserStore = defineStore("user", () => {
  const users = ref([]);
  const user = ref({});
  const url = ref("http://localhost:3000/users")

  async function getUsers() {
    try {
      const { data } = await axios(url.value);

      users.value = data;
    } catch (error) {
      console.log(error);
    }
  }

  return { users, url, user, getUsers };
})