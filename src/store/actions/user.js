import * as actions from "./actionTypes";
import axios from '../../axios_call'
import Moment from 'moment';

const userListStart = () => {
    return {
        type : actions.USER_LIST_START
    }
}

const userListFail = (error) => {
    return {
        type : actions.USER_LIST_FAIL,
        error : error
    }   
}

const userListSuccess = (message,data,page) => {
    return {
        type : actions.USER_LIST_SUCCESS,
        message : message,
        data : data,
        page : page
    }
}

const userDeleteAction = (id) => {
    return {
        type : actions.USER_DELETE,
        id : id,
    }
}

const userAddEditStart = () => {
    return {
        type : actions.USER_ADD_EDIT_START
    }
}

const userAddEditFail = (error) => {
    return {
        type : actions.USER_ADD_EDIT_FAIL,
        error : error,
        redirectTo:null
    }   
}

const userAddEditSuccess = (message,data) => {
    return {
        type : actions.USER_ADD_EDIT_SUCCESS,
        message : message,
        data : data,
        redirectTo:"/users"
    }
}

const userDetail = (data,error,redirectTo) => {
    return {
        type : actions.USER_DETAIL,
        data : data,
        error : error,
        redirectTo: redirectTo
    }
}

export const userList = (param) => {
    return dispatch => {        
        dispatch(userListStart());
        axios.get('SuperAdmin/geallfundingdetails?ordering='+param.order)
        .then((response) => {
            if(response.data.status){
                const data = response.data.result
                const msg = response.data.message 
                dispatch(userListSuccess(msg,[{}],param.page));
            }else{
                dispatch(userListFail(response.data.message))
            }            
        })
        .catch((error) => {
            dispatch(userListFail(error.message))
        })
    }
}



export const userDelete = (id) => {
    return dispatch => {        
        axios.delete('SuperAdmin/deletefunding?fundingid='+id)
        .then((response) => {
            if(response.data.status){
                dispatch(userDeleteAction(id));
            }           
        })
    }
}

export const getUserDetail = (id) => {
    return dispatch => {        
        axios.get('SuperAdmin/geallfundingdetailsById?id='+id)
        .then((response) => {
            if(response.data.result){
                try{
                    let dt=Moment(response.data.result.dueDate)._d
                    if(dt === "Invalid Date"){
                        response.data.result.dueDate=new Date();
                        // console.log("Try",response.data.result)
                    }
                }catch(e){
                    response.data.result.dueDate=new Date();
                    // console.log("Catch",response.data.result.dueDate)
                }
                dispatch(userDetail(response.data.result,"",null));
            }else{
                dispatch(userDetail(null,"Invalide FUND Detail","/users"));
            }         
        })
    }
}

const userfilterList = (text) => {
    return {
        type : actions.USER_LIST_FILTER,
        text : text,
    }
}


export const userAddEdit = (param) => {
    return dispatch => {        
        dispatch(userAddEditStart());
        axios.post('SuperAdmin/addupdatefunding',param)
        .then((response) => {
            if(response.data.status){
                const data = response.data.result
                const msg = response.data.message 
                dispatch(userAddEditSuccess(msg,data));
            }else{
                dispatch(userAddEditFail(response.data.message))
            }            
        })
        .catch((error) => {
            dispatch(userAddEditFail(error.message))
        })
    }
}

export const getUserList = () => {
    return dispatch => {        
        axios.get('FundingResources/gefundingcategory')
        .then((response) => {
            if(response.data.result){
                dispatch(userList(response.data.result,""));
            }else{
                dispatch(userList(null,"No User"));
            }         
        })
    }
}

export const userListFilter = (filterText) => {
    return dispatch => {        
        dispatch(userfilterList(filterText));
    }
}