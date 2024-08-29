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
    CFormSelect,
    CButton
} from '@coreui/react';
// import DatePicker from "react-datepicker";
import swal from 'sweetalert';
import Moment from 'moment';

import "react-datepicker/dist/react-datepicker.css";
import { updateObject } from '../../store/Utility'
import * as actions from '../../store/actions'
import axios from '../../axios_call'

// import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
// import pdf from '../../assets/Images/pdf.png'

function withRouter(Component) {
    return (props) => {
        const location = useLocation();
        const navigate = useNavigate();
        const params = useParams();
        const match = useMatch('/contributor_meta/edit/:groupId');
        return <Component {...props} match={match} navigate={navigate} location={location} params={params} />;
    }
}

class AddEdit extends Component {

    state = {
        validated: false,
        Title: "",
        applyHere: "",
        page: 0,
        ordering: 0,
        Day: "",
        Task: "",
        groupId: 0,
        groupName: "",
        description: "",
        startDate: new Date(),
        EndDate: new Date(),
        CategoryId: 0,
        groupCategory: '',
        GroupTitle: '',
        groupdescription: "",
        company:"",
        objective:"",
        speaker:"",
        videoId:"",
        AddPhoto: [],
        AddFeaturedPhoto: "",
        image: [],
        groupIcon: "",
        AddDocumentFile: [],
        categoryList: []

    };

    onFileChangeAddPhoto = (e) => {

        let file = e.target.files;
        getBase64(file[0], this)
            .then(result => {
                file["base64"] = result;
                this.setState({
                    AddPhoto: file.base64
                });
            })
            .catch(err => {
                console.log(err);
            });
    };
    onFileChangeAddFile = (e) => {
        let file = e.target.files;
        getBase64(file[0], this)
            .then(result => {
                file["base64"] = result;
                console.log("File Is File", file["base64"]);
                this.setState({
                    AddDocumentFile: file.base64
                });
            })
            .catch(err => {
                console.log(err);
            });
    };

    onFileChangeFeaturedImage = (e) => {
        let file = e.target.files;
        getBase64(file[0], this)
            .then(result => {
                file["base64"] = result;
                console.log("File Is Featued", file.base64);
                this.setState({
                    AddFeaturedPhoto: file.base64
                });
            })
            .catch(err => {
                console.log(err);
            });
    }
    onFileChange(e) {
        let file = e.target.files;
        getBase64(file[0], this)
            .then(result => {
                file["base64"] = result;
                console.log("File Is Document", file.base64);
                this.setState({
                    AddDocumentFile: [file.base64]
                });
            })
            .catch(err => {
                console.log(err);
            });
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
            let finalImageArray = [];
            if (this.state.AddDocumentFile.length > 0) {
                finalImageArray = [this.state.AddDocumentFile]
            }
            let params = {
                "groupId": this.state.groupId,
                "groupName": this.state.groupName,
                "description": this.state.description,
                "startDate": this.state.startDate,
                "endDate": this.state.EndDate,
                "category": this.state.categoryList[this.state.groupCategory].categoryId,
                "categoryName": this.state.categoryList[this.state.groupCategory].categoryName,
                "image": finalImageArray,
                "groupIcon": this.state.AddFeaturedPhoto,
                "documentDescription": this.state.groupdescription,
                "company":this.state.company,
                "objective":this.state.objective,
                "speaker":this.state.speaker,
                "videoId":this.state.videoId,
            }
            console.log("FINAL PARAMS", params)
            this.props.onAddEditForm(params, "")
        }
    }

    handleChange = event => {
        let updatedStateData = this.state
        if (event.target.id === "Image") {
            updatedStateData = updateObject(this.state, { [event.target.id]: event.target.files })
        } else {
            if (event.target.id === "Country") {
                this.props.onStateList(event.target.value, "")

            }
            updatedStateData = updateObject(this.state, { [event.target.id]: event.target.value })

            this.setState({ Country: 1 })
        }
        this.setState(updatedStateData)
    }

    componentDidMount() {
        let groupId = this.props.match ? this.props.match.params.groupId : ""
        axios.get('SuperAdmin/getgroupcategory')
            .then((response) => {
                if (response.data.status) {
                    this.setState({
                        categoryList: response.data.result
                    });
                    console.log("Success", response.data.result)
                } else {
                    console.log("Fail X")
                }
            })
            .catch((error) => {
                console.log(error)
            })

        if (groupId) {
            console.log("dddd")
            this.setState({
                groupId: groupId
            })
            axios.get('SuperAdmin/getgroupdetailsbyid?groupid=' + groupId)
                .then((response) => {
                    if (response.data.status) {
                        this.setState({
                            groupId: response.data.result.groupId,
                            groupName: response.data.result.groupName,
                            description: response.data.result.description,
                            startDate: Moment(response.data.result.startDate)._d,
                            EndDate: Moment(response.data.result.endDate)._d,
                            CategoryId: (response.data.result.category - 1),
                            groupCategory: (response.data.result.category - 1),
                            GroupTitle: response.data.result.groupName,
                            groupdescription: response.data.result.description,
                            image: response.data.result.image,
                            groupIcon: response.data.result.groupIcon,
                            company:response.data.result.company,
                            objective:response.data.result.objective,
                            speaker:response.data.result.speaker,
                            videoId:response.data.result.videoId,
                        });
                        console.log("Success", response.data.result)
                    } else {
                        console.log("Fail X")
                    }
                })
                .catch((error) => {
                    console.log(error)
                })
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
                <CCardHeader className='d-flex align-items-center' component="h5">
                    <div className="col-sm ">Contributor Meta {this.state.groupId ? "Edit" : "Add"}</div>
                    {/* <NavLink to="/contributor_meta/" type="button" className="btn btn btn-primary btn-sm mt-2 mb-2 me-1">Back</NavLink> */}
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
                                type="Name"
                                id="groupName"
                                label="Name"
                                value={this.state.groupName}
                                onChange={this.handleChange}
                                placeholder='Enter Name'
                                feedbackInvalid="Please enter a valid name."
                                required
                            />
                        </CCol>
                        {/* <CCol md={12}>
                            <CFormLabel>Description</CFormLabel>
                            <CFormInput
                                id="description"
                                editor={ClassicEditor}
                                value={this.state.description}
                                onChange={this.handleChange}
                                placeholder='Enter Group Description'
                                feedbackInvalid="Please enter a valid description."
                                required

                            />
                        </CCol> */}
                        {/* <CCol md={6}>
                            <CFormLabel>Start</CFormLabel>
                            <DatePicker
                                className='form-control'
                                dateFormat={"MM/dd/yyyy"}
                                minDate={new Date()}
                                selected={this.state.startDate}
                                id="startDate"
                                feedbackInvalid="Please select a valid start date."
                                onChange={(date) => {
                                    let updatedStateData = updateObject(this.state, { "startDate": date })
                                    this.setState(updatedStateData);
                                }
                                }
                            />
                        </CCol> */}
                        {/* <CCol md={6}>
                            <CFormLabel>End</CFormLabel>
                            <DatePicker
                                className='form-control'
                                dateFormat={"MM/dd/yyyy"}
                                minDate={new Date()}
                                selected={this.state.EndDate}
                                id="EndDate"
                                feedbackInvalid="Please select a valid end date."
                                onChange={(date) => {
                                    let updatedStateData = updateObject(this.state, { "EndDate": date })
                                    this.setState(updatedStateData);
                                }
                                }
                            />
                        </CCol> */}
                        <CCol md={6}>
                            <CFormSelect
                                id="groupCategory"
                                value={this.state.groupCategory}
                                onChange={this.handleChange}
                                label="Category"
                                feedbackInvalid="Please select a valid category."
                                required
                            >
                                <option value=""> --- Select Category ---</option>
                                <option value="material_manufacturer">Material Manufacturer</option>
                                <option value="researcher">Researcher</option>
                                <option value="phd_scholar">Ph. D. scholar</option>
                                <option value="epd_lca_consultant">EPD or LCA consultant</option>
                                <option value="government_official">Government official</option>
                                <option value="other">Other</option>
                                {/* {
                                    this.state.categoryList.map((item, i) => (
                                        <option key={i} value={i}>{item.categoryName}</option>

                                    ))
                                } */}
                            </CFormSelect>
                        </CCol>
                        <CCol md={6}>
                            <CFormInput
                                type="Affiliation"
                                id="groupName"
                                label="Affiliation"
                                value={this.state.groupName}
                                onChange={this.handleChange}
                                placeholder='Enter Affiliation'
                                feedbackInvalid="Please enter a valid affiliation."
                                required
                            />
                        </CCol>
                        <CCol md={6}>
                            <CFormInput
                                type="Email"
                                id="groupName"
                                label="Email"
                                value={this.state.groupName}
                                onChange={this.handleChange}
                                placeholder='Enter Email'
                                feedbackInvalid="Please enter a valid email."
                                required
                            />
                        </CCol>
                        <CCol md={6}>
                            <CFormSelect
                                id="groupCategory"
                                value={this.state.groupCategory}
                                onChange={this.handleChange}
                                label="Publication Reviewed"
                                feedbackInvalid="Please select a valid publication reviewed."
                                required
                            >
                                <option value=''>Select Publication Reviewed</option>
                                <option value='yes'>Yes</option>
                                <option value='no'>No</option>
                            </CFormSelect>
                        </CCol>
                        <CCol md={6}>
                            <CFormInput
                                type="Corresponding Author"
                                id="groupName"
                                label="Corresponding Author"
                                value={this.state.groupName}
                                onChange={this.handleChange}
                                placeholder='Enter Corresponding Author'
                                feedbackInvalid="Please enter a valid corresponding author."
                                required
                            />
                        </CCol>
                        <CCol md={6}>
                            <CFormInput
                                type="Publication Title"
                                id="groupName"
                                label="Publication Title"
                                value={this.state.groupName}
                                onChange={this.handleChange}
                                placeholder='Enter Publication Title'
                                feedbackInvalid="Please enter a valid publication title."
                                required
                            />
                        </CCol>
                        <CCol md={6}>
                            <CFormInput
                                type="Publication Weblink"
                                id="groupName"
                                label="Publication Weblink"
                                value={this.state.groupName}
                                onChange={this.handleChange}
                                placeholder='Enter Publication Weblink'
                                feedbackInvalid="Please enter a valid publication weblink."
                                required
                            />
                        </CCol>
                        {/* <CCol md={12}>
                            <CFormInput
                                type="file"
                                id="Image"
                                label="Document"
                                onChange={this.onFileChangeAddFile}
                            />
                        </CCol> */}
                        {/* <CCol xs={3}>
                            {this.state.image?.map((pic) => {
                                return (
                                    <a href={pic} type="button" target="_blank" className="btn btn btn-primary btn-sm mt-2 me-1">
                                        <img
                                            src={pdf}
                                            width="100px"
                                            height="100px"
                                            alt="PDF"
                                        />
                                    </a>
                                );
                            })}
                        </CCol> */}
                        {/* <CCol md={12}>
                            <CFormInput
                                type="file"
                                id="featuresimage"
                                label="Featured Image"
                                onChange={this.onFileChangeFeaturedImage}

                            />
                        </CCol> */}
                        {/* <CCol md={4}>
                            {this.state.groupIcon ? 
                            (
                                <img
                                    src={this.state.groupIcon}
                                    width="100px"
                                    alt="placeholder grey 100px"
                                />

                            )
                                : ""}
                        </CCol> */}
                        {/* <CCol md={12}>
                            <CFormLabel>Document Description</CFormLabel>
                            <CFormInput
                                editor={ClassicEditor}
                                id="groupdescription"
                                value={this.state.groupdescription}
                                onChange={this.handleChange}
                                feedbackInvalid="Please select a valid group description."
                                required
                            />
                        </CCol> */}
                        {/* <CCol md={12}>
                            <CFormLabel>Company</CFormLabel>
                            <CFormInput
                                type="company"
                                id="company"
                                label="Company"
                                value={this.state.company}
                                onChange={this.handleChange}
                                placeholder='Enter Company Name'
                                feedbackInvalid="Please enter a valid company name."
                                required
                            />
                        </CCol> */}
                        {/* <CCol md={12}>
                            <CFormLabel>Objective</CFormLabel>
                            <CFormInput
                                type="objective"
                                id="objective"
                                label="objective"
                                value={this.state.objective}
                                onChange={this.handleChange}
                                placeholder='Enter Objective Name'
                                feedbackInvalid="Please enter a valid objective name."
                                required
                            />
                        </CCol> */}
                        {/* <CCol md={12}>
                            <CFormLabel>Speaker</CFormLabel>
                            <CFormInput
                                type="speaker"
                                id="speaker"
                                label="speaker"
                                value={this.state.speaker}
                                onChange={this.handleChange}
                                placeholder='Enter Speaker Name'
                                feedbackInvalid="Please enter a valid speaker name."
                                required
                            />
                        </CCol> */}
                        {/* <CCol md={12}>
                            <CFormLabel>Videos</CFormLabel>
                            <CFormInput
                                editor={ClassicEditor}
                                id="videoId"
                                value={this.state.videoId}
                                onChange={this.handleChange}
                                feedbackInvalid="Please select a valid videos description."
                                required
                            />
                        </CCol> */}
                        <CCol xs={12}>
                            <CButton class="save-btn" type="submit">{AddEditButton}</CButton>
                        </CCol>
                    </CForm>
                </CCardBody>
            </CCard>
        );
    }
}

const getBase64 = (file, state) => {
    return new Promise(resolve => {
        let fileInfo;
        let baseURL = "";
        // Make new FileReader
        let reader = new FileReader();

        // Convert the file to base64 text
        reader.readAsDataURL(file);

        // on reader load somthing...
        reader.onload = () => {
            // Make a fileInfo Object
            console.log("Called", reader);
            baseURL = reader.result;

            console.log(baseURL.result);
            resolve(baseURL);
        };
        console.log(fileInfo);
    });
};

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
        onAddEditForm: (params, token) => dispatch(actions.groupAddEdit(params, token)),
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProp)(AddEdit))