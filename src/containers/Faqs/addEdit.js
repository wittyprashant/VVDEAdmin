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
    CFormTextarea,
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
        const match = useMatch('/faqs/edit/:faqId');
        return <Component {...props} match={match} navigate={navigate} location={location} params={params} />;
    }
}

class AddEdit extends Component {
    state = {
        faqId: 0,
        validated: false,
        changedProp: false,
        answers: "",
        question: "",
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
            let faqDetails = this.state
            delete faqDetails.changedProp
            delete faqDetails.validated
            this.props.onAddEditForm(this.state)
        }
    }

    handleChange = event => {
        let updatedStateData = this.state
        updatedStateData = updateObject(this.state, { [event.target.id]: event.target.value })
        this.setState(updatedStateData)
    }

    componentDidMount() {
        let faqId = this.props.match ? this.props.match.params.faqId : ""
        if (faqId) {
            this.setState({
                faqId: faqId
            })
            this.props.onFaqDetail(faqId)            
        }
    }

    componentDidUpdate(prevProps) {
        let faqDetail = this.props.faqDetail
        if (this.props.faqDetail === null) {
            return false;
        }
        if (this.state.changedProp === false) {
            faqDetail["changedProp"] = true
            this.setState(faqDetail);
        }
    }

    delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));
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
                    <div className="col-sm">FAQ {this.state.faqId ? "Edit" : "Add"}</div>
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
                                id="question"
                                label="Question"
                                value={this.state.question}
                                onChange={this.handleChange}
                                placeholder='Enter Question'
                                feedbackInvalid="Please enter a valid question."
                                required
                            />
                        </CCol>

                        <CCol md={12}>
                            <CFormTextarea
                                type="text"
                                id="answers"
                                label="Answer"
                                value={this.state.answers}
                                onChange={this.handleChange}
                                placeholder='Enter Answer'
                                feedbackInvalid="Please enter a valid answer."
                                required
                            />
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
        redirectTo: state.faq.redirectTo,
        addEditLoading: state.faq.addEditLoading,
        addEditError: state.faq.addEditError,
        faqDetail: state.faq.faqDetail,
        faqDetailError: state.faq.faqDetailError,
    }
}
const mapDispatchToProp = dispatch => {
    return {
        onAddEditForm: (params) => dispatch(actions.faqAddEdit(params)),
        onFaqDetail: (id) => dispatch(actions.getfaqDetail(id))
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProp)(AddEdit))