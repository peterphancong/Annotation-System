<template>
    <div class="text-sm">
        <h1 class="m-3 text-3xl w-5/6">Annotation Board</h1>
        <div class="bg-white m-2">
          <div class="p-2" id="paragraph">
            <div class="flex flex-col">
              <h2 class="ml-2 font-bold text-left w-5/6" id="title">Stem Cell-Derived Extracellular Vesicles and Kidney Regeneration <span>(PubMedID: 31614642)</span></h2>
            </div>
            <p class="p-2 border shadow-sm overflow-y-scroll overflow-auto h-40" v-on:mouseup="onSelection">
              Main text display here - Extracellular vesicles (EVs) are membranous vesicles containing active proteins, lipids, and different types of genetic material such as miRNAs, mRNAs, and DNAs related to the characteristics of the originating cell. They possess a distinctive capacity to communicate over long distances. EVs have been involved in the modulation of several pathophysiological conditions and, more importantly, stem cell-derived EVs appear as a new promising therapeutic option. In fact, several reports provide convincing evidence of the regenerative potential of EVs released by stem cells and, in particular, mesenchymal stromal cells (MSCs) in different kidney injury models. Described mechanisms involve the reprogramming of injured cells, cell proliferation and angiogenesis, and inhibition of cell apoptosis and inflammation. Besides, the therapeutic use of MSC-EVs in clinical trials is under investigation. This review will focus on MSC-EV applications in preclinical models of acute and chronic renal damage including recent data on their use in kidney transplant conditioning. Moreover, ongoing clinical trials are described. Finally, new strategies to broaden and enhance EV therapeutic efficacy by engineering are discussed.
            </p>
            <div class="mt-2 flex justify-left h-8">
              <select v-on:change="SelectRelationType" id="countries_disabled" class="text-sm border-b-1 border-gray-400 text-gray-900 rounded-lg block w-64 p-1">
                <option selected>Filter entity type</option>
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
            </div>
          </div>
          <div class="pl-2 pr-2" id="idnetifier_selection">
            <div class="text-sm p-1 border shadow-sm overflow-y-scroll text-base rounded-lg overflow-auto">
              <button v-on:mouseup="onButtonSelection" class="text-sm m-0.5 bg-gray-200 rounded-lg p-0.5 border-gray-500 hover:bg-gray-500">3630</button>
              <button v-on:mouseup="onButtonSelection" class="text-sm m-0.5 bg-gray-200 rounded-lg p-0.5 border-gray-500 hover:bg-gray-500">317</button>
              <button v-on:mouseup="onButtonSelection" class="text-sm m-0.5 bg-gray-200 rounded-lg p-0.5 border-gray-500 hover:bg-gray-500">rs74805019</button>
              <button v-on:mouseup="onButtonSelection" class="text-sm m-0.5 bg-gray-200 rounded-lg p-0.5 border-gray-500 hover:bg-gray-500">D008358</button>
              <button v-on:mouseup="onButtonSelection" class="text-sm m-0.5 bg-gray-200 rounded-lg p-0.5 border-gray-500 hover:bg-gray-500">c|SUB|G|CODON1763|A</button>
              <button v-on:mouseup="onButtonSelection" class="text-sm m-0.5 bg-gray-200 rounded-lg p-0.5 border-gray-500 hover:bg-gray-500">D008133</button>
              <button v-on:mouseup="onButtonSelection" class="text-sm m-0.5 bg-gray-200 rounded-lg p-0.5 border-gray-500 hover:bg-gray-500">2</button>
              <button v-on:mouseup="onButtonSelection" class="text-sm m-0.5 bg-gray-200 rounded-lg p-0.5 border-gray-500 hover:bg-gray-500">rs121908864</button>
              <button v-on:mouseup="onButtonSelection" class="text-sm m-0.5 bg-gray-200 rounded-lg p-0.5 border-gray-500 hover:bg-gray-500">rs267607117</button>
              <button v-on:mouseup="onButtonSelection" class="text-sm m-0.5 bg-gray-200 rounded-lg p-0.5 border-gray-500 hover:bg-gray-500">3175</button>
              <button v-on:mouseup="onButtonSelection" class="text-sm m-0.5 bg-gray-200 rounded-lg p-0.5 border-gray-500 hover:bg-gray-500">3630</button>
              <button v-on:mouseup="onButtonSelection" class="text-sm m-0.5 bg-gray-200 rounded-lg p-0.5 border-gray-500 hover:bg-gray-500">317</button>
              <button v-on:mouseup="onButtonSelection" class="text-sm m-0.5 bg-gray-200 rounded-lg p-0.5 border-gray-500 hover:bg-gray-500">rs74805019</button>
              <button v-on:mouseup="onButtonSelection" class="text-sm m-0.5 bg-gray-200 rounded-lg p-0.5 border-gray-500 hover:bg-gray-500">D008358</button>
              <button v-on:mouseup="onButtonSelection" class="text-sm m-0.5 bg-gray-200 rounded-lg p-0.5 border-gray-500 hover:bg-gray-500">c|SUB|G|CODON1763|A</button>
              <button v-on:mouseup="onButtonSelection" class="text-sm m-0.5 bg-gray-200 rounded-lg p-0.5 border-gray-500 hover:bg-gray-500">D008133</button>
              <button v-on:mouseup="onButtonSelection" class="text-sm m-0.5 bg-gray-200 rounded-lg p-0.5 border-gray-500 hover:bg-gray-500">2</button>
              <button v-on:mouseup="onButtonSelection" class="text-sm m-0.5 bg-gray-200 rounded-lg p-0.5 border-gray-500 hover:bg-gray-500">rs121908864</button>
              <button v-on:mouseup="onButtonSelection" class="text-sm m-0.5 bg-gray-200 rounded-lg p-0.5 border-gray-500 hover:bg-gray-500">rs267607117</button>
              <button v-on:mouseup="onButtonSelection" class="text-sm m-0.5 bg-gray-200 rounded-lg p-0.5 border-gray-500 hover:bg-gray-500">3175</button>
              <button v-on:mouseup="onButtonSelection" class="text-sm m-0.5 bg-gray-200 rounded-lg p-0.5 border-gray-500 hover:bg-gray-500">3630</button>
              <button v-on:mouseup="onButtonSelection" class="text-sm m-0.5 bg-gray-200 rounded-lg p-0.5 border-gray-500 hover:bg-gray-500">317</button>
              <button v-on:mouseup="onButtonSelection" class="text-sm m-0.5 bg-gray-200 rounded-lg p-0.5 border-gray-500 hover:bg-gray-500">rs74805019</button>
              <button v-on:mouseup="onButtonSelection" class="text-sm m-0.5 bg-gray-200 rounded-lg p-0.5 border-gray-500 hover:bg-gray-500">D008358</button>
              <button v-on:mouseup="onButtonSelection" class="text-sm m-0.5 bg-gray-200 rounded-lg p-0.5 border-gray-500 hover:bg-gray-500">c|SUB|G|CODON1763|A</button>
              <button v-on:mouseup="onButtonSelection" class="text-sm m-0.5 bg-gray-200 rounded-lg p-0.5 border-gray-500 hover:bg-gray-500">D008133</button>
              <button v-on:mouseup="onButtonSelection" class="text-sm m-0.5 bg-gray-200 rounded-lg p-0.5 border-gray-500 hover:bg-gray-500">2</button>
              <button v-on:mouseup="onButtonSelection" class="text-sm m-0.5 bg-gray-200 rounded-lg p-0.5 border-gray-500 hover:bg-gray-500">rs74805019</button>
              <button v-on:mouseup="onButtonSelection" class="text-sm m-0.5 bg-gray-200 rounded-lg p-0.5 border-gray-500 hover:bg-gray-500">D008358</button>
              <button v-on:mouseup="onButtonSelection" class="text-sm m-0.5 bg-gray-200 rounded-lg p-0.5 border-gray-500 hover:bg-gray-500">c|SUB|G|CODON1763|A</button>
              <button v-on:mouseup="onButtonSelection" class="text-sm m-0.5 bg-gray-200 rounded-lg p-0.5 border-gray-500 hover:bg-gray-500">D008133</button>
              <button v-on:mouseup="onButtonSelection" class="text-sm m-0.5 bg-gray-200 rounded-lg p-0.5 border-gray-500 hover:bg-gray-500">rs121908864</button>
              <button v-on:mouseup="onButtonSelection" class="text-sm m-0.5 bg-gray-200 rounded-lg p-0.5 border-gray-500 hover:bg-gray-500">rs267607117</button>
            </div>
          </div>
          <div class="flex justify-between">
            <div class="p-2 m-2 w-1/2 border overflow-y-scroll bg-dark-gray">
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
                  <tr>
                    <td class="px-4 py-2 border-b-2 border-gray-200">Long QT syndrome</td>
                    <td class="px-4 py-2 border-b-2 border-gray-200">D008133</td>
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
                    <td class="px-4 py-2 border-b-2 border-gray-200">Long QT syndrome</td>
                    <td class="px-4 py-2 border-b-2 border-gray-200">D008133</td>
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
                </tbody>
              </table>
            </div>
            <div class="p-2 m-2 w-1/2 border overflow-y-scroll bg-dark-gray">
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
        <div class="flex mr-4 ml-4 mb-2 justify-between">
          <div class="flex justify-start">
            <button class="w-36 h-8 bg-blue-300 text-gray-900 rounded-lg border-b-2 border-gray-500" type="button">Cancel</button>
          </div>
          <div class="flex justify-end">
            <button class="ml-4 w-36 h-8 bg-blue-300 text-gray-900 rounded-lg border-b-2 border-gray-500" type="button">Save</button>
            <button class="ml-4 w-36 h-8 bg-blue-300 text-gray-900 rounded-lg border-b-2 border-gray-500" type="button">Submit</button>
          </div>
        </div>
        <!-- <div class="m-2 p-1 bg-orange-200 h-96 w-full">
          <p class="text-2xl">Current selected text is: <span class="text-blue-500">{{ selectedText}}</span></p>
          <p class="text-2xl">Current selected button is: <span class="text-blue-500">{{ selectedIdentifier}}</span></p>
          <p class="text-2xl">Current selected entity type is: <span class="text-blue-500">{{ selectedEntityType}}</span></p>
          <p class="text-2xl">last index of entity type is: <span class="text-blue-500">{{ lastIndexOfEntityType}}</span></p>
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
      selectedText: '',
      selectedIdentifier: '',
      selectedEntityType: '',
      lastIndexOfEntityType: 0
    }
  },
  methods: {
    onSelection (event) {
      this.selectedText = window.getSelection().toString()
      // var text = selection.toString()
      // alert(text)
      // this.selectedText = text
    },
    onButtonSelection (event) {
      var btnText = event.currentTarget
      // alert(btnText.textContent)
      // var btnText = btnSelection.toString()
      // alert(btnText)
      this.selectedIdentifier = btnText.textContent
      // var tableToAdd = this.$refs.entityTable
      this.$refs.entityTable.insertAdjacentHTML(
        'beforeend',
        '<tr><td class="px-4 py-2 border-b-2 border-gray-200">' + this.selectedText + '</td><td class="px-4 py-2 border-b-2 border-gray-200">' + this.selectedIdentifier + '</td><td class="px-4 py-2 border-b-2 border-gray-200">' + this.selectedEntityType + '</td><td class="px-4 py-2 border-b-2 border-gray-200"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="ml-1 w-5 h-5 text-red-500"><path stroke-linecap="round" stroke-linejoin="round" d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" /></svg></td></tr>'
      )
      this.lastIndexOfEntityType += 1
    },
    SelectRelationType (event) {
      this.selectedEntityType = event.target.value
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
