import {API} from '../API/api';

export const UploadTestSuites = async(reqObj) =>{
    console.log("req inputtttttttttttttt" );
    console.log( reqObj);
    let result= await(API.post('uploadFile', reqObj));
    return result;

}