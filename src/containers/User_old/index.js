import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
    CCard,
    CCardHeader,
    CCardBody,
    CCol,
    CFormInput,
    CFormSelect,
    CTooltip
} from '@coreui/react';
import DataTable from "react-data-table-component";
import Moment from 'moment';
import swal from 'sweetalert';

import * as actions from '../../store/actions'
import { Link, NavLink } from 'react-router-dom';
import { updateObject } from '../../store/Utility';
import { cilPen, cilPlus, cilUser, cilUserX } from '@coreui/icons';
import CIcon from '@coreui/icons-react';

class UserList extends Component {
    // constructor(props){
    //     super(props)
    state = {
        mounted: false,
        filterText: "",
        roleId : "",
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
                name: 'Name',
                selector: row => `${row.firstName}`,
                sortable: true,
            },
            {
                name: 'Email',
                selector: row => `${row.email}`,
                sortable: true,
            },
            {
                name: 'Role Name',
                selector: row => `${row.roleName}`,
                sortable: true,
            },
            {
                name: 'Date',
                selector: row => `${row.createdOn}`,
                sortable: true,
                cell: row => {
                    return (
                        <span>{Moment(row.createdOn).format('DD-MM-YYYY')}</span>
                    )
                }
            },
            {
                name: 'Actions',
                sortable: false,
                right: true,
                cell: row => {
                    return (
                        <div>
                            {/* <Link to={`/members/${row.memberId}`} type="button" className="btn btn-primary btn-sm ms-2 mt-2">View</Link> */}
                            {/* <Link type="button" className="btn btn-primary btn-sm ms-2 mt-2">View</Link>
                            <button type="button" onClick={(e) => { this.deleteUser(row.memberId) }} className="btn btn-danger btn-sm  ms-2 mt-2">Delete</button>
                            <Link to={`/members/edit/${row.memberId}`} type="button" className="btn btn-info btn-sm ms-2 mt-2">Edit</Link> */}

                            <CTooltip content="User Detail"><Link to={`/user/request/${row.memberId}`} type="button" className="btn btn-primary btn-sm ms-2 mt-2"><CIcon size={'sm'} icon={cilUser} /></Link></CTooltip>
                            <CTooltip content="Delete User"><button type="button" onClick={(e) => { this.deleteUser(row.memberId) }} className="btn btn-danger btn-sm  ms-2 mt-2"><CIcon size={'sm'}  icon={cilUserX} /></button></CTooltip>
                            <CTooltip content="Edit User"><Link to={`/members/edit/${row.memberId}`} type="button" className="btn btn-info btn-sm ms-2 mt-2"><CIcon size={'sm'}  icon={cilPen} /></Link></CTooltip>
                        </div>
                    )
                }
            },
        ]
    }
    // }

    // handlePageChange = page => {
    //     const token = this.props.token
    //     const param = {
    //         order: 0,
    //         page: page
    //     }
    //     this.props.onUserList(param, token)
    // };

    handleChange = event => {
        let updatedStateData = this.state
        updatedStateData = updateObject(this.state, { [event.target.id]: event.target.value })
        this.setState(updatedStateData)
        this.props.onUserListFilter(event.target.value,this.state.roleId)
    }

    handleRoleChange = event => {
        let updatedStateData = this.state
        updatedStateData = updateObject(this.state, { [event.target.id]: event.target.value })
        this.setState(updatedStateData)
        this.props.onUserListFilter(this.state.filterText,event.target.value)
    }

    delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));
    deleteUser(id) {
        swal({
            title: "Are you sure?",
            text: "Once deleted, you will not be able to recover this Details!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
            .then(async (willDelete) => {
                if (willDelete) {
                    this.props.onUserDelete(id, "")
                    const token = this.props.token
                    const param = {
                        order: 7,
                        page: 1
                    }
                    await this.delay(2000);
                    this.props.onUserList(param, token)
                    swal("Your Details  has been deleted!", {
                        icon: "success",
                    });
                } else {
                    swal("Your details are Safe");
                }
            });
    }

    componentDidMount() {
        const param = {
            order: 7,
            page: 1
        }
        this.props.onUserList(param)
        this.props.onGetRoleList()

    }

    getSubHeaderComponent = () => {
        return (
            <div className='row g-3'>
                <CCol md={6}>
                    <CFormInput
                        type="text"
                        id='filterText'
                        value={this.state.filterText}
                        onChange={this.handleChange}
                        size="sm"
                        placeholder="Search...."
                    />
                </CCol>
                <CCol md={6}>
                    <CFormSelect
                        id="roleId"
                        value={this.state.roleId}
                        onChange={this.handleRoleChange}
                        size="sm"
                    >
                        <option disabled="" value=""> --- Select Role ---</option>
                        {
                            this.props.roleList.map((item, i) => (
                                <option key={i} value={item.roleName}>{item.roleName}</option>

                            ))
                        }
                    </CFormSelect>
                </CCol>
            </div>

        );
    };

    render() {
        return (
            <CCard>
                <CCardHeader className='d-flex' component="h5">
                    <div className="col-sm">Members</div>
                    <div className="col-sm text-end">
                    <CTooltip content="Add Member"><NavLink to="/members/add" type="button" className="btn btn btn-primary btn-sm"><CIcon size={'sm'} icon={cilPlus} /></NavLink></CTooltip>
                    </div>
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
                        // paginationServer
                        // paginationTotalRows="11"
                        // onChangePage={this.handlePageChange}
                        theme="solarized"
                        striped
                    />

                </CCardBody>
            </CCard>
        );
    }
}

const mapStateToProps = state => {
    return {
        roleList: state.user.roleList,
        loading: state.user.loading,
        data: state.user.data,
        error: state.user.error,
        token: state.auth.token,
    }
}

const mapDispatchToProp = dispatch => {
    return {
        onUserList: (param) => dispatch(actions.userList(param)),
        onUserListFilter: (filterText,role) => dispatch(actions.userListFilter(filterText,role)),
        onGetRoleList: () => dispatch(actions.getRoleList()),
        onUserDelete: (id, token) => dispatch(actions.userDelete(id, token))
    }
}

export default connect(mapStateToProps, mapDispatchToProp)(UserList)