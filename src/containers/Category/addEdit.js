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
        const match = useMatch('/category/edit/:categoryId');
        return <Component {...props} match={match} navigate={navigate} location={location} params={params} />;
    }
}

class AddEdit extends Component {

    state = {
        categoryId: 0,
        validated: false,
        changedProp: false,
        title: "",
        description: "",
        dueDate: new Date(),
        // categoryId:0,
        startDate: new Date(),
        endDate: new Date(),
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
        let categoryId = this.props.match ? this.props.match.params.categoryId : ""

        // this.props.onCategoryList()

        if (categoryId) {
            this.setState({
                categoryId: categoryId
            })
            // this.props.onCategoryDetail(categoryId)
        }

    }

    componentDidUpdate(prevProps) {
        let categoryDetail = this.props.categoryDetail
        if (this.props.categoryDetail === null) {
            return false;
        }
        if (this.state.changedProp === false) {
            categoryDetail["changedProp"] = true
            
            categoryDetail["dueDate"] = Moment(categoryDetail.dueDate)._d
            this.setState(categoryDetail);
        }
    }
    
    render() {
        if (this.props.redirectTo !== null && this.props.redirectTo !== "") {
            swal("Poof! Your Details  has been save changes !", {
                icon: "success",
            });
            return <Navigate to={this.props.redirectTo} replace />;
        }

        if (this.props.categoryDetailError) {
            swal(this.props.categoryDetailError, {
                icon: "error",
            });
            return <Navigate to={this.props.redirectTo} replace />;
        }

        let AddEditButton = !this.props.addEditLoading ? "Save" : "Please Wait ..."
        return (
            <CCard>
                <CCardHeader className='d-flex' component="h5">
                    <div className="col-sm">Category {this.state.categoryId ? "Edit" : "Add"}</div>

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
                                label="Name"
                                value={this.state.title}
                                onChange={this.handleChange}
                                placeholder='Enter Name'
                                required
                            />
                        </CCol>
                        <CCol md={6}>
                            <CFormSelect
                                id="categoryId"
                                value={this.state.categoryId}
                                onChange={this.handleChange}
                                label="Parent Category"
                            >
                                <option value={null}> --- Select Parent Category ---</option>
                                <option value="material_manufacturer">Material Manufacturer</option>
                                <option value="researcher">Researcher</option>
                                <option value="phd_scholar">Ph. D. scholar</option>
                                <option value="epd_lca_consultant">EPD or LCA consultant</option>
                                <option value="government_official">Government official</option>
                                <option value="other">Other</option>
                            </CFormSelect>
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
        // categoryList: state.category.fundCategoryList,
        redirectTo: state.category.redirectTo,
        addEditLoading: state.category.addEditLoading,
        addEditError: state.category.addEditError,
        categoryDetail: state.category.categoryDetail,
        categoryDetailError: state.category.categoryDetailError,
    }
}

const mapDispatchToProp = dispatch => {
    return {
        onAddEditForm: (params) => dispatch(actions.categoryAddEdit(params)),
        onCategoryDetail : (id) => dispatch(actions.getcategoryDetail(id))
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProp)(AddEdit))