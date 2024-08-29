import * as actions from "./actionTypes";
import axios from '../../axios_call';

// const userlListStart = () => {
//     return {
//         type : actions.MATERIAL_USER_LIST_START
//     }
// }

// const userListFail = (error) => {
//     return {
//         type : actions.MATERIAL_USER_LIST_FAIL,
//         error : error
//     }   
// }

// const userListSuccess = (message,data,page) => {
//     return {
//         type : actions.MATERIAL_USER_LIST_SUCCESS,
//         message : message,
//         data : data,
//         page : page
//     }
// }


const materialListStart = () => {
    return {
        type : actions.MATERIAL_LIST_START
    }
}

const materialListFail = (error) => {
    return {
        type : actions.MATERIAL_LIST_FAIL,
        error : error
    }   
}

const materialListSuccess = (message,data,page) => {
    return {
        type : actions.MATERIAL_LIST_SUCCESS,
        message : message,
        data : data,
        page : page
    }
}

const materialDeleteAction = (id) => {
    return {
        type : actions.MATERIAL_DELETE,
        id : id,
    }
}

const materialAddEditStart = () => {
    return {
        type : actions.MATERIAL_ADD_EDIT_START
    }
}

const materialAddEditFail = (error) => {
    return {
        type : actions.MATERIAL_ADD_EDIT_FAIL,
        error : error,
        redirectTo:null
    }   
}

const materialAddEditSuccess = (message,data) => {
    return {
        type : actions.MATERIAL_ADD_EDIT_SUCCESS,
        message : message,
        data : data,
        redirectTo:"/materials"
    }
}

const materialfilterList = (text) => {
    return {
        type : actions.MATERIAL_LIST_FILTER,
        text : text,
    }
}

export const materialDetail = (data,error) => {
    return {
        type : actions.MATERIAL_DETAIL,
        data : data,
        error : error,
    }
}

export const materialStateList = (data,error) => {
    return {
        type : actions.MATERIAL_STATE_LIST,
        data : data,
        error : error,
    }
}

export const materialCountryList = (data,error) => {
    return {
        type : actions.MATERIAL_COUNTRY_LIST,
        data : data,
        error : error,
    }
}

export const materialList = (param) => {
    return dispatch => {        
        dispatch(materialListStart());
        axios.get('/materials')
        .then((response) => {
            if(response.status === 200){
                const data = response.data.result
                console.log("res",data)
                const msg = response.message
                dispatch(materialListSuccess(msg, data, 1));
            }else{
                dispatch(materialListFail(response.message))
            }            
        })
        .catch((error) => {
            dispatch(materialListFail(error.message))
        })
    }
}

export const materialDelete = (id) => {
    return dispatch => {        
        axios.delete('SuperAdmin/deleteevent?eventid='+id)
        .then((response) => {
            if(response.data.status){
                dispatch(materialDeleteAction(id));
            }           
        })
    }
}

export const getMaterialDetail = (id) => {
    return dispatch => {        
        axios.get('SuperAdmin/geteventbyid?eventid='+id)
        .then((response) => {
            if(response.data.result){
                dispatch(materialDetail(response.data.result,""));
            }else{
                dispatch(materialDetail(null,"Invalide Material Detail"));
            }         
        })
    }
}

export const materialAddEdit = (param) => {
    return dispatch => {        
        dispatch(materialAddEditStart());
        axios.post('SuperAdmin/addupdateevent',param)
        .then((response) => {
            if(response.data.status){
                const data = response.data.result
                const msg = response.data.message 
                dispatch(materialAddEditSuccess(msg,data));
            }else{
                dispatch(materialAddEditFail(response.data.message))
            }            
        })
        .catch((error) => {
            dispatch(materialAddEditFail(error.message))
        })
    }
}


export const getCountryList = () => {
    return dispatch => {        
        axios.get('CountryState/getallcountry')
        .then((response) => {
            if(response.data.result){
                dispatch(materialCountryList(response.data.result,""));
            }else{
                dispatch(materialCountryList(null,"No Country"));
            }         
        })
    }
}


export const getStateList = (id) => {
    return dispatch => {        
        axios.get('CountryState/getstatebycountry?countryid='+id)
        .then((response) => {
            if(response.data.result){
                dispatch(materialStateList(response.data.result,""));
            }else{
                dispatch(materialStateList(null,"No State"));
            }         
        })
    }
}

export const materialListFilter = (filterText) => {
    return dispatch => {        
        dispatch(materialfilterList(filterText));
    }
}