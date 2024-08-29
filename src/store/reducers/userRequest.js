import * as actionTypes from '../actions/actionTypes'
import { updateObject } from '../Utility'

const intialState = {
    loading : false,
    error : null,
    data : [],
    filterData : [],
    message : null,
    page : null,
    statusUPdateLoading : false,
    statusUPdateError : null,
    statusUPdateData : null,
    userRequestDetail : null,
}

const QuetionData = {
    "meetDataEntrySoftware" : "Where did you meet DataEntrySoftware?",
    "entrepreneur" : "Are you an entrepreneur?",
    "investor" : "Are you an investor?",
    "cannabisIndustry" : "What sector of the cannabis industry do you currently work in?",
    "needFunding" : "Are you seeking funding for your business?",
    "cannabisLicense" : "Does your business have a cannabis license?",
    "newsletter" : "Would you like to sign up for our newsletter?",
    "donorSponsorDataEntrySoftware" : "Are you interested in being a donor/ sponsor of DataEntrySoftware?",
    "valueGender" : "Gender",
    "bipoc" : "Is the company 51% BIPOC owned?",
    "raceEthnicity" : "Race/Ethnicity",
    "iDentifyRaceEthnicity" : "Please further identify your race/ethnicity [ie. You may have checked Asian but what origin do you associate with: Chinese, Indian, Filipino, Vietnamese, Korean, Japanese, etc]",
    "nativeAffiliation" : "Native Affiliation",
    "preferredLanguage" : "Preferred Language",
    "additionalPersonalIdentification" : "Additional Personal Identification",
    "annualHouseholdIncome" : "Annual Household Income",   
    "familySize" : "Family Size",   
    "businessAddress" : "Business Address",   
    "typesLicense" : "If yes, what type of license do you hold?",   
    "cannabisBusinessYouOwn" : "Type of cannabis business you own",   
    "yearsInBusiness" : "Year company was founded",   
    "cbdthc" : "Cannabis Market [CBD vs THC]",   
    "revenueYear1" : "Business Total Revenue (Year 1)",   
    "revenueYear2" : "Business Total Revenue (Year 2)",   
    "coOwner" : "Is there a co-owner?",   
    "fullTimeEmployees" : "No of Full time employees",   
    "partTimeEmployees" : "No of Part time employees",   
    "interestedConnectingMentor" : "Interested in connecting with mentor(s)?",   
    "mentoringPeers" : "Interested in mentoring peers?",   
    "enrolledOtherServicesAdministered" : "Are you enrolled in any other services administered for cannabis support? If so, which program(s)?",   
    "aboutYourBrand" : "Please tell us more about your brand.",   
    "meetNuTeam" : "If you are interested in meeting with a DataEntrySoftware team member, please share times you have available in the upcoming weeks and an email to best contact you.",   
    "otherRemarks" : "Anything additional you may need to add or share please leave here.",  "historicallyDisadvantaged" : "My business is 51% or greater historically disadvantaged owned (minority, women or veteran) OR my business is considered a “small business.” or businesses identifying as historically disadvantaged please mark all that apply:",  
    "signupAsA" : "Sign up as a",  
    "knowledgeBuddingEntrepreneurs" : "If an expert, what area of the industry can you share knowledge about to budding entrepreneurs? ",  
    "considerYourselfExpert" : "Do you consider yourself an expert in the industry",  
    "positionAtCompany" : "Your Name/ Title and Position at the company",  
    "groupSelection" : "Groups selection",    
}

const userRequestListStart = (state,action) => {
    return updateObject(state,{ loading : true , error : null , message : null })
} 

const userRequestListFail = (state, action) => {
    return updateObject(state,{ loading:false , error : action.error , data: [] , message : null })
}

const userRequestListing = (state, action) => {
    let userRequestData = action.data;
    let newData = userRequestData.map(function (name) {
        if(name.roleReqId === 0){
            name["status_data"] = "New Registration";
        }else{
            name["status_data"] = "Role Upgrade";
        }
        return name;
    });

    return updateObject(state,{ 
                                loading:false , 
                                error : null , 
                                data: action.page === 1 ? newData : [ ...state.data , ...newData ] , 
                                filterData: action.page === 1 ? newData : [ ...state.data , ...newData ] , 
                                message : action.message,
                                page: action.page,
                                redirectTo:null,
                                userRequestDetail:null
                            })
}

const userRequestUpdateStart = (state,action) => {
    return updateObject(state,{ statusUPdateLoading : true , statusUPdateError : null  })
}

const userRequestUpdateFail = (state, action) => {
    return updateObject(state,{ statusUPdateLoading:false , statusUPdateError : action.error , statusUPdateData:null })
}


const userRequestUpdate = (state, action) => {
    return updateObject(state,{ statusUPdateLoading:false , statusUPdateError : null , statusUPdateData:action.data })
}

const userRequestDetail = (state, action) => {
    let result = [];
    let userRequestResponse = action.data;
    Object.keys(userRequestResponse).map(function(key,x) {
        if(typeof QuetionData[key] !== "undefined"){
            result.push({Quetion: QuetionData[key] , Answer : userRequestResponse[key] ?? "-"});
        }
        
        return key;
    });
    return updateObject(state,{ userRequestDetail:result })
}

const filterList = (state, action) => {
    let filterText = action.text;
    let status = action.status;
    let fundData = state.filterData;
    let filteredItems = fundData.filter(
        (item) => {
            if (((item.firstName && item.firstName.toLowerCase().includes(filterText.toLowerCase())) || 
                (item.email && item.email.toLowerCase().includes(filterText.toLowerCase()))||
                (item.lastName && item.lastName.toLowerCase().includes(filterText.toLowerCase()))) &&
                ((item.status_data && item.status_data.toLowerCase() === status.toLowerCase()) || status === "") ) {
                return true;
            }
            return false;
        }
    );
    return updateObject(state, { data: filteredItems })
}

const reducer = (state = intialState ,action) => {
    switch(action.type){
        case actionTypes.USER_REQUEST_LIST_START: return userRequestListStart(state,action) 
        case actionTypes.USER_REQUEST_LIST_FAIL: return userRequestListFail(state,action) 
        case actionTypes.USER_REQUEST_LIST_SUCCESS: return userRequestListing(state,action) 
        case actionTypes.USER_REQUEST_UPDATE_START: return userRequestUpdateStart(state,action) 
        case actionTypes.USER_REQUEST_UPDATE_FAIL: return userRequestUpdateFail(state,action) 
        case actionTypes.USER_REQUEST_STATUS_UPDATE: return userRequestUpdate(state,action) 
        case actionTypes.USER_REQUEST_DETAIL: return userRequestDetail(state,action) 
        case actionTypes.USER_REQUEST_LIST_FILTER: return filterList(state,action)
        default : return state 
    }
}

export default reducer
