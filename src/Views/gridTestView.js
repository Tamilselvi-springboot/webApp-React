import React, { useState, useEffect } from 'react';
//import * as excel from 'xlsx';
import XlstoJson from '../Utils/xlsToJson';
import TestSuiteView from './testSuiteView';
import Button from "@material-ui/core/Button";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import FormControl from '@material-ui/core/FormControl';
import { makeStyles } from '@material-ui/core/styles';
import blue from '../Images/blue.jpg';
import {UploadTestSuites} from '../Utils/uploadTestSuites';
import {PojoArrayToJsonArrayTestSuite} from '../Utils/pojoArrayToJsonArrayTestSuite';
import {PojoArrayToJsonArraySelObj} from '../Utils/pojoArrayToJsonArraySelObj';
import JSONToTestSuite from '../Utils/JSONToTestSuite';
import downloadTestSuitesToExcel from '../Utils/downloadTestSuitesToExcel'

const GridTestView = () => {

    const useStyles = makeStyles((theme) => ({
        formControl: {
            margin: theme.spacing(1),
            minWidth: 100,
            minHeight: 50
        },
        selectEmpty: {
            marginTop: theme.spacing(2),
        },
    }));

    const [testSuite, setTestSuite] = useState([]);
    const [paramdata, setParamdata] = useState([]);
    const [selObjectCollection, setSelObjectCollection] = useState([]);
    const [file, setFile] = useState('');
    const [uploaded, setUploaded] = useState(false);
    const [isResetDisabled, setIsResetDisabled] = useState(true);
    const [isParallel, setIsParallel] = useState(false);
    const [processed, setProcessed] = useState(false);
    const [testType, setTestType] = useState('')
    const testTypes = ['UI', 'Service']
    const classes = useStyles();
    let columnsObjects = [
        { label: "Scenario_No" },
        { label: "ScenarioDescription" },
        { label: "Precondition" },
        { label: "StepNumber" },
        { label: "StepDescription" },
        { label: "ExpectedResult" },
      ];
      const [columns, setColumns] = useState(columnsObjects);
    //const[selectedTestSuites, setSelectedTestSuites] = useState([]);



    const handleChange = (file) => {
        console.log("inside handlechange ");
        setFile(file);
        // console.log("after set file ");
        // console.log(file);

    }

    useEffect(() => {
       
        file !== '' && uploadData();
       
    }, [file] )

    const uploadData = () => {
        //setUploaded(true);
      //  console.log(uploaded);
      //  console.log("start of upload data");
      //  console.log(file);
        XlstoJson(file, setTestSuite, setParamdata, setSelObjectCollection);
      //  console.log("selvi" + testSuite.length);
        setIsResetDisabled(false);
       // console.log(uploaded);
    }
    const handleResetClick = () => {
        setFile('');
        setTestSuite([]);
        setIsResetDisabled(true);
        setIsParallel(false);
        setTestType('');
    }
    const handleCheckbox = (event) => {
      //  console.log("checkboxxxxxxxxxxxxxx" + event);
        setIsParallel(event.target.checked);
        //  console.log(event.target.checked);

    }

    const handleTestTypeChange = (event) => {
     //   console.log("checkboxxxxxxxxxxxxxx" + event.target.value);
        setTestType(event.target.value);
        //  console.log(event.target.checked);

    }

    const handleExport =()=>{
        
        downloadTestSuitesToExcel(testSuite);
    }
    const handleRun = async (seltestsuites) => {
        // console.log("aaaaaaaaaaaaaaaaaaaa" + seltestsuites[0]);
        //  console.log("bbbbbbbbbbbbbbbbbbb" + testSuite[0].Scenario_No);

    // seltestsuites.forEach(element =>
        //    console.log(element));
        const finalSelectedSuiteList = [];
        seltestsuites.forEach(element =>

            testSuite.forEach(eachSuite =>
                eachSuite.scenario_No.trim() === element.trim() && finalSelectedSuiteList.push(eachSuite)

            )

        );

        // setTestSuite(testSuite);
        finalSelectedSuiteList.map(eachSuite =>
            eachSuite.isSelected = true);

        //finalSelectedSuiteList.map(eachSuite =>
           // console.log(eachSuite.scenario_No));
           // console.log(isParallel);
           // console.log(testType);
           // console.log(paramdata);
            selObjectCollection.map(selObj =>
                console.log(selObj.ObjName));
           const req = {testSuites:PojoArrayToJsonArrayTestSuite(finalSelectedSuiteList),
              parallel:isParallel? "parallel" : "",
              testType,
              paramdata,
              selObjectCollection:PojoArrayToJsonArraySelObj(selObjectCollection)}
console.log(req);
console.log(testType);
const req1 ={
     parallel:'yes', testType }

            const response  = await UploadTestSuites(req);
console.log(response.data);
if (response.data!==''||response.data!==undefined){
  //  console.log("Tamilllllllllllll")
   // console.log(testSuite)
    setTestSuite(  JSONToTestSuite(response.data));
  //  console.log("Selviiiiiiii")
  //  console.log(testSuite)
  let columnsObjects = [
    { label: "Scenario_No" },
    { label: "ScenarioDescription" },
    { label: "Precondition" },
    { label: "StepNumber" },
    { label: "StepDescription" },
    { label: "ExpectedResult" },
    { label: "ActualResult" },
    { label: "StepStatus" },
    { label: "TCStatus" },
    { label: "TestLog" },
  ];
   setColumns(columnsObjects);
setProcessed(true);

}

        //    setTestSuite( UploadTestSuites(req));
    }







   // var left = 100 + 'px';
    //var top = 10 + 'px';
    var padding = 50 + 'px';
   // var padding1 = 50 + 'px';
    return (

        <div style={{
            padding: padding, backgroundImage: `url(${blue})`, backgroundSize: 'cover', width: '92%',
            height: '480px'
        }}>
            {console.log("start of the render")}
            <input type="file" style={{ margin: 20 }} onChange={(e) => {
                handleChange(e.target.files[0])
            }} onClick={(event) => {
                event.target.value = null
            }}
            />

            <FormControlLabel
                control={
                    <Checkbox
                        checked={isParallel}
                        onChange={handleCheckbox}
                        name="checkedB"
                        color="primary"
                    />
                }
                label="Parallel"
            />

            <FormControl variant="outlined" className={classes.formControl}>

                <InputLabel id="TestType">Test Type</InputLabel>
                <Select
                    labelId="demo-simple-select-filled-label"

                    id="demo-simple-select-filled"
                    value={testType}
                    onChange={handleTestTypeChange}
                >

                    {testTypes.map((eachType,i) => <MenuItem key = {i} value={eachType}>{eachType}</MenuItem>)}

                </Select>
            </FormControl>

           
            { /*(testSuite.length !== 0) && testSuite.forEach(element => console.log(element.Scenario_Description))*/}
            {console.log({columns})}
            {(testSuite.length !== 0) && <TestSuiteView testSuite={testSuite} setSelectedTestSuites={handleRun} columns ={columns} processed={processed} handleExport={handleExport}/>}
            <Button disabled={isResetDisabled} variant="contained" color="primary" style={{ float: 'right' }} onClick={handleResetClick}>Reset</Button>

        </div>
    );
}

export default GridTestView;