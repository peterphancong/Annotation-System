<template>
  <div class="min-h-screen flex flex-col items-left justify-top">
    <h1 class="mb-4 text-4xl md:text-5xl lg:text-4xl dark:text-white text-left w-5/6">Annotation</h1>
    <div class="bg-white p-5 rounded-lg">
      <form>
          <div class="flex">
            <label class="w-10% h-10 p-4 bg-white text-left">Search for PMID or keyword</label>
            <input class="border p-4 h-10 bg-gray-100 rounded-lg w-1/3" type='text' name='keyword' placeholder="31614642" v-model="keyword" /><br>
            <a href="#" class="flex items-center w-1/6 p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
              <button class="flex-1 border whitespace-nowrap rounded-lg w-1/6 h-8" @click="Search()" type="button">GO</button>
            </a>
          </div>
      </form>
      <table class="mt-10 min-w-full text-center text-sm font-light">
        <thead
          class="border-b bg-blue-200 font-medium text-black">
          <tr>
            <th scope="col" class=" px-6 py-4">#</th>
            <th scope="col" class=" px-6 py-4">PMID</th>
            <th scope="col" class=" px-6 py-4">Title</th>
            <th scope="col" class=" px-6 py-4"></th>
          </tr>
        </thead>
        <tbody>
          <tr class="border-b dark:border-neutral-500">
            <td class="whitespace-nowrap  px-6 py-4 font-medium">1</td>
            <td class="whitespace-nowrap  px-6 py-4">31614642</td>
            <td class="whitespace-nowrap  px-6 py-4">Stem Cell-Derived Extracellular Vesicles and Kidney Regeneration</td>
            <td class="whitespace-nowrap  px-6 py-4">
              <a href="#" class="px-6 py-4d hover:bg-gray-100 dark:hover:bg-gray-700">
                <button @click="Annotate(31614642)" type="button">Annotate</button>
              </a>
            </td>
          </tr>
        </tbody>
      </table>
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
