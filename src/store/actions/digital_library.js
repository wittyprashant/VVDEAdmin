import * as actions from "./actionTypes";
import axios from '../../axios_call'


const digitalLibrarylListStart = () => {
    return {
        type : actions.DIGITAL_LIBRARY_LIST_START
    }
}

const digitalLibrarylListFail = (error) => {
    return {
        type : actions.DIGITAL_LIBRARY_LIST_FAIL,
        error : error
    }   
}

const digitalLibraryListSuccess = (message,data,page) => {
    return {
        type : actions.DIGITAL_LIBRARY_LIST_SUCCESS,
        message : message,
        data : data,
        page : page
    }
}

const digitalLibraryDeleteAction = (id) => {
    return {
        type : actions.DIGITAL_LIBRARY_DELETE,
        id : id,
    }
}

const digitalLibraryAddEditStart = () => {
    return {
        type : actions.DIGITAL_LIBRARY_ADD_EDIT_START
    }
}

const digitalLibraryAddEditFail = (error) => {
    return {
        type : actions.DIGITAL_LIBRARY_ADD_EDIT_FAIL,
        error : error,
        redirectTo:null
    }   
}

const digitalLibraryAddEditSuccess = (message,data) => {
    return {
        type : actions.DIGITAL_LIBRARY_ADD_EDIT_SUCCESS,
        message : message,
        data : data,
        redirectTo:"/digital_library"
    }
}

const digitalLibraryDetail = (data,error) => {
    return {
        type : actions.DIGITAL_LIBRARY_DETAIL,
        data : data,
        error : error,
    }
}

const digitalLibraryfilterList = (text) => {
    return {
        type : actions.DIGITAL_LIBRARY_LIST_FILTER,
        text : text
    }
}

export const digitalLibraryList = (param) => {
    return dispatch => {        
        dispatch(digitalLibrarylListStart());
        axios.get('SuperAdmin/getalldigitallibrary?ordering='+param.order+'&page='+param.page)
        .then((response) => {
            if(response.data.status){
                const data = response.data.result
                const msg = response.data.message 
                dispatch(digitalLibraryListSuccess(msg,data,param.page));
            }else{
                dispatch(digitalLibrarylListFail(response.data.message))
            }            
        })
        .catch((error) => {
            dispatch(digitalLibrarylListFail(error.message))
        })
    }
}

export const digitalLibraryDelete = (id,token) => {
    return dispatch => {        
        axios.delete('SuperAdmin/deletedigitallibrary?digitallibraryid='+id)
        .then((response) => {
            if(response.data.status){
                dispatch(digitalLibraryDeleteAction(id));
            }           
        })
    }
}

export const getdigitalLibraryDetail = (id) => {
    return dispatch => {        
        axios.get('SuperAdmin/getdigitallibrarybyid?id='+id)
        .then((response) => {
            if(response.data.result){
                dispatch(digitalLibraryDetail(response.data.result,""));
            }else{
                dispatch(digitalLibraryDetail(null,"Invalide digitalLibrary Detail"));
            }         
        })
    }
}

export const digitalLibraryAddEdit = (param) => {
    return dispatch => {        
        dispatch(digitalLibraryAddEditStart());
        axios.post('SuperAdmin/addupdatedigitallibrary',param)
        .then((response) => {
            if(response.data.status){
                const data = response.data.result
                const msg = response.data.message 
                dispatch(digitalLibraryAddEditSuccess(msg,data));
            }else{
                dispatch(digitalLibraryAddEditFail(response.data.message))
            }            
        })
        .catch((error) => {
            dispatch(digitalLibraryAddEditFail(error.message))
        })
    }
}


export const addEditDigitalErrorNull = () => {
    return dispatch => {
        dispatch(digitalLibraryAddEditFail(null))
    }   
}

export const digitalLibraryListFilter = (filterText) => {
    return dispatch => {        
        dispatch(digitalLibraryfilterList(filterText));
    }
}