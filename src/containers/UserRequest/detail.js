import { CAccordion, CAccordionBody, CAccordionHeader, CAccordionItem, CCard, CCardBody, CCardHeader } from '@coreui/react';
import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
    useLocation,
    useNavigate,
    useParams,
    useMatch,
} from "react-router-dom";

import * as actions from '../../store/actions'

function withRouter(Component) {
    return (props) => {

        const location = useLocation();
        const navigate = useNavigate();
        const params = useParams();
        const match = useMatch('/user/request/:memberId');
        return <Component {...props} match={match} navigate={navigate} location={location} params={params} />;
    }
}

class UserRequestDetail extends Component {
    constructor() {
        super();
        this.state = {
            memberId: 0,
        };
    }

    componentDidMount() {
        let memberId = this.props.match ? this.props.match.params.memberId : ""
        if (memberId) {
            this.setState({
                memberId: memberId
            })
            this.props.onUserRequestDetail(memberId)
        }
    }
    render() {
        return (
            <CCard>
                <CCardHeader className='d-flex' component="h5">
                    <div className="col-sm">User Detail</div>
                </CCardHeader>
                <CCardBody>
                    
                        {
                            this.props.data ?
                                this.props.data.map(function (item, i) {
                                    return  <CAccordion alwaysOpen activeItemKey={i + 1}>
                                        <CAccordionItem itemKey={i + 1}>
                                        <CAccordionHeader>{i + 1}) {item.Quetion}</CAccordionHeader>
                                        <CAccordionBody className='show'>
                                            <strong>{item.Answer}</strong>
                                        </CAccordionBody>
                                    </CAccordionItem>
                                    </CAccordion>
                                })
                                : <strong>No Data</strong>
                        }                        
                    
                </CCardBody>
            </CCard>
        );
    }
}

const mapStateToProps = state => {
    return {
        data: state.userRequest.userRequestDetail,
    }
}

const mapDispatchToProp = dispatch => {
    return {
        onUserRequestDetail: (id) => dispatch(actions.UserRequestDetail(id)),
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProp)(UserRequestDetail))