<template>
    <div class="text-sm h-full overflow-x-hidden" id="AnnotationComponent">
      <div class="flex w-full h-full overflow-x-hidden">
        <div id="paragraph" class="w-3/4 flex flex-col" >
          <div id="title" class="flex-none ml-1 font-bold text-left w-5/6" >{{ title }}</div>
          <div id="abstract" class="flex-1 p-1 border shadow-sm overflow-y-scroll overflow-auto">
             {{ abstractText }}
          </div>
        </div>
        <div id="function" class="overflow-x-hidden w-1/4 text-xs bg-gray-300 flex flex-col h-full pl-1">
          <div class="flex-none mt-1 h-30" id="commands">
            <div class="flex justify-end">
              <button class="mr-2 ml-2 w-36 h-8 bg-blue-300 text-gray-900 rounded-lg border-b-2 border-gray-500" type="button">Cancel</button>
              <button class="mr-2 ml-2 w-36 h-8 bg-blue-300 text-gray-900 rounded-lg border-b-2 border-gray-500" type="button">Save</button>
              <button class="mr-2 ml-2 w-36 h-8 bg-blue-300 text-gray-900 rounded-lg border-b-2 border-gray-500" type="button">Submit</button>
            </div>
              <div class="overflow-auto flex justify-between h-1/2 mt-1">
                <button @click="entity_relation_toggle = true" :class="{'bg-white border-white border-2 rounded-t-lg' : entity_relation_toggle}" class="w-1/2 relative border-1 p-0.5">Entity</button>
                <button @click="entity_relation_toggle = false" :class="{'bg-white border-white border-2 rounded-t-lg' : !entity_relation_toggle}" class="w-1/2 relative border-1 p-0.5">Relation</button>
              </div>
          </div>
          <div v-show="entity_relation_toggle" id="EntityTab" class="bg-white flex flex-1 flex-col overflow-y-auto overflow-x-hidden">
            <div class="flex-none py-2 px-1 justify-center h-10">
              <select v-model="selectedIDType" @change="idTypeChange()" class="w-full py-0 h-8 rounded-lg text-xs border-gray-400 text-gray-900">
                <option value="None" class="text-xs " disabled selected> Select ID type</option>
                <option value="Gene/Protein" class="text-xs" selected>Gene/Protein</option>
                <option value="Chemical" class="text-xs"> Chemical </option>
                <option value="Disease" class="text-xs"> Disease </option>
                <option value="Variant" class="text-xs"> Variant </option>
                <option value="Species" class="text-xs"> Species </option>
              </select>
            </div>
            <div class="flex-none justify-right h-10 p-1">
              <input v-model="identifierQuery" type="text" class="h-8 text-xs border-1 focus:outline-none flex-1 rounded-lg" placeholder="Search ID from ICD11">
              <button @click="searchIdentifier()" class="text-xs bg-gray-200 hover:bg-blue-400 py-1 px-3 rounded-full">Search</button>
              <a href="#" @click="searchedEntities = [], identifierQuery=''" class = "text-blue-600 dark:text-blue-500 hover:underline">Clear Search</a>
            </div>
            <div class="flex-none h-25 overflow-y-auto overflow-x-hidden" id="identifier_selection">
              <div v-for ="(searchItem,index ) in searchedEntities" :key="index" class="flex justify-center w-full ml-2 pr-4 mt-0.5 border-b-2 border-gray-100 align-middle" id="searchedItem">
                <div class="w-3/4 "><a :href = "searchItem.id" class="text-blue-600 dark:text-blue-500 hover:underline">{{searchItem.title + ' ('+ searchItem.code + ')'}}</a></div>
                <button @click="addIdentifier(searchItem.code)" class="w-1/4 mb-0.5 h-6 bg-green-100 hover:bg-blue-400 py-1 px-3 rounded-full">Add</button>
              </div>
            </div>
            <div class="flex-none mt-2 h-40 m-1 p-2 bg-white rounded-lg border border-gray-300 overflow-auto " id="availableIdentifiers">
              <div id = "identifierList">
                <!-- <span class="text-xs underline">Select identifiers:</span> -->
                <button v-for="(identifier, index) in identifierList" :key="index" @click="annotate(identifier)"
                class="text-xs m-0.5 bg-gray-200 rounded-lg p-0.5 border-gray-500 hover:bg-gray-500">{{ identifier }}
                </button>
              </div>
            </div>
            <div class="flex-1 mt-2 m-1 bg-white rounded-lg border border-gray-300 overflow-y-auto overflow-x-hidden">
              <table ref="entityTable" class="text-center table-fixed break-all border-collapse w-full bg-dark-gray">
                <thead>
                  <tr>
                      <th class="border-b-2 p-0.5 border-gray-200">Entity</th>
                      <th class="border-b-2 p-0.5 border-gray-200">Identifier</th>
                      <th class="border-b-2 p-0.5 border-gray-200">Type</th>
                      <th class="border-b-2 p-0.5 border-gray-200">Action </th>
                  </tr>
                </thead>
                <tbody>
                    <tr v-for="(item, index) in annotatedEntities" :key="index">
                      <td class="border-b-2 p-0.5 border-gray-200">{{ item.Entity }}</td>
                      <td class="border-b-2 p-0.5 border-gray-200">{{ item.Identifier}}</td>
                      <td class="border-b-2 p-0.5 border-gray-200">{{ item.Type}}</td>
                      <td class="border-b-2 p-0.5 border-gray-200">
                        <div class="flex justify-center">
                          <svg @click="removeAnnotation(item.Entity, item.Identifier, item.Type)" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5 text-red-500 cursor-pointer">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                        </div>
                      </td>
                    </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div v-show="!entity_relation_toggle" id="RelationTab" class="bg-white flex flex-1 flex-col overflow-y-auto overflow-x-hidden">
            <div class ="flex flex-none py-2 px-1 justify-center h-10">
              <select v-model="selectedRelation.ID1" class="w-full py-0 h-8 rounded-lg text-xs border-gray-400 text-gray-900">
                  <option value="None" class="text-xs" disabled selected> Select </option>
                  <option v-for="(Iden,index) in uniqueIdenType" :key="index" :value= "Iden" class="text-xs "> {{ Iden }} </option>
                </select>
                <select v-model="selectedRelation.ID2" class="w-full py-0 mx-1 h-8 rounded-lg text-xs border-gray-400 text-gray-900">
                  <option value="None" class="text-xs" disabled selected> Select </option>
                  <option v-for="(Iden,index) in uniqueIdenType" :key="index" :value= "Iden" class="text-xs "> {{ Iden }} </option>
                </select>
                <select v-model="selectedRelation.Type" class="w-full py-0 mr-1 h-8 rounded-lg text-xs border-gray-400 text-gray-900">
                  <option value="None" class="text-xs" disabled selected> Select </option>
                  <option value="Possitive" class="text-xs" selected> Possitive</option>
                  <option value="Negative" class="text-xs">Negative</option>
                  <option value="Association" class="text-xs"> Association </option>
                  <option value="Bind" class="text-xs"> Bind </option>
                  <option value="DrugInteration" class="text-xs"> DrugInteration </option>
                  <option value="Cotreatment" class="text-xs"> Cotreatment </option>
                  <option value="Comparison" class="text-xs"> Comparison </option>
                  <option value="Conversion" class="text-xs"> Conversion </option>
                </select>
                <div class="w-full">
                  <button @click="addRelation()" class="w-full h-8 bg-green-100 hover:bg-blue-400 py-1 px-3 rounded-full">Add</button>
                </div>
              </div>
            <div class="flex-1 mt-2 m-1 bg-white rounded-lg border border-gray-300 overflow-y-auto overflow-x-hidden">
              <table class="text-center table-fixed break-all border-collapse w-full bg-dark-gray">
                    <thead>
                      <tr>
                        <th class="border-b-2 p-0.5 border-gray-200">ID 1</th>
                        <th class="border-b-2 p-0.5 border-gray-200">ID 2</th>
                        <th class="border-b-2 p-0.5 border-gray-200">Type</th>
                        <th class="border-b-2 p-0.5 border-gray-200">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="(rel, index) in annotatedRelations" :key="index">
                        <td class="border-b-2 p-0.5 border-gray-200">
                          {{ rel.ID1 }}
                        </td>
                        <td class="border-b-2 p-0.5 border-gray-200">
                          {{ rel.ID2 }}
                        </td>
                        <td class="border-b-2 p-0.5 border-gray-200">
                          {{ rel.Type }}
                        </td>
                        <td class="border-b-2 p-0.5 border-gray-200">
                          <svg @click="removeRelation(rel.ID1, rel.ID2, rel.Type)" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5 text-red-500 cursor-pointer mx-auto">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                        </td>
                      </tr>
                    </tbody>
              </table>
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
export default {
  name: 'AnnotationBoard',
  computed: {
    uniqueIdenType: function () {
      var uniqueList = this.annotatedEntities.map(item => item.Type).filter((value, index, self) => self.indexOf(value) === index)
      return uniqueList
    }
  },
  data () {
    return {
      currentUser: '',
      abstractText: '',
      identifierList: [],
      title: '',
      selectedIDType: 'None',
      colorPalete: [{'identifierType': 'Gene/Protein', 'color': '#43aa8b'},
        {'identifierType': 'Chemical', 'color': '#90be6d'},
        {'identifierType': 'Disease', 'color': '#f9c74f'},
        {'identifierType': 'Variant', 'color': '#f8961e'},
        {'identifierType': 'Species', 'color': '#f3722c'},
        {'identifierType': 'Multiple', 'color': '#ff0000'}
      ],
      annotatedEntities: [],
      annotatedRelations: [],
      identifierQuery: '',
      entity_relation_toggle: true,
      searchedEntities: [],
      selectedRelation: {
        ID1: 'None',
        ID2: 'None',
        Type: 'None'
      }
    }
  },
  methods: {
    addRelation () {
      let annotatedRel = {'ID1': this.selectedRelation.ID1, 'ID2': this.selectedRelation.ID2, 'Type': this.selectedRelation.Type}
      let existing = this.annotatedRelations.find(
        function (a) {
          return a.ID1 === annotatedRel.ID1 && a.ID2 === annotatedRel.ID2 && a.Type === annotatedRel.Type
        })
      if (existing) {
        console.log('rel existing...')
        return
      }
      this.annotatedRelations.unshift(annotatedRel)
    },
    removeRelation (ID1, ID2, Type) {
      let index = this.annotatedRelations.findIndex(a => a.ID1 === ID1 && a.ID2 === ID2 && a.Type === Type)
      this.annotatedRelations.splice(index, 1)
    },
    addIdentifier (newIdentifier) {
      if (this.selectedIDType === 'None') {
        alert('Select ID-type before adding')
        return
      }
      var data = {identifier: newIdentifier, identifierType: this.selectedIDType, userName: this.currentUser.userName}
      axios.post('/api/addIdentifier', data)
        .then((response) => {
          if (response.status === 203) {
            console.log('add identifier sucessfully')
            this.identifierList.unshift(response.data.returnIden)
          } else {
            console.log('add identifier failed')
          }
        })
        .catch((e) => {
          this.error = 'Add identifiers failed'
        })
    },
    idTypeChange () {
      var req = {identifierType: this.selectedIDType, userName: this.currentUser.userName}
      axios.post('/api/getIdentifierByType', req)
        .then((response) => {
          if (response.status === 203) {
            this.identifierList = response.data.identifierList
          } else {
            router.push('/')
          }
        })
        .catch((e) => {
          this.error = 'Login Error'
        })
    },
    annotate (identifier) {
      var userSelected = document.getSelection()
      if (!(document.querySelector('#paragraph').contains(userSelected.baseNode))) {
        console.log('outside paragraph...')
        return
      }
      let currentSelectedType = this.selectedIDType
      let selectedText = userSelected.toString().trim()
      let existing = this.annotatedEntities.find(
        function (a) {
          return a.Entity === selectedText && a.Identifier === identifier && a.Type === currentSelectedType
        })
      if (existing) {
        console.log('existing...')
        return
      }
      let annotatedItem = {'Entity': selectedText, 'Identifier': identifier, 'Type': currentSelectedType}
      var newNode = document.createElement('span')
      newNode.appendChild(document.createTextNode(selectedText))
      let selected, replacedColor, title
      if (userSelected.baseNode.parentNode.tagName === 'DIV') {
        replacedColor = this.colorPalete.find(function (p) { return p.identifierType === currentSelectedType }).color
        title = currentSelectedType
        selected = selectedText
      } else if (userSelected.baseNode.parentNode.tagName === 'SPAN') {
        replacedColor = this.colorPalete.find(function (p) { return p.identifierType === 'Multiple' }).color
        title = 'Multiple annotated'
        let selectedNode = userSelected.baseNode.parentNode
        selected = selectedNode.outerHTML
      }
      Object.assign(
        newNode,
        {
          style: 'background-color: ' + replacedColor + '; display: inline;',
          title: title
        }
      )
      this.abstractText = this.abstractText.split(selected).join(newNode.outerHTML)
      document.querySelector('#abstract').innerHTML = this.abstractText
      this.title = this.title.split(selected).join(newNode.outerHTML)
      document.querySelector('#title').innerHTML = this.title
      this.annotatedEntities.unshift(annotatedItem)
    },
    removeAnnotation (entity, identifier, type) {
      let index = this.annotatedEntities.findIndex(a => a.Entity === entity && a.Identifier === identifier && a.Type === type)
      this.annotatedEntities.splice(index, 1)
      var remain = this.annotatedEntities.filter(function (a) { return a.Entity === entity })
      if (remain.length === 0) {
        for (const span of document.querySelectorAll('#paragraph > div > span')) {
          if (span.textContent.includes(entity)) {
            let htmlContent = span.outerHTML
            this.abstractText = this.abstractText.split(htmlContent).join(entity)
            document.querySelector('#abstract').innerHTML = this.abstractText
            this.title = this.title.split(htmlContent).join(entity)
            document.querySelector('#title').innerHTML = this.title
          }
        }
      } else if (remain.length === 1) {
        let annotation = remain[0]
        let type = annotation.Type
        let color = this.colorPalete.find(function (p) { return p.identifierType === type }).color
        for (const span of document.querySelectorAll('#paragraph > div > span')) {
          if (span.textContent.includes(entity)) {
            let currentHTMLContent = span.outerHTML
            Object.assign(
              span,
              {
                style: 'background-color: ' + color + '; display: inline;',
                title: type
              }
            )
            let newHTMLContent = span.outerHTML
            this.abstractText = this.abstractText.split(currentHTMLContent).join(newHTMLContent)
            document.querySelector('#abstract').innerHTML = this.abstractText
            this.title = this.title.split(currentHTMLContent).join(newHTMLContent)
            document.querySelector('#title').innerHTML = this.title
          }
        }
      }
    },
    searchIdentifier () {
      var req = {searchText: this.identifierQuery}
      axios.post('/api/searchICD_11', req)
        .then((response) => {
          if (response.status === 203) {
            console.log('search identifier found')
            this.searchedEntities = []
            var div = document.createElement('div')
            this.searchedEntities = response.data.returnIden.map(function (i) {
              div.innerHTML = i.title
              i.title = div.textContent || div.innerText || ''
              i.code = i.id.split('/').pop()
              return i
            })
            console.log(this.searchedEntities)
          } else {
            console.log('add identifier failed')
          }
        })
        .catch((e) => {
          this.error = 'Add identifiers failed'
        })
    }
  },
  mounted () {
    let token = localStorage.getItem('user')
    if (!token) {
      router.push('/')
    } else {
      var pubmedID = this.$route.query.pubmedID
      var data = {token: token, pubmedID: pubmedID}
      axios.post('/api/getDocumentByPubmedID', data)
        .then((response) => {
          if (response.status === 203) {
            this.currentUser = VueJwtDecode.decode(token)
            this.abstractText = response.data.document.abstract
            this.title = response.data.document.title
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
