//import React from "react";
//import TestSuite from "../model/testSuite";

const ArrayToParamData = (arrayOfExcelRows, hdr) => {
  let paramDataMap = new Map();
  
  var sci;
  var ScenarioRowNo = 0;
  if (/^Scenario(.*)No(.*)/i.test(hdr[0].trim())) {
    sci = 0;
  }
  arrayOfExcelRows.forEach(function (row) {
    let ExistingDataMap = new Map();
    
    if(!paramDataMap.has(row[sci])){
      ScenarioRowNo = 0;
    }
    ScenarioRowNo = ScenarioRowNo + 1;
    let paramMap1 = new Map();
    for (var i = 1; i < hdr.length; i++) {  
     
     // console.log("Selviiiiiiiii" + hdr.length + hdr[i])
      if (hdr[i].trim() === "" || hdr[i].trim() === undefined) {
        continue;
      }
     if (row[i] !== '' && row[i] !== undefined){
     // console.log("aaaaa" + row[i])
      paramMap1.set(hdr[i].trim() + '_' + ScenarioRowNo , row[i].trim());
     } else{
     // console.log("bbbbbb" + row[i])
      paramMap1.set(hdr[i].trim() + '_' + ScenarioRowNo , '');
     }
     
    }
if(paramDataMap.has(row[sci])){
 
  ExistingDataMap = paramDataMap.get(row[sci]);
  paramMap1.forEach((value, key) => ExistingDataMap.set(key, value));
  //console.log("hhhhhhhhhhhhhh" + ExistingDataMap);
  //ExistingDataMap.set(paramMap1);
  
}else{
  paramDataMap.set(row[sci], paramMap1);
}
    
  });
//  console.log(paramDataMap);

//converting map to json

var paramDataJson = {};
paramDataMap.forEach(function(v,k)

{
  var valueJson={};
  v.forEach(function(v,k){
    valueJson[k]=v;
  }
  
  )
  paramDataJson[k] = JSON.stringify(valueJson);
}
)

console.log("param data in json", paramDataJson);

  return paramDataJson;


};
export default ArrayToParamData;
