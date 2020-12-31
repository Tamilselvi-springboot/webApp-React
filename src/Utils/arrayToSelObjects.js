//import React, { useState } from "react";
//import TestSuite from "../model/testSuite";
import SelObjects from "../model/selObjects";

const ArrayToSelObjects = (arrayOfExcelRows, hdr) => {
  console.log("inside array to selobj function");
  let SelObjs = [];

  var ObjNameNum;
  var ObjLocatorMethodNum;
  var ObjPropertyNum;
  var PageNameNum;

  for (var i = 0; i < hdr.length; i++) {
    if (/^Obj(.*)Name(.*)/i.test(hdr[i].trim())) {
      ObjNameNum = i;
    }
    if (/^ObjLocatorMethod(.*)/i.test(hdr[i].trim())) {
      ObjLocatorMethodNum = i;
    }
    if (/^ObjProperty(.*)/i.test(hdr[i].trim())) {
      ObjPropertyNum = i;
    }
    if (/^PageName(.*)/i.test(hdr[i].trim())) {
      PageNameNum = i;
      //console.log("Tamil1" + Step_Number_Col_Num);
    }
  }

  arrayOfExcelRows.forEach((row) => {
    if (row[ObjNameNum] !== "" && row[ObjNameNum] !== undefined) {
      // console.log(row[scenColNum]);
      // console.log(row[Scenario_Description_Col_Num]);
      // console.log(row[Precondition_Col_Num]);
      //console.log(Step_Number_Col_Num + row[Step_Number_Col_Num]);
      // console.log(Step_ExpectedResult_Col_Num + row[Step_ExpectedResult_Col_Num]);

      SelObjs.push(
        new SelObjects(
          row[ObjNameNum],
          row[ObjLocatorMethodNum],
          row[ObjPropertyNum],
          row[PageNameNum]
        )
      );
      // console.log("karupsssssssss" + testsuite.values);
      // testsuite.forEach(element => console.log(element.Scenario_Description));
    }
  });
  // console.log("end of testsuite function");
  // testsuite.forEach(element => console.log("lasttttttttttttttttttttt" + element.Step_ExpectedResult[0]));
  return SelObjs;
};
export default ArrayToSelObjects;
