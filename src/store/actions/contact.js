import * as actions from "./actionTypes";
import axios from '../../axios_call'


const contactListStart = () => {
    return {
        type : actions.GROUP_LIST_START
    }
}

const contactListFail = (error) => {
    return {
        type : actions.GROUP_LIST_FAIL,
        error : error
    }   
}

const contactListSuccess = (message,data,page) => {
    // console.log(data,"data");
    return {
        type : actions.GROUP_LIST_SUCCESS,
        message : message,
        data : data,
        page : page
    }
}

const contactDeleteAction = (id) => {
    return {
        type : actions.GROUP_DELETE,
        id : id,
    }
}

const contactAddEditStart = () => {
    return {
        type : actions.GROUP_ADD_EDIT_START
    }
}

const contactAddEditFail = (error) => {
    return {
        type : actions.GROUP_ADD_EDIT_FAIL,
        error : error,
        redirectTo:null
    }   
}

const contactAddEditSuccess = (message,data) => {
    return {
        type : actions.GROUP_ADD_EDIT_SUCCESS,
        message : message,
        data : data,
        redirectTo:"/contact_management"
    }
}

const contactDetail = (data,error) => {
    return {
        type : actions.GROUP_DETAIL,
        data : data,
        error : error,
    }
}

export const contactList1 = (param,token) => {
    return dispatch => {        
        let orderBy=0; 
        let pageNo=0;
        if(param.order !== undefined){
            orderBy=param.order;
        }
        if(param.page !== undefined){
            pageNo=param.page;
        }
        dispatch(contactListStart());
        axios.get('SuperAdmin/getcontactusquerylist?ordering='+orderBy+'&page='+pageNo)
        .then((response) => {
            if(response.data.status){
                const data = response.data.result
                const msg = response.data.message 
                console.log("sfdsdfsdfsdfsdfsd",response.data.result)
                dispatch(contactListSuccess(msg,data,pageNo));
            }else{
                dispatch(contactListFail(response.data.message))
            }            
        })
        .catch((error) => {
            dispatch(contactListFail(error.message))
        })
    }
}

export const contactDelete = (id,token) => {
    return dispatch => {        
        axios.delete('SuperAdmin/deletecontactusquery?Id='+id)
        .then((response) => {
            if(response.data.status){
                dispatch(contactDeleteAction(id));
            }           
        })
    }
}

export const getcontactDetail = (id,token) => {
    return dispatch => {        
        axios.get('SuperAdmin/getcontactdetailsbyid?Id='+id)
        .then((response) => {
            if(response.data.result){
                dispatch(contactDetail(response.data.result,""));
            }else{
                dispatch(contactDetail(null,"Invalide contact Detail"));
            }         
        })
    }
}

export const contactAddEdit = (param,token) => {
    return dispatch => {        
        dispatch(contactAddEditStart());
        const headers = {
            headers:{
                'Authorization': JSON.parse(localStorage.getItem("userDetail")).token,
                'accept': '*/*',
                'Content-Type': 'application/json-patch+json'
            }
        };
        axios.post('SuperAdmin/addupdatecontact',param,headers)
        .then((response) => {
            if(response.data.status){
                const data = response.data.result
                const msg = response.data.message 
                dispatch(contactAddEditSuccess(msg,data));
            }else{
                dispatch(contactAddEditFail(response.data.message))
            }            
        })
        .catch((error) => {
            dispatch(contactAddEditFail(error.message))
        })
    }
}
