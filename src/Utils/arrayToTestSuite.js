//import React, { useState } from "react";
import TestSuite from "../model/testSuite";

const ArrayToTestSuite = (arrayOfExcelRows, hdr) => {

  console.log("inside array to test suite");
  let testsuite = [];
  let previousrow;
  var scenColNum;
  var Scenario_Description_Col_Num;
  var Precondition_Col_Num;
  var Step_Number_Col_Num;
  var Step_Description_Col_Num;
  var Step_ExpectedResult_Col_Num;

  for (var i = 0; i < hdr.length; i++) {
    if (/^Scenario(.*)No(.*)/i.test(hdr[i].trim())) {
      scenColNum = i;
      
    }
    if (/^Scenario(.*)Description(.*)/i.test(hdr[i].trim())) {
      Scenario_Description_Col_Num = i;
    }
    if (/^Precondition(.*)/i.test(hdr[i].trim())) {
      Precondition_Col_Num = i;
    }
    if (/^Step(.*)Number(.*)/i.test(hdr[i].trim())) {
      Step_Number_Col_Num = i;
      //console.log("Tamil1" + Step_Number_Col_Num);
    }


    if (/^Step(.*)Description(.*)/i.test(hdr[i].trim())) {
      Step_Description_Col_Num = i;
      console.log("Tamil2" +Step_Description_Col_Num);
    }
    if (/^Expected(.*)Result(.*)/i.test(hdr[i].trim())) {
      Step_ExpectedResult_Col_Num = i;
      console.log("Tamil3" +Step_ExpectedResult_Col_Num);
    }
  }

  arrayOfExcelRows.forEach( (row) => {
    if (
      previousrow === undefined ||
      (row[scenColNum] !== "" && row[scenColNum] !== undefined)
    ) {
     // console.log(row[scenColNum]);
     // console.log(row[Scenario_Description_Col_Num]);
     // console.log(row[Precondition_Col_Num]);
      //console.log(Step_Number_Col_Num + row[Step_Number_Col_Num]);
     // console.log(Step_ExpectedResult_Col_Num + row[Step_ExpectedResult_Col_Num]);
      

      testsuite.push(
        new TestSuite(
          false,
          row[scenColNum],
          row[Scenario_Description_Col_Num],
          row[Precondition_Col_Num],
          [row[Step_Number_Col_Num]],
          [row[Step_Description_Col_Num]],
          [row[Step_ExpectedResult_Col_Num]]
        )
      );
     console.log("xxxxxxxxxxxxxxxx", testsuite);
     // testsuite.forEach(element => console.log(element.Scenario_Description));
     }
      if (
        previousrow !== undefined && (row[scenColNum] === "" ||
        row[scenColNum] === undefined)
      ) {
        
        if (row[Step_Number_Col_Num] !== undefined) {
        //  testsuite.forEach(element => console.log(element.Scenario_Description));
        //  console.log(testsuite[testsuite.length - 1].Scenario_Description);
          testsuite[testsuite.length - 1].addStep(row[Step_Number_Col_Num]);
        } else {
          testsuite[testsuite.length - 1].addStep("");
        }
        if (row[Step_Description_Col_Num] !== undefined) {
          testsuite[testsuite.length - 1].addStepDescription(
            row[Step_Description_Col_Num]
          );
        } else {
          testsuite[testsuite.length - 1].addStepDescription("");
        }
        if (row[Step_ExpectedResult_Col_Num] !== undefined) {
          testsuite[testsuite.length - 1].addExpectedResult(
            row[Step_ExpectedResult_Col_Num]
          );
        } else {
          testsuite[testsuite.length - 1].addExpectedResult("");
        }
      }

    
    
    previousrow = row;
  });
 // console.log("end of testsuite function");
 // testsuite.forEach(element => console.log("lasttttttttttttttttttttt" + element.Step_ExpectedResult[0]));
  return testsuite;
  
};
export default ArrayToTestSuite;
