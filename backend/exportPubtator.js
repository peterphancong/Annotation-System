var predictedOutput = []
var fs = require("fs");
var textByLine = fs.readFileSync("val_modelall_no_novel.csv").toString().split("\n");
evaluationInput = fs.readFileSync("bc8_biored_task1_val.pubtator", "utf8").toString().split("\n");
const res = textByLine.map((line) => line.split(","));
relationshipPack = []
res.forEach(async row => {
  pubmedID = row[0]
  // existingIndex = relationshipPack.findIndex((doc => doc.id == pubmedID))
  // if(existingIndex <0) {
  //   newDoc = {"id":pubmedID, "relations": []}
  //   relationshipPack.unshift(newDoc)
  //   existingIndex =0
  // }
  ID1 = row[1]
  ID2 = row[2]
  predictedType = row[3]
  predictedNovelty = row[4].trim()
  relation = pubmedID + '\t' + predictedType + '\t' + ID1 + '\t' + ID2 + '\t' + predictedNovelty
  relationshipPack.push(relation)
  // relationshipPack[existingIndex].relations.push(relation)
})
console.log(relationshipPack)

// ouput = []
// previousRow = ''
// evaluationInput.forEach(row =>{
//   if (row != '\r'){
//     console.log(row)
//     ouput.push(row)
//     previousRow = row
//   } else {
//     pubmedID = previousRow.split('\t')[0]
//     relPack = relationshipPack.find((element) => element.pubmedID == pubmedID )

//     console.log ('------------'+ pubmedID +'---------------')
//     console.log(relPack)
//     // console.log (relPack.relations)
//     // console.log ('------------ END ---------------')
//   }
// })