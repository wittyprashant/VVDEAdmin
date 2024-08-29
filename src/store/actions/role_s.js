import * as actions from "./actionTypes";
import axios from '../../axios_call'



const detailStart = () => {
    return {
        type : actions.ROLE_DETAIL_START
    }
}

const detailFail  = (error) => {
    return {
        type : actions.ROLE_DETAIL_FAIL,
        error : error,
    }   
}


const roleDetailSuccess = (data) => {
    return {
        type : actions.ROLE_DETAIL,
        data : data,
    }
}

const addEditStart = () => {
    return {
        type : actions.ROLE_ADD_EDIT_START
    }
}

const addEditFail = (error) => {
    return {
        type : actions.ROLE_ADD_EDIT_FAIL,
        error : error,
    }   
}

const addEditSuccess = (message,data) => {
    return {
        type : actions.ROLE_ADD_EDIT_SUCCESS,
        message : message,
        data : data,
    }
}

const addEditRoleSuccessMessage = (message) => {
    return {
        type : actions.ROLE_ADD_EDIT_SUCCESS_MESSAGE,
        message : message,
    }
}


export const addEditRole = (formData) => {
    return dispatch => {
        dispatch(addEditStart());
        axios.post("SuperAdmin/addupdaterolepermission",formData)
        .then((response) => {
            if(response.data.status){
                const data = response.data.result
                const msg = response.data.message 
                dispatch(addEditSuccess(msg,data));
            }else{
                dispatch(addEditFail(response.data.message))
            }            
        })
        .catch((error) => {
            dispatch(addEditFail(error.response.data.message))
        })
    }   
}

export const addEditErrorNull = () => {
    return dispatch => {
        dispatch(addEditFail(null))
    }   
}

export const roleDetail = (roleId) => {
    return dispatch => {
        dispatch(detailStart());
        axios.get("SuperAdmin/getrolepermissionbyroleid?roleId="+ roleId)
        .then((response) => {
            if(response.data.status){
                const data = response.data.result
                dispatch(roleDetailSuccess(data));
            }else{
                dispatch(detailFail(response.data.message))
            }            
        })
        .catch((error) => {
            dispatch(detailFail(error.message))
        })
    }   
}



export const addEditRoleSuccessNull = () => {
    return dispatch => {
        dispatch(addEditRoleSuccessMessage(null))
    }   
}