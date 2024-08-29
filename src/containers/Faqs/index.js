import React,{Component} from 'react'
import { connect } from 'react-redux'
import {
    CCard,
    CCardHeader,
    CCardBody,
    CTooltip
} from '@coreui/react';
import DataTable from "react-data-table-component";
import swal from 'sweetalert';

import * as actions from '../../store/actions'
import {  NavLink } from 'react-router-dom';
import CIcon from '@coreui/icons-react';
import { cilPen, cilTrash,cilPlus } from '@coreui/icons';

class FaqList extends Component {
    
    state = {
        columnFaqQuestion: [
            {
                name: 'Question',
                selector: row => `${ row.question }`,
                sortable: true,
            },
            {
                name: 'Answer',
                selector: row => `${ row.answers }`,
                sortable: true,
            },
            {
                name: 'Actions',
                sortable: false,
                cell: row => {
                    return (
                        <>
                        {/* <NavLink to={`/faqs/edit/${row.faqId}`} className="btn btn btn-sm btn-info mt-2 me-1">Edit</NavLink>
                        <button type="button" onClick={(e) => { this.deletefaqquestion(row.faqId) }} className="btn btn-sm btn-danger mt-2">Delete</button> */}
                        <CTooltip content="Edit Faq"><NavLink to={`/faqs/edit/${row.faqId}`} className="btn btn btn-sm btn-info mt-2 me-1"><CIcon size={'sm'} icon={cilPen} /></NavLink></CTooltip>
                        <CTooltip content="Delete Faq"><button type="button" onClick={(e) => { this.deletefaqquestion(row.faqId) }} className="btn btn-sm btn-danger mt-2"><CIcon size={'sm'} icon={cilTrash} /></button></CTooltip>
                        </>
                    )
                }
            },
        ]
    }

    // handlePageChange = page => {
    //     const token = this.props.token
    //     const param = {
    //         order: 0,
    //         page: page
    //     }
    //     this.props.onFaqList(param)
    // };

    delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

    componentDidMount() {
        const param = {
            order: 2,
            page: 1
        }
        this.props.onFaqList(param)
    }

    deletefaqquestion(id) {
        swal({
            title: "Are you sure?",
            text: "Once deleted, you will not be able to recover this Details!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
            .then(async (willDelete) => {
                if (willDelete) {
                    this.props.onFaqDelete(id, "")
                    const param = {
                        order: 2,
                        page: 1
                    }
                    await this.delay(2000);
                    this.props.onFaqList(param)
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
                    <div className="col-sm">Faq List</div>
                    <div className="col-sm text-end">
                        <CTooltip content="Add FAQ"><NavLink to={"/faqs/add/"} type="button" className="btn btn-sm btn-primary mt-2 me-1"><CIcon size={'sm'}  icon={cilPlus} /></NavLink></CTooltip>
                    </div>
                </CCardHeader>
                <CCardBody>
                    <DataTable
                        columns={this.state.columnFaqQuestion}
                        data={this.props.data}
                        defaultSortFieldId={2}
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
        loading: state.faq.loading,
        data: state.faq.data,
        error: state.faq.error,
    }
}

const mapDispatchToProp = dispatch => {
    return {
        onFaqList: (param) => dispatch(actions.faqList(param)),
        onFaqDelete: (id) => dispatch(actions.faqDelete(id))
    }
}

export default connect(mapStateToProps, mapDispatchToProp)(FaqList)