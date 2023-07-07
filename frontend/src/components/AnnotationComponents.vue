<template>
    <div class="text-sm" id = "AnnotationComponent">
      <div class="flex w-full">
        <div id="paragraph" class="w-3/4 pb-3 " >
          <h2 class="ml-1 font-bold text-left w-5/6" id="title">Stem Cell-Derived Extracellular Vesicles and Kidney Regeneration <span>(PubMedID: 31614642)</span></h2>
          <div v-on:mouseup="SelectText" class="p-1 border shadow-sm overflow-y-scroll overflow-auto h-full">
            <span v-html="highlightedText"></span>
          </div>
        </div>
        <div id="function" class="w-1/4 pb-3 text-xs h-screen bg-gray-300 h-screen">
          <div class="mt-1 h-30" id="commands">
            <div class = "border border-gray-300 p-1 mx-1 overflow-auto flex justify-center h-1/2">
              <button class="w-20 h-8 bg-blue-300 text-gray-900 rounded-lg border-b-2 border-gray-500" type="button">Cancel</button>
              <button class="ml-4 w-20 h-8 bg-blue-300 text-gray-900 rounded-lg border-b-2 border-gray-500" type="button">Save</button>
              <button class="ml-4 w-20 h-8 bg-blue-300 text-gray-900 rounded-lg border-b-2 border-gray-500" type="button">Submit</button>
            </div>
            <div class="border border-gray-300 p-1 mx-1 overflow-auto flex justify-center h-1/2">
              <select v-on:change="SelectEntityType" id="countries_disabled" class="py-0 px-1 rounded-lg text-xs border-b-1 border-gray-400 text-gray-900 w-3/6">
                <option value="None" class="text-xs" disabled selected>Select ID type</option>
                <option value="Gene">GeneOrGeneProduct</option>
                <option value="Disease">DiseaseOrPhenotypicFeature</option>
                <option value="Chemical">ChemicalEntity</option>
                <option value="Organism">OrganismTaxon</option>
                <option value="Variant">SequenceVariant</option>
                <option value="CellLine">CellLine</option>
              </select>
              <input v-model="insertNewIdentifier" type="text" class="w-2/6 ml-1 text-xs border-1 focus:outline-none flex-1 rounded-lg" placeholder="New ID">
              <button v-on:mouseup="insert" class="ml-1 text-xs bg-gray-200 rounded-lg border-blue-500 w-1/6">Add</button>
            </div>
          </div>
          <div id ="dataList" class ="h-5/6">
            <div class="h-1/3 bg-white border border-gray-300 p-1 m-1 overflow-auto" id="identifier_selection">
              <div class="h-full text-xs border-black shadow-sm overflow-y-scroll text-base overflow-auto bg-white">
                <button v-on:mouseup="SelectIdentifier" v-for="option in options" :key="option" class="text-xs m-0.5 bg-gray-200 rounded-lg p-0.5 border-gray-500 hover:bg-gray-500">{{ option }}</button>
              </div>
            </div>
            <div class="h-1/3 bg-white border border-gray-300 p-1 m-1 overflow-auto">
                <table ref="entityTable" class="text-left mb-1 table-fixed  break-all border-collapse  overflow-y-scroll overflow-auto w-full bg-dark-gray">
                  <thead>
                    <tr>
                        <th class="border-b-2 p-0.5 border-gray-200">Entity</th>
                        <th class="border-b-2 p-0.5 border-gray-200">Identifier</th>
                        <th class="border-b-2 p-0.5 border-gray-200">Type</th>
                        <th class="border-b-2 p-0.5 border-gray-200">Action </th>
                    </tr>
                  </thead>
                  <tbody>
                      <tr v-for="(item, index) in items" :key="index">
                        <td class="border-b-2 p-0.5 border-gray-200">{{ item.text }}</td>
                        <td class="border-b-2 p-0.5 border-gray-200">{{ item.identifier }}</td>
                        <td class="border-b-2 p-0.5 border-gray-200">{{ item.type }}</td>
                        <td class="border-b-2 p-0.5 border-gray-200">
                          <svg @click="deleteEntityRow(index)" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="ml-1 w-5 h-5 text-red-500 cursor-pointer">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                        </td>
                      </tr>
                  </tbody>
                </table>
            </div>
            <div class="h-1/3 bg-white border border-gray-300 p-1 mx-1 overflow-auto">
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
    </div>
</template>
<script>
import router from '../router'
import VueJwtDecode from 'vue-jwt-decode'
import axios from 'axios'

export default {
  name: 'Annotation Board',
  data () {
    return {
      currentUser: '',
      abstractText: '',
      title: '',
      searchKeyword: '',
      cleanKeyword: '',
      cleanType: '',
      toggle: false,
      // success: 'Success!',
      items: [
        // { text: 'Long QT syndrome', identifier: 'D008133', type: 'SequenceVariant' },
        // { text: 'LQTS', identifier: 'D008133', type: 'DiseaseOrPhenotypicFeature' }
      ],
      newItem: {
        text: '',
        identifier: '',
        type: 'None'
      },
      noneOptions: [],
      geneOptions: [],
      diseaseOptions: [],
      chemicalOptions: [],
      organismOptions: [],
      variantOptions: [],
      cellLineOptions: [],
      options: [''],
      insertNewIdentifier: ''
    }
  },
  methods: {
    addIdentifier (identifier, identifierType) {
      console.log('Adding identifier...')
      var data = {identifier: identifier, identifierType: identifierType, userName: this.currentUser.userName}
      axios.post('/api/addIdentifier', data)
        .then((response) => {
          if (response.status === 203) {
            console.log('add identifier sucessfully')
          } else {
            this.error = 'add identifier failed'
            console.log('add identifier failed')
          }
        })
        .catch((e) => {
          this.error = 'Add identifiers failed'
        })
    },
    SelectText (event) {
      this.newItem.text = window.getSelection().toString()
    },
    SelectIdentifier (event) {
      this.newItem.identifier = event.currentTarget.textContent
      this.searchKeyword = this.newItem.text
      if (this.newItem.type !== 'None') {
        this.items.push({
          text: this.newItem.text,
          identifier: this.newItem.identifier,
          type: this.newItem.type
        })
        this.newItem = {
          text: '',
          identifier: '',
          type: this.newItem.type
        }
        this.toggle = false
      // var btnText = event.currentTarget
      // this.selectedIdentifier = btnText.textContent
      // this.$refs.entityTable.insertAdjacentHTML(
      //   'beforeend',
      //   '<tr><td class="px-4 py-2 border-b-2 border-gray-200">' + this.selectedText + '</td><td class="px-4 py-2 border-b-2 border-gray-200">' + this.selectedIdentifier + '</td><td class="px-4 py-2 border-b-2 border-gray-200">' + this.selectedEntityType + '</td><td class="px-4 py-2 border-b-2 border-gray-200"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="ml-1 w-5 h-5 text-red-500 cursor-pointer"><path stroke-linecap="round" stroke-linejoin="round" d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" /></svg></td></tr>'
      // )
      }
    },
    SelectEntityType (event) {
      this.newItem.type = event.target.value
      if (this.newItem.type === 'None') {
        this.options = this.noneOptions
      } else if (this.newItem.type === 'Gene') {
        this.options = this.geneOptions
      } else if (this.newItem.type === 'Disease') {
        this.options = this.diseaseOptions
      } else if (this.newItem.type === 'Chemical') {
        this.options = this.chemicalOptions
      } else if (this.newItem.type === 'Organism') {
        this.options = this.organismOptions
      } else if (this.newItem.type === 'Variant') {
        this.options = this.variantOptions
      } else {
        this.options = this.cellLineOptions
      }
      // this.selectedEntityType = event.target.value
    },
    deleteEntityRow (index) {
      this.cleanKeyword = this.items[index].text
      this.cleanType = this.items[index].type
      // console.log(this.cleanType)
      this.items.splice(index, 1)
      this.toggle = true
    },
    cleanText () {
      let unhighlightedText = this.abstractText
      if (this.cleanType === 'Gene') {
        // eslint-disable-next-line no-useless-escape
        const regex = new RegExp(`<span class="bg-yellow-200">(${this.cleanKeyword})</span>`, 'gi')
        unhighlightedText = unhighlightedText.replace(regex, '$1')
        // unhighlightedText = unhighlightedText.replace(regex, (match, group1) => {
        // console.log(match)
        // return group1
        // })
      } else if (this.cleanType === 'Disease') {
        const regex = new RegExp(`<span class="bg-pink-200">(${this.cleanKeyword})</span>`, 'gi')
        unhighlightedText = unhighlightedText.replace(regex, '$1')
        // unhighlightedText = unhighlightedText.replace(regex, (match, group1) => {
        // console.log(match)
        // return group1
        // })
      } else if (this.cleanType === 'Chemical') {
        const regex = new RegExp(`<span class="bg-green-200">(${this.cleanKeyword})</span>`, 'gi')
        unhighlightedText = unhighlightedText.replace(regex, '$1')
        // unhighlightedText = unhighlightedText.replace(regex, (match, group1) => {
        // console.log(match)
        // return group1
        // })
      } else if (this.cleanType === 'Organism') {
        const regex = new RegExp(`<span class="bg-blue-200">(${this.cleanKeyword})</span>`, 'gi')
        unhighlightedText = unhighlightedText.replace(regex, '$1')
        // unhighlightedText = unhighlightedText.replace(regex, (match, group1) => {
        // console.log(match)
        // return group1
        // })
      } else if (this.cleanType === 'Variant') {
        const regex = new RegExp(`<span class="bg-purple-200">(${this.cleanKeyword})</span>`, 'gi')
        unhighlightedText = unhighlightedText.replace(regex, '$1')
        // unhighlightedText = unhighlightedText.replace(regex, (match, group1) => {
        // console.log(match)
        // return group1
        // })
      } else if (this.cleanType === 'CellLine') {
        const regex = new RegExp(`<span class="bg-orange-200">(${this.cleanKeyword})</span>`, 'gi')
        unhighlightedText = unhighlightedText.replace(regex, '$1')
        // unhighlightedText = unhighlightedText.replace(regex, (match, group1) => {
        // console.log(match)
        // return group1
        // })
      } else {
        unhighlightedText = this.abstractText
      }
      this.cleanKeyword = ''
      this.abstractText = unhighlightedText
      return unhighlightedText
    },
    highlightText () {
      let highlightedText = this.abstractText
      if (this.items.length > 0) {
        let selectedType = this.items[this.items.length - 1].type
        // const regex = new RegExp(`(${this.searchKeyword})`, 'gi')
        const regex = new RegExp(`(?<=[(/ ]|^)(${this.searchKeyword})(?=[)/?!\\. ]|$)`, 'gi')
        if (selectedType === 'Gene') {
          highlightedText = highlightedText.replace(regex, '<span class="bg-yellow-200">$1</span>')
          // highlightedText = highlightedText.replace(regex, '<span class="bg-yellow-200">$1</span>')
        } else if (selectedType === 'Disease') {
          highlightedText = highlightedText.replace(regex, '<span class="bg-pink-200">$1</span>')
        } else if (selectedType === 'Chemical') {
          highlightedText = highlightedText.replace(regex, '<span class="bg-green-200">$1</span>')
        } else if (selectedType === 'Organism') {
          highlightedText = highlightedText.replace(regex, '<span class="bg-blue-200">$1</span>')
        } else if (selectedType === 'Variant') {
          highlightedText = highlightedText.replace(regex, '<span class="bg-purple-200">$1</span>')
        } else if (selectedType === 'CellLine') {
          highlightedText = highlightedText.replace(regex, '<span class="bg-orange-200">$1</span>')
        } else {
          highlightedText = this.abstractText
        }
      }
      this.abstractText = highlightedText
      return highlightedText
    },
    insert (event) {
      this.newItem.identifier = this.insertNewIdentifier
      this.searchKeyword = this.newItem.text
      this.diseaseOptions.push(this.insertNewIdentifier)
      this.addIdentifier('new identifier', 'DiseaseOrPhenotypicFeature')
      if (this.newItem.text === '' || this.newItem.identifier === '') {
      } else if (this.newItem.type !== 'None') {
        this.items.push({
          text: this.newItem.text,
          identifier: this.newItem.identifier,
          type: this.newItem.type
        })
        this.newItem = {
          text: '',
          identifier: '',
          type: this.newItem.type
        }
        if (this.newItem.type === 'GeneOrGeneProduct') {
          this.geneOptions.push(this.insertNewIdentifier)
          this.addIdentifier(this.insertNewIdentifier, 'GeneOrGeneProduct')
        } else if (this.newItem.type === 'Disease') {
          this.diseaseOptions.push(this.insertNewIdentifier)
          this.addIdentifier(this.insertNewIdentifier, 'DiseaseOrPhenotypicFeature')
        } else if (this.newItem.type === 'Chemical') {
          this.chemicalOptions.push(this.insertNewIdentifier)
          this.addIdentifier(this.insertNewIdentifier, 'ChemicalEntity')
        } else if (this.newItem.type === 'Organism') {
          this.organismOptions.push(this.insertNewIdentifier)
          this.addIdentifier(this.insertNewIdentifier, 'OrganismTaxon')
        } else if (this.newItem.type === 'Variant') {
          this.variantOptions.push(this.insertNewIdentifier)
          this.addIdentifier(this.insertNewIdentifier, 'SequenceVariant')
        } else if (this.newItem.type === 'CellLine') {
          this.cellLineOptions.push(this.insertNewIdentifier)
          this.addIdentifier(this.insertNewIdentifier, 'CellLine')
        } else {
          console.log('ERROR')
        }
        this.toggle = false
        this.insertNewIdentifier = ''
      }
    }
  },
  computed: {
    highlightedText () {
      if (this.toggle) {
        return this.cleanText()
      }
      // console.log(this.success)
      return this.highlightText()
    }
  },
  mounted () {
    let token = localStorage.getItem('user')
    if (!token) {
      router.push('/')
    } else {
      var pubmedID = this.$route.query.pubmedID
      var data = {token: token, pubmedID: pubmedID}
      axios.post('/api/getAnnotationDetail', data)
        .then((response) => {
          if (response.status === 203) {
            this.currentUser = VueJwtDecode.decode(token)
            this.abstractText = response.data.document.abstract
            this.title = response.data.document.title
            // console.log(response.data.identifierList)
            // console.log(response.data.identifierList[0].name)
            // console.log(response.data.identifierList[0].identifiers.length)
            // console.log(response.data.identifierList[0].identifiers[0].name)
            for (var j = 0; j < 6; j++) {
              for (var i = 0; i < response.data.identifierList[j].identifiers.length; i++) {
                switch (j) {
                  case 0:
                    this.cellLineOptions.push(response.data.identifierList[j].identifiers[i].name)
                    // console.log(response.data.identifierList[j].identifiers[i].name)
                    break
                  case 1:
                    this.chemicalOptions.push(response.data.identifierList[j].identifiers[i].name)
                    break
                  case 2:
                    this.diseaseOptions.push(response.data.identifierList[j].identifiers[i].name)
                    break
                  case 3:
                    this.geneOptions.push(response.data.identifierList[j].identifiers[i].name)
                    break
                  case 4:
                    this.organismOptions.push(response.data.identifierList[j].identifiers[i].name)
                    break
                  case 5:
                    this.variantOptions.push(response.data.identifierList[j].identifiers[i].name)
                    break
                }
              }
            }
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
