<template>
  <div class="min-h-screen flex flex-col items-center justify-center">
    <div class="bg-white p-10 rounded-lg">
      <!-- <div v-if='error'>{{ error }}</div> -->
      <form>
          <div class="flex flex-col items-center">
            <input class="border p-4 h-10 mt-6 bg-gray-100 rounded-lg w-5/6" type='text' name='username' placeholder="Username" v-model="userName" /><br>
            <input class="border p-4 h-10 mt-1 bg-gray-100 rounded-lg w-5/6" type='text' name='user_email' placeholder="Email" v-model="email"/><br>
            <input class="border p-4 h-10 mt-1 bg-gray-100 rounded-lg w-5/6" type='password' name='user_password' placeholder="Password" v-model="password"/><br>
            <div class="flex items-center justify-between mb-2 mt-2 w-5/6">
              <span class="text-sm">Select your role:</span>
              <select class="text-sm mr-1 border w-1/2" v-model="role" name="roles">
                <option value="1">Leader</option>
                <option value="2">Curator</option>
              </select>
            </div>
            <button class="border mt-6 h-10 bg-blue-300 rounded-lg shadow-md w-5/6" @click="CreateAccount()" type="button">Create Account</button>
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
  }
}
</script>
