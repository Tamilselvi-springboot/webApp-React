//import React, { useState } from "react";
import TestSuite from "../model/testSuite";

const JSONToTestSuite = (arrayOfJSON) => {

  console.log("inside JSON to test suite");
  let testsuite = [];

  var scenNum;
  var Scenario_Description;
  var Precondition;
  var Step_Number;
  var Step_Description;
  var Step_ExpectedResult;

  var step_Status;
  var tcStatus;
  var step_ActualResult;
  var step_log;

  arrayOfJSON.map((obj) => {

    scenNum = obj.scenario_No;
    Scenario_Description = obj.scenario_Description;
    Precondition = obj.precondition;
    Step_Number = obj.step_Number;
    Step_Description = obj.step_Description;
    Step_ExpectedResult = obj.step_ExpectedResult;
    tcStatus = obj.tcStatus;
    step_ActualResult = obj.step_ActualResult;
    step_log = obj.stepResultLog;
    step_Status = obj.stepResult;
    testsuite.push(new TestSuite( true, scenNum,Scenario_Description, Precondition,
      Step_Number, Step_Description, Step_ExpectedResult, step_Status, tcStatus, step_ActualResult, step_log));
  })

 console.log("karupsssssssss", testsuite);
  // testsuite.forEach(element => console.log(element.Scenario_Description));

  // testsuite.forEach(element => console.log("lasttttttttttttttttttttt" + element.Step_ExpectedResult[0]));
  return testsuite;
  
};
export default JSONToTestSuite;
