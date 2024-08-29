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

import "react-datepicker/dist/react-datepicker.css";
import { updateObject } from '../../store/Utility'
import * as actions from '../../store/actions'

function withRouter(Component) {
    return (props) => {
        const location = useLocation();
        const navigate = useNavigate();
        const params = useParams();
        const match = useMatch('/groupcategory/edit/:categoryId');
        return <Component {...props} match={match} navigate={navigate} location={location} params={params} />;
    }
}

class AddEdit extends Component {

    state = {
        groupCategoryId: 0,
        validated: false,
        Title: "",
        CategoryId:0,
        applyHere: "",
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
            this.props.onAddEditForm(this.state, "")
        }
    }

    handleChange = event => {
        let updatedStateData = this.state
        updatedStateData = updateObject(this.state, { [event.target.id]: event.target.value })
        this.setState(updatedStateData)
    }

    componentDidMount() {
        let groupCategoryId = this.props.match ? this.props.match.params.groupCategoryId : ""

        this.props.onCategoryList("")

        if (groupCategoryId) {
            console.log("dddd")
            this.setState({
                groupCategoryId: groupCategoryId
            })
            // const FetchCategories = async (groupCategoryId) => {
            //     try {
            //         await axios.get('Group/getGroupCategory?id=' + groupCategoryId)
            //             .then((response) => {
            //                 if (response.data.result) {
            //                     const fundDetails = response.data.result;
            //                     let data = {
            //                         Title: fundDetails.title,
            //                         CategoryId:fundDetails.categoryId,
            //                     }
            //                     let updatedStateData = updateObject(this.state, data)
            //                     this.setState(updatedStateData);
            //                 } else {
            //                     swal("Oops...", "Invalide Event Detail", "error");
            //                 }
            //             })
            //     } catch (e) {
            //         swal("Oops...", "Invalide Event Detail", "error");
            //         console.log(e);
            //     }
            // }
            // FetchCategories(groupCategoryId);
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
                    <div className="col-sm">Group Category {this.state.groupCategoryId ? "Edit" : "Add"}</div>

                </CCardHeader>
                <CCardBody>
                    <CForm
                        className="row g-3"
                        noValidate
                        validated={this.state.validated}
                        onSubmit={this.handleSubmit}
                    >
                        <CCol md={12}>
                            <CFormInput
                                type="text"
                                id="Title"
                                label="Title"
                                value={this.state.Title}
                                onChange={this.handleChange}
                                placeholder='Enter Title'
                                required
                            />
                        </CCol>
                        <CCol md={12}>
                            <CFormSelect
                                id="CategoryId"
                                value={this.state.CategoryId}
                                onChange={this.handleChange}
                                label="Type"
                            >
                                <option value={"0"}> --- Select Type ---</option>
                                <option value={"1"}> Without Approval Join </option>
                                <option value={"2"}> Approval Needed </option>
                                {/* {
                                    this.props.categoryList.map((item, i) => (
                                        <option key={i} value={item.categoryId}>{item.categoryName}</option>

                                    ))
                                } */}
                            </CFormSelect>
                        </CCol>
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
        redirectTo: state.fund.redirectTo,
        addEditLoading: state.fund.addEditLoading,
        addEditError: state.fund.addEditError,
        addEditSuccess: state.fund.addEditSuccess,
        token: state.auth.token,
    }
}

const mapDispatchToProp = dispatch => {
    return {
        // onMaterialDetail: (id, token) => dispatch(actions.onMaterialDetail(id, token)),
        onCategoryList: (token) => dispatch(actions.getCategoryList(token)),
        onAddEditForm: (params, token) => dispatch(actions.groupCategoryAddEdit(params, token)),
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProp)(AddEdit))