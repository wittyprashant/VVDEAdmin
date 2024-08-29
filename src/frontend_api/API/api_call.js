import AsyncStorage from "@react-native-async-storage/async-storage";
// import {Alert, PermissionsAndroid, Platform } from "react-native";
// import RNFetchBlob from "rn-fetch-blob";
import ApiMiddleware from "./api";
import { endPoint } from "./constant_api";

export const CallAPICommonDML = async (url,method,params,tag) => {
    let fcmtoken = "";//await AsyncStorage.getItem("fcmtoken");
    // let tokan;
    // if (fcmtoken) {
    //   tokan = fcmtoken;
    // }
    let AuthData=await AsyncStorage.getItem("authData");
    let head="";
    // console.log("AuthData",AuthData);
    console.log("params",params);
    // console.log("url",url);
    // console.log("signUpAPIUrl",endPoint.signUpAPIUrl);
    // console.log("OTPAPIUrl",endPoint.OTPAPIUrl);
    if(AuthData !== null){
      try{
        if(endPoint.signUpAPIUrl !== url && url !== endPoint.OTPAPIUrl){
          head='Bearer '+JSON.parse(AuthData).token;
        }
      }catch(e){

      }
    }
    // console.log("token",head)
    if (Object.keys(params).length == 0) {
      params=null;
    }
    let requireParams = {
      data: params,
      method: method,
      endpoint: url,
      headers:{
        'Accept': '*/*',
        'Authorization': head
      }
    };
    // console.log("requireParams",requireParams)
    return ApiMiddleware(requireParams)
      .then((res) => {
        // console.log(tag+" --------------------- ",res)
        return res;
      })
      .catch((err) => {
        console.log(tag+"Err --------------------- "+err)
        return err;
        // return "Error";
    });
}
