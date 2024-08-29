import * as actions from "./actionTypes";
import axios from '../../axios_call'


const dataset_metaListStart = () => {
    return {
        type : actions.DATASET_META_LIST_START
    }
}

const dataset_metaListFail = (error) => {
    return {
        type : actions.DATASET_META_LIST_FAIL,
        error : error
    }   
}

const dataset_metaListSuccess = (message,data,page) => {
    return {
        type : actions.DATASET_META_LIST_SUCCESS,
        message : message,
        data : data,
        page : page
    }
}

const dataset_metaDeleteAction = (id) => {
    return {
        type : actions.DATASET_META_DELETE,
        id : id,
    }
}

const dataset_metaAddEditStart = () => {
    return {
        type : actions.DATASET_META_ADD_EDIT_START
    }
}

const dataset_metaAddEditFail = (error) => {
    return {
        type : actions.DATASET_META_ADD_EDIT_FAIL,
        error : error,
        redirectTo:null
    }   
}

const dataset_metaAddEditSuccess = (message,data) => {
    return {
        type : actions.DATASET_META_ADD_EDIT_SUCCESS,
        message : message,
        data : data,
        redirectTo:"/dataset_meta"
    }
}

const dataset_metaDetail = (data,error) => {
    return {
        type : actions.DATASET_META_DETAIL,
        data : data,
        error : error,
    }
}

const dataset_metafilterList = (text) => {
    return {
        type : actions.DATASET_META_LIST_FILTER,
        text : text
    }
}

export const dataset_metaList = (param,token) => {
    return dispatch => {        
        dispatch(dataset_metaListStart());
        axios.get('SuperAdmin/getreplayslist')
        .then((response) => {
            if(response.data.status){
                const data = response.data.result
                const msg = response.data.message 
                dispatch(dataset_metaListSuccess(msg,[{},{}],param.page));
            }else{
                dispatch(dataset_metaListFail(response.data.message))
            }            
        })
        .catch((error) => {
            dispatch(dataset_metaListFail(error.message))
        })
    }
}

export const dataset_metaDelete = (id,token) => {
    return dispatch => {        
        axios.delete('SuperAdmin/deletereplaysbyid?replaysId='+id)
        .then((response) => {
            if(response.data.status){
                dispatch(dataset_metaDeleteAction(id));
            }           
        })
    }
}

export const getdataset_metaDetail = (id) => {
    return dispatch => {        
        axios.get('SuperAdmin/getreplaysbyid?replaysId='+id)
        .then((response) => {
            if(response.data.result){
                dispatch(dataset_metaDetail(response.data.result,""));
            }else{
                dispatch(dataset_metaDetail(null,"Invalide dataset meta Detail"));
            }         
        })
    }
}

export const dataset_metaAddEdit = (param,token) => {
    return dispatch => {        
        dispatch(dataset_metaAddEditStart());
        axios.post('SuperAdmin/addupdatereplays',param)
        .then((response) => {
            if(response.data.status){
                const data = response.data.result
                const msg = response.data.message 
                dispatch(dataset_metaAddEditSuccess(msg,data));
            }else{
                dispatch(dataset_metaAddEditFail(response.data.message))
            }            
        })
        .catch((error) => {
            dispatch(dataset_metaAddEditFail(error.message))
        })
    }
}

export const dataset_metaListFilter = (filterText) => {
    return dispatch => {        
        dispatch(dataset_metafilterList(filterText));
    }
}