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
    CFormSelect,
    CButton
} from '@coreui/react';
import swal from 'sweetalert';
import { updateObject } from '../../store/Utility'
import * as actions from '../../store/actions'
// import axios from 'axios';
import axios from '../../axios_call'

function withRouter(Component) {
    return (props) => {

        const location = useLocation();
        const navigate = useNavigate();
        const params = useParams();
        const match = useMatch('/members/edit/:memberId');
        return <Component {...props} match={match} navigate={navigate} location={location} params={params} />;
    }
}

class AddEdit extends Component {
    constructor() {
        super();
        this.state = {
            memberId: 0,
            validated: false,
            changedProp: false,
            firstName: "",
            lastName: "",
            email: "",
            password: "",
            mobile: "",
            planId: 0,
            roleId: 0,
        };
    }


    handleSubmit = (event) => {
        event.preventDefault()
        const form = event.currentTarget

        console.log("submit");

        if (form.checkValidity() === false) {
            event.stopPropagation();
        }

        this.setState({
            validated: true
        })
        if (form.checkValidity() === true) {
            console.log("submit");
            console.log("state", this.state)
            this.props.onAddEditForm(this.state)
        }
    }

    handleChange = event => {
        let updatedStateData = this.state
        updatedStateData = updateObject(this.state, { [event.target.id]: event.target.value })
        this.setState(updatedStateData)
    }

    componentDidMount() {
        let memberId = this.props.match ? this.props.match.params.memberId : ""
        if (memberId) {
            this.setState({
                memberId: memberId
            })
            this.props.onUserDetail(memberId)
        }
        this.props.onGetPlanList()
        this.props.onGetRoleList()
    }
    upgradeMemberShip = () => {
        let PostData = {
            email: this.state.email,
            planId: this.state.planId
        }
        axios.post("SuperAdmin/upgrademembership", PostData)
            .then((response) => {
                if (response.data.status) {

                } else {

                }
            })
            .catch((error) => {

            })
    }
    componentDidUpdate(prevProps) {
        let userDetail = this.props.userDetail
        if (this.props.userDetail === null) {
            return false;
        }
        if (this.state.changedProp === false) {
            let userDetailData = {
                changedProp: true,
                memberId: userDetail.memberId,
                firstName: userDetail.firstName,
                lastName: userDetail.lastName,
                email: userDetail.email,
                password: userDetail.password ?? "",
                mobile: userDetail.mobile,
                planId: userDetail.planId,
                roleId: userDetail.roleId,
            }
            // userDetail["changedProp"] = true
            // userDetail["name"] = userDetail.firstName
            // userDetail["password"] = userDetail.password ?? ""

            console.log("user dtail => ", userDetailData)
            this.setState(userDetailData);
        }
    }

    render() {
        if (this.props.redirectTo) {
            swal("Poof! Your Details  has been save changes !", {
                icon: "success",
            });
            return <Navigate to={this.props.redirectTo} replace />;
        }
        if (this.props.addEditError) {
            swal(this.props.addEditError, {
                icon: "error",
            });
            this.props.onErrorNull();
        }
        let AddEditButton = !this.props.addEditLoading ? "Save" : "Please Wait ..."
        let AddEditButtonClass = !this.props.addEditLoading ? "" : "disable"
        // console.log("dfsdfsd",this.props.planList)
        return (
            <CCard>
                <CCardHeader className='d-flex' component="h5">
                    <div className="col-sm">User {this.state.memberId ? "Edit" : "Add"}</div>

                </CCardHeader>
                <CCardBody>
                    <CForm
                        className="row g-3"
                        noValidate
                        validated={this.state.validated}
                        onSubmit={this.handleSubmit}
                    >
                        <CCol md={4}>
                            <CFormInput
                                type="text"
                                id="firstName"
                                label="First Name"
                                placeholder='Enter First Name'
                                value={this.state.firstName}
                                onChange={this.handleChange}
                                feedbackInvalid="Please enter a valid first name."
                                required
                            />
                        </CCol>
                        <CCol md={4}>
                            <CFormInput
                                type="text"
                                id="lastName"
                                label="Last Name"
                                placeholder='Enter Last Name'
                                value={this.state.lastName}
                                onChange={this.handleChange}
                                feedbackInvalid="Please enter a valid last name."
                                required
                            />
                        </CCol>
                        <CCol md={4}>
                            <CFormInput
                                type="email"
                                id="email"
                                label="Email"
                                placeholder='Enter Email'
                                value={this.state.email}
                                onChange={this.handleChange}
                                feedbackInvalid="Please enter a valid email address."
                                required
                            />
                        </CCol>
                        <CCol md={6}>
                            <CFormInput
                                type="number"
                                id="mobile"
                                label="Phone Number"
                                placeholder='Enter Phone Number'
                                value={this.state.mobile}
                                onChange={this.handleChange}
                                min="1000000000"
                                max="999999999999"
                                feedbackInvalid="Please enter a valid mobile number."
                                required
                            />
                        </CCol>
                        <CCol md={6}>
                            <CFormInput
                                type="password"
                                id="password"
                                label="Password"
                                placeholder='Enter Password'
                                value={this.state.password}
                                onChange={this.handleChange}
                                pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*_=+-]).{8,12}$"
                                required={this.state.memberId ? false : true}
                                feedbackInvalid="Please enter a valid password."
                            />
                        </CCol>
                        <CCol md={6}>
                            <CFormSelect
                                id="roleId"
                                value={this.state.roleId}
                                onChange={this.handleChange}
                                label="Role"
                                feedbackInvalid="Please select a valid role."
                                required
                            >
                                <option disabled="" value=""> --- Select Role ---</option>
                                {
                                    this.props.roleList.map((item, i) => (
                                        <option key={i} value={item.roleId}>{item.roleName}</option>

                                    ))
                                }
                            </CFormSelect>
                        </CCol>
                        {/* <CCol md={6}>
                            <CFormSelect
                                id="planId"
                                disabled
                                value={this.state.planId}
                                onChange={this.handleChange}
                                label="Plan"
                                feedbackInvalid="Please select a valid plan."
                                required
                            >
                                <option disabled="" value=""> --- Select Plan ---</option>
                                {
                                    this.props.planList.map((item, i) => (
                                        <option key={i} value={item.id}>{item.planName}</option>

                                    ))
                                }
                            </CFormSelect>
                        </CCol> */}
                        <CCol xs={12}>
                            <CButton type="submit" className={AddEditButtonClass}>{AddEditButton}</CButton>
                        </CCol>
                    </CForm>
                    {/* <CCol md={6}>
                        <CFormSelect
                            id="planId"
                            value={this.state.planId}
                            onChange={this.handleChange}
                            label="Plan"
                            feedbackInvalid="Please select a valid plan."
                            required
                        >
                            <option disabled="" value=""> --- Select Plan ---</option>
                            {
                                this.props.planList.map((item, i) => (
                                    <option key={i} value={item.id}>{item.planName}</option>

                                ))
                            }
                        </CFormSelect>
                        <CCol xs={12}>
                            <CButton type="button" className={AddEditButtonClass} onClick={(e) => { this.upgradeMemberShip() }} >Upgrade Membership</CButton>
                        </CCol>
                    </CCol> */}
                </CCardBody>
            </CCard>
        );
    }
}

const mapStateToProps = state => {
    return {
        redirectTo: state.user.redirectTo,
        addEditLoading: state.user.addEditLoading,
        addEditError: state.user.addEditError,
        addEditSuccess: state.user.addEditSuccess,
        userDetail: state.user.userDetail,
        planList: state.user.planList,
        roleList: state.user.roleList,
    }
}

const mapDispatchToProp = dispatch => {
    return {
        onUserDetail: (id) => dispatch(actions.getuserDetail(id)),
        onGetPlanList: () => dispatch(actions.getPlanList()),
        onGetRoleList: () => dispatch(actions.getRoleList()),
        onAddEditForm: (params) => dispatch(actions.addEditUser(params)),
        onErrorNull: (params) => dispatch(actions.addEditErrorNull()),
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProp)(AddEdit))