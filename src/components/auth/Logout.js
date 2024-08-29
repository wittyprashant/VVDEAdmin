import React, { Component } from 'react'
import { connect } from 'react-redux'

import * as actions from '../../store/actions'
import { Navigate } from 'react-router-dom'

class Logout extends Component {
    
    componentDidMount(){
        this.props.onAuthLogout()
    }
    render() {
        return  <Navigate to="/login" replace />
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onAuthLogout : () => dispatch(actions.authLogout())
    }
}

export default connect(null,mapDispatchToProps) (Logout)