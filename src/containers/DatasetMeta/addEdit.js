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
    CFormLabel,
    CFormSelect,
} from '@coreui/react';
import DatePicker from "react-datepicker";
import swal from 'sweetalert';

import "react-datepicker/dist/react-datepicker.css";
import { updateObject } from '../../store/Utility'
import * as actions from '../../store/actions'


import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

function withRouter(Component) {
    return (props) => {
        const location = useLocation();
        const navigate = useNavigate();
        const params = useParams();
        const match = useMatch('/dataset_meta/edit/:dataset_metaId');
        return <Component {...props} match={match} navigate={navigate} location={location} params={params} />;
    }
}

class AddEdit extends Component {
    constructor() {
        super();
        this.state = {
            id: 0,
            validated: false,
            changedProp: false,
            title: "",
            description: "",
            videoId:"",
            replaysCategory: "",
            featureImage: "",
            oldFeatureImage: "",
            discriptionClass:""
        };
        this.onFileChange = this.onFileChange.bind(this);
    }

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

    onFileChange(e) {
        let files = e.target.files;
        let fileReader = new FileReader();
        fileReader.readAsDataURL(files[0]);

        fileReader.onload = (event) => {
            this.setState({
                featureImage: event.target.result,
            })
        }
    }

    handleChange = event => {
        let updatedStateData = this.state
        updatedStateData = updateObject(this.state, { [event.target.id]: event.target.value })

        this.setState(updatedStateData)
    }

    componentDidMount() {
        let dataset_metaId = this.props.match ? this.props.match.params.dataset_metaId : ""
        if (dataset_metaId) {
            this.setState({
                id: dataset_metaId
            })
            this.props.onDataset_metaDetail(dataset_metaId)
        }
    }

    componentDidUpdate(prevProps) {
        let dataset_metaDetail = this.props.dataset_metaDetail
        if (this.props.dataset_metaDetail === null) {
            return false;
        }
        if (this.state.changedProp === false) {
            dataset_metaDetail["changedProp"] = true
            dataset_metaDetail["oldFeatureImage"] = dataset_metaDetail.featureImage
            delete dataset_metaDetail.featureImage
            this.setState(dataset_metaDetail);
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
                    <div className="col-sm">Dataset Meta {this.state.id ? "Edit" : "Add"}</div>

                </CCardHeader>
                <CCardBody>
                    <CForm
                        className="row g-3"
                        noValidate
                        validated={this.state.validated}
                        onSubmit={this.handleSubmit}
                    >
                        {/* <CCol md={12}>
                            <CFormInput
                                type="text"
                                id="title"
                                label="Title"
                                value={this.state.title}
                                onChange={this.handleChange}
                                placeholder='Enter Title'
                                required
                            />
                        </CCol> */}
                        {/* <CCol md={12}>
                            <CFormLabel>Description</CFormLabel>
                            <CKEditor
                                editor={ClassicEditor}
                                data={this.state.description}
                                onChange={(event, editor) => {
                                    const data = editor.getData();
                                    this.setState({
                                        'description' : data
                                    })
                                }}
                                required
                            />
                            <div className={`invalid-feedback ${this.state.discriptionClass}`}>Please enter a valid description.</div>
                        </CCol> */}
                        <CCol md={6}>
                            <CFormSelect
                                id="categoryId"
                                value={this.state.categoryId}
                                // onChange={this.handleChange}
                                label="Material"
                            >
                                <option value=""> --- Select Material ---</option>
                                <option value='cement'>Cement</option>
                                <option value='sand'>Sand</option>
                                <option value='aggregate'>Aggregate</option>
                                <option value='burnt_clay_bricks'>Burnt Clay Bricks</option>
                                <option value='aac_blocks'>AAC Blocks</option>
                                <option value='fly_ash_bricks'>Fly Ash Bricks</option>
                            </CFormSelect>
                        </CCol> 
                        <CCol md={6}>
                            <CFormSelect
                                id="categoryId7"
                                value={this.state.categoryId}
                                // onChange={this.handleChange}
                                label="Category"
                            >
                                <option value=""> --- Select Category ---</option>
                                <option value="material_manufacturer">Material Manufacturer</option>
                                <option value="researcher">Researcher</option>
                                <option value="phd_scholar">Ph. D. scholar</option>
                                <option value="epd_lca_consultant">EPD or LCA consultant</option>
                                <option value="government_official">Government official</option>
                                <option value="other">Other</option>
                            </CFormSelect>
                        </CCol> 
                        <CCol md={6}>
                            <CFormInput
                                type="text"
                                id="title"
                                label="Manufacturer"
                                value={this.state.title}
                                onChange={this.handleChange}
                                placeholder='Enter Manufacturer'
                                required
                            />
                        </CCol>
                        <CCol md={6}>
                            <CFormInput
                                type="file"
                                id="featureImage"
                                label="Image of material"
                                onChange={this.onFileChange}
                                accept="image/png, image/gif, image/jpeg"
                                feedbackInvalid="Please select a valid image."
                                required={this.state.eventId ? false : true}
                            />
                            <small className="text-muted">Image size: 500px * 800px</small>
                        </CCol>
                        <CCol md={6}>
                            <CFormSelect
                                id="categoryId3"
                                value={this.state.categoryId}
                                // onChange={this.handleChange}
                                label="Data Type"
                            >
                                <option value=""> --- Select Data Type ---</option>
                                <option value='primary'>Primary</option>
                                <option value='secondary'>Secondary</option>
                            </CFormSelect>
                        </CCol>
                        <CCol md={6}>
                            <CFormSelect
                                id="categoryId1"
                                value={this.state.categoryId}
                                // onChange={this.handleChange}
                                label="Data Reliability"
                            >
                                <option value=""> --- Select Data Reliability ---</option>
                                <option value='measured'>Measured</option>
                                <option value='calculated'>Calculated</option>
                                <option value='estimated'>Estimated</option>
                            </CFormSelect>
                        </CCol>
                        <CCol md={6}>
                            <CFormSelect
                                id="categoryId2"
                                value={this.state.categoryId}
                                onChange={this.handleChange}
                                label="Data Source"
                            >
                                <option value=""> --- Select Data Source ---</option>
                                <option value='measured'>EPD</option>
                                <option value='calculated'>Company</option>
                                <option value='estimated'>Sustainability Report</option>
                                <option value='estimated'>Energy Audit</option>
                            </CFormSelect>
                        </CCol>
                        <CCol md={6}>
                            <CFormSelect
                                id="categoryId9"
                                value={this.state.categoryId}
                                onChange={this.handleChange}
                                label="Process Review"
                            >
                                <option value=""> --- Select Process Review ---</option>
                                <option value='yes'>Yes</option>
                                <option value='no'>No</option>
                            </CFormSelect>
                        </CCol> 
                        
                        
                        <CCol md={6}>
                            <CFormLabel>Start</CFormLabel>
                            <DatePicker
                                className='form-control'
                                dateFormat={"MM/dd/yyyy"}
                                minDate={new Date()}
                                selected={this.state.startDate}
                                id="startDate"
                                required
                                placeholderText="Select a start date"
                                ariaInvalid="Please select a valid start date."
                                onChange={(date) => {
                                    let updatedStateData = updateObject(this.state, { "startDate": date, "endDate": "" })
                                    this.setState(updatedStateData);
                                }
                                }
                            />
                        </CCol>
                        <CCol md={6}>
                            <CFormLabel>End</CFormLabel>
                            <DatePicker
                                className='form-control'
                                dateFormat={"MM/dd/yyyy"}
                                minDate={this.state.startDate}
                                selected={this.state.endDate}
                                id="endDate"
                                placeholderText="Select a end date"
                                required
                                ariaInvalid="Please select a valid end date."
                                onChange={(date) => {
                                    let updatedStateData = updateObject(this.state, { "endDate": date })
                                    this.setState(updatedStateData);
                                }
                                }
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
        redirectTo: state.dataset_meta.redirectTo,
        addEditLoading: state.dataset_meta.addEditLoading,
        addEditError: state.dataset_meta.addEditError,
        addEditSuccess: state.dataset_meta.addEditSuccess,
        dataset_metaDetail: state.dataset_meta.dataset_metaDetail,
    }
}

const mapDispatchToProp = dispatch => {
    return {
        onDataset_metaDetail: (id, token) => dispatch(actions.getdataset_metaDetail(id)),
        onAddEditForm: (params, token) => dispatch(actions.dataset_metaAddEdit(params, token)),
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProp)(AddEdit))