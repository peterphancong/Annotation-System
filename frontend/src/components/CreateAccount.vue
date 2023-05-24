<template>
  <div class="min-h-screen flex flex-col items-left justify-top">
    <div class="bg-white p-5 rounded-lg">
      <h1 class="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white text-center w-5/6">Create Account</h1>
      <form>
          <div class="flex flex-col">
            <input class="border p-4 h-10 bg-gray-100 rounded-lg w-5/6" type='text' name='username' placeholder="Username" v-model="userName" /><br>
            <input class="border p-4 h-10 mt-1 bg-gray-100 rounded-lg w-5/6" type='text' name='user_email' placeholder="Email" v-model="email"/><br>
            <input class="border p-4 h-10 mt-1 bg-gray-100 rounded-lg w-5/6" type='password' name='user_password' placeholder="Password" v-model="password"/><br>
            <div class="flex content-center mb-5 w-5/6">
              <span class="text-sm">Select your role:</span>
              <select class="text-sm mr-1 border" v-model="role" name="roles">
                <option value="1">Leader</option>
                <option value="2">Curator</option>
              </select>
            </div>
            <a href="#" class="items-center text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
              <button class="flex-1 bg-blue-200 whitespace-nowrap rounded-lg w-1/6" @click="CreateAccount()" type="button">Create Account</button>
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
      userName: 'curator',
      email: 'curator@iir.csie',
      password: '234',
      role: '1'
    }
  },
  methods: {
    CreateAccount () {
      let user = {
        userName: this.userName,
        email: this.email,
        password: this.password,
        role: this.role
      }
      axios.post('/api/createAccount', user)
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
            let user = VueJwtDecode.decode(token)
            this.role = user.role
            this.email = user.email
            this.displayMenu = true
            console.log(user)
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
