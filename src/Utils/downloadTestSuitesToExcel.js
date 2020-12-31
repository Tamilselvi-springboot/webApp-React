import downloadTestSuite from '../model/downloadTestSuite'
import * as XLSX from 'xlsx';

const DownloadTestSuitesToExcel = (TestSuiteList) =>{

    console.log("inside download to excel function")
    let downloadTestSuiteList =[];
   let TestSuiteArrayList =TestSuiteList;
   var scenario_No;
   var scenario_Description;
   var precondition;
   var step_Number;
   var step_Description;
   var step_ExpectedResult;
   var step_Status;
   var tcStatus;
   var  step_ActualResult;
   var step_log;
   console.log("Tamilllll",TestSuiteArrayList);
   for(var j=0;j<TestSuiteArrayList.length;j++){
   var TestSuite=TestSuiteArrayList[j];
    scenario_No = TestSuite.scenario_No;
    scenario_Description= TestSuite.scenario_Description;
    precondition= TestSuite.precondition;
    tcStatus= TestSuite.tcStatus;
   console.log(tcStatus);
    for(var i=0; i<TestSuite.step_Description.length; i++ ){
        if(i!==0){
            scenario_No = "";
            scenario_Description= "";
            precondition= "";
            tcStatus= "";  
        }
        step_Status= TestSuite.step_Status[i]; 
        console.log(step_Status);
        step_Number= TestSuite.step_Number[i];
        step_Description= TestSuite.step_Description[i];
        step_ExpectedResult= TestSuite.step_ExpectedResult[i]; 
        
        step_ActualResult= TestSuite.step_ActualResult[i];
        step_log= TestSuite.step_log[i];

         downloadTestSuiteList.push(new downloadTestSuite( scenario_No,scenario_Description,precondition,step_Number,step_Description,
            step_ExpectedResult,step_Status,tcStatus,step_ActualResult,step_log))

    }
    
   }
   
console.log(downloadTestSuiteList);
   var myFile = "ResultFile.xlsx";
   var myWorkSheet = XLSX.utils.json_to_sheet(downloadTestSuiteList);
   var myWorkBook = XLSX.utils.book_new();
   XLSX.utils.book_append_sheet(myWorkBook, myWorkSheet, "myWorkSheet");
   XLSX.writeFile(myWorkBook, myFile);

} 
export default DownloadTestSuitesToExcel;