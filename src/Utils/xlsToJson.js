//import React, {useState} from 'react';
import * as excel from 'xlsx';
import ArrayToTestSuite from './arrayToTestSuite';
import ArrayToParamData from './arrayToParamData';
import ArrayToSelObjects from './arrayToSelObjects';

const XlstoJson = (file, setter1, setter2, setter3) => {
 var result = {};
  console.log("inside xls function");

  var fileReader = new FileReader();

  // fileReader.readAsArrayBuffer

  // console.log("buffer reading is done");
  //  console.log( fileReader.readyState);

  //  return new Promise((resolve, reject) => {
  fileReader.onload = function (e) {
    //  console.log("inside file reader"); 
    //  console.log( fileReader.readyState);
    var data = e.target.result;
    data = new Uint8Array(data);
    // const bufferArray = e.target.result;
    const wb = excel.read(data, { type: 'array' });

      var result ={};
    wb.SheetNames.forEach(function (sheetName) {
      var sheetToJson = excel.utils.sheet_to_json(wb.Sheets[sheetName], { header: 1 });
      console.log(Array.isArray(sheetToJson));
      if (sheetToJson.length) 
      {result[sheetName] = sheetToJson;
     console.log("mmmmm", sheetToJson);
     // console.log("mmmmm" + Object.keys(result).length);
    }

    })
     console.log("result " + result);


    var h = result[wb.SheetNames[0]][0];
    var dh = result[wb.SheetNames[1]][0];
    // console.log("test suite function calling place");
    setter1(ArrayToTestSuite(result[wb.SheetNames[0]].slice(1), h));

    // console.log("Siddharth" + ArrayToParamData(result[wb.SheetNames[1]].slice(1),dh));
    setter2(ArrayToParamData(result[wb.SheetNames[1]].slice(1), dh));
    console.log("Tamillllllllllll" +Object.keys(result).length);
    if (Object.keys(result).length === 3) {
      var oh = result[wb.SheetNames[2]][0];
      setter3(ArrayToSelObjects(result[wb.SheetNames[2]].slice(1), oh));
    }


    // resolve(fileReader.result);
  }

  // console.log("before arraybuffer");
  fileReader.readAsArrayBuffer(file);

  // });     

}

export default XlstoJson;