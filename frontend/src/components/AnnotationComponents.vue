<template>
    <div>
        <div class="bg-gray-200 p-20" id="abstract">
          <div class="flex">
            <h2 class="mb-4 text-2xl md:text-5xl lg:text-4xl dark:text-white text-left w-5/6" id="title">Stem Cell-Derived Extracellular Vesicles and Kidney Regeneration</h2>
            <p class="mt-3 text-gray-500">PMID: 31614642</p>
          </div>
          <p>
            Extracellular vesicles (EVs) are membranous vesicles containing active proteins, lipids, and different types of genetic material such as miRNAs, mRNAs, and DNAs related to the characteristics of the originating cell. They possess a distinctive capacity to communicate over long distances. EVs have been involved in the modulation of several pathophysiological conditions and, more importantly, stem cell-derived EVs appear as a new promising therapeutic option. In fact, several reports provide convincing evidence of the regenerative potential of EVs released by stem cells and, in particular, mesenchymal stromal cells (MSCs) in different kidney injury models. Described mechanisms involve the reprogramming of injured cells, cell proliferation and angiogenesis, and inhibition of cell apoptosis and inflammation. Besides, the therapeutic use of MSC-EVs in clinical trials is under investigation. This review will focus on MSC-EV applications in preclinical models of acute and chronic renal damage including recent data on their use in kidney transplant conditioning. Moreover, ongoing clinical trials are described. Finally, new strategies to broaden and enhance EV therapeutic efficacy by engineering are discussed.
          </p>
        </div>
        <div class="bg-gray-300 h-200 p-20" id="idnetifier_selection">
          <div class="flex">
            <h2 class="mr-6 text-2xl">Entity Type: </h2>
            <select class="rounded-lg">
                <option value="Gene">GeneOrGeneProduct</option>
                <option value="Disease">DiseaseOrPhenotypicFeature</option>
                <option value="Chemical">ChemicalEntity</option>
                <option value="Organism">OrganismTaxon</option>
                <option value="Variant">SequenceVariant</option>
                <option value="CellLine">CellLine</option>
            </select>
          </div>
          <div class="h-200 border border-black overflow-y-scroll"> <!--I cannot set the height of the block!!-->
            <button class="bg-blue-200 rounded-lg p-1">3175</button>
            <button class="bg-blue-200 rounded-lg p-1">3630</button>
            <button class="bg-blue-200 rounded-lg p-1">317</button>
            <button class="bg-blue-200 rounded-lg p-1">rs74805019</button>
            <button class="bg-blue-200 rounded-lg p-1">D008358</button>
          </div>
        </div>
        <div class="bg-gray-100 p-20" id="footer">
          <!-- Third block with two sections for tables -->
          <div class="flex justify-between">
            <div>
                <h2>Entity</h2>
                <table class="table-auto border-collapse rounded-lg overflow-hidden w-45% mb-20">
                <!-- Table content for left section -->
                  <thead>
                    <tr>
                      <th class="px-4 py-2 bg-gray-200 text-gray-600">Left Table Heading 1</th>
                      <th class="px-4 py-2 bg-gray-200 text-gray-600">Left Table Heading 2</th>
                    </tr>
                  </thead>
                  <tbody class="text-gray-600">
                    <tr>
                      <td class="px-4 py-2 border">Left Table Data 1</td>
                      <td class="px-4 py-2 border">Left Table Data 2</td>
                    </tr>
                  </tbody>
                </table>
            </div>
            <div>
                <h2>Relation</h2>
                <table class="table-auto border-collapse rounded-lg overflow-hidden w-45% mb-20">
                <!-- Table content for right section -->
                  <thead>
                    <tr>
                      <th class="px-4 py-2 bg-gray-200 text-gray-600">Right Table Heading 1</th>
                      <th class="px-4 py-2 bg-gray-200 text-gray-600">Right Table Heading 2</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td class="px-4 py-2 border">Right Table Data 1</td>
                      <td class="px-4 py-2 border">Right Table Data 2</td>
                    </tr>
                  </tbody>
                </table>
            </div>
          </div>
        </div>
        <div class="flex bg-white">
            <a href="#" class="mt-6 flex items-center w-1/6 p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
                <button class="flex-1 bg-blue-200 rounded-lg w-1/6 h-8" type="button">Save</button>
            </a>
            <a href="#" class="mt-6 flex items-center w-1/6 p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
                <button class="flex-1 bg-blue-200 rounded-lg w-1/6 h-8" type="button">Submit</button>
            </a>
        </div>
    </div>
</template>
