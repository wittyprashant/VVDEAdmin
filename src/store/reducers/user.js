import * as actionTypes from '../actions/actionTypes'
import { updateObject } from '../Utility'

export const intialState = {
    loading: false,
    error: null,
    data: [],
    filterData: [],
    message: null,
    page: null,
    userDetail: null,
    userDetailError: null,
    addEditError: null,
    addEditSuccess: null,
    addEditLoading: false,
    redirectTo: null,
    userList: [],
}

const userListStart = (state, action) => {
    return updateObject(state, { loading: true, error: null, message: null, redirectTo: null })
}

const userListFail = (state, action) => {
    return updateObject(state, { loading: false, error: action.error, data: [], message: null, redirectTo: null })
}

const userDetail = (state, action) => {
    return updateObject(state, { userDetail: action.data, userDetailError: action.error, redirectTo: action.redirectTo })
}

const userListing = (state, action) => {
    return updateObject(state, {
        loading: false,
        error: null,
        data: action.page === 1 ? action.data : [...state.data, ...action.data],
        filterData: action.page === 1 ? action.data : [...state.data, ...action.data],
        message: action.message,
        page: action.page,
        userDetailError: null,
        userDetail: null,
        redirectTo: null
    })
}


const addEditSuccess = (state, action) => {
    return updateObject(state, { addEditSuccess: action.message, redirectTo: action.redirectTo, addEditLoading: false })
}

const addEditFail = (state, action) => {
    return updateObject(state, { addEditError: action.error, addEditLoading: false })
}

const addEditStart = (state, action) => {
    return updateObject(state, { addEditError: null, addEditSuccess: null, addEditLoading: true })
}

const userList = (state, action) => {
    return updateObject(state, { UserList: action.data })
}

const filterList = (state, action) => {
    let filterText = action.text;
    let userData = state.filterData;
    let filteredItems = userData.filter(
        (item) => {
            if (item.title && item.title.toLowerCase().includes(filterText.toLowerCase())) {
                return true;
            }
            return false;
        }
    );
    return updateObject(state, { data: filteredItems })
}

const reducer = (state = intialState, action) => {
    switch (action.type) {
        case actionTypes.USER_LIST_START: return userListStart(state, action)
        case actionTypes.USER_LIST_FAIL: return userListFail(state, action)
        case actionTypes.USER_LIST_SUCCESS: return userListing(state, action)
        case actionTypes.USER_DETAIL: return userDetail(state, action)
        case actionTypes.USER_ADD_EDIT_SUCCESS: return addEditSuccess(state, action)
        case actionTypes.USER_ADD_EDIT_FAIL: return addEditFail(state, action)
        case actionTypes.USER_ADD_EDIT_START: return addEditStart(state, action)
        case actionTypes.USER_LIST: return userList(state, action)
        case actionTypes.USER_LIST_FILTER: return filterList(state, action)
        default: return state
    }
}

export default reducer
