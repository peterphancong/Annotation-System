<template>
  <div class="text-sm pb-1">
    <h1 class="pl-2 text-4xl text-left w-5/6">Annotation List</h1>
    <div class="m-2 p-2 bg-dark-gray border">
      <div class="h-10">
        <button @click="online_search = true"  :class="{'border-blue-500' : online_search}" class="relative border-b-2 p-1 border-transparent">Online Search</button>
        <button @click="online_search = false" :class="{'border-blue-500' : !online_search}" class="relative border-b-2 p-1 border-transparent ml-5">BioC.JSON Files</button>
      </div>
      <div id="dvOnlineSearch" v-if="online_search" class="">
        <div class="flex bg-white rounded-lg border-2 text-xs border border-gray-300">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4 flex-shrink-0 mt-3 mr-2 ml-2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
          </svg>
          <input type="text" class="border-0 bg-transparent flex-1 rounded-lg text-sm" placeholder="Pubmed ID" v-model="keyword">
        </div>
      </div>
      <div id="dvUploadFile" v-else>
        <input class="block w-full bg-white text-xs border border-gray-300 rounded-lg cursor-pointer" id="fileUpload" type="file" @change="uploadBiorec" ref="file" accept=".BioC.json">
      </div>
    </div>
    <div id="dvDocList" class="p-2 m-2 border overflow-y-scroll overflow-auto max-h-96 bg-dark-gray">
        <table class="text-left mb-10 table-auto border-collapse rounded-lg overflow-hidden w-full">
          <thead>
            <tr>
              <th class="px-4 py-2 border-b-2 border-gray-200">Title</th>
              <th class="px-4 py-2 border-b-2 border-gray-200">PMID</th>
              <th class="px-4 py-2 border-b-2 border-gray-200">Status</th>
              <th class="px-4 py-2 border-b-2 border-gray-200">Action</th>
            </tr>
          </thead>
          <tbody>
            <tr class="border-b dark:border-neutral-500">
              <td class="px-4 py-2 border-b-2 border-gray-200">  A novel study: long-lasting event memory.</td>
              <td class="px-4 py-2 border-b-2 border-gray-200">31614642</td>
              <td class="px-4 py-2 border-b-2 border-gray-200"><span class ="text-gray-400">Finalized</span></td>
              <td class="px-4 py-2 border-b-2 border-gray-200">
                <button class="bg-blue-300 hover:bg-blue-400 py-1 px-3 rounded-full" @click="LoadPage">Load</button>
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
  name: 'Annotation',
  data () {
    return {
      keyword: '',
      currentUser: '',
      online_search: true,
      load_page: false
    }
  },
  methods: {
    LoadPage () {
      router.push('/annotation_components')
    },
    async uploadBiorec () {
      let formData = new FormData()
      formData.append('userName', this.currentUser.userName)
      formData.append('biorecJsonfile', this.$refs.file.files[0])
      console.log(formData)
      try {
        await axios.post('/api/uploadBiorec', formData)
      } catch (error) {
        console.log(error)
      }
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
