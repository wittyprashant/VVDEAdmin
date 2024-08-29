import * as actionTypes from '../actions/actionTypes'
import { updateObject } from '../Utility'

export const intialState = {
    loading: false,
    error: null,
    data: [],
    filterData: [],
    message: null,
    page: null,
    categoryDetail: null,
    categoryDetailError: null,
    addEditError: null,
    addEditSuccess: null,
    addEditLoading: false,
    redirectTo: null,
    categoryCategoryList: [],
}

const categoryListStart = (state, action) => {
    return updateObject(state, { loading: true, error: null, message: null, redirectTo: null })
}

const categoryListFail = (state, action) => {
    return updateObject(state, { loading: false, error: action.error, data: [], message: null, redirectTo: null })
}

const categoryDetail = (state, action) => {
    return updateObject(state, { categoryDetail: action.data, categoryDetailError: action.error, redirectTo: action.redirectTo })
}

const categoryListing = (state, action) => {
    return updateObject(state, {
        loading: false,
        error: null,
        data: action.page === 1 ? action.data : [...state.data, ...action.data],
        filterData: action.page === 1 ? action.data : [...state.data, ...action.data],
        message: action.message,
        page: action.page,
        categoryDetailError: null,
        categoryDetail: null,
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

const categoryList = (state, action) => {
    return updateObject(state, { CategoryList: action.data })
}

const filterList = (state, action) => {
    let filterText = action.text;
    let categoryData = state.filterData;
    let filteredItems = categoryData.filter(
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
        case actionTypes.CATEGORY_LIST_START: return categoryListStart(state, action)
        case actionTypes.CATEGORY_LIST_FAIL: return categoryListFail(state, action)
        case actionTypes.CATEGORY_LIST_SUCCESS: return categoryListing(state, action)
        case actionTypes.CATEGORY_DETAIL: return categoryDetail(state, action)
        case actionTypes.CATEGORY_ADD_EDIT_SUCCESS: return addEditSuccess(state, action)
        case actionTypes.CATEGORY_ADD_EDIT_FAIL: return addEditFail(state, action)
        case actionTypes.CATEGORY_ADD_EDIT_START: return addEditStart(state, action)
        case actionTypes.CATEGORY_CATEGORY_LIST: return categoryList(state, action)
        case actionTypes.CATEGORY_LIST_FILTER: return filterList(state, action)
        default: return state
    }
}

export default reducer
