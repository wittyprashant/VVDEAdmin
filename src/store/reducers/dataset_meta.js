import * as actionTypes from '../actions/actionTypes'
import { updateObject } from '../Utility'

export const intialState = {
    loading : false,
    error : null,
    data : [],
    filterData : [],
    message : null,
    page : null,
    dataset_metaDetail : null,
    dataset_metaDetailError :null,
    addEditError:null,
    addEditSuccess:null,
    addEditLoading:false,
    redirectTo:null,
}

const dataset_metaListStart = (state,action) => {
    return updateObject(state,{ loading : true , error : null , message : null,redirectTo:null })
}

const dataset_metaListFail = (state, action) => {
    return updateObject(state,{ loading:false , error : action.error , data: [] , message : null,redirectTo:null })
}

const dataset_metaDetail = (state, action) => {
    return updateObject(state,{ dataset_metaDetail:action.data , dataset_metaDetailError : action.error })
}

const dataset_metaListing = (state, action) => {
    return updateObject(state,{ 
                                loading:false , 
                                error : null , 
                                data: action.page === 1 ? action.data : [ ...state.data , ...action.data ] , 
                                filterData: action.page === 1 ? action.data : [ ...state.data , ...action.data ] , 
                                message : action.message,
                                page: action.page,
                                dataset_metaDetail : null,
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
            if (item.title && item.title.toLowerCase().includes(filterText.toLowerCase())) {
                return true;
            }
            return false;
        }
    );
    return updateObject(state, { data: filteredItems })
}


const reducer = (state = intialState ,action) => {
    switch(action.type){
        case actionTypes.DATASET_META_LIST_START: return dataset_metaListStart(state,action) 
        case actionTypes.DATASET_META_LIST_FAIL: return dataset_metaListFail(state,action) 
        case actionTypes.DATASET_META_LIST_SUCCESS: return dataset_metaListing(state,action) 
        case actionTypes.DATASET_META_DETAIL: return dataset_metaDetail(state,action) 
        case actionTypes.DATASET_META_ADD_EDIT_SUCCESS: return addEditSuccess(state,action) 
        case actionTypes.DATASET_META_ADD_EDIT_FAIL: return addEditFail(state,action) 
        case actionTypes.DATASET_META_ADD_EDIT_START: return addEditStart(state,action)
        case actionTypes.DATASET_META_LIST_FILTER: return filterList(state,action)
        default : return state 
    }
}

export default reducer
