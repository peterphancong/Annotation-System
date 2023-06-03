<template>
  <div class="min-h-screen flex flex-col items-left justify-top font-deca font-bold text-sm">
    <h1 class="p-4 md:text-5xl lg:text-4xl dark:text-white text-left w-5/6">Create Account</h1>
    <div class="bg-white p-5 rounded-lg">
      <form>
          <div class="flex flex-col">
            <input class="border text-sm p-4 h-10 bg-gray-100 rounded-lg w-5/6" type='text' name='username' placeholder="Username" v-model="userName" /><br>
            <input class="border text-sm p-4 h-10 mt-1 bg-gray-100 rounded-lg w-5/6" type='text' name='user_email' placeholder="Email" v-model="email"/><br>
            <input class="border text-sm p-4 h-10 mt-1 bg-gray-100 rounded-lg w-5/6" type='password' name='user_password' placeholder="Password" v-model="password"/><br>
            <div class="flex content-center mb-5 w-5/6">
              <select v-model="role" name="roles" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                <option value="0" selected>Select a role</option>
                <option value="1">Leader</option>
                <option value="2">Curator</option>
              </select>
            </div>
            <a href="#" class="flex items-center w-1/6 p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
              <button class="flex-1 bg-blue-200 whitespace-nowrap rounded-lg w-1/6 h-8" @click="CreateAccount()" type="button">Create Account</button>
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
  name: 'CreateAccount',
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
    CreateAccount () {
      let newuser = {
        userName: this.userName,
        email: this.email,
        password: this.password,
        role: this.role
      }
      axios.post('/api/createAccount', newuser)
        .then((response) => {
          console.log(response.data)
          router.push('/')
        })
        .catch((errors) => {
          console.log('Error in signup..')
        })
    }
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
