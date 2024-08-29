import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
    useLocation,
    useNavigate,
    useParams,
    useMatch,
    Navigate,
    NavLink
} from "react-router-dom";
import {
    CCard,
    CCardHeader,
    CCardBody,
    CForm,
    CCol,
    CFormInput,
    CButton,
    CFormLabel
} from '@coreui/react';
import DatePicker from "react-datepicker";
import swal from 'sweetalert';
import Moment from 'moment';

import "react-datepicker/dist/react-datepicker.css";
import { updateObject } from '../../store/Utility'
import * as actions from '../../store/actions'
import axios from '../../axios_call'

function withRouter(Component) {
    return (props) => {
        const location = useLocation();
        const navigate = useNavigate();
        const params = useParams();
        const match = useMatch('/group_activity_management/edit/:categoryName/:groupId/:maxRows/:taskId');
        return <Component {...props} match={match} navigate={navigate} location={location} params={params} />;
    }
}

class AddEdit extends Component {

    state = {
        taskId: 0,
        validated: false,
        Title: "",
        CategoryId:0,
        applyHere: "",
        page:0,
        ordering:0,
        remainActivities:0,

        Day1:0,
        Task1:"",
        DayId1:0,
        TaskId1:0,
        SelDate1:"",

        Day2:0,
        Task2:"",
        DayId2:0,
        TaskId2:0,
        SelDate2:"",

        Day3:0,
        Task3:"",
        DayId3:0,
        TaskId3:0,
        SelDate3:"",

        Day4:0,
        Task4:"",
        DayId4:0,
        TaskId4:0,
        SelDate4:"",

        Day5:0,
        Task5:"",
        DayId5:0,
        TaskId5:0,
        SelDate5:"",

        Day6:0,
        Task6:"",
        DayId6:0,
        TaskId6:0,
        SelDate6:"",

        Day7:0,
        Task7:"",
        DayId7:0,
        TaskId7:0,
        SelDate7:"",
    };
    

            
    handleSubmit = (event) => {
        event.preventDefault()
        const form = event.currentTarget
        if (form.checkValidity() === false) {
            event.stopPropagation();
        }
        this.setState({
            validated: true
        })
        if (form.checkValidity() === true) {
            console.log("submit");
            const groupId=window.location.pathname.split("/")[3];
            const param = []
            for (let index = 0; index < 6; index++) {
                if(index===0){
                    param[index]={
                        groupId:groupId,
                        taskId: this.state.TaskId1,
                        task:this.state.Task1,
                        day:this.state.Day1,
                        daysId:this.state.DayId1,
                        date:this.state.SelDate1,  
                    }
                let taskId = this.props.match ? this.props.match.params.taskId : 0
                if(taskId){
                    break;
                }
                }else if(index===1 && this.state.Task2 !== ""){
                    param[index]={
                        groupId:groupId,
                        taskId: this.state.TaskId2,
                        task:this.state.Task2,
                        day:this.state.Day2,
                        daysId:this.state.DayId2,
                        date:this.state.SelDate2,  
                    }
                }else if(index===2 && this.state.Task3 !== ""){
                    param[index]={
                        groupId:groupId,
                        taskId: this.state.TaskId3,
                        task:this.state.Task3,
                        day:this.state.Day3,
                        daysId:this.state.DayId3,
                        date:this.state.SelDate3,  
                    }
                }else if(index===3 && this.state.Task4 !== ""){
                        param[index]={
                            groupId:groupId,
                            taskId: this.state.TaskId4,
                            task:this.state.Task4,
                            day:this.state.Day4,
                            daysId:this.state.DayId4,
                            date:this.state.SelDate4,  
                        }
                }else if(index===4 && this.state.Task5 !== ""){
                    param[index]={
                        groupId:groupId,
                        taskId: this.state.TaskId5,
                        task:this.state.Task5,
                        day:this.state.Day5,
                        daysId:this.state.DayId5,
                        date:this.state.SelDate5,  
                    }
                }else if(index===5 && this.state.Task6 !== ""){
                    param[index]={
                        groupId:groupId,
                        taskId: this.state.TaskId6,
                        task:this.state.Task6,
                        day:this.state.Day6,
                        daysId:this.state.DayId6,
                        date:this.state.SelDate6,  
                    }
                }else if(index===6 && this.state.Task7 !== ""){
                    param[index]={
                        groupId:groupId,
                        taskId: this.state.TaskId7,
                        task:this.state.Task7,
                        day:this.state.Day7,
                        daysId:this.state.DayId7,
                        date:this.state.SelDate7,  
                    }
                }
            }
            const headers = {
                headers:{
                    'Authorization': JSON.parse(localStorage.getItem("userDetail")).token
                }
            };
            this.props.onAddEditForm(param, headers,"/group_activity_management/"+this.props.params.groupId+"/"+this.props.params.categoryName)
            // this.props.onAddEditForm(this.state, "")
        }
        
    }

    
    handleChange = event => {
        let updatedStateData = this.state
        updatedStateData = updateObject(this.state, { [event.target.id]: event.target.value })
        this.setState(updatedStateData)
        console.log(event.target.id)
    }

    componentDidMount() {
        this.setState({
            remainActivities:this.props.params.maxRows
        })
        let taskId = this.props.match ? this.props.match.params.taskId : 0
        this.setState({
            taskId: taskId
        })
        if (taskId) {
            
            const headers = {
                headers:{
                    'Authorization': JSON.parse(localStorage.getItem("userDetail")).token
                }
            };
            axios.get('SuperAdmin/getgroupactivitytaskbyid?Id='+taskId,
                headers
            )
            .then((response) => {
                if(response.data.status){
                    this.setState({
                        taskId: taskId,
                        TaskId1:taskId,
                        DayId1:response.data.result.dayId,
                        Day1:response.data.result.days,
                        Task1:response.data.result.task,
                        SelDate1:Moment(response.data.result.date)._d
                    });
                    console.log("Success",this.state)
                }else{
                    console.log("Fail X")
                }            
            })
            .catch((error) => {
                console.log(error)
            })
            
            
        }

    }



    render() {
        // let taskId = this.props.match ? this.props.match.params.taskId : "0"
        if (this.props.redirectTo) {
            swal("Poof! Your Details  has been save changes !", {
                icon: "success",
            });
            return <Navigate to={this.props.redirectTo} replace />;
        }
        let AddEditButton = !this.props.addEditLoading ? "Save" : "Please Wait ..."
        return (
            <CCard>
                <CCardHeader className='d-flex' component="h5">
                <NavLink to={"/group_activity_management/"+window.location.pathname.split("/")[4]+"/"+window.location.pathname.split("/")[3]} type="button" className="btn btn btn-primary btn-sm mt-2 me-1">Back</NavLink>
                    <div className="col-sm">Group Task {this.state.taskId ? "Edit" : "Add"}</div>

                </CCardHeader>
                <CCardBody>
                    <CForm
                        className="row g-3"
                        noValidate
                        validated={this.state.validated}
                        onSubmit={this.handleSubmit}
                    >
                        {this.state.taskId!==0 &&
                        <CCol md={1}>
                            <CFormInput
                                type="text"
                                id="Day1"
                                label="Day"
                                value={this.state.Day1}
                                onChange={this.handleChange}
                                placeholder='Days'
                                required
                                disabled
                            />
                        </CCol>
                        }
                        {this.state.taskId===0 &&
                        <CCol md={1}>
                            <CFormInput
                                type="text"
                                id="Day1"
                                label="Day"
                                value={this.state.Day1}
                                onChange={this.handleChange}
                                placeholder='Days1'
                                required
                            />
                        </CCol>
                        }
                        {this.state.taskId!==0 &&
                        <CCol md={2}>
                            <CFormLabel>Select Date</CFormLabel>
                            <DatePicker
                                className='form-control'
                                dateFormat={"dd/MM/yyyy"}
                                minDate={new Date()}
                                selected={this.state.SelDate1}
                                id="SelDate1"
                                disabled
                                onChange={(date) => {
                                    let updatedStateData = updateObject(this.state, { "SelDate1": date })
                                    this.setState(updatedStateData);
                                }
                                }
                            />
                        </CCol>
                        }
                        {this.state.taskId===0 &&
                        <CCol md={2}>
                            <CFormLabel>Select Date</CFormLabel>
                            <DatePicker
                                className='form-control'
                                dateFormat={"dd/MM/yyyy"}
                                minDate={new Date()}
                                selected={this.state.SelDate1}
                                id="SelDate1"
                                onChange={(date) => {
                                    let updatedStateData = updateObject(this.state, { "SelDate1": date })
                                    this.setState(updatedStateData);
                                }
                                }
                            />
                        </CCol>
                        }
                        <CCol md={9}>
                            <CFormInput
                                type="text"
                                id="Task1"
                                label="Task"
                                value={this.state.Task1}
                                onChange={this.handleChange}
                                placeholder='Write here Task ...'
                                required
                            />
                        </CCol>
                        {(this.state.remainActivities>1) &&
                        <CCol md={1}>
                            <CFormInput
                                type="text"
                                id="Day2"
                                label="Day"
                                value={this.state.Day2}
                                onChange={this.handleChange}
                                placeholder='Days'
                                required
                            />
                        </CCol>
                        }
                        {(this.state.remainActivities>1) &&
                        <CCol md={2}>
                            <CFormLabel>Select Date</CFormLabel>
                            <DatePicker
                                className='form-control'
                                dateFormat={"dd/MM/yyyy"}
                                minDate={new Date()}
                                selected={this.state.SelDate2}
                                id="SelDate2"
                                onChange={(date) => {
                                    let updatedStateData = updateObject(this.state, { "SelDate2": date })
                                    this.setState(updatedStateData);
                                }
                                }
                            />
                        </CCol>
                        }
                        {(this.state.remainActivities>1) &&
                        <CCol md={9}>
                            <CFormInput
                                type="text"
                                id="Task2"
                                label="Task"
                                value={this.state.Task2}
                                onChange={this.handleChange}
                                placeholder='Write here Task ...'
                                
                            />
                        </CCol>
                        }
                        {(this.state.remainActivities>2) &&
                        <CCol md={1}>
                            <CFormInput
                                type="text"
                                id="Day3"
                                label="Day"
                                value={this.state.Day3}
                                onChange={this.handleChange}
                                placeholder='Days'
                                required
                            />
                        </CCol>
                        }
                        {(this.state.remainActivities>2) &&
                        <CCol md={2}>
                            <CFormLabel>Select Date</CFormLabel>
                            <DatePicker
                                className='form-control'
                                dateFormat={"dd/MM/yyyy"}
                                minDate={new Date()}
                                selected={this.state.SelDate3}
                                id="SelDate3"
                                onChange={(date) => {
                                    let updatedStateData = updateObject(this.state, { "SelDate3": date })
                                    this.setState(updatedStateData);
                                }
                                }
                            />
                        </CCol>
                        }
                        {(this.state.remainActivities>2) &&
                        <CCol md={9}>
                            <CFormInput
                                type="text"
                                id="Task3"
                                label="Task"
                                value={this.state.Task3}
                                onChange={this.handleChange}
                                placeholder='Write here Task ...'
                                
                            />
                        </CCol>
                        }
                        {(this.state.remainActivities>3) &&
                        <CCol md={1}>
                            <CFormInput
                                type="text"
                                id="Day4"
                                label="Day"
                                value={this.state.Day4}
                                onChange={this.handleChange}
                                placeholder='Days'
                                required
                            />
                        </CCol>
                        }
                        {(this.state.remainActivities>3) &&
                        <CCol md={2}>
                            <CFormLabel>Select Date</CFormLabel>
                            <DatePicker
                                className='form-control'
                                dateFormat={"dd/MM/yyyy"}
                                minDate={new Date()}
                                selected={this.state.SelDate4}
                                id="SelDate4"
                                onChange={(date) => {
                                    let updatedStateData = updateObject(this.state, { "SelDate4": date })
                                    this.setState(updatedStateData);
                                }
                                }
                            />
                        </CCol>
                        }
                        {(this.state.remainActivities>3) &&
                        <CCol md={9}>
                            <CFormInput
                                type="text"
                                id="Task4"
                                label="Task"
                                value={this.state.Task4}
                                onChange={this.handleChange}
                                placeholder='Write here Task ...'
                                
                            />
                        </CCol>
                        }
                        {(this.state.remainActivities>4) &&
                        <CCol md={1}>
                            <CFormInput
                                type="text"
                                id="Day5"
                                label="Day"
                                value={this.state.Day5}
                                onChange={this.handleChange}
                                placeholder='Days'
                                required
                            />
                        </CCol>
                        }
                        {(this.state.remainActivities>4) &&
                        <CCol md={2}>
                               <CFormLabel>Select Date</CFormLabel>
                            <DatePicker
                                className='form-control'
                                dateFormat={"dd/MM/yyyy"}
                                minDate={new Date()}
                                selected={this.state.SelDate5}
                                id="SelDate5"
                                onChange={(date) => {
                                    let updatedStateData = updateObject(this.state, { "SelDate5": date })
                                    this.setState(updatedStateData);
                                }
                                }
                            />
                        </CCol>
                        }
                        {(this.state.remainActivities>4) &&
                        <CCol md={9}>
                            <CFormInput
                                type="text"
                                id="Task5"
                                label="Task"
                                value={this.state.Task5}
                                onChange={this.handleChange}
                                placeholder='Write here Task ...'
                                
                            />
                        </CCol>
                        }
                        {(this.state.remainActivities>5) &&
                        <CCol md={1}>
                            <CFormInput
                                type="text"
                                id="Day6"
                                label="Day"
                                value={this.state.Day6}
                                onChange={this.handleChange}
                                placeholder='Days'
                                required
                            />
                        </CCol>
                        }
                        {(this.state.remainActivities>5) &&
                        <CCol md={2}>
                            <CFormLabel>Select Date</CFormLabel>
                            <DatePicker
                                className='form-control'
                                dateFormat={"dd/MM/yyyy"}
                                minDate={new Date()}
                                selected={this.state.SelDate6}
                                id="SelDate6"
                                onChange={(date) => {
                                    let updatedStateData = updateObject(this.state, { "SelDate6": date })
                                    this.setState(updatedStateData);
                                }
                                }
                            />
                        </CCol>
                        }
                        {(this.state.remainActivities>5) &&
                        <CCol md={9}>
                            <CFormInput
                                type="text"
                                id="Task6"
                                label="Task"
                                value={this.state.Task6}
                                onChange={this.handleChange}
                                placeholder='Write here Task ...'
                                
                            />
                        </CCol>
                        }
                        {(this.state.remainActivities>6) &&
                        <CCol md={1}>
                            <CFormInput
                                type="text"
                                id="Day7"
                                label="Day"
                                value={this.state.Day7}
                                onChange={this.handleChange}
                                placeholder='Days'
                                required
                            />
                        </CCol>
                        }
                        {(this.state.remainActivities>6) &&
                        <CCol md={2}>
                            <CFormLabel>Select Date</CFormLabel>
                            <DatePicker
                                className='form-control'
                                dateFormat={"dd/MM/yyyy"}
                                minDate={new Date()}
                                selected={this.state.SelDate7}
                                id="SelDate7"
                                onChange={(date) => {
                                    let updatedStateData = updateObject(this.state, { "SelDate7": date })
                                    this.setState(updatedStateData);
                                }
                                }
                            />
                        </CCol>
                        }
                        {(this.state.remainActivities>6) &&
                        <CCol md={9}>
                            <CFormInput
                                type="text"
                                id="Task7"
                                label="Task"
                                value={this.state.Task7}
                                onChange={this.handleChange}
                                placeholder='Write here Task ...'
                                
                            />
                        </CCol>
                        }
                        <CCol xs={12}>
                            <CButton type="submit">{AddEditButton}</CButton>
                        </CCol>
                    </CForm>
                </CCardBody>
            </CCard>
        );
    }
}
const mapStateToProps = state => {
    return {
        redirectTo: state.group.redirectTo,
        addEditLoading: state.group.addEditLoading,
        addEditError: state.group.addEditError,
        addEditSuccess: state.group.addEditSuccess,
        token: state.auth.token,
    }
}

const mapDispatchToProp = dispatch => {
    return {
        onAddEditForm: (params, token,link) => dispatch(actions.groupActivityAddEdit(params, token,link)),
        onGroupActivitygetById: (Id, token) => dispatch(actions.groupActivitygetById(Id, token)),

    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProp)(AddEdit))