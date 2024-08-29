import * as actions from "./actionTypes";
import axios from '../../axios_call'


const userRequestListStart = () => {
    return {
        type : actions.USER_REQUEST_LIST_START
    }
}

const userRequestListFail = (error) => {
    return {
        type : actions.USER_REQUEST_LIST_FAIL,
        error : error
    }   
}

const userRequestListSuccess = (message,data,page) => {
    return {
        type : actions.USER_REQUEST_LIST_SUCCESS,
        message : message,
        data : data,
        page : page
    }
}

const userRequestUpdateStart = () => {
    return {
        type : actions.USER_REQUEST_UPDATE_START
    }
}

const userRequestUpdateFail = (error) => {
    return {
        type : actions.USER_REQUEST_UPDATE_FAIL,
        error : error
    }   
}

const userRequestUpdateSuccess = (message,data) => {
    return {
        type : actions.USER_REQUEST_STATUS_UPDATE,
        message : message,
        data : data,
    }
}


const userRequestMessageDetail = (data) => {
    return {
        type : actions.USER_REQUEST_DETAIL,
        data : data,
    }
}

const userRequestFilterList = (text,status) => {
    return {
        type : actions.USER_REQUEST_LIST_FILTER,
        text : text,
        status : status
    }
}

export const UserRequestList = (param,token) => {
    return dispatch => {        
        dispatch(userRequestListStart());
        axios.get('SuperAdmin/getuserrolereqlist')
        .then((response) => {
            if(response.data.status){
                const data = response.data.result
                const msg = response.data.message 
                dispatch(userRequestListSuccess(msg,data,param.page));
            }else{
                dispatch(userRequestListFail(response.data.message))
            }            
        })
        .catch((error) => {
            dispatch(userRequestListFail(error.message))
        })
    }
}


export const UserRequestUpdate = (reqID,statusId,memberId,roleId) => {
    return dispatch => {        
        dispatch(userRequestUpdateStart());
        axios.get('SuperAdmin/acceptrejectreq?reqId='+reqID+'&status='+statusId)
        .then((response) => {
            // Changed on 29-11-2022
            if(statusId === 1){
                axios.get('SuperAdmin/changeuserroleid?memberId='+memberId+'&roleId='+roleId)
                .then((response) => {
                    if(response.data.status){
                        const data = []
                        const msg = response.data.message 
                        dispatch(userRequestUpdateSuccess(msg,data));
                    }else{
                        dispatch(userRequestUpdateFail(response.data.message))
                    }        
                })
                .catch((error) => {
                    dispatch(userRequestUpdateFail(error.message))
                })
            }else{            
                if(response.data.status){
                    const data = []
                    const msg = response.data.message 
                    dispatch(userRequestUpdateSuccess(msg,data));
                }else{
                    dispatch(userRequestUpdateFail(response.data.message))
                }   
            }     
        })
        .catch((error) => {
            dispatch(userRequestUpdateFail(error.message))
        })
    }
}

export const UserRequestDetail = (memberId) => {
    return dispatch => {        
        axios.get('SuperAdmin/getmemberqueansbyid?memberId='+memberId)
        .then((response) => {            
            const data = response.data.result
            dispatch(userRequestMessageDetail(data));        
        })
    }
}


export const UpdateDataNull = () => {
    return {
        type : actions.USER_REQUEST_STATUS_UPDATE,
        message : null,
        data : null,
    }
}

export const userRequestListFilter = (text,status) => {
    return dispatch => {
        dispatch(userRequestFilterList(text,status))
    }   
}