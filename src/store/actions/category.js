import * as actions from "./actionTypes";
import axios from '../../axios_call'
import Moment from 'moment';

const categoryListStart = () => {
    return {
        type : actions.CATEGORY_LIST_START
    }
}

const categoryListFail = (error) => {
    return {
        type : actions.CATEGORY_LIST_FAIL,
        error : error
    }   
}

const categoryListSuccess = (message,data,page) => {
    return {
        type : actions.CATEGORY_LIST_SUCCESS,
        message : message,
        data : data,
        page : page
    }
}

const categoryDeleteAction = (id) => {
    return {
        type : actions.CATEGORY_DELETE,
        id : id,
    }
}

const categoryAddEditStart = () => {
    return {
        type : actions.CATEGORY_ADD_EDIT_START
    }
}

const categoryAddEditFail = (error) => {
    return {
        type : actions.CATEGORY_ADD_EDIT_FAIL,
        error : error,
        redirectTo:null
    }   
}

const categoryAddEditSuccess = (message,data) => {
    return {
        type : actions.CATEGORY_ADD_EDIT_SUCCESS,
        message : message,
        data : data,
        redirectTo:"/category"
    }
}

const categoryDetail = (data,error,redirectTo) => {
    return {
        type : actions.CATEGORY_DETAIL,
        data : data,
        error : error,
        redirectTo: redirectTo
    }
}

export const categoryList = (param) => {
    return dispatch => {        
        dispatch(categoryListStart());
        axios.get('SuperAdmin/geallfundingdetails?ordering='+param.order)
        .then((response) => {
            if(response.data.status){
                const data = response.data.result
                const msg = response.data.message 
                dispatch(categoryListSuccess(msg,[{}],param.page));
            }else{
                dispatch(categoryListFail(response.data.message))
            }            
        })
        .catch((error) => {
            dispatch(categoryListFail(error.message))
        })
    }
}



export const categoryDelete = (id) => {
    return dispatch => {        
        axios.delete('SuperAdmin/deletefunding?fundingid='+id)
        .then((response) => {
            if(response.data.status){
                dispatch(categoryDeleteAction(id));
            }           
        })
    }
}

export const getcategoryDetail = (id) => {
    return dispatch => {        
        axios.get('SuperAdmin/geallfundingdetailsById?id='+id)
        .then((response) => {
            if(response.data.result){
                try{
                    let dt=Moment(response.data.result.dueDate)._d
                    if(dt === "Invalid Date"){
                        response.data.result.dueDate=new Date();
                        // console.log("Try",response.data.result)
                    }
                }catch(e){
                    response.data.result.dueDate=new Date();
                    // console.log("Catch",response.data.result.dueDate)
                }
                dispatch(categoryDetail(response.data.result,"",null));
            }else{
                dispatch(categoryDetail(null,"Invalide FUND Detail","/category"));
            }         
        })
    }
}

// const categoryList = (data,error) => {
//     return {
//         type : actions.FUND_CATEGORY_LIST,
//         data : data,
//         error : error,
//     }
// }


const categoryfilterList = (text) => {
    return {
        type : actions.CATEGORY_LIST_FILTER,
        text : text,
    }
}


export const categoryAddEdit = (param) => {
    return dispatch => {        
        dispatch(categoryAddEditStart());
        axios.post('SuperAdmin/addupdatefunding',param)
        .then((response) => {
            if(response.data.status){
                const data = response.data.result
                const msg = response.data.message 
                dispatch(categoryAddEditSuccess(msg,data));
            }else{
                dispatch(categoryAddEditFail(response.data.message))
            }            
        })
        .catch((error) => {
            dispatch(categoryAddEditFail(error.message))
        })
    }
}

export const getCategoryList = () => {
    return dispatch => {        
        axios.get('FundingResources/gefundingcategory')
        .then((response) => {
            if(response.data.result){
                dispatch(categoryList(response.data.result,""));
            }else{
                dispatch(categoryList(null,"No Category"));
            }         
        })
    }
}

export const categoryListFilter = (filterText) => {
    return dispatch => {        
        dispatch(categoryfilterList(filterText));
    }
}