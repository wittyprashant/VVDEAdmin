// import * as actions from "./actionTypes";
// import axios from '../../axios_call'
// import Moment from 'moment';


// export const authStart = () => {
//     return {
//         type : actions.AUTH_START
//     }
// }

// export const authFail = (error) => {
//     return {
//         type : actions.AUTH_FAIL,
//         error : error
//     }   
// }

// export const authSuccess = (token) => {
//     return {
//         type : actions.AUTH_SUCCESS,
//         token : token
//     }
// }

// export const authLogout = () => {
//     localStorage.clear();
//     return {
//         type : actions.AUTH_LOGOUT
//     }
// }

// export const checkAuthTimeout = (expiresIn) => {
//     return dispatch => {
//         setTimeout( async function() {
//             dispatch(authLogout()); 
//         },expiresIn)
//     }
// }


// export const userLogin = (email,password) => {
//     return dispatch => {        
//         dispatch(authStart());
//         axios.post('Authentication/login', {username : email,password : password})
//         .then((response) => {
//             if(response.data.status){
//                 localStorage.setItem("userDetail", JSON.stringify(response.data.result) )
//                 var now = Moment(new Date()); //todays date
//                 var end = Moment(response.data.result.tokenExpiration); // another date
//                 var duration = Moment.duration(end.diff(now));
//                 var remainingSeconds = duration.asSeconds();
//                 dispatch(checkAuthTimeout(remainingSeconds* 1000))
//                 dispatch(authSuccess(response.data.result.token));
//             }else{
//                 dispatch(authLogout())
//                 dispatch(authFail(response.data.message))
//             }            
//         })
//         .catch((error) => {
//             dispatch(authFail(error.message))
//         })
//     }
// }

// export const userRegister = (email,password) => {
//     return dispatch => {        
//         dispatch(authStart());
//         axios.post('Authentication/Register', {username : email,password : password})
//         .then((response) => {
//             if(response.data.status){
//                 localStorage.setItem("userDetail", JSON.stringify(response.data.result) )
//                 var now = Moment(new Date()); //todays date
//                 var end = Moment(response.data.result.tokenExpiration); // another date
//                 var duration = Moment.duration(end.diff(now));
//                 var remainingSeconds = duration.asSeconds();
//                 dispatch(checkAuthTimeout(remainingSeconds* 1000))
//                 dispatch(authSuccess(response.data.result.token));
//             }else{
//                 dispatch(authLogout())
//                 dispatch(authFail(response.data.message))
//             }            
//         })
//         .catch((error) => {
//             dispatch(authFail(error.message))
//         })
//     }
// }

// export const authCheckState = () => {
//     return dispatch => {
//         dispatch(authStart());           
//     }
// }

import * as actions from "./actionTypes";
import axios from '../../axios_call'
import Moment from 'moment';

export const authStart = () => {
    return {
        type : actions.AUTH_START
    }
}

export const authFail = (error) => {
    return {
        type : actions.AUTH_FAIL,
        error : error
    }   
}

export const authSuccess = (token) => {
    return {
        type : actions.AUTH_SUCCESS,
        token : token
    }
}

export const authLogout = () => {
    localStorage.clear();
    return {
        type : actions.AUTH_LOGOUT
    }
}

export const checkAuthTimeout = (expiresIn) => {
    return dispatch => {
        setTimeout( async function() {
            dispatch(authLogout()); 
        },expiresIn)
    }
}

export const userLogin = (email,password) => {
    return dispatch => {        
        dispatch(authStart());
        // axios.post('Authentication/login', {username : email,password : password})
        axios.post('/login', {email : email,password : password})
        .then((response) => {
            if(response.status === 200){
                localStorage.setItem("userDetail", JSON.stringify(response.data.result) )
                dispatch(authSuccess(response.result.token));
            } else {
                dispatch(authLogout())
                dispatch(authFail(response.message))
            }         
        })
        .catch((error) => {
            dispatch(authFail(error.message))
        })
    }
}

export const userRegister = (role, name, email, password, confirm_password) => {
    return dispatch => {        
        dispatch(authStart());
        axios.post('/user/register', {role:role, name:name, email:email, password:password, confirm_password:confirm_password})
        .then((response) => {
            if(response.status === 200) {
                // dispatch(authSuccess(response.data.result.token));
                localStorage.setItem("userDetail", JSON.stringify(response.data.result) )
                // localStorage.setItem("userDetail", JSON.stringify(response.data.result) )
                dispatch(authSuccess(response.result.token));
            } else {
                console.log(
                    'role: ' + role, 
                    'name:' + name, 
                    'email:' + email, 
                    'password:' + password, 
                    'confirm_password:' + confirm_password);
                dispatch(authLogout())
                dispatch(authFail(response.message))
            }            
        })
        .catch((error) => {
            dispatch(authFail(error.message))
        })
    }
}

export const userContributorRegister = (
        role, 
        name, 
        email, 
        password,
        confirm_password,
        category_id,
        affiliation,
        corresponding_author,
        publication_reviewed,
        publication_title,
        publication_weblink
    ) => {
    return dispatch => {        
        dispatch(authStart());
        axios.post('/contributor/register', {
            role:role, 
            name:name, 
            email:email, 
            password:password, 
            confirm_password:confirm_password,
            category_id:category_id,
            affiliation:affiliation,
            corresponding_author:corresponding_author,
            publication_reviewed:publication_reviewed,
            publication_title:publication_title,
            publication_weblink:publication_weblink
        })
        .then((response) => {
            if(response.status === 200) {
                // dispatch(authSuccess(response.data.result.token));
                localStorage.setItem("userDetail", JSON.stringify(response.data.result) )
                // localStorage.setItem("userDetail", JSON.stringify(response.data.result) )
                dispatch(authSuccess(response.result.token));
            } else {
                console.log(
                    'role: ' + role, 
                    'name:' + name, 
                    'email:' + email, 
                    'password:' + password, 
                    'confirm_password:' + confirm_password);
                dispatch(authLogout())
                dispatch(authFail(response.message))
            }            
        })
        .catch((error) => {
            dispatch(authFail(error.message))
        })
    }
}

export const datasetmetaFormData = (
    material_id,
    material_name,
    material_image,
    category_id,
    category_name,
    data_type_id,
    data_reliability_id,
    process_review_id,
    start_date,
    end_date,
    data_source_id,
    // data_source_name,
    dataset_category_id,
    form_input_data,
    formData,

) => {
    return dispatch => {        
        axios.post('/add/dataset_meta', {
            material_id:parseInt((( material_id == "") ? 0 : material_id)),
            material_name:material_name,
            material_image:material_image,
            category_id:parseInt((( category_id == "") ? 0 : category_id)),
            category_name:category_name,
            data_type_id:parseInt((( data_type_id == "") ? 0 : data_type_id)),
            data_reliability_id:data_reliability_id,
            process_review_id:parseInt((( process_review_id == "" ) ? 0 : process_review_id)),
            start_date:start_date,
            end_date:end_date,
            data_source_id:data_source_id,
            // data_source_name:data_source_name,
            dataset_category_id:parseInt((( dataset_category_id == "" ) ? 0 : dataset_category_id)),
            form_input_data:form_input_data,
            formData:formData,
        })
        .then((response) => {
            if(response.status === 200) {
                console.log('Success');
                return false;
                // dispatch(authSuccess(response.data.result.token));
                // localStorage.setItem("userDetail", JSON.stringify(response.data.result) )
                // localStorage.setItem("userDetail", JSON.stringify(response.data.result) )
                // dispatch(authSuccess(response.result.token));
            } else {
                console.log('Error');
                return false;
            }            
        })
        .catch((error) => {
            console.log('Tets');
            return false;
            dispatch(authFail(error.message))
        })
    }
}

export const authCheckState = () => {
    return dispatch => {
        dispatch(authStart());           
    }
}