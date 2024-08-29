import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
    CCard,
    CCardHeader,
    CCardBody
} from '@coreui/react';
import DataTable from "react-data-table-component";
import swal from 'sweetalert';

import * as actions from '../../store/actions'
import { NavLink } from 'react-router-dom';

class GroupCategory extends Component {

    state = {
        columnGroup: [
            {
                name: 'Group Category Name',
                selector: row => `${ row.categoryName }`,
                sortable: true,
                width: "800px",
            },
            {
                name: 'Action',
                sortable: false,
                width: "150px",
                cell: row => {
                    return (
                        <div>
                            {/* <button type="button" className="btn btn-sm btn-primary me-2 mt-2" onClick={(e) => { this.OnclickGroupDetails(row.groupId) }}>View</button> */}
                            {/* <button type="button" onClick={(e) => { this.GetbyGroupId(row.categoryId) }} className="btn btn-sm btn-info mt-2 me-1">Edit</button> */}
                            {/* <button type="button" onClick={(e) => { this.deleteGroupCategory(row.categoryId) }} className="btn btn-sm btn-danger mt-2">Delete</button> */}
                        </div>

                    )
                }
            },
        ]
    }

    componentDidMount() {
        const token = this.props.token
        const param = {
            order: 2,
            page: 1
        }
        this.props.onGroupCategory(param, token)
    }

    deleteGroupCategory(id) {
        swal({
            title: "Are you sure?",
            text: "Once deleted, you will not be able to recover this Details!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
            .then((willDelete) => {
                if (willDelete) {
                    this.props.onGroupCategoryDelete(id, "")
                    const token = this.props.token
                    const param = {
                        order: 2,
                        page: 1
                    }
                    this.props.onGroupCategory(param, token)
                    swal("Your Details  has been deleted!", {
                        icon: "success",
                    });
                } else {
                    swal("Your details are Safe");
                }
            });
    }

    render() {
        return (
            <CCard>
                <CCardHeader className='d-flex' component="h5">
                <NavLink to="/contributor_meta" type="button" className="btn btn btn-primary btn-sm mt-2 me-1">Back</NavLink> 
                    <div className="col-sm">Group Category List</div>
                    <div className="col-sm text-end">
                        <NavLink to="/category/add" type="button" className="btn btn btn-primary btn-sm mt-2 me-1">Add Group Category</NavLink>
                    </div>
                </CCardHeader>
                <CCardBody>
                    <DataTable
                        columns={this.state.columnGroup}
                        data={this.props.data}
                        defaultSortFieldId={7}
                        progressPending={this.props.loading}
                        pagination
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
        loading: state.group.loading,
        data: state.group.data,
        error: state.group.error,
        token: state.auth.token,
    }
}

const mapDispatchToProp = dispatch => {
    return {
        onGroupCategory: (param, token) => dispatch(actions.groupCategory(param, token)),
        onGroupCategoryDelete: (id, token) => dispatch(actions.groupCategoryDelete(id, token))
    }
}

export default connect(mapStateToProps, mapDispatchToProp)(GroupCategory)