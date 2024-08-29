import * as actions from "./actionTypes";
import axios from '../../axios_call'


const grouplListStart = () => {
    return {
        type : actions.GROUP_LIST_START
    }
}

const grouplListFail = (error) => {
    return {
        type : actions.GROUP_LIST_FAIL,
        error : error
    }   
}

const groupListSuccess = (message,data,page) => {
    return {
        type : actions.GROUP_LIST_SUCCESS,
        message : message,
        data : data,
        page : page
    }
}

const groupDeleteAction = (id) => {
    return {
        type : actions.GROUP_DELETE,
        id : id,
    }
}

const groupAddEditStart = () => {
    return {
        type : actions.GROUP_ADD_EDIT_START
    }
}

const groupAddEditFail = (error) => {
    return {
        type : actions.GROUP_ADD_EDIT_FAIL,
        error : error,
        redirectTo:null
    }   
}

const groupAddEditSuccess = (message,data) => {
    return {
        type : actions.GROUP_ADD_EDIT_SUCCESS,
        message : message,
        data : data,
        redirectTo:"/contributor_meta"
    }
}

const groupDetail = (data,error) => {
    return {
        type : actions.GROUP_DETAIL,
        data : data,
        error : error,
    }
}

const groupfilterList = (text) => {
    return {
        type : actions.GROUP_LIST_FILTER,
        text : text,
    }
}
export const groupList = (param,token) => {
    return dispatch => {        
        let orderBy=0; 
        let pageNo=0;
        if(param.order !== undefined){
            orderBy=param.order;
        }
        if(param.page !== undefined){
            pageNo=param.page;
        }
        dispatch(grouplListStart());
        axios.get('Group/getallgroup?ordering='+orderBy+'&page='+pageNo)
        .then((response) => {
            if(response.data.status){
                const data = response.data.result
                const msg = response.data.message 
                dispatch(groupListSuccess(msg,[{},{}],pageNo));
            }else{
                dispatch(grouplListFail(response.data.message))
            }            
        })
        .catch((error) => {
            dispatch(grouplListFail(error.message))
        })
    }
}

export const groupDelete = (id,token) => {
    return dispatch => {        
        axios.get('Group/deletegroup?groupid='+id)
        .then((response) => {
            if(response.data.status){
                dispatch(groupDeleteAction(id));
            }           
        })
    }
}

export const getgroupDetail = (id,token) => {
    return dispatch => {        
        axios.get('Group/getgroupdetailsbyid?groupid='+id)
        .then((response) => {
            if(response.data.result){
                dispatch(groupDetail(response.data.result,""));
            }else{
                dispatch(groupDetail(null,"Invalide group Detail"));
            }         
        })
    }
}

export const groupAddEdit = (param,token) => {
    return dispatch => {        
        dispatch(groupAddEditStart());
        const headers = {
            headers:{
                'Authorization': JSON.parse(localStorage.getItem("userDetail")).token,
                'accept': '*/*',
                'Content-Type': 'application/json-patch+json'
            }
        };
        axios.post('SuperAdmin/addupdategroup',param,headers)
        .then((response) => {
            if(response.data.status){
                const data = response.data.result
                const msg = response.data.message 
                dispatch(groupAddEditSuccess(msg,data));
            }else{
                dispatch(groupAddEditFail(response.data.message))
            }            
        })
        .catch((error) => {
            dispatch(groupAddEditFail(error.message))
        })
    }
}


export const groupListFilter = (filterText) => {
    return dispatch => {        
        dispatch(groupfilterList(filterText));
    }
}