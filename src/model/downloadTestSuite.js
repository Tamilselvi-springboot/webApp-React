//import React from "react";

 class DownloadTestSuite {
  scenario_No;
  scenario_Description;
  precondition;
  step_Number;
  step_Description;
  step_ExpectedResult;
  step_Status;
  tcStatus;
  step_ActualResult;
  step_log;

  constructor(
    Scenario_No,
    Scenario_Description,
    Precondition,
    Step_Number,
    Step_Description,
    Step_ExpectedResult,
    Step_Status,
    TCStatus,
    Step_ActualResult,
    Step_Log
  ) {
   // console.log("ssssssssssssssssssssssssssssss");
      
   // this.step_ActualResult = Step_ActualResult;
   // this.step_Status = Step_Status;
   // this.tcStatus = TCStatus;
   // this.step_log = Step_Log;

    if (Scenario_No === undefined) {
      this.scenario_No = "";
    } else {
      this.scenario_No = Scenario_No;
      
    }
   // console.log(this.Scenario_No);
    if (Scenario_Description === undefined) {
      this.scenario_Description = "";
    } else {
      this.scenario_Description = Scenario_Description;
    }
   // console.log(this.Scenario_Description);
    if (Precondition === undefined) {
      this.precondition = "";
    } else {
        this.precondition = Precondition;
    }
    if (Step_Number === undefined) {
      this.step_Number = "";
    } else {
        this.step_Number = Step_Number;
    }
    if (Step_Description === undefined) {
      this.step_Description = "";
    } else {
        this.step_Description = Step_Description;
    }

    if (TCStatus === undefined) {
      this.tcStatus = "";
    } else {
        this.tcStatus = TCStatus;
    }
    if (Step_ExpectedResult === undefined) {
      this.step_ExpectedResult = "";
    } else {
        this.step_ExpectedResult = Step_ExpectedResult;
    }

   
    if (Step_ActualResult === undefined) {
      this.step_ActualResult = "";
    } else {
        this.step_ActualResult = Step_ActualResult;
    }

    if (Step_Status === undefined) {
      this.step_Status = "";
    } else {
        this.step_Status = Step_Status;
    }

    if (Step_Log === undefined) {
      this.step_log = "";
    } else {
        this.step_log = Step_Log;
    }
  }

  addStep(step){
      this.step_Number.push(step);
  }
  addStepDescription(stepdescription){
    this.step_Description.push(stepdescription);
}

addExpectedResult(stepexpectedresult){
    this.step_ExpectedResult.push(stepexpectedresult);
}
}
export default DownloadTestSuite;
