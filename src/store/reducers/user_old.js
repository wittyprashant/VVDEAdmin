import * as actionTypes from '../actions/actionTypes'
import { updateObject } from '../Utility'

const intialState = {
    loading : false,
    error : null,
    data : [],
    filterData : [],
    message : null,
    page : null,
    userDetail : null,
    userDetailError :null,
    addEditError:null,
    addEditSuccess:null,
    addEditLoading:false,
    redirectTo:null,
    planList:[],
    roleList:[],
}

const userListStart = (state,action) => {
    return updateObject(state,{ loading : true , error : null , message : null })
}

const userListFail = (state, action) => {
    return updateObject(state,{ loading:false , error : action.error , data: [] , message : null })
}

const userListing = (state, action) => {
    return updateObject(state,{ 
                                loading:false , 
                                error : null , 
                                data: action.page === 1 ? action.data : [ ...state.data , ...action.data ] , 
                                filterData: action.page === 1 ? action.data : [ ...state.data , ...action.data ] , 
                                message : action.message,
                                page: action.page,
                                redirectTo:null,
                                userDetail:null
                            })
}

const planList = (state, action) => {
    return updateObject(state,{ planList:action.data })
}

const roleList = (state, action) => {
    return updateObject(state,{ roleList:action.data })
}

const userDetail = (state, action) => {
    return updateObject(state,{ userDetail:action.data , userDetailError : action.error })
}

const addEditSuccess = (state, action) => {
    return updateObject(state,{ addEditSuccess:action.message,redirectTo:action.redirectTo, addEditLoading:false })
}

const addEditFail = (state, action) => {
    return updateObject(state,{ addEditError:action.error, addEditLoading:false  })
}

const addEditStart = (state, action) => {
    return updateObject(state,{ addEditError:null,addEditSuccess:null, addEditLoading:true })
}


const filterList = (state, action) => {
    let filterText = action.text;
    let role = action.role;
    let fundData = state.filterData;
    let filteredItems = fundData.filter(
        (item) => {
            if (((item.firstName && item.firstName.toLowerCase().includes(filterText.toLowerCase())) || 
                (item.email && item.email.toLowerCase().includes(filterText.toLowerCase()))||
                (item.lastName && item.lastName.toLowerCase().includes(filterText.toLowerCase()))) &&
                ((item.roleName && item.roleName.toLowerCase() === role.toLowerCase()) || role === "") ) {
                return true;
            }
            return false;
        }
    );
    return updateObject(state, { data: filteredItems })
}


const reducer = (state = intialState ,action) => {
    switch(action.type){
        case actionTypes.USER_LIST_START: return userListStart(state,action) 
        case actionTypes.USER_LIST_FAIL: return userListFail(state,action) 
        case actionTypes.USER_LIST_SUCCESS: return userListing(state,action) 
        case actionTypes.USER_DETAIL: return userDetail(state,action) 
        case actionTypes.USER_PLAN_LIST: return planList(state,action) 
        case actionTypes.USER_ROLE_LIST: return roleList(state,action) 
        case actionTypes.USER_ADD_EDIT_SUCCESS: return addEditSuccess(state,action) 
        case actionTypes.USER_ADD_EDIT_FAIL: return addEditFail(state,action) 
        case actionTypes.USER_ADD_EDIT_START: return addEditStart(state,action)
        case actionTypes.USER_LIST_FILTER: return filterList(state,action)
        default : return state 
    }
}

export default reducer