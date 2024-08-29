import * as actionTypes from '../actions/actionTypes'
import { updateObject } from '../Utility'

export const intialState = {
    loading : false,
    error : null,
    data : [],
    filterData : [],
    message : null,
    page : null,
    groupDetail : null,
    groupDetailError :null,
    addEditError:null,
    addEditSuccess:null,
    addEditLoading:false,
    redirectTo:null,
    groupCategoryList:[],
}

const groupListStart = (state,action) => {
    return updateObject(state,{ loading : true , error : null , message : null,redirectTo:null })
}

const groupListFail = (state, action) => {
    return updateObject(state,{ loading:false , error : action.error , data: [] , message : null,redirectTo:null })
}

const groupDetail = (state, action) => {
    return updateObject(state,{ groupDetail:action.data , groupDetailError : action.error })
}

const groupListing = (state, action) => {
    return updateObject(state,{ 
                                loading:false , 
                                error : null , 
                                data: action.page === 1 ? action.data : [ ...state.data , ...action.data ] , 
                                filterData: action.page === 1 ? action.data : [ ...state.data , ...action.data ] , 
                                message : action.message,
                                page: action.page,
                            })
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
    let fundData = state.filterData;
    let filteredItems = fundData.filter(
        (item) => {
            if (item.groupName && item.groupName.toLowerCase().includes(filterText.toLowerCase())) {
                return true;
            }
            return false;
        }
    );
    return updateObject(state, { data: filteredItems })
}

const reducer = (state = intialState ,action) => {
    switch(action.type){
        case actionTypes.GROUP_LIST_START: return groupListStart(state,action) 
        case actionTypes.GROUP_LIST_FAIL: return groupListFail(state,action) 
        case actionTypes.GROUP_LIST_SUCCESS: return groupListing(state,action) 
        case actionTypes.GROUP_DETAIL: return groupDetail(state,action) 
        case actionTypes.GROUP_ADD_EDIT_SUCCESS: return addEditSuccess(state,action) 
        case actionTypes.GROUP_ADD_EDIT_FAIL: return addEditFail(state,action) 
        case actionTypes.GROUP_ADD_EDIT_START: return addEditStart(state,action)
        case actionTypes.GROUP_LIST_FILTER: return filterList(state,action)
        default : return state 
    }
}

export default reducer
