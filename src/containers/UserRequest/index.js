import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
    CCard,
    CCardHeader,
    CCardBody,
    CModal,
    CModalHeader,
    CModalTitle,
    CModalBody,
    CModalFooter,
    CButton,
    CFormSelect,
    CFormLabel,
    CCol,
    CRow,
    CForm,
    CFormInput,
    CTooltip
} from '@coreui/react';
import DataTable from "react-data-table-component";
import Moment from 'moment';

import * as actions from '../../store/actions'
import { updateObject } from '../../store/Utility'
import { Link } from 'react-router-dom';
import CIcon from '@coreui/icons-react';
import { cilUser, cilUserFollow } from '@coreui/icons';

class UserRequestList extends Component {

    state = {
        modelVisible: false,
        validated: false,
        statusId: 0,
        roleId: "",
        requestId: 0,
        memberId: 0,
        filterText: "",
        status : "",
        resetPaginationToggle: false,
        columnMember: [
            {
                name: 'Image',
                selector: row => `${row.firstName}`,
                sortable: true,
                cell: row => {
                    return (
                        <div>
                            <img alt={row.firstName} width={'50px'} height={'50px'} src={row.profileImage}></img>
                        </div>
                    )
                }
            },
            {
                name: 'First Name',
                selector: row => 'User1',
                sortable: true,
            },
            {
                name: 'Last Name',
                selector: row => 'User1',
                sortable: true,
            },
            {
                name: 'Email',
                selector: row => 'user@gmail.com',
                sortable: true,
            },
            {
                name: 'Status',
                selector: row => 'Active',
                sortable: false,
            },
            {
                name: 'Create Date',
                selector: row => `${row.createdOn}`,
                sortable: true,
                cell: row => {
                    return (
                        <span>{Moment(row.createdOn).format('DD-MM-YYYY')}</span>
                    )
                }
            },
            // {
            //     name: 'Action',
            //     sortable: false,
            //     right: true,
            //     cell: row => {
            //         return (
            //             <div>
            //                 {/* <Link to={`/user/request/${row.memberId}`} type="button" className="btn btn-primary btn-sm ms-2 mt-2">View</Link>
            //                 <button type="button" onClick={(e) => { this.requestUpdate(row.id,row.memberId) }} className="btn btn-success btn-sm  ms-2 mt-2">Request Update</button> */}
            //                 <CTooltip content="User Detail"><Link to={`/user/request/${row.memberId}`} type="button" className="btn btn-primary btn-sm ms-2 mt-2"><CIcon size={'sm'} icon={cilUser} /></Link></CTooltip>
            //                 <CTooltip content="Request Update"><button type="button" onClick={(e) => { this.requestUpdate(row.id,row.memberId) }} className="btn btn-success btn-sm  ms-2 mt-2"><CIcon size={'sm'} icon={cilUserFollow} /></button></CTooltip>
            //             </div>
            //         )
            //     }
            // },
        ]
    }



    delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));
    handleChange = event => {
        let updatedStateData = this.state
        updatedStateData = updateObject(this.state, { [event.target.id]: event.target.value })
        this.setState(updatedStateData)
    }

    handleChangeFilter = event  => {
        let updatedStateData = this.state
        updatedStateData = updateObject(this.state, { [event.target.id]: event.target.value })
        this.setState(updatedStateData)
        this.props.onUserRequestListFilter(event.target.value,this.state.status)
    }

    handleStatusChange = event  => {
        let updatedStateData = this.state
        updatedStateData = updateObject(this.state, { [event.target.id]: event.target.value })
        this.setState(updatedStateData)
        this.props.onUserRequestListFilter(this.state.filterText,event.target.value)
    }
     
    requestUpdate(id,memberId) {
        this.setState({ requestId  : id ,memberId : memberId ,modelVisible: true, statusId: "" , roleId : "" })
    }

    closeModel() {
        this.setState({ modelVisible: false , memberId : 0, requestId : 0 , validated : false})
    }

    componentDidMount() {
        const param = {
            order: 7,
            page: 1
        }
        this.props.onUserRequestList(param)
        this.props.onGetRoleList()
    }

    handleSubmit = async (event) => {
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
            this.props.onUserRequestUpdate(this.state.requestId,this.state.statusId,this.state.memberId,this.state.roleId)
        }
    }

    async componentDidUpdate(prevProps) {     
        if (this.props.updateData) {
            this.closeModel()
            this.props.onUpdateDataNull();
            this.props.onUserRequestList({
                order: 7,
                page: 1
            })
        }
    }

    getSubHeaderComponent = () => {
        return (
            <div className='row g-3'>
                <CCol md={6}>
                    <CFormInput
                        type="text"
                        id='filterText'
                        value={this.state.filterText}
                        onChange={this.handleChangeFilter}
                        size="sm"
                        placeholder="search...."
                    />
                </CCol>
                <CCol md={6}>
                    <CFormSelect
                        id="status"
                        value={this.state.status}
                        onChange={this.handleStatusChange}
                        size="sm"
                    >
                        <option disabled="" value=""> --- Select Status ---</option>
                        <option value="New Registration">New Registration</option>
                        <option value="Role Upgrade">Role Upgrade</option>
                    </CFormSelect>
                </CCol>
            </div>

        );
    };

    render() {
        return (
            <CCard>
                <CCardHeader className='d-flex' component="h5">
                    <div className="col-sm">Users</div>
                </CCardHeader>
                <CCardBody>
                    <DataTable
                        columns={this.state.columnMember}
                        data={this.props.data}
                        defaultSortFieldId={7}
                        defaultSortAsc={false}
                        progressPending={this.props.loading}
                        pagination
                        paginationResetDefaultPage={this.state.resetPaginationToggle} // optionally, a hook to reset pagination to page 1
                        subHeader
                        subHeaderComponent={this.getSubHeaderComponent()}
                        // selectableRows
                        // paginationServer
                        // paginationTotalRows="11"
                        // onChangePage={this.handlePageChange}
                        theme="solarized"
                        striped
                    />

                </CCardBody>

                <CModal visible={this.state.modelVisible} onClose={() => this.closeModel()}>
                    <CModalHeader onClose={() => this.closeModel()}>
                        <CModalTitle>Update User Request</CModalTitle>
                    </CModalHeader>
                    <CForm
                        className="row g-3"
                        noValidate
                        validated={this.state.validated}
                        onSubmit={this.handleSubmit}
                    >
                        <CModalBody>
                            <CRow className="mb-3">
                                <CFormLabel htmlFor="statusId" className="col-sm-2 col-form-label">Status</CFormLabel>
                                <CCol sm={10}>
                                    <CFormSelect
                                        id="statusId"
                                        value={this.state.statusId}
                                        onChange={this.handleChange}
                                        feedbackInvalid="Please select a valid status."
                                        required
                                        size="sm"
                                    >
                                        <option value="">-- select a status --</option>
                                        <option value="1">Accept</option>
                                        <option value="2">Reject</option>
                                    </CFormSelect>
                                </CCol>
                            </CRow>

                            {this.state.statusId === "1" && 
                            <CRow className="mb-3">
                                <CFormLabel htmlFor="roleId" className="col-sm-2 col-form-label">Role</CFormLabel>
                                <CCol sm={10}>
                                    <CFormSelect
                                        id="roleId"
                                        value={this.state.roleId}
                                        onChange={this.handleChange}
                                        feedbackInvalid="Please select a valid role."
                                        required
                                        size="sm"
                                    >
                                        <option disabled="" value=""> --- Select Role ---</option>
                                        {
                                            this.props.roleList.map((item, i) => (
                                                <option key={i} value={item.roleId}>{item.roleName}</option>

                                            ))
                                        }
                                    </CFormSelect>
                                </CCol>
                            </CRow>
                            }
                        </CModalBody>
                        <CModalFooter>
                            <CButton color="secondary" onClick={() => this.closeModel()}>
                                Close
                            </CButton>
                            <CButton type="submit" color="primary">Save changes</CButton>
                        </CModalFooter>
                    </CForm>
                </CModal>
            </CCard>
        );
    }
}

const mapStateToProps = state => {
    return {
        loading: state.userRequest.loading,
        data: state.userRequest.data,
        error: state.userRequest.error,
        roleList: state.user.roleList,
        updateData : state.userRequest.statusUPdateData,
    }
}

const mapDispatchToProp = dispatch => {
    return {
        onUserRequestList: (param, token) => dispatch(actions.UserRequestList(param, token)),
        onUserRequestListFilter: (text, status) => dispatch(actions.userRequestListFilter(text, status)),
        // onGetRoleList: () => dispatch(actions.getRoleList()),
        onUserRequestUpdate: (reqId,statusId,memberId,roleId) => dispatch(actions.UserRequestUpdate(reqId,statusId,memberId,roleId)),
        onUpdateDataNull: () => dispatch(actions.UpdateDataNull()),
    }
}

export default connect(mapStateToProps, mapDispatchToProp)(UserRequestList)