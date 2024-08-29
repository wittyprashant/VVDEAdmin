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

class MaterialList extends Component {
    state = {
        filterText : "",
        resetPaginationToggle: false,
        columnMaterial: [
            {
                name: 'Title',
                selector: row => row.name,
                sortable: true,
                maxWidth: "300px",
            },
            {
                name: 'Time / date',
                selector: row => `${row.created_at}`,
                sortable: true,
                maxWidth: "150px",
                cell: row => {
                    return (
                        <span>{Moment(row.created_at).format('DD-MM-YYYY')}</span>
                    )
                }
            },
            {
                name: 'Actions',
                sortable: false,
                maxWidth: "250px",
                cell: row => {
                    return (
                        <div>
                            <CTooltip content="Edit Material"><NavLink to={`/materials/edit/${row.id}`} className="edit-btn"><CIcon size={'sm'}  icon={cilPen} /></NavLink></CTooltip>
                            <CTooltip content="Delete Material"><button type="button" onClick={(e) => { this.deleteMaterial(row.id) }} className="delete-btn"><CIcon size={'sm'}  icon={cilTrash} /></button></CTooltip>
                        </div>
                    )
                }
            },
        ]
    };

    // handlePageChange = page => {
    //     const token = this.props.token
    //     const param = {
    //         order: 0,
    //         page: page
    //     }
    //     this.props.onEventList(param, token)
    // };

    componentDidMount() {
        const param = {
            order: 2,
            page: 1
        }
        this.props.onMaterialList(param)
        console.log("Props",this.props)
    }

    delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));
    deleteMaterial(id) {
        swal({
            title: "Are you sure?",
            text: "Once deleted, you will not be able to recover this Details!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
            .then(async(willDelete) => {
                if (willDelete) {
                    this.props.onMaterialDelete(id, "")
                    const param = {
                        order: 7,
                        page: 1
                    }
                    await this.delay(1000);
                    this.props.onMaterialList(param)
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
                    this.props.onMaterialListFilter(newFilterText);
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
                    <div className="col-sm">Material List</div>
                    <div className="col-sm text-end">
                        <CTooltip content="Add Material"><NavLink to={"/materials/add/"} type="button" className="plus-btn"><CIcon size={'sm'}  icon={cilPlus} /></NavLink></CTooltip>
                    </div>
                </CCardHeader>
                <CCardBody>
                    <DataTable
                        columns={this.state.columnMaterial}
                        data={this.props.data}
                        defaultSortFieldId={1}
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
        loading: state.material.loading,
        data: state.material.data,
        error: state.material.error,
        token: state.auth.token,
    }
}

const mapDispatchToProp = dispatch => {
    return {
        onMaterialList: (param) => dispatch(actions.materialList(param)),
        onMaterialListFilter: (text) => dispatch(actions.materialListFilter(text)),
        onMaterialDelete: (id, token) => dispatch(actions.materialDelete(id, token))
    }
}

export default connect(mapStateToProps, mapDispatchToProp)(MaterialList)