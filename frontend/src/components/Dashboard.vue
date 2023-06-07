<template>
    <div>
        <h1 class="p-4 text-4xl md:text-5xl lg:text-4xl dark:text-white text-left w-5/6">Dashboard</h1>
        <!-- <input type="text" v-model="searchKeyword" placeholder="Search"> -->
        <!-- <input type="text" v-model="searchKeyword2" placeholder="Search"> -->
        <select v-on:change="SelectEntityType" id="countries_disabled" class="text-sm border-b-1 border-gray-400 text-gray-900 rounded-lg block w-64 p-1">
          <option selected>Filter entity type</option>
          <option value="Gene">GeneOrGeneProduct</option>
          <option value="Disease">DiseaseOrPhenotypicFeature</option>
          <option value="Chemical">ChemicalEntity</option>
          <option value="Organism">OrganismTaxon</option>
          <option value="Variant">SequenceVariant</option>
          <option value="CellLine">CellLine</option>
        </select>
        <button v-on:mouseup="SelectIdentifier" class="text-sm m-0.5 bg-gray-200 rounded-lg p-0.5 border-gray-500 hover:bg-gray-500">3630</button>
        <div v-on:mouseup="SelectText" class="p-2 border shadow-sm overflow-y-scroll overflow-auto h-40">
          <span v-html="highlightedText"></span>
        </div>
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
      text: 'Main text display here - Extracellular vesicles (EVs) are membranous vesicles containing active proteins, lipids, and different types of genetic material such as miRNAs, mRNAs, and DNAs related to the characteristics of the originating cell. They possess a distinctive capacity to communicate over long distances. EVs have been involved in the modulation of several pathophysiological conditions and, more importantly, stem cell-derived EVs appear as a new promising therapeutic option. In fact, several reports provide convincing evidence of the regenerative potential of EVs released by stem cells and, in particular, mesenchymal stromal cells (MSCs) in different kidney injury models. Described mechanisms involve the reprogramming of injured cells, cell proliferation and angiogenesis, and inhibition of cell apoptosis and inflammation. Besides, the therapeutic use of MSC-EVs in clinical trials is under investigation. This review will focus on MSC-EV applications in preclinical models of acute and chronic renal damage including recent data on their use in kidney transplant conditioning. Moreover, ongoing clinical trials are described. Finally, new strategies to broaden and enhance EV therapeutic efficacy by engineering are discussed.',
      searchKeyword: '',
      searchKeyword2: '',
      selectedText: '',
      selectedIdentifier: '',
      selectedEntityType: '',
      success: 'success'
    }
  },
  methods: {
    SelectText (event) {
      this.selectedText = window.getSelection().toString()
    },
    SelectIdentifier (event) {
      var btnText = event.currentTarget
      this.selectedIdentifier = btnText.textContent
      this.searchKeyword = this.selectedText
    },
    SelectEntityType (event) {
      // this.newItem.type = event.target.value
      this.selectedEntityType = event.target.value
    },
    highlightText () {
      let highlightedText = this.text
      const regex = new RegExp(`(${this.searchKeyword})`, 'gi')
      if (this.selectedEntityType === 'Gene') {
        highlightedText = highlightedText.replace(regex, '<span class="text-red-500">$1</span>')
      } else if (this.selectedEntityType === 'Disease') {
        highlightedText = highlightedText.replace(regex, '<span class="text-blue-300">$1</span>')
      } else if (this.selectedEntityType === 'Chemical') {
        highlightedText = highlightedText.replace(regex, '<span class="text-green-300">$1</span>')
      } else if (this.selectedEntityType === 'Organism') {
        highlightedText = highlightedText.replace(regex, '<span class="text-orange-500">$1</span>')
      } else if (this.selectedEntityType === 'Variant') {
        highlightedText = highlightedText.replace(regex, '<span class="text-gray-400">$1</span>')
      } else if (this.selectedEntityType === 'CellLine') {
        highlightedText = highlightedText.replace(regex, '<span class="text-pink-500">$1</span>')
      }
      return highlightedText
    }
  },
  computed: {
    highlightedText () {
      return this.highlightText()
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
