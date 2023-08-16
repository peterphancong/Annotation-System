<template>
    <div class="text-sm" id="AnnotationComponent">
      <div class="flex w-full">
        <div id="paragraph" class="w-3/4 pb-3 " >
          <div id="title" class="ml-1 font-bold text-left w-5/6" >{{ title }}</div>
          <div id="abstract" class="p-1 border shadow-sm overflow-y-scroll overflow-auto h-full">
             {{ abstractText }}
          </div>
        </div>
        <div id="function" class="w-1/4 pb-3 text-xs h-screen bg-gray-300">
          <div class="mt-1 h-30" id="commands">
            <div class="border border-gray-300 p-1 mx-1 overflow-auto flex justify-between h-1/2">
              <button @click="entity_relation_toggle = true" :class="{'border-blue-500' : entity_relation_toggle}" class="w-1/2 relative border-b-2 p-1 border-transparent">Entity</button>
              <button @click="entity_relation_toggle = false" :class="{'border-blue-500' : !entity_relation_toggle}" class="w-1/2 relative border-b-2 p-1 border-transparent">Relation</button>
            </div>
          </div>
          <div id="dataList" class="h-5/6 p-2" v-if="entity_relation_toggle">
            <div class="border border-gray-300 p-1 flex justify-center h-10">
              <select v-model="selectedIDType" @change="idTypeChange()" class="w-full py-0 px-1 h-8 rounded-lg text-xs border-gray-400 text-gray-900">
                <option value="None" class="text-xs" disabled selected> Select ID type</option>
                <option value="CellLine" class="text-xs" selected> Cell Line</option>
                <option value="ChemicalEntity" class="text-xs">Chemical Entity</option>
                <option value="DiseaseOrPhenotypicFeature" class="text-xs"> Disease / Phenotypic Feature </option>
                <option value="GeneOrGeneProduct" class="text-xs"> Gene / Gene Product </option>
                <option value="OrganismTaxon" class="text-xs"> Organism Taxon</option>
                <option value="SequenceVariant" class="text-xs"> Sequence Variant</option>
              </select>
            </div>
            <div class="border border-gray-300 overflow-auto flex justify-center h-8 mt-2">
              <input v-model="newIdentifier" type="text" class="px-1 w-1/6 ml-1 text-xs border-1 focus:outline-none flex-1 rounded-lg" placeholder="Search ID from ICD11">
              <button @click="addIdentifier()" class="ml-2 mr-2 text-xs bg-gray-200 rounded-lg border-blue-500 w-1/6">Search</button>
            </div>
            <div class="mt-2 h-1/6 m-1 p-2 bg-white rounded-lg border border-gray-300 overflow-auto" id="identifier_selection">
              <table ref="entityTable" class="text-center mb-1 table-fixed  break-all border-collapse  overflow-y-scroll overflow-auto w-full bg-dark-gray">
                <thead>
                  <tr>
                      <th class="border-b-2 p-0.5 border-gray-200 w-5/6">Searched Identifier List</th>
                      <th class="border-b-2 p-0.5 border-gray-200 w-1/6">Action</th>
                  </tr>
                </thead>
                <tbody>
                    <tr><!-- v-for="(item, index) in searchedEntities" :key="index"-->
                      <td class="border-b-2 p-0.5 border-gray-200">http://id.who.int/icd/entity/1448356431</td>
                      <td class="border-b-2 p-0.5 border-gray-200">
                        <div class="flex justify-center">
                          <button class="w-full m-1 h-6 bg-green-300 rounded-lg text-gray-900 border-b-2 border-gray-500">Add</button>
                        </div>
                      </td>
                    </tr>
                </tbody>
              </table>
            </div>
            <div class="mt-2 h-1/4 m-1 p-2 bg-white rounded-lg border border-gray-300 overflow-auto " id="identifier_selection">
              <table class="text-center mb-1 table-fixed border-collapse w-full bg-dark-gray">
                <thead>
                  <tr>
                    <th class="border-b-2 p-0.5 border-gray-200">Identifier Board</th>
                  </tr>
                </thead>
                <tbody>
                  <td></td>
                </tbody>
              </table>
              <div class="text-xs border-black shadow-sm text-base bg-white">
                <button v-for="(identifier, index) in identifierList" :key="index" @click="annotate(identifier)"
                class="text-xs m-0.5 bg-gray-200 rounded-lg p-0.5 border-gray-500 hover:bg-gray-500">{{identifier}}
                </button>
              </div>
            </div>
            <div class="h-1/2 mt-2 m-1 p-2 bg-white rounded-lg border border-gray-300 overflow-auto">
                <table ref="entityTable" class="text-center mb-1 table-fixed  break-all border-collapse  overflow-y-scroll overflow-auto w-full bg-dark-gray">
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
          <div v-else class="h-5/6 p-2 bg-white border border-gray-300 mx-1 overflow-auto">
            <table class="text-left table-fixed break-all border-collapse  overflow-y-scroll overflow-auto w-full bg-dark-gray">
                  <thead>
                    <tr>
                      <th class="border-b-2 border-gray-200">ID 1</th>
                      <th class="border-b-2 border-gray-200">ID 2</th>
                      <th class="border-b-2 border-gray-200">Type</th>
                      <th class="border-b-2 border-gray-200">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td class="border-b-2 border-gray-200">Long QT syndrome</td>
                      <td class="border-b-2 border-gray-200">c|SUB|G|</td>
                      <td class="border-b-2 border-gray-200">SequenceVariant</td>
                      <td class="border-b-2 border-gray-200">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="ml-1 w-5 h-5 text-red-500">
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
</template>
<script>
import router from '../router'
import VueJwtDecode from 'vue-jwt-decode'
import axios from 'axios'

export default {
  name: 'AnnotationBoard',
  data () {
    return {
      currentUser: '',
      abstractText: '',
      identifierList: [],
      title: '',
      selectedIDType: 'None',
      colorPalete: [{'identifierType': 'CellLine', 'color': '#577590'},
        {'identifierType': 'ChemicalEntity', 'color': '#43aa8b'},
        {'identifierType': 'DiseaseOrPhenotypicFeature', 'color': '#90be6d'},
        {'identifierType': 'GeneOrGeneProduct', 'color': '#f9c74f'},
        {'identifierType': 'OrganismTaxon', 'color': '#f8961e'},
        {'identifierType': 'SequenceVariant', 'color': '#f3722c'},
        {'identifierType': 'Multiple', 'color': '#ff0000'},
        {'identifierType': 'ICD-11', 'color': '#808080'} ],
      annotatedEntities: [],
      newIdentifier: '',
      entity_relation_toggle: true,
      searchedEntities: []
    }
  },
  methods: {
    addIdentifier () {
      var data = {identifier: this.newIdentifier, identifierType: this.selectedIDType, userName: this.currentUser.userName}
      axios.post('/api/addIdentifier', data)
        .then((response) => {
          if (response.status === 203) {
            console.log('add identifier sucessfully')
            this.identifierList.push(response.data.returnIden)
            // this.identifierList.push(this.newIdentifier)
          } else {
            this.error = 'add identifier failed'
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
      this.annotatedEntities.push(annotatedItem)
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
