import * as actionTypes from '../actions/actionTypes'
import { updateObject } from '../Utility'

export const intialState = {
    error : null,
    message : null,
    addEditError:null,
    addEditSuccess:null,
    addEditLoading:false,
    roleDetailLoading:false,
    roleDetailError:null,
    roleDetailDatail:null,
    defaultRolePermisionData:{
        digitalLibraryId: [],
        fundingIds: [],
        eventIds: [],
        // replaysIds: [],
        groupIds: [],
    }
}

const roleDetailStart = (state, action) => {
    return updateObject(state,{ roleDetailLoading:true , roleDetailDatail:null })
}

const roleDetailFail = (state, action) => {
    return updateObject(state,{ roleDetailError:action.error, roleDetailDatail:intialState.defaultRolePermisionData , roleDetailLoading:false  })
}

const roleDetailSuccess = (state, action) => {
    let result = action.data;
    let detail;
    if(result !== null){
        detail = {
            digitalLibraryId: result.digitalLibraryId.split(","),
            fundingIds: result.fundingIds.split(","),
            eventIds: result.eventIds.split(","),
            // replaysIds: result.replaysIds.split(","),
            groupIds: result.groupIds.split(","),
        };
    }else{
        detail = intialState.defaultRolePermisionData
    }
    
    return updateObject(state,{ roleDetailError:null,roleDetailDatail:detail, roleDetailLoading:false })
}

const addEditSuccess = (state, action) => {
    return updateObject(state,{ addEditSuccess:action.message, addEditLoading:false })
}

const addEditSuccessMessage = (state, action) => {
    return updateObject(state,{ addEditSuccess:action.message, addEditLoading:false })
}


const addEditFail = (state, action) => {
    return updateObject(state,{ addEditError:action.error, addEditLoading:false  })
}

const addEditStart = (state, action) => {
    return updateObject(state,{ addEditError:null,addEditSuccess:null, addEditLoading:true })
}


const reducer = (state = intialState ,action) => {
    switch(action.type){
        case actionTypes.ROLE_ADD_EDIT_SUCCESS: return addEditSuccess(state,action) 
        case actionTypes.ROLE_ADD_EDIT_FAIL: return addEditFail(state,action) 
        case actionTypes.ROLE_ADD_EDIT_START: return addEditStart(state,action)
        case actionTypes.ROLE_DETAIL_START: return roleDetailStart(state,action)
        case actionTypes.ROLE_DETAIL_FAIL: return roleDetailFail(state,action)
        case actionTypes.ROLE_DETAIL: return roleDetailSuccess(state,action)
        case actionTypes.ROLE_ADD_EDIT_SUCCESS_MESSAGE: return addEditSuccessMessage(state,action)
        default : return state 
    }
}

export default reducer
