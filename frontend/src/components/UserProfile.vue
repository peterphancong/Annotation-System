<template>
    <div class="min-h-screen flex flex-col items-left justify-top">
        <h1 class="p-4 text-4xl md:text-5xl lg:text-4xl dark:text-white text-left w-5/6">User Profile</h1>
        <div class="bg-white p-5 rounded-lg">
          <form>
              <div class="flex flex-col">
                <label class="w-5/6 h-10 p-4 bg-white text-left">User Name</label>
                <input class="border p-4 h-10 bg-gray-100 rounded-lg w-5/6" type='text' name='username' placeholder="Username" v-model="userName" />
                <label class="w-5/6 h-10 p-4 bg-white text-left">User E-mail (unchanged)</label>
                <input class="border p-4 h-10 mt-1 bg-gray-100 rounded-lg w-5/6" type='text' name='user_email' placeholder="Email" v-model="email" disabled/>
                <label class="w-5/6 h-10 p-4 bg-white text-left">User Password</label>
                <input class="border p-4 h-10 bg-gray-100 rounded-lg w-5/6" type='password' name='user_password' placeholder="Password" v-model="password" />
                <label class="w-5/6 h-10 p-4 bg-white text-left">User Role (unchanged)</label>
                <input class="border p-4 h-10 mt-1 bg-gray-100 rounded-lg w-5/6" type='text' name='user_role' placeholder="Role" v-model="role" disabled/>
                <a href="#" class="mt-6 flex items-center w-1/6 p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
                  <button class="flex-1 bg-blue-200 whitespace-nowrap rounded-lg w-1/6 h-8" type="button">Save Profile</button>
                </a>
              </div>
          </form>
        </div>
    </div>
</template>

<script>
import router from '../router'
import VueJwtDecode from 'vue-jwt-decode'
import axios from 'axios'
export default
{
  name: 'UserProfile',
  data () {
    return {
      currentUser: '',
      userName: 'curator',
      email: 'curator@iir.csie',
      password: '234',
      role: '0'
    }
  },
  methods: {
  },
  mounted () {
    let token = localStorage.getItem('user')
    if (!token) {
      router.push('/')
    } else {
      var data = {token: token}
      axios.post('/api/verify', data)
        .then((response) => {
          if (response.status === 201) {
            this.currentUser = VueJwtDecode.decode(token)
          } else {
            router.push('/')
          }
        })
        .catch((e) => {
          this.error = 'Login Error'
        })
    }
  }
}
</script>
