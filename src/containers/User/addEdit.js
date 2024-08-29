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
    CButton,
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
        const match = useMatch('/user/edit/:userId');
        return <Component {...props} match={match} navigate={navigate} location={location} params={params} />;
    }
}

class AddEdit extends Component {

    state = {
        userId: 0,
        validated: false,
        changedProp: false,
        title: "",
        applyNow: "",
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
            this.props.onAddEditForm(this.state)
        }
    }

    handleChange = event => {
        let updatedStateData = this.state
        updatedStateData = updateObject(this.state, { [event.target.id]: event.target.value })
        this.setState(updatedStateData)
    }

    componentDidMount() {
        let userId = this.props.match ? this.props.match.params.userId : ""

        // this.props.onCategoryList()

        if (userId) {
            this.setState({
                userId: userId
            })
            // this.props.onCategoryDetail(categoryId)
        }

    }

    componentDidUpdate(prevProps) {
        let userDetail = this.props.userDetail
        if (this.props.userDetail === null) {
            return false;
        }
        if (this.state.changedProp === false) {
            userDetail["changedProp"] = true
            
            userDetail["dueDate"] = Moment(userDetail.dueDate)._d
            this.setState(userDetail);
        }
    }
    
    render() {
        if (this.props.redirectTo !== null && this.props.redirectTo !== "") {
            swal("Poof! Your Details  has been save changes !", {
                icon: "success",
            });
            return <Navigate to={this.props.redirectTo} replace />;
        }

        if (this.props.userDetailError) {
            swal(this.props.userDetailError, {
                icon: "error",
            });
            return <Navigate to={this.props.redirectTo} replace />;
        }

        let AddEditButton = !this.props.addEditLoading ? "Save" : "Please Wait ..."
        return (
            <CCard>
                <CCardHeader className='d-flex' component="h5">
                    <div className="col-sm">User {this.state.title ? "Edit" : "Add"}</div>

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
                                id="name"
                                label="Name"
                                value={this.state.title}
                                onChange={this.handleChange}
                                placeholder='Enter Name'
                                required
                            />
                        </CCol>   
                        <CCol md={6}>
                            <CFormSelect
                                id="roleId"
                                value={this.state.roleId}
                                onChange={this.handleChange}
                                label="Roles"
                            >
                                <option value={null}> --- Select Roles ---</option>
                                <option value="contributor">Contributor</option>
                                <option value="User">User</option>
                            </CFormSelect>
                        </CCol>
                        <CCol md={6}>
                            <CFormInput
                                type="email"
                                id="email"
                                label="Email"
                                value={this.state.title}
                                onChange={this.handleChange}
                                placeholder='Enter Email'
                                required
                            />
                        </CCol>  
                        <CCol md={6}>
                            <CFormInput
                                type="password"
                                id="password"
                                label="Password"
                                value={this.state.title}
                                onChange={this.handleChange}
                                placeholder='Enter Password'
                                required
                            />
                        </CCol>                                             
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
        redirectTo: state.user.redirectTo,
        addEditLoading: state.user.addEditLoading,
        addEditError: state.user.addEditError,
        userDetail: state.user.userDetail,
        userDetailError: state.user.userDetailError,
    }
}

const mapDispatchToProp = dispatch => {
    return {
        onAddEditForm: (params) => dispatch(actions.userAddEdit(params)),
        onUserDetail : (id) => dispatch(actions.getUserDetail(id))
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProp)(AddEdit))