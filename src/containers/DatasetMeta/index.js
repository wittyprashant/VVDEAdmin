import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
    CCard,
    CCardHeader,
    CCardBody,
    CRow,
    CCol,
    CFormInput,
    CTooltip
} from '@coreui/react';
import DataTable from "react-data-table-component";
import Moment from 'moment';
import swal from 'sweetalert';

import * as actions from '../../store/actions'
import { NavLink } from 'react-router-dom';
// import parse from 'html-react-parser'
import { cilPen, cilTrash,cilPlus } from '@coreui/icons';
import CIcon from '@coreui/icons-react';

class DatasetMeta extends Component {

    state = {
        filterText : "",
        resetPaginationToggle : false,
        columnDataset_meta: [
            // {
            //     name: 'Image',
            //     selector: row => `${row.featureImage}`,
            //     sortable: false,
            //     width: "250px",
            //     cell: row => {
            //         return (
            //             <img alt={`${row.featureImage}`} width={'60px'} height={"50px"} src={row.featureImage} />
            //         )
            //     }
            // },
            {
                name: 'Title',
                sortable: true,
                selector: row => 'Cement',
                width: "300px",
            },
            {
                name: 'Date',
                selector: row => `${row.createOn}`,
                sortable: true,
                width: "200px",
                cell: row => {
                    return (
                        <span>{Moment(row.createOn).format('DD-MM-YYYY')}</span>
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
                            <CTooltip content="Edit Dataset Meta"><NavLink to={`/dataset_meta/edit/${row.faqId}`} className="edit-btn"><CIcon size={'sm'} icon={cilPen} /></NavLink></CTooltip>
                            <CTooltip content="Delete Dataset Meta"><button type="button" onClick={(e) => { this.deletedeleteDataset_meta(row.id) }} className="delete-btn"><CIcon size={'sm'} icon={cilTrash} /></button></CTooltip>
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
        this.props.onDataset_metaList(param)
    }
    delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));
    deleteDataset_meta(id) {
        swal({
            title: "Are you sure?",
            text: "Once deleted, you will not be able to recover this Details!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
            .then(async (willDelete) => {
                if (willDelete) {
                    this.props.onDataset_metaDelete(id, "")
                    const param = {
                        order: 5,
                        page: 1
                    }
                    await this.delay(2000);
                    this.props.onDataset_metaList(param)
                    swal("Your Details  has been deleted!", {
                        icon: "success",
                    });
                } else {
                    swal("Your Details are safe");
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
                    this.props.onDataset_metaFilterList(newFilterText);
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
                    <div className="col-sm">Dataset Meta List</div>
                    <div className="col-sm text-end">
                        <CTooltip content="Add Dataset Meta"><NavLink to={"/dataset_meta/add/"} type="button" className="plus-btn"><CIcon size={'sm'}  icon={cilPlus} /></NavLink></CTooltip>
                    </div>
                </CCardHeader>
                <CCardBody>
                    <DataTable
                        columns={this.state.columnDataset_meta}
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
        loading: state.dataset_meta.loading,
        data: state.dataset_meta.data,
        error: state.dataset_meta.error,
        token: state.auth.token,
    }
}

const mapDispatchToProp = dispatch => {
    return {
        onDataset_metaList: (param) => dispatch(actions.dataset_metaList(param)),
        onDataset_metaDelete: (id, token) => dispatch(actions.dataset_metaDelete(id, token)),
        onDataset_metaFilterList: (text) => dispatch(actions.dataset_metaListFilter(text))
    }
}

export default connect(mapStateToProps, mapDispatchToProp)(DatasetMeta)