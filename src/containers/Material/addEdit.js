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
    CButton
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
        const match = useMatch('/materials/edit/:materialId');
        return <Component {...props} match={match} navigate={navigate} location={location} params={params} />;
    }
}

class AddEdit extends Component {

    constructor() {
        super();
        this.state = {
            materialId: 0,
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
        fileReader.onload = (material) => {
            this.setState({
                featureImage: material.target.result,
            })
        }
    }

    handleSubmit = (material) => {
        material.preventDefault()
        const form = material.currentTarget
        if (form.checkValidity() === false) {
            material.stopPropagation();
        }
        this.setState({
            validated: true
        })
        if (form.checkValidity() === true) {
            this.props.onAddEditForm(this.state, "")
        }
    }

    handleChange = material => {
        let updatedStateData = this.state
        if (material.target.id === "Image") {
            updatedStateData = updateObject(this.state, { [material.target.id]: material.target.files })
        } else {
            if (material.target.id === "country") {
                this.props.onStateList(material.target.value, "")

            }
            updatedStateData = updateObject(this.state, { [material.target.id]: material.target.value })
        }
        this.setState(updatedStateData)
    }

    async componentDidMount() {
        let materialId = this.props.match ? this.props.match.params.materialId : ""
        await this.props.onCountryList()
        this.setState({
            country: "United States"
        })
        await this.props.onStateList("United States", "")
        if (materialId) {
            this.setState({
                materialId: materialId
            })
            this.props.onMaterialDetail(materialId)
        }
    }

    async componentDidUpdate(prevProps) {
        let materialDetail = this.props.materialDetail
        if (this.props.materialDetail === null) {
            return false;
        }
        if (this.state.changedProp === false) {
            materialDetail["changedProp"] = true
            materialDetail["oldFeatureImage"] = materialDetail.featureImage
            materialDetail["startDate"] =  Moment(materialDetail.startDate)._d
            materialDetail["endDate"] =  Moment(materialDetail.endDate)._d
            delete materialDetail.featureImage

            await this.props.onStateList(materialDetail.country, "")

            this.setState(materialDetail);
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
                    <div className="col-sm">Material {this.state.materialId ? "Edit" : "Add"}</div>

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
        loading: state.material.loading,
        data: state.material.data,
        error: state.material.error,
        countryList: state.material.materialCountryList,
        stateList: state.material.materialStateList,
        redirectTo: state.material.redirectTo,
        addEditLoading: state.material.addEditLoading,
        addEditError: state.material.addEditError,
        addEditSuccess: state.material.addEditSuccess,
        materialDetail: state.material.materialDetail,
        materialDetailError: state.material.materialDetailError,
    }
}

const mapDispatchToProp = dispatch => {
    return {
        onMaterialList: (param) => dispatch(actions.materialList(param)),
        onMaterialDelete: (id) => dispatch(actions.materialDelete(id)),
        onMaterialDetail: (id) => dispatch(actions.getMaterialDetail(id)),
        onCountryList: () => dispatch(actions.getCountryList()),
        onStateList: (id) => dispatch(actions.getStateList(id)),
        onAddEditForm: (params) => dispatch(actions.materialAddEdit(params)),
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProp)(AddEdit))