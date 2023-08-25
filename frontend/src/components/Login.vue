<template>
    <div class="min-h-screen flex flex-col items-center justify-center">
      <div class="bg-white p-10 rounded-lg">
        <h1 class="font-sans font-bold text-6xl text-black-100 text-center">Sign in</h1>
        <h3 class="font-sans font-bold mt-12 text-2xl">Sign in and start your annotation!</h3>
        <!-- <div v-if='error'>{{ error }}</div> -->
        <form>
            <div class="flex flex-col items-center">
              <input class="border p-4 h-10 mt-6 bg-gray-100 rounded-lg w-5/6" type='text' name='email' placeholder="Email" v-model="email" /><br>
              <input class="border p-4 h-10 mt-1 bg-gray-100 rounded-lg w-5/6" type='password' name='password' placeholder="Password" v-model="password"/><br>
              <button class="border h-10 bg-blue-300 rounded-lg shadow-md w-5/6" @click="login()" type="button">Login</button>
            </div>
        </form>
      </div>
    </div>
</template>
<script>
import router from '../router'
import axios from 'axios'
export default
{
  data () {
    return {
      error: '',
      email: 'sys@iir',
      password: '123'
    }
  },
  methods: {
    login () {
      var data = {
        email: this.email,
        password: this.password
      }
      axios.post('/api/login', data)
        .then((response) => {
          localStorage.setItem('user', response.data['token'])
          this.displayMenu = true
          router.push('/main')
        })
        .catch((e) => {
          this.error = 'Login Error'
          console.log(e.response.data)
        })
    }
  }
}
</script>
