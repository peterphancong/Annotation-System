var predictedOutput = []
var fs = require("fs");
var textByLine = fs.readFileSync("val_modelall_no_novel.csv").toString().split("\n");
evaluationInput = fs.readFileSync("bc8_biored_task1_val.json", "utf8").toString()
const res = textByLine.map((line) => line.split(","));
res.forEach(async row => {
  pubmedID = row[0]
  ID1 = row[1]
  ID2 = row[2]
  predictedType = row[3]
  predictedNovelty = row[4].trim()
  existingIndex = predictedOutput.findIndex((doc => doc.id == pubmedID))
  var index =0
  if (existingIndex <0) {
      newDoc = {"id":pubmedID, "relations": []}
      predictedOutput.unshift(newDoc)
      index=0
      existingIndex =0
  }
  infons = {"entity1": ID1, "entity2": ID2, "type": predictedType, "novel":predictedNovelty}
  predictedOutput[existingIndex].relations.push({"id":"R"+index,"infons":infons })
  index +=1
})
// ---------------------------------------------------
inputObj = JSON.parse(evaluationInput)
inputObj.documents.forEach(element => {
  console.log(element)
  var id = element.id
  console.log(id)
  foundRelation = predictedOutput.find(obj => {
      return obj.id === id
    })
  element.relations = foundRelation.relations
});
console.log(JSON.stringify(inputObj, null, 1))
fs.writeFile("output.json", JSON.stringify(inputObj, null, 1), 'utf8', function (err) {
  if (err) {
      console.log("An error occured while writing JSON Object to File.");
      return console.log(err);
  }
  console.log("JSON file has been saved.");
});
// ---------------------------------
