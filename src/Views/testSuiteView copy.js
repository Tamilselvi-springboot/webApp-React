import React, { useState, useEffect } from "react";
import Checkbox from '@material-ui/core/Checkbox';

const TestSuiteView = ({testSuite}) => {

    let rows = testSuite;
    console.log("rows length" +  rows.length);
  return (

    <div>
      <table className ="table-striped">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Scenario No</th>
            <th scope="col">Scenario Description</th>
            <th scope="col">Precondition</th>
            <th scope="col">Step Number</th>
            <th scope="col">Step Description</th>
            <th scope="col">Step Expected Result</th>
          </tr>
        </thead>
        <tbody>
            {console.log(testSuite.length)}
          {testSuite!==undefined && testSuite.map((singleSuite, i) => (
            <tr key={i}>
                <td><Checkbox value={i} checked = {singleSuite.isSelected ? true : false} ></Checkbox>  </td>  
               <td >{singleSuite.Scenario_No}</td>
               <td >{singleSuite.Scenario_Description}</td>
               <td >{singleSuite.Precondition}</td>
          <td ><ul> {singleSuite.Step_Number.map((eachstep)=> <li key={i}>{eachstep}</li> )}</ul> </td>
          <td ><ul> {singleSuite.Step_Description.map((eachstep)=> <li key={i}>{eachstep}</li> )}</ul> </td>
          <td ><ul> {singleSuite.Step_ExpectedResult.map((eachstep)=> <li key={i}>{eachstep}</li> )}</ul> </td>
             
                
            </tr>
          ))}
        </tbody>
      </table>
    
    </div>
  );
};
export default TestSuiteView;
