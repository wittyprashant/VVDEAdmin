import * as actions from "./actionTypes";
import axios from '../../axios_call'


const faqlListStart = () => {
    return {
        type : actions.FAQ_LIST_START
    }
}

const faqListFail = (error) => {
    return {
        type : actions.FAQ_LIST_FAIL,
        error : error
    }   
}

const faqListSuccess = (message,data,page) => {
    return {
        type : actions.FAQ_LIST_SUCCESS,
        message : message,
        data : data,
        page : page
    }
}

const faqDeleteAction = (id) => {
    return {
        type : actions.FAQ_DELETE,
        id : id,
    }
}

const faqAddEditStart = () => {
    return {
        type : actions.FAQ_ADD_EDIT_START
    }
}

const faqAddEditFail = (error) => {
    return {
        type : actions.FAQ_ADD_EDIT_FAIL,
        error : error,
        redirectTo:null
    }   
}

const faqAddEditSuccess = (message,data) => {
    return {
        type : actions.FAQ_ADD_EDIT_SUCCESS,
        message : message,
        data : data,
        redirectTo:"/faqs"
    }
}

const faqDetail = (data,error) => {
    return {
        type : actions.FAQ_DETAIL,
        data : data,
        error : error,
    }
}


export const faqList = (param) => {
    return dispatch => {        
        dispatch(faqlListStart());
        axios.get('SuperAdmin/geallfaqdetails')
        .then((response) => {
            if(response.data.status){
                const data = response.data.result
                const msg = response.data.message 
                dispatch(faqListSuccess(msg,data,param.page));
            }else{
                dispatch(faqListFail(response.data.message))
            }            
        })
        .catch((error) => {
            dispatch(faqListFail(error.message))
        })
    }
}

export const faqDelete = (id) => {
    return dispatch => {        
        axios.delete('SuperAdmin/deletefaq?faqId='+id)
        .then((response) => {
            if(response.data.status){
                dispatch(faqDeleteAction(id));
            }           
        })
    }
}


export const faqAddEdit = (param,token) => {
    return dispatch => {        
        dispatch(faqAddEditStart());
        axios.post('SuperAdmin/addupdatefaq',param)
        .then((response) => {
            if(response.data.status){
                const data = response.data.result
                const msg = response.data.message 
                dispatch(faqAddEditSuccess(msg,data));
            }else{
                dispatch(faqAddEditFail(response.data.message))
            }            
        })
        .catch((error) => {
            dispatch(faqAddEditFail(error.message))
        })
    }
}


export const getfaqDetail = (id) => {
    return dispatch => {        
        axios.get('SuperAdmin/getfaqbyid?faqId='+id)
        .then((response) => {
            if(response.data.result){
                dispatch(faqDetail(response.data.result,""));
            }else{
                dispatch(faqDetail(null,"Invalide faq Detail"));
            }         
        })
    }
}