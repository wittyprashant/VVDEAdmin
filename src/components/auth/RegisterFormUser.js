import image from "../../assets/Images/sidebar-img.png";
import { LabelMain } from "../front-end/Header";
import { Color } from "../../const/const";
import React, { Component } from "react";
import { connect } from "react-redux";
import {
  CButton,
  CForm,
  CFormInput,
  CInputGroup,
  CRow,
  CAlert,
  CFormFeedback,
} from "@coreui/react";
import * as actions from "../../store/actions/index";
import { endPoint } from "../../frontend_api/API/constant_api";
import { CallAPICommonDML } from "../../frontend_api/API/api_call";

class UserRegister extends Component {
  state = {
    validated: false,
    showError: false,
    roleRegister: 3,
    nameRegister: "",
    emailRegister: "",
    passwordRegister: "",
    confirmPasswordRegister: "",
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const form = event.currentTarget;

    if (form.checkValidity() === false) {
      event.stopPropagation();
      this.setState({ validated: true });
    } else {
      const { roleRegister, nameRegister, emailRegister, passwordRegister, confirmPasswordRegister } = this.state;
      const formValues = [roleRegister, nameRegister, emailRegister, passwordRegister, confirmPasswordRegister];
      const allFieldsEmpty = formValues.every((value) => value === "");

      if (allFieldsEmpty) {
        this.setState({ validated: true, showError: true });
      } else {
        const payload = {
          role: roleRegister,
          name: nameRegister,
          email: emailRegister,
          password: passwordRegister,
          confirm_password: confirmPasswordRegister,
        };

        let tag = "UserReg";
        let url = endPoint.userreg;

        CallAPICommonDML(url, "POST", payload, tag)
        
        .then((res) => {
          if (res.status === 400 && res.data.message.includes("email already exists")) {
            this.setState({ showError: true, errorMessage: 'Email already exists. Please use a different email.' });
          } else {
            alert("Success: " + res.data.result);
          }
        })
        .catch((error) => {
          this.setState({ showError: true, errorMessage: error.message });
        });
      }
    }
  };

 
  handleChange = (event) => {
    this.setState({
      [event.target.id]: event.target.value,
      // Reset emailExists when the user starts typing again
    });
  };

  render() {
    let errorMessage = null;

    if (this.props.error && this.state.showError) {
      errorMessage = (
        <CAlert color="warning" dismissible>
          {this.props.error}
        </CAlert>
      );
    }
    
    let RegisterButton = !this.props.loading ? "Register" : "Please Wait ...";

    return (
      <div className="text-flex">
        <div className="sidebar-image">
          <img src={image} className="img" alt="sidebar" />
        </div>
        <div className="gradient-linear">
          <CForm
            className="row g-3 needs-validation form-class"
            noValidate
            validated={this.state.validated}
            onSubmit={this.handleSubmit}
          >
            <CRow>
              <LabelMain
                title={"ICoMEC"}
                fontSize={35}
                textAlign={"center"}
                marginTop={100}
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
              onChange={this.handleChange}
            />
            <CRow>
              <LabelMain title={"Name"} color={Color.hdh} marginTop={40} marginBottom={0} />
            </CRow>
            <CInputGroup className="mb-3">
              <CFormInput
                id="nameRegister"
                type="text"
                placeholder="Enter name"
                value={this.state.nameRegister}
                onChange={this.handleChange}
                required
              />
              <CFormFeedback invalid>Please enter a valid name.</CFormFeedback>
            </CInputGroup>
            <CRow>
              <LabelMain title={"Email"} color={Color.hdh} marginBottom={0} />
            </CRow>
            <CInputGroup className="mb-3">
              <CFormInput
                id="emailRegister"
                type="email"
                placeholder="Enter email address"
                value={this.state.emailRegister}
                onChange={this.handleChange}
                required
              />
              <CFormFeedback invalid>
                Please enter a valid email address.
              </CFormFeedback>
            </CInputGroup>
            <CRow>
              <LabelMain
                title={"Password"}
                color={Color.hdh}
                marginBottom={0}
              />
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
              <LabelMain
                title={"Confirm Password"}
                color={Color.hdh}
                marginBottom={0}
              />
            </CRow>
            <CInputGroup className="mb-4">
              <CFormInput
                id="confirmPasswordRegister"
                type="password"
                placeholder="Confirm password"
                value={this.state.confirmPasswordRegister}
                onChange={this.handleChange}
                required
              />
              <CFormFeedback invalid>
                Please enter confirm password.
              </CFormFeedback>
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
              <p className="notedesc">
                Have an account?
                <a href="/register" className="text-forgot">
                  Sign In
                </a>
              </p>
            </CRow>
            <CRow>
              <LabelMain title={"CARBSE"} fontSize={40} textAlign={"center"} marginTop={70} color={Color.hdh} />
            </CRow>
            <CRow>
              <LabelMain title="Center for Advanced Research in Building Science Energy" fontSize={14} textAlign={"center"} color={Color.hdh} />
            </CRow>
            {errorMessage}
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
    onRegister: (role, name, email, password, confirm_password) =>
      dispatch(actions.userRegister(role, name, email, password, confirm_password)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserRegister);
