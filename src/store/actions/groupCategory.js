import * as actions from "./actionTypes";
import axios from '../../axios_call'


const groupCategoryStart = () => {
    return {
        type : actions.GROUP_LIST_START
    }
}

const groupCategoryFail = (error) => {
    return {
        type : actions.GROUP_LIST_FAIL,
        error : error
    }   
}

const groupCategorySuccess = (message,data,page) => {
    return {
        type : actions.GROUP_LIST_SUCCESS,
        message : message,
        data : data,
        page : page
    }
}

const groupCategoryDeleteAction = (id) => {
    return {
        type : actions.GROUP_DELETE,
        id : id,
    }
}

const groupCategoryAddEditStart = () => {
    return {
        type : actions.GROUP_ADD_EDIT_START
    }
}

const groupCategoryAddEditFail = (error) => {
    return {
        type : actions.GROUP_ADD_EDIT_FAIL,
        error : error,
        redirectTo:null
    }   
}

const groupCategoryAddEditSuccess = (message,data) => {
    return {
        type : actions.GROUP_ADD_EDIT_SUCCESS,
        message : message,
        data : data,
        redirectTo:"/contributor_meta"
    }
}

const groupCategoryDetail = (data,error) => {
    return {
        type : actions.GROUP_DETAIL,
        data : data,
        error : error,
    }
}

export const groupCategory = (param,token) => {
    return dispatch => {        
        dispatch(groupCategoryStart());
        axios.get('Group/getgroupcategory?ordering='+param.order+'&page='+param.page)
        .then((response) => {
            if(response.data.status){
                const data = response.data.result
                const msg = response.data.message 
                dispatch(groupCategorySuccess(msg,data,param.page));
            }else{
                dispatch(groupCategoryFail(response.data.message))
            }            
        })
        .catch((error) => {
            dispatch(groupCategoryFail(error.message))
        })
    }
}

export const groupCategoryDelete = (id,token) => {
    return dispatch => {        
        axios.get('GroupCategory/deletegroup?groupid='+id)
        .then((response) => {
            if(response.data.status){
                dispatch(groupCategoryDeleteAction(id));
            }           
        })
    }
}

export const getgroupCategoryDetail = (id,token) => {
    return dispatch => {        
        axios.get('GroupCategory/getgroupdetailsbyid?groupid='+id)
        .then((response) => {
            if(response.data.result){
                dispatch(groupCategoryDetail(response.data.result,""));
            }else{
                dispatch(groupCategoryDetail(null,"Invalide group Detail"));
            }         
        })
    }
}

export const groupCategoryAddEdit = (param,token) => {
    return dispatch => {        
        dispatch(groupCategoryAddEditStart());
        axios.post('GroupCategory/addupdategroup',param)
        .then((response) => {
            if(response.data.status){
                const data = response.data.result
                const msg = response.data.message 
                dispatch(groupCategoryAddEditSuccess(msg,data));
            }else{
                dispatch(groupCategoryAddEditFail(response.data.message))
            }            
        })
        .catch((error) => {
            dispatch(groupCategoryAddEditFail(error.message))
        })
    }
}
