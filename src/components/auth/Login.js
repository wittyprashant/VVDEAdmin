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
  CCol,
} from "@coreui/react";
import * as actions from "../../store/actions/index";
import { map } from "jquery";
import { endPoint } from "../../frontend_api/API/constant_api";
import { CallAPICommonDML } from "../../frontend_api/API/api_call";

class Login extends Component {
  state = {
    email: "",
    password: "",
    validated: false,
    showError: false,
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const form = event.currentTarget;

    if (form.checkValidity() === false) {
      event.stopPropagation();
      this.setState({ validated: true });
    } else {
      const { email, password } = this.state;
      const allFieldsEmpty = !email && !password;

      if (allFieldsEmpty) {
        this.setState({ validated: true, showError: true, errorMessage: "All fields are required." });
      } else {
        const requestBodyLogin = { email, password }; // Define requestBody here
        const url = endPoint.userlogin;

        this.props.onLogin(email, password);
        
        CallAPICommonDML(url, "POST", requestBodyLogin, "UserLogin")
          .then((res) => {
            if (res.status === 400 && res.data.message.includes("email already exists")) {
              this.setState({ showError: true, errorMessage: "Email already exists. Please use a different email." });
            } else {
              // alert("Success: " + res.data.result);
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

    let LoginButton = !this.props.loading ? "Login" : "Please Wait...";

    return (
      <div className="text-flex">
        <div className="sidebar-image">
          <img src={image} className="img" alt="sidebar" />
        </div>
        <div className="gradient-linear">
          <CForm
            className="g-3 needs-validation form-class"
            noValidate
            validated={this.state.validated}
            onSubmit={this.handleSubmit}
          >
            <CRow>
              <CCol>
                <LabelMain
                  title={"ICoMEC"}
                  fontSize={35}
                  textAlign={"center"}
                  marginTop={100}
                  color={Color.hdh}
                />
              </CCol>
            </CRow>
            <CRow>
              <CCol>
                <LabelMain
                  title="Indain Construction Materials Embodied Carbon Data Base"
                  fontSize={18}
                  textAlign={"center"}
                  color={Color.hdh}
                />
              </CCol>
            </CRow>
            <CRow>
              <CCol>
                <LabelMain title={"Email"} marginTop={40} color={Color.hdh} />
              </CCol>
            </CRow>
            {errorMessage}

            <CInputGroup className="mb-3">
              <CFormInput
                id="email"
                type="email"
                placeholder="Enter email address"
                value={this.state.email}
                onChange={this.handleChange}
                required
              />
              <CFormFeedback invalid>
                Please enter a valid email address.
              </CFormFeedback>
            </CInputGroup>
            <CRow>
              <CCol>
                <LabelMain title={"Password"} color={Color.hdh} />
              </CCol>
            </CRow>
            <CInputGroup className="mb-4">
              <CFormInput
                id="password"
                type="password"
                placeholder="Password"
                value={this.state.password}
                onChange={this.handleChange}
                required
              />
              <CFormFeedback invalid>Please enter password.</CFormFeedback>
            </CInputGroup>
            <CRow>
              <CCol>
                  <a href="javascript:void(0);" className="text-forgot">
                    Forgot Password?
                  </a>
              </CCol>
            </CRow>
            <CRow>
              <CCol className="sumbit_btnn">
                <CButton
                  className="button_new_class"
                  type="submit"
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
                  {LoginButton}
                </CButton>
                <p className="notedesc">
                  Dont have an account?
                  <a href="/register" className="text-forgot">
                    Sign Up
                  </a>
                </p>
              </CCol>
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
    onLogin: (email, password) => dispatch(actions.userLogin(email, password)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);