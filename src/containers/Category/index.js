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
import Moment, { months } from 'moment';
import swal from 'sweetalert';
import * as actions from '../../store/actions'
import { NavLink } from 'react-router-dom';
import { cilPen, cilPlus, cilTrash } from '@coreui/icons';
import CIcon from '@coreui/icons-react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faArrowRightFromBracket } from '@fortawesome/free-solid-svg-icons';

class Category extends Component {

    state = {
        filterText: "",
        resetPaginationToggle: false,
        columnCategory: [
            {
                name: 'Category',
                selector: row => 'Material Manufacturer',
                sortable: true,
                width: "300px"
            },
            {
                name: 'Date',
                selector: row => `${row.createOn}`,
                sortable: true,
                width: "150px",
                cell: row => {
                    return (
                        <span>{Moment(row.createOn).format('DD-MM-YYYY')}</span>
                    )
                }
            },
            {
                name: 'Actions',
                sortable: false,
                width: "250px",
                cell: row => {
                    return (
                        <div>
                            <CTooltip content="Edit Category"><NavLink to={`/category/edit/${row.categoryId}`} onClick={(e) => {  }} className="edit-btn"><CIcon size={'sm'} icon={cilPen} /></NavLink></CTooltip>
                            {/* <CTooltip content="Edit Category"><NavLink to={`/category/edit/${row.categoryId}`} onClick={(e) => { this.GetbyCategoryforms(row.categoryId) }} className="btn btn btn-sm btn-info mt-2 me-1"><CIcon size={'sm'} icon={cilPen} /></NavLink></CTooltip> */}
                            <CTooltip content="Delete Category"><button type="button" onClick={(e) => { this.deleteCategory(row.categoryId) }} className="delete-btn"><CIcon size={'sm'} icon={cilTrash} /></button></CTooltip>
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
        this.props.onCategoryList(param, token)
    }

    deleteCategory(id) {
        swal({
            title: "Are you sure?",
            text: "Once deleted, you will not be able to recover this Details!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        }).then(async (willDelete) => {
            if (willDelete) {
                this.props.onCategoryDelete(id, "")
                const token = this.props.token
                const param = {
                    order: 6,
                    page: 1
                }
                await this.delay(1000)
                this.props.onCategoryList(param, token)
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
                    this.props.onCategoryListFilter(newFilterText);
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
                    <div className="col-sm">Category List</div>
                    <div className="col-sm text-end">
                        <CTooltip content="Add Category">
                            <NavLink to="/category/add" type="button" className="plus-btn">
                                <CIcon size={'sm'} icon={cilPlus} />
                            </NavLink>
                        </CTooltip>
                    </div>
                </CCardHeader>
                <CCardBody>
                    <DataTable
                        columns={this.state.columnCategory}
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
        loading: state.category.loading,
        data: state.category.data,
        error: state.category.error,
        token: state.auth.token,
    }
}

const mapDispatchToProp = dispatch => {
    return {
        onCategoryList: (param) => dispatch(actions.categoryList(param)),
        onCategoryListFilter: (filterText) => dispatch(actions.categoryListFilter(filterText)),
        onCategoryDelete: (id, token) => dispatch(actions.categoryDelete(id, token))
    }
}

export default connect(mapStateToProps, mapDispatchToProp)(Category)