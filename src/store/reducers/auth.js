import * as actionTypes from '../actions/actionTypes'
import { updateObject } from '../Utility'

const initialState = {   
    token:null,
    userData : null,
    loading:false,
    error : null,
    isAuthRedirectPath : "/"
}


const authFail = (state,action) => {
    return updateObject(state, { error : action.error , loading : false })
}

const authStart = (state,action) => {
    return updateObject(state , { error : null , loading : true })
}

const authSucess = (state,action) => {
    return updateObject(state , { 
                                    error : null,
                                    loading : false,
                                    token : action.token,
                                    userData : action.data
                                })
}

const authLogout = (state,action) => {
    return updateObject(state , { token : null , loading : false , payload:null ,userData:null })
}

const reducer = (state = initialState , action) => {
    switch(action.type){
        case actionTypes.AUTH_START : return authStart(state,action)
        case actionTypes.AUTH_FAIL : return authFail(state,action)
        case actionTypes.AUTH_SUCCESS : return authSucess(state,action)
        case actionTypes.AUTH_LOGOUT : return authLogout(state,action)
        default : return state
    }
}

export default reducer

