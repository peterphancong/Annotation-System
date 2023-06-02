<template>
  <div class="min-h-screen flex flex-col items-left justify-top">
    <h1 class="p-4 text-4xl md:text-5xl lg:text-4xl dark:text-white text-left w-5/6">Annotation</h1>
    <div class="p-4">
      <button v-on:click="online_search = true; upload_files = false" class=""  :class="{ 'relative border-b-2 border-transparent border-blue-500 text-blue-500': !upload_files }">Online Search</button>
      <button v-on:click="online_search = false; upload_files = true" class="ml-5"  :class="{ 'relative border-b-2 border-transparent border-blue-500 text-blue-500': upload_files }">Upload Files</button>
    </div>
    <div v-if="online_search">
      <form class="flex bg-white rounded-lg border-b-2 border-gray-200">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4 flex-shrink-0 mt-3 mr-2 ml-2">
          <path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
        </svg>
        <input type="text" class="border-0 bg-transparent focus:outline-none flex-1 rounded-lg" placeholder="A novel" v-model="keyword">
      </form>
      <div class="bg-white rounded-lg">
        <table class="mt-10 min-w-full text-center text-sm font-light">
          <thead
            class="border-b bg-gray-200 font-medium text-black">
            <tr>
              <th scope="col" class=" px-10 py-4 text-left">Title</th>
              <th scope="col" class=" px-6 py-4">PMID</th>
              <th scope="col" class=" px-6 py-4">Status</th>
              <th scope="col" class=" px-6 py-4">Action</th>
            </tr>
          </thead>
          <tbody>
            <tr class="border-b dark:border-neutral-500">
              <td class="whitespace-nowrap  px-6 py-4 font-medium  text-left"><span class="font-bold">A novel</span> study: long-lasting event memory.</td>
              <td class="whitespace-nowrap  px-6 py-4">31614642</td>
              <td class="whitespace-nowrap  px-6 py-4">not start</td>
              <td class="whitespace-nowrap  px-6 py-4">
                <button class="bg-blue-300 hover:bg-blue-400 font-bold py-1 px-3 rounded-full" @click="LoadPage">Load</button>
              </td>
            </tr>
            <tr class="border-b dark:border-neutral-500">
              <td class="whitespace-nowrap  px-6 py-4 font-medium text-left">Synthesis and properties of <span class="font-bold">a novel</span> decacyclic S,N-heteroacene.</td>
              <td class="whitespace-nowrap  px-6 py-4">34514249</td>
              <td class="whitespace-nowrap  px-6 py-4 text-green-400">In progress</td>
              <td class="whitespace-nowrap  px-6 py-4">
                <button class="bg-blue-300 hover:bg-blue-400 font-bold py-1 px-3 rounded-full">Load</button>
              </td>
            </tr>
            <tr class="border-b dark:border-neutral-500">
              <td class="whitespace-nowrap  px-6 py-4 font-medium text-left">N-methyl-bacillithiol, <span class="font-bold">a Novel</span> Thiol from Anaerobic Bacteria.</td>
              <td class="whitespace-nowrap  px-6 py-4">39856468</td>
              <td class="whitespace-nowrap  px-6 py-4 text-red-500">Defference Solving</td>
              <td class="whitespace-nowrap  px-6 py-4">
                <button class="bg-blue-300 hover:bg-blue-400 font-bold py-1 px-3 rounded-full">Load</button>
              </td>
            </tr>
            <tr class="border-b dark:border-neutral-500">
              <td class="whitespace-nowrap  px-6 py-4 font-medium text-left">Wolf-living with SLE in <span class="font-bold">a novel</span>.</td>
              <td class="whitespace-nowrap  px-6 py-4">96514249</td>
              <td class="whitespace-nowrap  px-6 py-4 text-green-400">In progress</td>
              <td class="whitespace-nowrap  px-6 py-4">
                <button class="bg-blue-300 hover:bg-blue-400 font-bold py-1 px-3 rounded-full">Load</button>
              </td>
            </tr>
            <tr class="border-b dark:border-neutral-500">
              <td class="whitespace-nowrap  px-6 py-4 font-medium text-left">Origins and evolutionary genomics of the <span class="font-bold">novel</span> swine-origin influenza A (H1N1) virus...</td>
              <td class="whitespace-nowrap  px-6 py-4">27856468</td>
              <td class="whitespace-nowrap  px-6 py-4 text-orange-400">Done</td>
              <td class="whitespace-nowrap  px-6 py-4">
                <button class="bg-blue-300 hover:bg-blue-400 font-bold py-1 px-3 rounded-full">Load</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <div v-else-if="upload_files" class="bg-gray-100">
      <div class="mt-5">
        <div class="bg-white p-8 rounded-lg shadow-lg">
          <div class="mb-6 text-center">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="h-12 w-12 mx-auto text-gray-400">
              <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
            </svg>
            <!-- <h2 class="text-2xl text-gray-800 font-semibold">Drag and Drop Files</h2>
            <p class="mt-2 text-sm text-gray-500">or</p>
            <p class="mt-2 text-sm text-gray-500">Click to Upload</p> -->
          </div>
          <div class="border-2 border-dashed border-gray-400 rounded-lg p-6">
            <input type="file" class="hidden" />
            <div class="flex justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="h-12 w-12 text-gray-400">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
              </svg>
            </div>
            <div class="mt-4 text-center">
              <p class="text-sm text-gray-500">Drag and drop your files here</p>
              <p class="text-sm text-gray-500">or</p>
              <button class="mt-2 bg-blue-500 hover:bg-blue-600 text-white font-semibold px-4 py-2 rounded-lg">Browse Files</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import router from '../router'
import VueJwtDecode from 'vue-jwt-decode'
import axios from 'axios'
export default
{
  name: 'Annotation',
  data () {
    return {
      keyword: '',
      online_search: true,
      upload_files: false,
      load_page: false
    }
  },
  methods: {
    LoadPage () {
      router.push('/annotation_components')
    },
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
