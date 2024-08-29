import axios from "axios";
import AsyncStorage  from "@react-native-async-storage/async-storage";

// import { BASE_URL
// import {AsyncStorage} from "@react-native-async-storage/async-storage";

// import { ToastAndroid } from "react-native";
import { BASE_URL} from "./constant_api";

const checkIfResponseHasToken = (response) => !!response?.token;

const callApi = async ({ data, method, endpoint }) => {
  const url = BASE_URL + endpoint;

  console.log(" ================================== url " , url);

  const config = { method, url };

  if (data) {
    config.data = data;
  }

  return axios(config)
    .then( async (response) => {
      /**
       * Store encrypted JWT in local storage
       */
      console.log("==================================================================================================> " , response.data);
      if (checkIfResponseHasToken(response?.data?.result)) {
        console.log(
          "==========================================================================================>"
        );
        const authData = JSON.stringify(response?.data?.result);
        await AsyncStorage.setItem("authData", authData);
      }
        // console.log("response isssssssssssssss" , response);
      return response
    })
    .catch((err) => {
      console.log("erorrrrrrrrrrrr", err.response);
      return err?.response;
    });
};

const ApiMiddleware = ({ data, method, endpoint }) => {
  // console.log("API DATA CHECK*****************************^&%^%%$#%$#%$#%#%$#^$#%$")
  // console.log(data)
  return callApi({ data, method, endpoint })
    .then((response) => {
        // console.log("response isssss" , res);
      const { data, message } = response?.data;
      if (response?.status === 200 || response?.status === 204) {
        return response;
      }
    })
    .catch((error) => console.log(error));
};

export default ApiMiddleware;
