import * as actions from "./actionTypes";
import axios from '../../axios_call'

const roleListStart = () => {
    return {
        type : actions.ROLE_LIST_START
    }
}

const roleListFail = (error) => {
    return {
        type : actions.ROLE_LIST_FAIL,
        error : error
    }   
}

const roleListSuccess = (message,data,page) => {
    return {
        type : actions.ROLE_LIST_SUCCESS,
        message : message,
        data : data,
        page : page
    }
}

const roleDeleteAction = (id) => {
    return {
        type : actions.ROLE_DELETE,
        id : id,
    }
}

const roleAddEditStart = () => {
    return {
        type : actions.ROLE_ADD_EDIT_START
    }
}

const roleAddEditFail = (error) => {
    return {
        type : actions.ROLE_ADD_EDIT_FAIL,
        error : error,
        redirectTo:null
    }   
}

const roleAddEditSuccess = (message,data) => {
    return {
        type : actions.ROLE_ADD_EDIT_SUCCESS,
        message : message,
        data : data,
        redirectTo:"/roles"
    }
}




const rolefilterList = (text) => {
    return {
        type : actions.ROLE_LIST_FILTER,
        text : text,
    }
}


export const roleDetail = (data,error) => {
    return {
        type : actions.ROLE_DETAIL,
        data : data,
        error : error,
    }
}

export const roleStateList = (data,error) => {
    return {
        type : actions.ROLE_STATE_LIST,
        data : data,
        error : error,
    }
}

export const roleCountryList = (data,error) => {
    return {
        type : actions.ROLE_COUNTRY_LIST,
        data : data,
        error : error,
    }
}

export const roleList = (param) => {
    return dispatch => {        
        dispatch(roleListStart());
        axios.get('SuperAdmin/getevent?order='+param.order+'&page='+param.page)
        .then((response) => {
            if(response.data.status){
                const data = response.data.result
                const msg = response.data.message 
                dispatch(roleListSuccess(msg,data,param.page));
            }else{
                dispatch(roleListFail(response.data.message))
            }            
        })
        .catch((error) => {
            dispatch(roleListFail(error.message))
        })
    }
}

export const roleDelete = (id) => {
    return dispatch => {        
        axios.delete('SuperAdmin/deleteevent?eventid='+id)
        .then((response) => {
            if(response.data.status){
                dispatch(roleDeleteAction(id));
            }           
        })
    }
}

export const getRoleDetail = (id) => {
    return dispatch => {        
        axios.get('SuperAdmin/geteventbyid?eventid='+id)
        .then((response) => {
            if(response.data.result){
                dispatch(roleDetail(response.data.result,""));
            }else{
                dispatch(roleDetail(null,"Invalide Role Detail"));
            }         
        })
    }
}

export const roleAddEdit = (param) => {
    return dispatch => {        
        dispatch(roleAddEditStart());
        axios.post('SuperAdmin/addupdateevent',param)
        .then((response) => {
            if(response.data.status){
                const data = response.data.result
                const msg = response.data.message 
                dispatch(roleAddEditSuccess(msg,data));
            }else{
                dispatch(roleAddEditFail(response.data.message))
            }            
        })
        .catch((error) => {
            dispatch(roleAddEditFail(error.message))
        })
    }
}


export const getCountryList = () => {
    return dispatch => {        
        axios.get('CountryState/getallcountry')
        .then((response) => {
            if(response.data.result){
                dispatch(roleCountryList(response.data.result,""));
            }else{
                dispatch(roleCountryList(null,"No Country"));
            }         
        })
    }
}


export const getStateList = (id) => {
    return dispatch => {        
        axios.get('CountryState/getstatebycountry?countryid='+id)
        .then((response) => {
            if(response.data.result){
                dispatch(roleStateList(response.data.result,""));
            }else{
                dispatch(roleStateList(null,"No State"));
            }         
        })
    }
}

export const roleListFilter = (filterText) => {
    return dispatch => {        
        dispatch(rolefilterList(filterText));
    }
}