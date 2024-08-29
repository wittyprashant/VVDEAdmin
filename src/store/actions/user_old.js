import * as actions from "./actionTypes";
import axios from '../../axios_call'


const userlListStart = () => {
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

const userPlanListAction = (data,error) => {
    return {
        type : actions.USER_PLAN_LIST,
        data : data,
        error : error,
    }
}

const userRoleListAction = (data,error) => {
    return {
        type : actions.USER_ROLE_LIST,
        data : data,
        error : error,
    }
}

const userDetail = (data,error) => {
    return {
        type : actions.USER_DETAIL,
        data : data,
        error : error,
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
        redirectTo:"/members"
    }
}

const userFilterList = (text,role) => {
    return {
        type : actions.USER_LIST_FILTER,
        text : text,
        role : role
    }
}

export const userList = (param) => {
    return dispatch => {        
        dispatch(userlListStart());
        axios.get('SuperAdmin/getallmemberslist')
        .then((response) => {
            if(response.data.status){
                const data = response.data.result
                const msg = response.data.message 
                dispatch(userListSuccess(msg,data,param.page));
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
        axios.delete('SuperAdmin/deletemember?id='+id)
        .then((response) => {
            if(response.data.status){
                dispatch(userDeleteAction(id));
            }           
        })
    }
}

export const getPlanList = () => {
    return dispatch => {        
        axios.get('SuperAdmin/getplancodelist')
        .then((response) => {
            if(response.data.result){
                dispatch(userPlanListAction(response.data.result,""));
            }else{
                dispatch(userPlanListAction(null,"No Plan"));
            }         
        })
    }
}

export const getRoleList = () => {
    return dispatch => {        
        axios.get('SuperAdmin/getuserrolelist')
        .then((response) => {
            if(response.data.result){
                dispatch(userRoleListAction(response.data.result,""));
            }else{
                dispatch(userRoleListAction(null,"No Role"));
            }         
        })
    }
}

export const getuserDetail = (id) => {
    return dispatch => {        
        axios.get('SuperAdmin/getmembersbyId?id='+id)
        .then((response) => {
            if(response.data.result){
                dispatch(userDetail(response.data.result,""));
            }else{
                dispatch(userDetail(null,"Invalide user Detail"));
            }         
        })
    }
}

export const addEditUser = (formData) => {
    return dispatch => {
        dispatch(userAddEditStart());
        axios.post("SuperAdmin/addupdatemember",formData)
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
            dispatch(userAddEditFail(error.response.data.message))
        })
    }   
}

export const addEditErrorNull = () => {
    return dispatch => {
        dispatch(userAddEditFail(null))
    }   
}


export const userListFilter = (text,role) => {
    return dispatch => {
        dispatch(userFilterList(text,role))
    }   
}

