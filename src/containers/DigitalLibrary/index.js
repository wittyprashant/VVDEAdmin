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
import { cilPen, cilTrash,cilPlus } from '@coreui/icons';
import CIcon from '@coreui/icons-react';

class DigitalLibrary extends Component {

    state = {
        filterText: "",
        resetPaginationToggle: false,
        columnDigital: [
            {
                name: 'Title',
                selector: row => `${row.title}`,
                sortable: true,
                width: "300px",
            },
            {
                name: 'Image',
                selector: row => `${row.featureImage}`,
                sortable: false,
                width: "100px",
                cell: row => {
                    return (
                        <img alt={`feature`} width={'60px'} height={"50px"} src={row.featureImage} />
                    )
                }
            },
            {
                name: 'Category',
                selector: row => `${row.category}`,
                sortable: true,
                width: "200px",
            },
            {
                name: 'Date',
                selector: row => `${row.createdOn}`,
                sortable: true,
                width: "150px",
                cell: row => {
                    return (
                        <span>{Moment(row.createdOn).format('DD-MM-YYYY')}</span>
                    )
                }
            },
            {
                name: 'Actions',
                sortable: false,
                width: "150px",
                cell: row => {
                    return (
                        <div>
                            {/* <NavLink to={`/digital_library/edit/${row.digitalLibraryId}`} onClick={(e) => { this.GetbyFundingforms(row.fundingId) }} className="btn btn btn-sm btn-info mt-2 me-1">Edit</NavLink>
                            <button type="button" onClick={(e) => { this.deleteDigitalLibrary(row.digitalLibraryId) }} className="btn btn-sm btn-danger mt-2">Delete</button> */}
                            <CTooltip content="Edit Digital Library"><NavLink to={`/digital_library/edit/${row.digitalLibraryId}`} onClick={(e) => { this.GetbyFundingforms(row.fundingId) }} className="btn btn btn-sm btn-info mt-2 me-1"><CIcon size={'sm'}  icon={cilPen} /></NavLink></CTooltip>
                            <CTooltip content="Delete Digital Library"><button type="button" onClick={(e) => { this.deleteDigitalLibrary(row.digitalLibraryId) }} className="btn btn-sm btn-danger mt-2"><CIcon size={'sm'}  icon={cilTrash} /></button></CTooltip>
                        </div>
                    )
                }
            },
        ]
    }

    componentDidMount() {
        const param = {
            order: 2,
            page: 1
        }
        this.props.onDigitalLibraryList(param)
    }

    delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));
    deleteDigitalLibrary(id) {
        swal({
            title: "Are you sure?",
            text: "Once deleted, you will not be able to recover this Details!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
            .then(async (willDelete) => {
                if (willDelete) {
                    this.props.onDigitalLibraryDelete(id, "")
                    const param = {
                        order: 5,
                        page: 1
                    }
                    await this.delay(1000);
                    this.props.onDigitalLibraryList(param)
                    swal("Your Details  has been deleted!", {
                        icon: "success",
                    });
                } else {
                    swal("Your details are Safe");
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
                    this.props.onDigitalLibraryFilterList(newFilterText);
                }}
                value={this.state.filterText}
                size="sm"
                placeholder="Search..."
            />
            </CCol>
            </CRow>
        );
    };

    render() {
        return (
            <CCard>
                <CCardHeader className='d-flex' component="h5">
                    <div className="col-sm">Digital Library List</div>
                    <div className="col-sm text-end">
                        {/* <NavLink to="/digital_library/add" type="button" className="btn btn btn-primary btn-sm">Add Digital Library</NavLink> */}
                        <CTooltip content="Add Digital Library"><NavLink to={"/digital_library/add/"} type="button" className="btn btn-sm btn-primary mt-2 me-1"><CIcon size={'sm'}  icon={cilPlus} /></NavLink></CTooltip>
                    </div>
                </CCardHeader>
                <CCardBody>
                    <DataTable
                        columns={this.state.columnDigital}
                        data={this.props.data}
                        defaultSortFieldId={5}
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
        loading: state.digitalLibrary.loading,
        data: state.digitalLibrary.data,
        error: state.digitalLibrary.error,
        token: state.auth.token,
    }
}

const mapDispatchToProp = dispatch => {
    return {
        onDigitalLibraryList: (param) => dispatch(actions.digitalLibraryList(param)),
        onDigitalLibraryFilterList: (text) => dispatch(actions.digitalLibraryListFilter(text)),
        onDigitalLibraryDelete: (id, token) => dispatch(actions.digitalLibraryDelete(id, token))
    }
}

export default connect(mapStateToProps, mapDispatchToProp)(DigitalLibrary)
