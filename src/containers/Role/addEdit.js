import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
    useLocation,
    useNavigate,
    useParams,
    useMatch,
    Navigate
} from "react-router-dom";
import {
    CCard,
    CCardHeader,
    CCardBody,
    CForm,
    CCol,
    CFormInput,
    CButton,
    CFormCheck,
    CFormLabel,
    CRow
} from '@coreui/react';
import swal from 'sweetalert';
import Moment from 'moment';

import "react-datepicker/dist/react-datepicker.css";
import { updateObject } from '../../store/Utility'
import * as actions from '../../store/actions'

function withRouter(Component) {
    return (props) => {
        const location = useLocation();
        const navigate = useNavigate();
        const params = useParams();
        const match = useMatch('/roles/edit/:roleId');
        return <Component {...props} match={match} navigate={navigate} location={location} params={params} />;
    }
}

class AddEdit extends Component {

    constructor() {
        super();
        this.state = {
            roleId: 0,
            validated: false,
            changedProp: false,
            title: "",
            description: "",
            startDate: new Date(),
            endDate: new Date(),
            address: "",
            city: "",
            country: "0",
            state: "0",
            zipCode: "",
            phoneNumber: "",
            website: "",
            featureImage: "",
            oldFeatureImage: ""
        };
        this.onFileChange = this.onFileChange.bind(this);
    }

    async onFileChange(e) {
        let files = e.target.files;
        let fileReader = new FileReader();
        fileReader.readAsDataURL(files[0]);
        fileReader.onload = (role) => {
            this.setState({
                featureImage: role.target.result,
            })
        }
    }

    handleSubmit = (role) => {
        role.preventDefault()
        const form = role.currentTarget
        if (form.checkValidity() === false) {
            role.stopPropagation();
        }
        this.setState({
            validated: true
        })
        if (form.checkValidity() === true) {
            this.props.onAddEditForm(this.state, "")
        }
    }

    handleChange = role => {
        let updatedStateData = this.state
        if (role.target.id === "Image") {
            updatedStateData = updateObject(this.state, { [role.target.id]: role.target.files })
        } else {
            if (role.target.id === "country") {
                this.props.onStateList(role.target.value, "")

            }
            updatedStateData = updateObject(this.state, { [role.target.id]: role.target.value })
        }
        this.setState(updatedStateData)
    }

    async componentDidMount() {
        let roleId = this.props.match ? this.props.match.params.roleId : ""
        await this.props.onCountryList()
        this.setState({
            country: "United States"
        })
        await this.props.onStateList("United States", "")
        if (roleId) {
            this.setState({
                roleId: roleId
            })
            this.props.onRoleDetail(roleId)
        }
    }

    async componentDidUpdate(prevProps) {
        let roleDetail = this.props.roleDetail
        if (this.props.roleDetail === null) {
            return false;
        }
        if (this.state.changedProp === false) {
            roleDetail["changedProp"] = true
            roleDetail["oldFeatureImage"] = roleDetail.featureImage
            roleDetail["startDate"] =  Moment(roleDetail.startDate)._d
            roleDetail["endDate"] =  Moment(roleDetail.endDate)._d
            delete roleDetail.featureImage

            await this.props.onStateList(roleDetail.country, "")

            this.setState(roleDetail);
        }
    }

    render() {
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
                    <div className="col-sm">Role {this.state.roleId ? "Edit" : "Add"}</div>
                </CCardHeader>
                <CCardBody>
                    <CForm
                        className="row g-3"
                        noValidate
                        validated={this.state.validated}
                        onSubmit={this.handleSubmit}
                    >
                        <CCol md={6}>
                            <CFormInput
                                type="text"
                                id="title"
                                label="Title"
                                value={this.state.title}
                                onChange={this.handleChange}
                                placeholder='Enter Name'
                                feedbackInvalid="Please enter a valid title."
                                required
                            />
                        </CCol>
                        <CRow>
                            <div class="col-sm-6">
                            <CFormLabel><b>Permission</b></CFormLabel>
                            <CCol md={6}>
                                <CFormCheck id="flexCheckDefault" label="Roles"/>
                            </CCol>
                            </div>
                            <div class="col-sm-6">
                            <CFormLabel><b>Action</b></CFormLabel>
                            <CCol className='crud-text'>
                                <CFormCheck id="flexCheckDefault1" label="Create"/>
                                <CFormCheck id="flexCheckDefault2" label="Read"/>
                                <CFormCheck id="flexCheckDefault3" label="Update"/>
                                <CFormCheck id="flexCheckDefault4" label="Delete"/>
                            </CCol>
                            </div>
                        </CRow>
                        <hr/>
                        <CRow>
                            <div class="col-sm-6">
                            <CCol md={6}>
                                <CFormCheck id="flexCheckDefault" label="Materials"/>
                            </CCol>
                            </div>
                            <div class="col-sm-6">
                            <CCol className='crud-text'>
                                <CFormCheck id="flexCheckDefault1" label="Create"/>
                                <CFormCheck id="flexCheckDefault2" label="Read"/>
                                <CFormCheck id="flexCheckDefault3" label="Update"/>
                                <CFormCheck id="flexCheckDefault4" label="Delete"/>
                            </CCol>
                            </div>
                        </CRow>
                        <hr/>
                        <CRow>
                            <div class="col-sm-6">
                            <CCol md={6}>
                                <CFormCheck id="flexCheckDefault" label="Categories"/>
                            </CCol>
                            </div>
                            <div class="col-sm-6">
                            <CCol className='crud-text'>
                                <CFormCheck id="flexCheckDefault1" label="Create"/>
                                <CFormCheck id="flexCheckDefault2" label="Read"/>
                                <CFormCheck id="flexCheckDefault3" label="Update"/>
                                <CFormCheck id="flexCheckDefault4" label="Delete"/>
                            </CCol>
                            </div>
                        </CRow>
                        <hr/>
                        <CRow>
                            <div class="col-sm-6">
                            <CCol md={6}>
                                <CFormCheck id="flexCheckDefault" label="Users"/>
                            </CCol>
                            </div>
                            <div class="col-sm-6">
                            <CCol className='crud-text'>
                                <CFormCheck id="flexCheckDefault1" label="Create"/>
                                <CFormCheck id="flexCheckDefault2" label="Read"/>
                                <CFormCheck id="flexCheckDefault3" label="Update"/>
                                <CFormCheck id="flexCheckDefault4" label="Delete"/>
                            </CCol>
                            </div>
                        </CRow>
                        <hr/>
                        <CRow>
                            <div class="col-sm-6">
                            <CCol md={6}>
                                <CFormCheck id="flexCheckDefault" label="Dataset Meta"/>
                            </CCol>
                            </div>
                            <div class="col-sm-6">
                            <CCol className='crud-text'>
                                <CFormCheck id="flexCheckDefault1" label="Create"/>
                                <CFormCheck id="flexCheckDefault2" label="Read"/>
                                <CFormCheck id="flexCheckDefault3" label="Update"/>
                                <CFormCheck id="flexCheckDefault4" label="Delete"/>
                            </CCol>
                            </div>
                        </CRow>
                        <hr/>
                        <CRow>
                            <div class="col-sm-6">
                            <CCol md={6}>
                                <CFormCheck id="flexCheckDefault" label="Contributor Meta"/>
                            </CCol>
                            </div>
                            <div class="col-sm-6">
                            <CCol className='crud-text'>
                                <CFormCheck id="flexCheckDefault1" label="Create"/>
                                <CFormCheck id="flexCheckDefault2" label="Read"/>
                                <CFormCheck id="flexCheckDefault3" label="Update"/>
                                <CFormCheck id="flexCheckDefault4" label="Delete"/>
                            </CCol>
                            
                            </div>
                        </CRow>
                        <CCol xs={12}>
                            <CButton class="save-btn" type="submit">{AddEditButton}</CButton>
                        </CCol>
                    </CForm>
                </CCardBody>
            </CCard>
        );
    }
}

const mapStateToProps = state => {
    return {
        loading: state.role.loading,
        data: state.role.data,
        error: state.role.error,
        countryList: state.role.roleCountryList,
        stateList: state.role.roleStateList,
        redirectTo: state.role.redirectTo,
        addEditLoading: state.role.addEditLoading,
        addEditError: state.role.addEditError,
        addEditSuccess: state.role.addEditSuccess,
        roleDetail: state.role.roleDetail,
        roleDetailError: state.role.roleDetailError,
    }
}

const mapDispatchToProp = dispatch => {
    return {
        onRoleList: (param) => dispatch(actions.roleList(param)),
        onRoleDelete: (id) => dispatch(actions.roleDelete(id)),
        onRoleDetail: (id) => dispatch(actions.getRoleDetail(id)),
        onCountryList: () => dispatch(actions.getCountryList()),
        onStateList: (id) => dispatch(actions.getStateList(id)),
        onAddEditForm: (params) => dispatch(actions.roleAddEdit(params)),
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProp)(AddEdit))