import * as actionTypes from '../actions/actionTypes'
import { updateObject } from '../Utility'

const intialState = {
    loading : false,
    error : null,
    data : [],
    message : null,
    page : null,
    faqDetail : null,
    faqDetailError :null,
    addEditError:null,
    addEditSuccess:null,
    addEditLoading:false,
    redirectTo:null,
}

const faqListStart = (state,action) => {
    return updateObject(state,{ loading : true , error : null , message : null })
}

const faqListFail = (state, action) => {
    return updateObject(state,{ loading:false , error : action.error , data: [] , message : null })
}

const faqListing = (state, action) => {
    return updateObject(state,{ 
                                loading:false , 
                                error : null , 
                                data: action.page === 1 ? action.data : [ ...state.data , ...action.data ] , 
                                message : action.message,
                                page: action.page,
                                faqDetail : null,
                                redirectTo:null
                            })
}
const faqDetail = (state, action) => {
    return updateObject(state,{ faqDetail:action.data , faqDetailError : action.error })
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


const reducer = (state = intialState ,action) => {
    switch(action.type){
        case actionTypes.FAQ_LIST_START: return faqListStart(state,action) 
        case actionTypes.FAQ_LIST_FAIL: return faqListFail(state,action) 
        case actionTypes.FAQ_LIST_SUCCESS: return faqListing(state,action) 
        case actionTypes.FAQ_DETAIL: return faqDetail(state,action) 
        case actionTypes.FAQ_ADD_EDIT_SUCCESS: return addEditSuccess(state,action) 
        case actionTypes.FAQ_ADD_EDIT_FAIL: return addEditFail(state,action) 
        case actionTypes.FAQ_ADD_EDIT_START: return addEditStart(state,action)
        default : return state 
    }
}

export default reducer