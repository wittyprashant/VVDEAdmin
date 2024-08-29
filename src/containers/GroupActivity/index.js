import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
    CCard,
    CCardHeader,
    CCardBody,
    CTooltip
} from '@coreui/react';
import DataTable from "react-data-table-component";
import Moment from 'moment';
import swal from 'sweetalert';

import * as actions from '../../store/actions'
import {  NavLink } from 'react-router-dom';
import axios from '../../axios_call'
import { cilPen, cilTrash,cilPlus } from '@coreui/icons';
import CIcon from '@coreui/icons-react';

class GroupActivity extends Component {

    state = {
        max_tasks:9,
        addNewActivity:"",
        columnGroup: [
            {
                name: 'Group Name',
                selector: row => `${ row.groupName }`,
                sortable: true,
                width: "200px",
            },
            {
                name: 'Date',
                sortable: true,
                selector: row => `${ Moment(row.date)._d }`,
                width: "150px",
            },
            {
                name: 'Day',
                sortable: true,
                selector: row => `${ row.days }`,
                width: "100px",
            },
            {
                name: 'Task List',
                selector: row => `${ row.task }`,
                sortable: true,
                width: "450px",
            },
            {
                name: 'Action',
                sortable: false,
                width: "100px",
                cell: row => {
                    return (
                        <div>
                            {/* <button type="button" onClick={(e) => { this.openLink(row.taskId) }} className="btn btn-sm btn-info mt-2">Edit</button>
                            <button type="button" onClick={(e) => { this.deleteGroupActivity(row.taskId) }} className="btn btn-sm btn-danger mt-2">Delete</button> */}

                            <CTooltip content="Activity Edit"><button type="button" onClick={(e) => { this.openLink(row.taskId) }} className="btn btn-info btn-sm  ms-2 mt-2"><CIcon size={'sm'} icon={cilPen} /></button></CTooltip>
                            <CTooltip content="Activity Delete"><button type="button" onClick={(e) => { this.deleteGroupActivity(row.taskId) }} className="btn btn-danger btn-sm  ms-2 mt-2"><CIcon size={'sm'} icon={cilTrash} /></button></CTooltip>
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
            page: 1,
            groupId:window.location.pathname.split("/").pop()
        }
        this.props.onGroupActivity(param, token)
        // if(window.location.pathname.split("/")[2]=="Book Studies"){
    }
    openLink (taskId){
        const headers = {
            headers:{
                'Authorization': JSON.parse(localStorage.getItem("userDetail")).token
            }
        };
        axios.get('SuperAdmin/checktaskdayslimit?groupId='+window.location.pathname.split("/").pop(),
            headers
        )
        .then((response) => {
            if(response.data.status){
                // console.log("Success",this.state)
                let Link="";
                let remainActivity=response.data.result
                if(taskId){
                    Link="/group_activity_management/edit/"+window.location.pathname.split("/").pop()+"/"+window.location.pathname.split("/")[2]+"/"+0+"/"+taskId
                }else{
                    Link="/group_activity_management/add/"+window.location.pathname.split("/").pop()+"/"+window.location.pathname.split("/")[2]+"/"+remainActivity+"/"
                }
                if(taskId || remainActivity>0){
                    window.location.href=Link;
                }else{
                    swal("Your Maximum Activity Limit Exceeds", {
                        icon: "success",
                    });
                }
                // window.location.href=Link;
            }else{
                console.log("Fail X")
            }            
        })
        .catch((error) => {
            console.log(error)
        })
        
    }
    deleteGroupActivity(id) {
        swal({
            title: "Are you sure?",
            text: "Once deleted, you will not be able to recover this Details!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
            .then((willDelete) => {
                if (willDelete) {
                    const headers = {
                        headers:{
                            'Authorization': JSON.parse(localStorage.getItem("userDetail")).token
                        }
                    };
                    axios.delete('SuperAdmin/deletegroupactivitytask?Id='+id,
                        headers
                    )
                    .then((response) => {
                        if(response.data.status){
                            const token = this.props.token
                            const param = {
                                order: 2,
                                page: 1,
                                groupId:window.location.pathname.split("/").pop()
                            }
                            this.props.onGroupActivity(param, token)
                            if(window.location.pathname.split("/")[2]==="Misterminds"){
                                this.setState({
                                    max_tasks:(5-this.props.data.length)
                                });
                            }
                        }else{
                            console.log("Fail X")
                        }            
                    })
                    .catch((error) => {
                        console.log(error)
                    })
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
                    <div className="col-sm">Group Activity ({window.location.pathname.split("/")[2].replace("%20"," ")})</div>
                    <div className="col-sm text-end">
                        {/* <NavLink to={this.state.addNewActivity} type="button" className="btn btn btn-primary btn-sm mt-2 me-1">Add Group Activity</NavLink> */}
                        {/* <button type="button" onClick={(e) => { this.openLink(0) }} className="btn btn-sm btn-info mt-2">Add Activity</button> */}
                        <CTooltip content="Add Activity"><button type="button" onClick={(e) => { this.openLink(0) }} className="btn btn-primary btn-sm  ms-2 mt-2"><CIcon size={'sm'} icon={cilPlus} /></button></CTooltip>
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
        onGroupActivity: (param, token) => dispatch(actions.groupActivity(param, token)),
        onGroupActivityDelete: (id, token) => dispatch(actions.groupActivityDelete(id, token))
    }
}

export default connect(mapStateToProps, mapDispatchToProp)(GroupActivity)