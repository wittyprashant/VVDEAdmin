import * as actionTypes from '../actions/actionTypes'
import { updateObject } from '../Utility'

export const intialState = {
    loading : false,
    error : null,
    data : [],
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
const contactListing = (state, action) => {
    return updateObject(state,{ 
                                loading:false , 
                                error : null , 
                                data: action.page === 1 ? action.data : [ ...state.data , ...action.data ] , 
                                message : action.message,
                                page: action.page,
                            })
}

const reducer = (state = intialState ,action) => {
    switch(action.type){
        case actionTypes.CONTACT_LIST_SUCCESS: return contactListSuccess(state,action) 
        default : return state 
    }
}

export default reducer
