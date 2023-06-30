<template>
    <div class="text-sm">
      <div class="flex">
        <h1 class="m-3 text-3xl w-5/6">Annotation Board</h1>
        <div class="flex m-4 justify-between">
          <div class="flex justify-start">
            <button class="w-36 h-8 bg-blue-300 text-gray-900 rounded-lg border-b-2 border-gray-500" type="button">Cancel</button>
          </div>
          <div class="flex justify-end">
            <button class="ml-4 w-36 h-8 bg-blue-300 text-gray-900 rounded-lg border-b-2 border-gray-500" type="button">Save</button>
            <button class="ml-4 w-36 h-8 bg-blue-300 text-gray-900 rounded-lg border-b-2 border-gray-500" type="button">Submit</button>
          </div>
        </div>
      </div>
        <div class="bg-white m-2 flex">
          <div class="w-60% p-2" id="paragraph">
            <h2 class="ml-2 font-bold text-left w-5/6" id="title">Stem Cell-Derived Extracellular Vesicles and Kidney Regeneration <span>(PubMedID: 31614642)</span></h2>
            <div v-on:mouseup="SelectText" class="p-2 border shadow-sm overflow-y-scroll overflow-auto h-full">
              <span v-html="highlightedText"></span>
            </div>
          </div>
          <div class="p-2 w-40%">
            <div>
              <div class="mt-2 flex justify-left h-8">
                <select v-on:change="SelectEntityType" id="countries_disabled" class="text-sm border-b-1 border-gray-400 text-gray-900 rounded-lg block w-64 p-1">
                  <option value="None" selected>Filter entity type</option>
                  <option value="Gene">GeneOrGeneProduct</option>
                  <option value="Disease">DiseaseOrPhenotypicFeature</option>
                  <option value="Chemical">ChemicalEntity</option>
                  <option value="Organism">OrganismTaxon</option>
                  <option value="Variant">SequenceVariant</option>
                  <option value="CellLine">CellLine</option>
                </select>
                <form class="ml-2 flex bg-gray-50 rounded-lg border-b-1 border-gray-200">
                  <input type="text" class="text-sm border-1 bg-transparent focus:outline-none flex-1 rounded-lg" placeholder="Search">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4 flex-shrink-0 mt-3 mr-2 ml-2">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                  </svg>
                </form>
                <div class="ml-2 flex bg-gray-50 rounded-lg border-b-1 border-gray-200">
                  <input v-model="insertNewIdentifier" type="text" class="text-sm border-1 bg-transparent focus:outline-none flex-1 rounded-lg" placeholder="Insert the identifier">
                  <button v-on:mouseup="insert" class="ml-1 text-sm m-0.5 bg-white rounded-lg p-0.5 border-blue-500">Go</button>
                </div>
              </div>
              <div class="mt-2" id="identifier_selection">
                <div class="text-sm p-1 border shadow-sm overflow-y-scroll text-base rounded-lg overflow-auto">
                  <button v-on:mouseup="SelectIdentifier" v-for="option in options" :key="option" class="text-sm m-0.5 bg-gray-200 rounded-lg p-0.5 border-gray-500 hover:bg-gray-500">{{ option }}</button>
                </div>
              </div>
            </div>
            <div>
              <div class="p-2 mt-6 h-64 border overflow-y-scroll bg-dark-gray">
                <table ref="entityTable" class="text-left mb-10 table-auto border-collapse rounded-lg overflow-hidden w-full">
                  <thead>
                    <tr>
                      <th class="px-4 py-2 border-b-2 border-gray-200">Entity text</th>
                      <th class="px-4 py-2 border-b-2 border-gray-200">Identifier</th>
                      <th class="px-4 py-2 border-b-2 border-gray-200">Entity type</th>
                      <th class="px-4 py-2 border-b-2 border-gray-200"> </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="(item, index) in items" :key="index">
                      <td class="px-4 py-2 border-b-2 border-gray-200">{{ item.text }}</td>
                      <td class="px-4 py-2 border-b-2 border-gray-200">{{ item.identifier }}</td>
                      <td class="px-4 py-2 border-b-2 border-gray-200">{{ item.type }}</td>
                      <td class="px-4 py-2 border-b-2 border-gray-200">
                        <svg @click="deleteEntityRow(index)" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="ml-1 w-5 h-5 text-red-500 cursor-pointer">
                          <path stroke-linecap="round" stroke-linejoin="round" d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div class="p-2 mt-6 border overflow-y-scroll bg-dark-gray">
                <table class="text-left mb-10 table-auto border-collapse rounded-lg overflow-hidden w-full">
                  <thead>
                    <tr>
                      <th class="px-4 py-2 border-b-2 border-gray-200">Identifier 1</th>
                      <th class="px-4 py-2 border-b-2 border-gray-200">Identifier 2</th>
                      <th class="px-4 py-2 border-b-2 border-gray-200">Relation type</th>
                      <th class="px-4 py-2 border-b-2 border-gray-200"> </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td class="px-4 py-2 border-b-2 border-gray-200">Long QT syndrome</td>
                      <td class="px-4 py-2 border-b-2 border-gray-200">c|SUB|G|CODON1763|A</td>
                      <td class="px-4 py-2 border-b-2 border-gray-200">SequenceVariant</td>
                      <td class="px-4 py-2 border-b-2 border-gray-200">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="ml-1 w-5 h-5 text-red-500">
                          <path stroke-linecap="round" stroke-linejoin="round" d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </td>
                    </tr>
                    <tr>
                      <td class="px-4 py-2 border-b-2 border-gray-200">LQTS</td>
                      <td class="px-4 py-2 border-b-2 border-gray-200">D008133</td>
                      <td class="px-4 py-2 border-b-2 border-gray-200">DiseaseOrPhenotypicFeature</td>
                      <td class="px-4 py-2 border-b-2 border-gray-200">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="ml-1 w-5 h-5 text-red-500">
                          <path stroke-linecap="round" stroke-linejoin="round" d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </td>
                    </tr>
                    <tr>
                      <td class="px-4 py-2 border-b-2 border-gray-200">Na(v)1.5</td>
                      <td class="px-4 py-2 border-b-2 border-gray-200">D008133</td>
                      <td class="px-4 py-2 border-b-2 border-gray-200">GeneOrGeneProduct</td>
                      <td class="px-4 py-2 border-b-2 border-gray-200">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="ml-1 w-5 h-5 text-red-500">
                          <path stroke-linecap="round" stroke-linejoin="round" d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </td>
                    </tr>
                    <tr>
                      <td class="px-4 py-2 border-b-2 border-gray-200">LQTS</td>
                      <td class="px-4 py-2 border-b-2 border-gray-200">D008133</td>
                      <td class="px-4 py-2 border-b-2 border-gray-200">DiseaseOrPhenotypicFeature</td>
                      <td class="px-4 py-2 border-b-2 border-gray-200">
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
        <!-- <div class="m-2 p-1 bg-orange-200 h-96 w-full">
          <p class="text-2xl">toggle: <span class="text-blue-500">{{ toggle }}</span></p>
          <p class="text-2xl">Current selected text is: <span class="text-blue-500">{{ newItem.text}}</span></p>
          <p class="text-2xl">Current selected button is: <span class="text-blue-500">{{ newItem.identifier}}</span></p>
          <p class="text-2xl">Current selected entity type is: <span class="text-blue-500">{{ newItem.type}}</span></p>
          <p class="text-2xl">Current toggle is (true: delete status): <span class="text-blue-500">{{ toggle}}</span></p>
        </div> -->
    </div>
</template>
<script>
import router from '../router'
import VueJwtDecode from 'vue-jwt-decode'
import axios from 'axios'

export default {
  name: 'Dashboard',
  data () {
    return {
      currentUser: '',
      abstractText: 'Main text display here - Extracellular vesicles (EVs) are membranous vesicles containing active proteins, lipids, and different types of genetic material such as miRNAs, mRNAs, and DNAs related to the characteristics of the originating cell. They possess a distinctive capacity to communicate over long distances. EVs have been involved in the modulation of several pathophysiological conditions and, more importantly, stem cell-derived EVs appear as a new promising therapeutic option. In fact, several reports provide convincing evidence of the regenerative potential of EVs released by stem cells and, in particular, mesenchymal stromal cells (MSCs) in different kidney injury models. Described mechanisms involve the reprogramming of injured cells, cell proliferation and angiogenesis, and inhibition of cell apoptosis and inflammation. Besides, the therapeutic use of MSC-EVs in clinical trials is under investigation. This review will focus on MSC-EV applications in preclinical models of acute and chronic renal damage including recent data on their use in kidney transplant conditioning. Moreover, ongoing clinical trials are described. Finally, new strategies to broaden and enhance EV therapeutic efficacy by engineering are discussed.',
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
      geneOptions: ['3175', '927', '3630', '672', '317'],
      diseaseOptions: ['D061325', 'D009369', 'D003924', 'C567134'],
      chemicalOptions: ['D005947', 'D008358', 'D014747'],
      organismOptions: ['9606', '10116', '10090'],
      variantOptions: ['rs74805019', 'cDEL30G', 'rs111033196'],
      cellLineOptions: ['CVCL_JW73', 'CVCL_K278'],
      options: [''],
      insertNewIdentifier: ''
    }
  },
  methods: {
    SelectText (event) {
      this.newItem.text = window.getSelection().toString()
      // this.selectedText = window.getSelection().toString()
    },
    SelectIdentifier (event) {
      this.newItem.identifier = event.currentTarget.textContent
      this.searchKeyword = this.newItem.text
      // console.log(this.newItem.type)
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
        if (this.newItem.type === 'Gene') {
          this.geneOptions.push(this.insertNewIdentifier)
        } else if (this.newItem.type === 'Disease') {
          this.diseaseOptions.push(this.insertNewIdentifier)
        } else if (this.newItem.type === 'Chemical') {
          this.chemicalOptions.push(this.insertNewIdentifier)
        } else if (this.newItem.type === 'Organism') {
          this.organismOptions.push(this.insertNewIdentifier)
        } else if (this.newItem.type === 'Variant') {
          this.variantOptions.push(this.insertNewIdentifier)
        } else if (this.newItem.type === 'CellLine') {
          this.cellLineOptions.push(this.insertNewIdentifier)
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
            console.log(response.data.identifierList)
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
