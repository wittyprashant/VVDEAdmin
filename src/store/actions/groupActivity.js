import * as actions from "./actionTypes";
import axios from '../../axios_call'


const groupActivityStart = () => {
    return {
        type : actions.GROUP_LIST_START
    }
}

const groupActivityFail = (error) => {
    return {
        type : actions.GROUP_LIST_FAIL,
        error : error
    }   
}

const groupActivitySuccess = (message,data,page) => {
    return {
        type : actions.GROUP_LIST_SUCCESS,
        message : message,
        data : data,
        page : page
    }
}

const groupActivityDeleteAction = (id) => {
    return {
        type : actions.GROUP_DELETE,
        id : id,
    }
}

const groupActivityAddEditStart = () => {
    return {
        type : actions.GROUP_ADD_EDIT_START
    }
}

export const groupActivityAddEditFail = (error) => {
    return {
        type : actions.GROUP_ADD_EDIT_FAIL,
        error : error,
        redirectTo:null
    }   
}

export const groupActivityAddEditSuccess = (message,data,link) => {
    return {
        type : actions.GROUP_ADD_EDIT_SUCCESS,
        message : message,
        data : data,
        redirectTo:link
    }
}

const groupActivityDetail = (data,error) => {
    return {
        type : actions.GROUP_DETAIL,
        data : data,
        error : error,
    }
}

export const groupActivity = (param,token) => {
    return dispatch => {        
        dispatch(groupActivityStart());
        axios.get('GroupActivityChalange/activitytasklist?ordering='+param.order+'&page='+param.page+"&groupId="+param.groupId)
        .then((response) => {
            if(response.data.status){
                const data = response.data.result
                const msg = response.data.message 
                dispatch(groupActivitySuccess(msg,data,param.page));
            }else{
                dispatch(groupActivityFail(response.data.message))
            }            
        })
        .catch((error) => {
            dispatch(groupActivityFail(error.message))
        })
    }
}

export const groupActivityDelete = (id,token) => {
    return dispatch => {        
        axios.get('GroupActivityChalange/deletegroup?groupid='+id)
        .then((response) => {
            if(response.data.status){
                dispatch(groupActivityDeleteAction(id));
            }           
        })
    }
}

export const getgroupActivityDetail = (id,token) => {
    return dispatch => {        
        axios.get('GroupActivityChalange/getgroupdetailsbyid?groupid='+id)
        .then((response) => {
            if(response.data.result){
                dispatch(groupActivityDetail(response.data.result,""));
            }else{
                dispatch(groupActivityDetail(null,"Invalide group Detail"));
            }         
        })
    }
}

export const groupActivityAddEdit = (param,headers,link) => {
    return dispatch => {        
        dispatch(groupActivityAddEditStart());
        axios.post('SuperAdmin/addupdategroupactivitytask',
            param,
            headers
        )
        .then((response) => {
            if(response.data.status){
                console.log("Success")
                const data = response.data.result
                const msg = response.data.message 
                dispatch(groupActivityAddEditSuccess(msg,data,link));
            }else{
                console.log("Fail X")
                dispatch(groupActivityAddEditFail(response.data.message))
            }            
        })
        .catch((error) => {
            console.log(error)
            dispatch(groupActivityAddEditFail(error.message))
        })
    }
}
export const groupActivitygetById = (Id,headers) => {
    return dispatch => {        
        dispatch(groupActivityAddEditStart());
        axios.get('SuperAdmin/getgroupactivitytaskbyid?Id='+Id,
            headers
        )
        .then((response) => {
            if(response.data.status){
                console.log("Success")
                const data = response.data.result
                // const msg = response.data.message 
                groupActivityDetail(data,"")
                // dispatch(groupActivityAddEditSuccess(msg,data));
            }else{
                console.log("Fail X")
                groupActivityDetail("","Err")
                // dispatch(groupActivityAddEditFail(response.data.message))
            }            
        })
        .catch((error) => {
            console.log(error)
            groupActivityDetail("",error)
            // dispatch(groupActivityAddEditFail(error.message))
        })
    }
}
