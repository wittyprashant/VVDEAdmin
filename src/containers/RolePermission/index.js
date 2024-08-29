import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
    useLocation,
    useNavigate,
    useParams,
    useMatch,
} from "react-router-dom";
import {
    CCard,
    CCardHeader,
    CCardBody,
    CRow,
    CFormLabel,
    CCol,
    CFormSelect,
    CContainer,
    CForm,
    CButton
} from '@coreui/react';
import swal from 'sweetalert';
import { updateObject } from '../../store/Utility'
import * as actions from '../../store/actions'

function withRouter(Component) {
    return (props) => {
        const location = useLocation();
        const navigate = useNavigate();
        const params = useParams();
        const match = useMatch('/members/edit/:memberId');
        return <Component {...props} match={match} navigate={navigate} location={location} params={params} />;
    }
}

class RolePermission extends Component {

    constructor() {
        super();
        this.state = {
            validated: false,
            roleId: 0,
            changedProp:true,
            digitalLibraryId: [],
            // fundingIds: [],
            // eventIds: [],
            // replaysIds: [],
            groupIds: [],
        };
    }

    componentDidMount() {
        const param = {
            order: 5,
            page: 1
        }
        this.props.onGetRoleList()
        this.props.onDigitalLibraryList(param)
        // this.props.onFundList(param)
        // this.props.onEventList(param)
        // this.props.onReplayList(param)
        this.props.onGroupList(param)
    }

    roleChange = event => {
        let updatedStateData = this.state
        updatedStateData = updateObject(this.state, { [event.target.id]: event.target.value , changedProp : event.target.value !== "" ? false : true })        
        this.setState(updatedStateData)
        this.props.onRolePermisionData(event.target.value)        
    }

    handleChange = event => {
        console.log(event.target.selectedOptions)
        let updatedStateData = this.state
        if (event.target.id !== "roleId") {
            updatedStateData = updateObject(this.state, { [event.target.id]: [...event.target.selectedOptions].map(o => o.value) });
            // this.setState({multiValue: [...evt.target.selectedOptions].map(o => o.value)}); 
        } else {
            updatedStateData = updateObject(this.state, { [event.target.id]: event.target.value })
        }
        this.setState(updatedStateData)
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

            let formData = {
                roleId : this.state.roleId,
                digitalLibraryId : this.state.digitalLibraryId.toString(),
                // eventIds : this.state.eventIds.toString(),
                // fundingIds : this.state.fundingIds.toString(),
                groupIds : this.state.groupIds.toString(),
                // replaysIds : this.state.replaysIds.toString(),
            };
            
            this.props.onAddEditForm(formData)
        }
    }

    async componentDidUpdate(prevProps) {
        let roleDetail = this.props.rolePermissionData
        
        if (this.props.addEditSuccess) {
            swal("Poof! Your Details  has been save changes !", {
                icon: "success",
            });
            this.props.onAddEditRoleSuccessNull();
        }

        if (roleDetail === null) {
            return false;
        }
        
        if (this.state.changedProp === false && roleDetail) {
            roleDetail["changedProp"] = true
            let  updatedStateData = updateObject(this.state, roleDetail)
            this.setState(updatedStateData);
        }
    }

    render() {
        // onAddEditRoleSuccessNull
        
        let AddEditButton = !this.props.addEditLoading ? "Save" : "Please Wait ..."
        return (
            <CCard>
                <CCardHeader className='d-flex' component="h5">
                    <div className="col-sm">Role & Permission</div>
                </CCardHeader>
                <CCardBody>
                    <CForm
                        className="row g-3 mt-2"
                        noValidate
                        validated={this.state.validated}
                        onSubmit={this.handleSubmit}
                    >
                        <CRow className="mb-3">
                            <CFormLabel htmlFor="staticEmail" className="col-sm-2 col-form-label">Role</CFormLabel>
                            <CCol sm={10}>
                                <CFormSelect
                                    id="roleId"
                                    value={this.state.roleId}
                                    onChange={this.roleChange}
                                    feedbackInvalid="Please select a valid role."
                                    required
                                    size="sm"
                                >
                                    <option disabled="" value=""> --- Select Role ---</option>
                                    {
                                        this.props.roleList.map((item, i) => {
                                            if(item.roleId !== 4){
                                               return <option key={i} value={item.roleId}>{item.roleName}</option>
                                            }else{
                                               return ""; 
                                            }
                                        })
                                    }
                                </CFormSelect>
                            </CCol>
                        </CRow>
                        <hr />
                        <CContainer>
                            <CRow>
                                <CCol sm="12" className='h6'>Permision</CCol>
                            </CRow>
                        </CContainer>
                        <hr />
                        {/* <CRow className="mb-3">
                            <CFormLabel htmlFor="digitalLibraryId" className="col-sm-2 col-form-label">Digital Library</CFormLabel>
                            <CCol sm={10}>
                                <CFormSelect
                                    multiple
                                    id="digitalLibraryId"
                                    value={this.state.digitalLibraryId}
                                    onChange={this.handleChange}
                                    feedbackInvalid="Please select a valid digital library."
                                    required
                                    size="sm"
                                >
                                    <option disabled="" value=""> --- digital library ---</option>
                                    {
                                        this.props.digitalLibraryList.map((item, i) => (
                                            <option key={i} value={item.digitalLibraryId}>{item.title}</option>

                                        ))
                                    }
                                </CFormSelect>
                            </CCol>
                        </CRow> */}

                        {/* <CRow className="mb-3">
                            <CFormLabel htmlFor="fundingIds" className="col-sm-2 col-form-label">Funding</CFormLabel>
                            <CCol sm={10}>
                                <CFormSelect
                                    multiple
                                    id="fundingIds"
                                    value={this.state.fundingIds}
                                    onChange={this.handleChange}
                                    feedbackInvalid="Please select a valid fund."
                                    required
                                    size="sm"
                                >
                                    <option disabled="" value=""> --- Fund ---</option>
                                    {
                                        // this.props.fundList.map((item, i) => (
                                        //     <option key={i} value={item.fundingId}>{item.title}</option>

                                        // ))
                                    }
                                </CFormSelect>
                            </CCol>
                        </CRow> */}

                        {/* <CRow className="mb-3">
                            <CFormLabel htmlFor="eventIds" className="col-sm-2 col-form-label">Event</CFormLabel>
                            <CCol sm={10}>
                                <CFormSelect
                                    multiple
                                    id="eventIds"
                                    value={this.state.eventIds}
                                    onChange={this.handleChange}
                                    feedbackInvalid="Please select a valid event."
                                    required
                                    size="sm"
                                >
                                    <option disabled="" value=""> --- Event ---</option>
                                    {
                                        this.props.eventList.map((item, i) => (
                                            <option key={i} value={item.eventId}>{item.title}</option>

                                        ))
                                    }
                                </CFormSelect>
                            </CCol>
                        </CRow> */}

                        {/* <CRow className="mb-3">
                            <CFormLabel htmlFor="replaysIds" className="col-sm-2 col-form-label">Replays</CFormLabel>
                            <CCol sm={10}>
                                <CFormSelect
                                    multiple
                                    id="replaysIds"
                                    value={this.state.replaysIds}
                                    onChange={this.handleChange}
                                    feedbackInvalid="Please select a valid replay."
                                    required
                                    size="sm"
                                >
                                    <option disabled="" value=""> --- Replay ---</option>
                                    {
                                        this.props.replayList.map((item, i) => (
                                            <option key={i} value={item.id}>{item.title}</option>

                                        ))
                                    }
                                </CFormSelect>
                            </CCol>
                        </CRow> */}

                        <CRow className="mb-3">
                            <CFormLabel htmlFor="groupIds" className="col-sm-2 col-form-label">Group</CFormLabel>
                            <CCol sm={10}>
                                <CFormSelect
                                    multiple
                                    id="groupIds"
                                    value={this.state.groupIds}
                                    onChange={this.handleChange}
                                    feedbackInvalid="Please select a valid group."
                                    required
                                    size="sm"
                                    
                                >
                                    <option disabled="" value=""> --- Group --- </option>
                                    {
                                        this.props.groupList.map((item, i) => (
                                            <option key={i} value={item.groupId}>{item.groupName}</option>

                                        ))
                                    }
                                </CFormSelect>
                            </CCol>
                        </CRow>

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
        roleList: state.user.roleList,
        digitalLibraryList: state.digitalLibrary.data,
        // fundList: state.fund.data,
        // eventList: state.event.data,
        groupList: state.group.data,
        // replayList: state.replay.data,
        addEditLoading: state.role.addEditLoading,
        rolePermissionData: state.role.roleDetailDatail,
        addEditSuccess: state.role.addEditSuccess,
    }
}

const mapDispatchToProp = dispatch => {
    return {
        // onGetRoleList: () => dispatch(actions.getRoleList()),
        onDigitalLibraryList: (param) => dispatch(actions.digitalLibraryList(param)),
        // onFundList: (param) => dispatch(actions.fundList(param)),
        // onEventList: (param) => dispatch(actions.materialList(param)),
        // onReplayList: (param) => dispatch(actions.replayList(param)),
        onGroupList: (param) => dispatch(actions.groupList(param)),
        // onAddEditForm: (params) => dispatch(actions.addEditRole(params)),
        onRolePermisionData: (roleId) => dispatch(actions.roleDetail(roleId)),
        // onAddEditRoleSuccessNull: () => dispatch(actions.addEditRoleSuccessNull()),
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProp)(RolePermission))