<template>
  <div class="text-xs pb-1 bg-white h-screen pb-5" id="annotationList">
    <div class="m-2 p-2 bg-dark-gray border" v-if="currentUser.role<2">
      <div class="p-2">
        <button @click="online_search = true"  :class="{'border-blue-500' : online_search}" class="relative border-b-2 p-1 border-transparent">Online Search</button>
        <button @click="online_search = false" :class="{'border-blue-500' : !online_search}" class="relative border-b-2 p-1 border-transparent ml-5">BioC.JSON Files</button>
      </div>
      <div id="dvOnlineSearch" v-if="online_search">
        <div class="flex bg-white rounded-lg border-2 text-xs border border-gray-300">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4 flex-shrink-0 mt-3 mr-2 ml-2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
          </svg>
          <input type="text" class="border-0 bg-transparent flex-1 rounded-lg text-sm" placeholder="Pubmed ID" v-model="keyword">
        </div>
      </div>
      <div id="dvUploadFile" v-else>
        <input class="block w-full bg-white text-xs border border-gray-300 rounded-lg cursor-pointer" id="fileUpload" type="file" v-on:change="uploadBiorec" ref="file" accept=".BioC.json">
      </div>
    </div>
    <div id="dvDocList" class="h-4/5 m-2 bg-white rounded-lg border border-gray-300 overflow-y-auto overflow-x-hidden">
        <table class="text-center table-fixed break-words border-collapse w-full bg-dark-gray">
          <thead>
            <tr>
              <th class="px-4 py-2 border-b-2 border-gray-200 w-2/3">Title</th>
              <th class="px-4 py-2 border-b-2 border-gray-200">PMID</th>
              <th class="px-4 py-2 border-b-2 border-gray-200">Status</th>
              <th class="px-4 py-2 border-b-2 border-gray-200">Action</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for = "item in documentSet" :key="item.id" class="border-b dark:border-neutral-500">
              <td class="px-4 py-2 border-b-2 border-gray-200 text-left">  {{item.title}}</td>
              <td class="px-4 py-2 border-b-2 border-gray-200">{{item.pubmedID}}</td>
              <td class="px-4 py-2 border-b-2 border-gray-200">
                  <span v-if="item.status===0">Not Start</span>
                  <span v-if="item.status===1" class="text-green-500">Working</span>
                  <span v-if="item.status===2" class="text-sky-500">Submitted</span>
                  <span v-if="item.status===3" class="text-fuchsia-500">Finalized</span>
              </td>
              <td class="px-4 py-2 border-b-2 border-gray-200">
                <button class="bg-blue-300 hover:bg-blue-400 py-1 px-3 rounded-full" @click="OpenAnnotation(item.pubmedID)">Annotate</button>
              </td>
            </tr>
          </tbody>
        </table>
    </div>
    <div class="ml-20">
      <span >
        Pages
      </span>
      <button v-for="(page, index) in documentCount/10" :key="index" @click="Getpage(index)" class="p-0.5" > {{ page }}</button>
    </div>
  </div>
</template>
<script>
import router from '../router'
import VueJwtDecode from 'vue-jwt-decode'
import axios from 'axios'
// import AnnotationComponents from './AnnotationComponents.vue'
export default
{
  name: 'Annotation',
  data () {
    return {
      errorMessage: '',
      keyword: '',
      online_search: true,
      documentCount: 0,
      documentSet: [],
      currentUser: ''
    }
  },
  methods: {
    OpenAnnotation (PubMedID) {
      router.push({path: '/annotation_components', query: { pubmedID: PubMedID }})
      // In AnnotationComponents, just use var pubmedID = this.$route.query.pubmedID to load the pubmedID
    },
    async Getpage (pageIndex, pageSize = 10) {
      var data = {userName: this.currentUser.userName, pageSize: pageSize, pageIndex: pageIndex}
      axios.post('/api/loadDocumentList', data)
        .then((response) => {
          this.documentSet = response.data.documentlist.rows
        })
        .catch((e) => {
          this.error = 'Failed Authorization'
        })
    },
    async uploadBiorec () {
      let formData = new FormData()
      formData.append('userName', this.currentUser.userName)
      formData.append('biorecJsonfile', this.$refs.file.files[0])
      try {
        await axios.post('/api/uploadBiorec', formData)
          .then((response) => {
            this.documentSet = response.data.documentlist.rows
            this.documentCount = response.data.documentlist.count
          })
      } catch (error) {
        console.log(error)
      }
    }
  },
  mounted () {
    let token = localStorage.getItem('user')
    this.currentUser = VueJwtDecode.decode(token)
    if (!token) {
      router.push('/')
    } else {
      var data = {userName: this.currentUser.userName, pageSize: 20, pageIndex: 0}
      axios.post('/api/loadDocumentList', data)
        .then((response) => {
          this.documentSet = response.data.documentlist.rows
          this.documentCount = response.data.documentlist.count
        })
        .catch((e) => {
          this.error = 'Failed Authorization'
        })
    }
  }
}
</script>
