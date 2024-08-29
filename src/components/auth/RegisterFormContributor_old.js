// import image from '../../assets/Images/sidebar-img.png';
// import { LabelMain } from "../front-end/Header";
// import { Color } from "../../const/const";
// import { TextInputt } from "../front-end/Textinput.js";
// import { TextButton } from "../front-end/Button.js";

// export default function Logout()
// {  
//     return(
//         <div class='text-flex'>
//             <div class="sidebar-image">
//             <img src={image}  class='img'/>
//             </div>
//             <div class='gradient-linear'>
//                 <LabelMain title={'ICoMEC'}  fontSize={35}   textAlign={'center'} marginTop={220}  color={Color.hdh}/>
//                 <LabelMain title='Indain Construction Materials Embodied Carbon Data Base' fontSize={18} textAlign={'center'}  color={Color.hdh}/>
//                 <LabelMain title={'Name'} color={Color.hdh}/>
//                 <TextInputt border={0} borderRadius={5} width={400} height={40} inputpadding={15}paddingRight={15} placeholder={'Enter Name'}  />
//                 <LabelMain title={'Email ID'} color={Color.hdh}  marginTop={20}/>
//                 <TextInputt border={0} borderRadius={5} width={400} height={40} inputpadding={15}paddingRight={15} placeholder={'Enter Email ID'}  />
//                 <LabelMain title={'Password'} color={Color.hdh} marginTop={20}/>
//                 <TextInputt border={0} borderRadius={5} width={400} height={40} inputpadding={15} paddingRight={15} placeholder={'Enter Password'} />
//                 <LabelMain title={'Re-enter Password'} color={Color.hdh} marginTop={20}/>
//                 <TextInputt border={0} borderRadius={5} width={400} height={40} inputpadding={15} paddingRight={15} placeholder={'Enter Re-enter Password'} />
//                 <TextButton title={'Sign Up'} backgroundColor={Color.hdh} marginTop={40} margintop={3} borderRadius={10} border={0} width={170} height={35} marginLeft={'auto'} marginRight={'auto'} display={'block'} color={Color.darkpink} />
          
//                 <div class='text-acc'>
//                 <LabelMain title={'Have an account? '} color={Color.hdh}  marginRight={10}  display={'block'} />
//                 <a href="" class='text-forgot'>Log in</a>
//                 </div>
//                 <LabelMain title={'CARBSE'}  fontSize={40} textAlign={'center'} marginTop={70} color={Color.hdh} />
//                 <LabelMain title='Center for Advanced Research in Building Science Energy' fontSize={14} textAlign={'center'} color={Color.hdh}/>
//             </div>
//         </div>
//     );
// }

import image from "../../assets/Images/sidebar-img.png";
import { LabelMain } from "../front-end/Header";
import { Color } from "../../const/const";
import { TextInputt } from "../front-end/Textinput.js";
import { TextButton } from "../front-end/Button.js";
import React, { Component } from "react";
import { connect } from "react-redux";
import {
  CButton,
  CForm,
  CFormInput,
  CInputGroup,
  CRow,
  CAlert,
  CFormLabel,
  CFormFeedback,
} from "@coreui/react";
import CIcon from "@coreui/icons-react";
import * as actions from "../../store/actions/index";
const md5 = require("md5");

class Register extends Component {
  state = {
    validated: true,
    roleRegister:2,
    nameRegister:'',
    emailRegister: '',
    passwordRegister:'',
    confirmPasswordRegister:'',
  };

  handleSubmit = (event) => {
            event.preventDefault()
        const form = event.currentTarget
        if (form.checkValidity() === false) {
            event.stopPropagation();
        }
        if(form.checkValidity() === true){
            this.props.onRegister(this.state.roleRegister, this.state.nameRegister ,this.state.emailRegister, this.state.passwordRegister, this.state.confirmPasswordRegister)
        }
  };

  handleChange = (event) => {
    this.setState({
      [event.target.id]: event.target.value,
    });
  };
  render() {
    let errorMessage = null;
    // if (this.props.error) {
    //     errorMessage = (
    //         <CAlert
    //             color="warning"
    //             dismissible
    //         >
    //             {this.props.error}
    //         </CAlert>
    //     )
    // }

    let RegisterButton = !this.props.loading ? "Register" : "Please Wait ...";
    return (
      <div class="text-flex">
        <div class="sidebar-image">
          <img src={image} class="img" />
        </div>
        <div class="gradient-linear">
          <CForm
            className="row g-3 needs-validation"
            noValidate
            validated={this.state.validated}
            onSubmit={this.handleSubmit}
          >
            <CRow>
              <LabelMain
                title={"ICoMEC"}
                fontSize={35}
                textAlign={"center"}
                marginTop={220}
                color={Color.hdh}
              />
            </CRow>
            <CRow>
              <LabelMain
                title="Indain Construction Materials Embodied Carbon Data Base"
                fontSize={18}
                textAlign={"center"}
                color={Color.hdh}
              />
            </CRow>
            <CFormInput
                id="roleRegister"
                type="hidden"
                placeholder="Role"
                value={this.state.roleRegister}
                onChange={this.handleChange} />
                <CRow>
            <LabelMain title={"Name"} color={Color.hdh}  marginBottom={0}/>
        </CRow>
            <CInputGroup className="mb-3">
                <CFormInput
                    id="nameRegister"
                    type="text"
                    placeholder="Enter name"
                    value={this.state.nameRegister}
                    onChange={this.handleChange}
                    required />
                <CFormFeedback invalid>Please enter a valid name.</CFormFeedback>
            </CInputGroup>
            <CRow>
              <LabelMain title={"Email"} color={Color.hdh} marginBottom={0} />
            </CRow>
            {errorMessage}

            <CInputGroup className="mb-3">
              <CFormInput
                id="emailRegister"
                type="text"
                placeholder="Enter email address"
                value={this.state.emailRegister}
                onChange={this.handleChange}
                border={0}
                borderRadius={5}
                width={400}
                height={40}
                inputpadding={15}
                paddingRight={15}
                required
              />
              <CFormFeedback invalid>
                Please enter a valid email address.
              </CFormFeedback>
            </CInputGroup>
            <CRow>
              <LabelMain title={"Password"} color={Color.hdh}  marginBottom={0} />
            </CRow>
            <CInputGroup className="mb-4">
              <CFormInput
                id="passwordRegister"
                type="password"
                placeholder="Password"
                value={this.state.passwordRegister}
                onChange={this.handleChange}
                required
              />
              <CFormFeedback invalid>Please enter password.</CFormFeedback>
            </CInputGroup>
            <CRow>
              <LabelMain title={"Confirm Password"} color={Color.hdh}  marginBottom={0} />
            </CRow>
            <CInputGroup className="mb-4">
                <CFormInput
                    id="confirmPasswordRegister"
                    type="password"
                    placeholder="Enter confirm password"
                    value={this.state.confirmPasswordRegister}
                    onChange={this.handleChange}
                    required
                />

                <CFormFeedback invalid>Please enter confirm password.</CFormFeedback>
            </CInputGroup>
            <CRow>
              <CButton
                type="submit"
                className="button_new_class"
                backgroundColor={Color.hdh}
                marginTop={40}
                margintop={3}
                borderRadius={10}
                border={0}
                width={170}
                height={35}
                marginLeft={"auto"}
                marginRight={"auto"}
                display={"block"}
                color={Color.darkpink}
              >
                {RegisterButton}
              </CButton>
             {/*  <LabelMain
                title={"Have an account?"}
                color={Color.hdh}
                marginRight={10}
                display={"block"}
              />
              <a href="/login" class="text-forgot">
                Sign In
              </a> */}
                <p className="notedesc">Have an account?<a href="/register" class="text-forgot">Sign In</a></p>
            </CRow>
            <CRow>
              <LabelMain
                title={"CARBSE"}
                fontSize={40}
                textAlign={"center"}
                marginTop={70}
                color={Color.hdh}
              />
            </CRow>
            <CRow>
              <LabelMain
                title="Center for Advanced Research in Building Science Energy"
                fontSize={14}
                textAlign={"center"}
                color={Color.hdh}
              />
            </CRow>
          </CForm>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    loading: state.auth.loading,
    error: state.auth.error,
    isAuthenticated: state.auth.token !== null,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onRegister: (role, name, email, password, confirm_password) => dispatch(actions.userRegister(role, name, email, password, confirm_password))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Register);
