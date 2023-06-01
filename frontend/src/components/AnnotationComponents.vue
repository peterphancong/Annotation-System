<template>
    <div>
        <h1 class="mt-4 ml-4 text-4xl md:text-5xl lg:text-4xl dark:text-white text-left w-5/6">Annotation Board</h1>
        <h3 class="mt-2 ml-5 text-base font-sans">Edit Mode</h3>
        <div class="bg-white m-5">
          <div class="p-10" id="paragraph">
            <div class="flex flex-col">
              <h2 class="text-xl dark:text-white text-left w-5/6" id="title">Stem Cell-Derived Extracellular Vesicles and Kidney Regeneration</h2>
              <p class="mt-2 mb-4">PubMedID: 31614642</p>
            </div>
            <p class="font-normal p-3 border shadow-sm overflow-y-scroll text-base h-64 rounded-lg">
              Extracellular vesicles (EVs) are membranous vesicles containing active proteins, lipids, and different types of genetic material such as miRNAs, mRNAs, and DNAs related to the characteristics of the originating cell. They possess a distinctive capacity to communicate over long distances. EVs have been involved in the modulation of several pathophysiological conditions and, more importantly, stem cell-derived EVs appear as a new promising therapeutic option. In fact, several reports provide convincing evidence of the regenerative potential of EVs released by stem cells and, in particular, mesenchymal stromal cells (MSCs) in different kidney injury models. Described mechanisms involve the reprogramming of injured cells, cell proliferation and angiogenesis, and inhibition of cell apoptosis and inflammation. Besides, the therapeutic use of MSC-EVs in clinical trials is under investigation. This review will focus on MSC-EV applications in preclinical models of acute and chronic renal damage including recent data on their use in kidney transplant conditioning. Moreover, ongoing clinical trials are described. Finally, new strategies to broaden and enhance EV therapeutic efficacy by engineering are discussed.
            </p>
            <div class="mt-6 flex justify-end">
              <select id="countries_disabled" class="bg-gray-50 border-b-2 border-gray-200 text-gray-900 text-base rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-64 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                <option selected>Filter entity type</option>
                <option value="Gene">GeneOrGeneProduct</option>
                <option value="Disease">DiseaseOrPhenotypicFeature</option>
                <option value="Chemical">ChemicalEntity</option>
                <option value="Organism">OrganismTaxon</option>
                <option value="Variant">SequenceVariant</option>
                <option value="CellLine">CellLine</option>
              </select>
              <form class="ml-4 flex bg-gray-50 rounded-lg border-b-2 border-gray-200">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4 flex-shrink-0 mt-3 mr-2 ml-2">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                </svg>
                <input type="text" class="border-0 bg-transparent focus:outline-none flex-1 rounded-lg" placeholder="Search">
              </form>
            </div>
          </div>
          <div class="ml-10 bg-white" id="idnetifier_selection">
            <h2 class="mb-4 text-xl dark:text-white text-left w-5/6" id="title">Choose Identifier</h2>
            <div class="mr-10 h-64 overflow-y-scroll"> <!--I cannot set the height of the block!!-->
              <button class="m-4 bg-gray-200 rounded-lg pl-2 pr-2 p-1 border-b-2 border-gray-500">3175</button>
              <button class="m-4 bg-gray-200 rounded-lg pl-2 pr-2 p-1 border-b-2 border-gray-500">3630</button>
              <button class="m-4 bg-gray-200 rounded-lg pl-2 pr-2 p-1 border-b-2 border-gray-500">317</button>
              <button class="m-4 bg-gray-200 rounded-lg pl-2 pr-2 p-1 border-b-2 border-gray-500">rs74805019</button>
              <button class="m-4 bg-gray-200 rounded-lg pl-2 pr-2 p-1 border-b-2 border-gray-500">D008358</button>
              <button class="m-4 bg-gray-200 rounded-lg pl-2 pr-2 p-1 border-b-2 border-gray-500">c|SUB|G|CODON1763|A</button>
              <button class="m-4 bg-gray-200 rounded-lg pl-2 pr-2 p-1 border-b-2 border-gray-500">D008133</button>
              <button class="m-4 bg-gray-200 rounded-lg pl-2 pr-2 p-1 border-b-2 border-gray-500">2</button>
              <button class="m-4 bg-gray-200 rounded-lg pl-2 pr-2 p-1 border-b-2 border-gray-500">rs121908864</button>
              <button class="m-4 bg-gray-200 rounded-lg pl-2 pr-2 p-1 border-b-2 border-gray-500">rs267607117</button>
              <button class="m-4 bg-gray-200 rounded-lg pl-2 pr-2 p-1 border-b-2 border-gray-500">3175</button>
              <button class="m-4 bg-gray-200 rounded-lg pl-2 pr-2 p-1 border-b-2 border-gray-500">3630</button>
              <button class="m-4 bg-gray-200 rounded-lg pl-2 pr-2 p-1 border-b-2 border-gray-500">317</button>
              <button class="m-4 bg-gray-200 rounded-lg pl-2 pr-2 p-1 border-b-2 border-gray-500">rs74805019</button>
              <button class="m-4 bg-gray-200 rounded-lg pl-2 pr-2 p-1 border-b-2 border-gray-500">D008358</button>
              <button class="m-4 bg-gray-200 rounded-lg pl-2 pr-2 p-1 border-b-2 border-gray-500">c|SUB|G|CODON1763|A</button>
              <button class="m-4 bg-gray-200 rounded-lg pl-2 pr-2 p-1 border-b-2 border-gray-500">D008133</button>
              <button class="m-4 bg-gray-200 rounded-lg pl-2 pr-2 p-1 border-b-2 border-gray-500">2</button>
              <button class="m-4 bg-gray-200 rounded-lg pl-2 pr-2 p-1 border-b-2 border-gray-500">rs121908864</button>
              <button class="m-4 bg-gray-200 rounded-lg pl-2 pr-2 p-1 border-b-2 border-gray-500">rs267607117</button>
              <button class="m-4 bg-gray-200 rounded-lg pl-2 pr-2 p-1 border-b-2 border-gray-500">3175</button>
              <button class="m-4 bg-gray-200 rounded-lg pl-2 pr-2 p-1 border-b-2 border-gray-500">3630</button>
              <button class="m-4 bg-gray-200 rounded-lg pl-2 pr-2 p-1 border-b-2 border-gray-500">317</button>
              <button class="m-4 bg-gray-200 rounded-lg pl-2 pr-2 p-1 border-b-2 border-gray-500">rs74805019</button>
              <button class="m-4 bg-gray-200 rounded-lg pl-2 pr-2 p-1 border-b-2 border-gray-500">D008358</button>
              <button class="m-4 bg-gray-200 rounded-lg pl-2 pr-2 p-1 border-b-2 border-gray-500">c|SUB|G|CODON1763|A</button>
              <button class="m-4 bg-gray-200 rounded-lg pl-2 pr-2 p-1 border-b-2 border-gray-500">D008133</button>
              <button class="m-4 bg-gray-200 rounded-lg pl-2 pr-2 p-1 border-b-2 border-gray-500">2</button>
              <button class="m-4 bg-gray-200 rounded-lg pl-2 pr-2 p-1 border-b-2 border-gray-500">rs74805019</button>
              <button class="m-4 bg-gray-200 rounded-lg pl-2 pr-2 p-1 border-b-2 border-gray-500">D008358</button>
              <button class="m-4 bg-gray-200 rounded-lg pl-2 pr-2 p-1 border-b-2 border-gray-500">c|SUB|G|CODON1763|A</button>
              <button class="m-4 bg-gray-200 rounded-lg pl-2 pr-2 p-1 border-b-2 border-gray-500">D008133</button>
              <button class="m-4 bg-gray-200 rounded-lg pl-2 pr-2 p-1 border-b-2 border-gray-500">rs121908864</button>
              <button class="m-4 bg-gray-200 rounded-lg pl-2 pr-2 p-1 border-b-2 border-gray-500">rs267607117</button>
            </div>
          </div>
          <div class="ml-10 mr-10" id="footer">
            <div class="flex justify-between">
              <div class="pr-4 w-1/2">
                <h2 class="mt-4 mb-4 text-xl dark:text-white text-left w-5/6" id="title">Entity List</h2>
                <table class="text-left mb-10 table-auto border-collapse rounded-lg overflow-hidden w-full">
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
              <div class="pr-4 w-1/2">
                <h2 class="mt-4 mb-4 text-xl dark:text-white text-left w-5/6" id="title">Relation List</h2>
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
        <div class="flex justify-end mr-5 mt-4">
          <button class="w-36 h-8 bg-blue-300 text-gray-900 rounded-lg border-b-2 border-gray-500" type="button">Save</button>
          <button class="ml-4 w-36 h-8 bg-blue-300 text-gray-900 rounded-lg border-b-2 border-gray-500" type="button">Submit</button>
        </div>
    </div>
</template>
