import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
    CCard,
    CCardHeader,
    CCardBody,
    CFormInput,
    CRow,
    CCol,
    CTooltip
} from '@coreui/react';
import DataTable from "react-data-table-component";
import Moment from 'moment';
import swal from 'sweetalert';
import * as actions from '../../store/actions'
import { NavLink } from 'react-router-dom';
import { cilPen, cilPlus, cilTrash } from '@coreui/icons';
import CIcon from '@coreui/icons-react';

class User extends Component {

    state = {
        filterText: "",
        resetPaginationToggle: false,
        columnUser: [
            {
                name: 'Sr.',
                selector: (row, index) => index + 1,
                sortable: true,
                width: "100px",
            },
            {
                name: 'Role',
                selector: row => row.role_name,
                sortable: true,
                width: "200px",
            },
            {
                name: 'Name',
                selector: row => row.name,
                sortable: true,
                width: "200px",
            },
            {
                name: 'Email',
                selector: row => row.email,
                sortable: true,
                width: "200px",
            },
            {
                name: 'Created At',
                selector: row => `${row.created_at}`,
                sortable: true,
                width: "200px",
                cell: row => {
                    return (
                        <span>{Moment(row.created_at).format('DD-MM-YYYY')}</span>
                    )
                }
            },
            {
                name: 'Actions',
                sortable: false,
                width: "200px",
                cell: row => {
                    return (
                        <div>
                            <CTooltip content="Edit User"><NavLink to={`/users/edit/${row.id}`} className="edit-btn"><CIcon size={'sm'} icon={cilPen} /></NavLink></CTooltip>
                            <CTooltip content="Delete User"><button type="button" onClick={(e) => { this.deleteUser(row.id) }} className="delete-btn"><CIcon size={'sm'} icon={cilTrash} /></button></CTooltip>
                        </div>
                    )
                }
            },
        ]
    }
    delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));
    componentDidMount() {
        const token = this.props.token
        const param = {
            order: 2,
            page: 1
        }
        this.props.onUserList(param, token)
    }

    deleteUser(id) {
        swal({
            title: "Are you sure you want to delete these details?",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
        .then(async (willDelete) => {
            if (willDelete) {
                this.props.onUserDelete(id, id)
                const token = this.props.token
                const param = {
                    order: 6,
                    page: 1
                }
                await this.delay(1000)
                this.props.onUserList(param, token)
                swal({
                    title: "Deleted!",
                    text: "Your file has been deleted.",
                    icon: "success",
                });
            } else {
                swal({
                    title: "Your details have been saved safely!",
                    icon: "success",
                });
            }
        });
    }

    getSubHeaderComponent = () => {
        return (
            <CRow className="mb-3">
                <CCol sm={12}>
            <CFormInput
                onChange={(e) => {
                    let newFilterText = e.target.value;
                    this.setState({ filterText: newFilterText });
                    this.props.onUserListFilter(newFilterText);
                }}
                value={this.state.filterText}
                size="sm"
                placeholder="search..."
            />
            </CCol>
            </CRow>
        );
    };

    render() {
        return (
            <CCard>
                <CCardHeader className='d-flex' component="h5">
                    <div className="col-sm">User List</div>
                    <div className="col-sm text-end">
                        <CTooltip content="Add User"><NavLink to="/users/add" type="button" className="plus-btn"><CIcon size={'sm'} icon={cilPlus} /></NavLink></CTooltip>
                    </div>
                </CCardHeader>
                <CCardBody>
                    <DataTable
                        columns={this.state.columnUser}
                        data={this.props.data}
                        defaultSortFieldId={6}
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
                        persistTableHead
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
        loading: state.user.loading,
        data: state.user.data,
        error: state.user.error,
        token: state.auth.token,
    }
}

const mapDispatchToProp = dispatch => {
    return {
        onUserList: (param) => dispatch(actions.userList(param)),
        onUserListFilter: (filterText) => dispatch(actions.userListFilter(filterText)),
        onUserDelete: (id, token) => dispatch(actions.userDelete(id, token)),
        OnUserDetail: (id, token) => dispatch(actions.getUserDetail(id, token))
    }
}

export default connect(mapStateToProps, mapDispatchToProp)(User)