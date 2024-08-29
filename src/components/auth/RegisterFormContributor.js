/* eslint-disable no-restricted-globals */
/* eslint-disable no-undef */
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
import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../../store/actions/index";
import {
  CButton,
  CForm,
  CFormInput,
  CInputGroup,
  CRow,
  CFormSelect,
  CAlert,
  CFormLabel,
  CFormFeedback,
  CInputGroupText,
} from "@coreui/react";
import CIcon from "@coreui/icons-react";
import { CallAPICommonDML } from "../../frontend_api/API/api_call";
import { endPoint } from "../../frontend_api/API/constant_api";


//import * as actions from "../../store/actions/index";
const md5 = require("md5");


class ContributorRegister extends Component {
  state = {
    validated: false,
    showError: false,
    role:2,
    name:"",
    email: '',
    password:'',
    confirm_password:'',
    category_id:'1',
    affiliation:'',
    corresponding_author:'',
    publication_reviewed:1,
    publication_title:'',
    publication_weblink:'',
    categories_list:[],
    person:[],
  };

 
  handleSubmit = (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.stopPropagation();
      this.setState({ validated: true });
    } else {
      const {
        role,
        name,
        email,
        password,
        confirm_password,
        category_id,
        affiliation,
        corresponding_author,
        publication_reviewed,
        publication_title,
        publication_weblink,
      } = this.state;

      const formValues = [
        role,
        name,
        email,
        password,
        confirm_password,
        category_id,
        affiliation,
        corresponding_author,
        publication_reviewed,
        publication_title,
        publication_weblink,
      ];
      const allFieldsEmpty = formValues.every((value) => value === "");

      if (allFieldsEmpty) {
        this.setState({ validated: true, showError: true, errorMessage: "All fields are required." });
      } else {
        const requestBody = {
          role: role,
          name:name,
          // name_contributor: name,
          email: email,
          password: password,
          confirm_password: confirm_password,
          category_id: category_id,
          affiliation: affiliation,
          corresponding_author: corresponding_author,
          publication_reviewed: publication_reviewed,
          publication_title: publication_title,
          publication_weblink: publication_weblink,
        };

        let tag = "ContributorReg";
        let url = endPoint.contributorreg;

        CallAPICommonDML(url, "POST", requestBody, tag)
          .then((res) => {
            if (res.status === 400 && res.data.message.includes("email already exists")) {
              this.setState({ showError: true, errorMessage: "Email already exists. Please use a different email." });
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
  componentDidMount() {
    this.getSampleMaster();
}
  getSampleMaster = () => {
    // alert('hii2');
    let tag = "Group";
      let url = endPoint.category;
      console.log( "url", url);
     

      return CallAPICommonDML(
          url,
          "GET",
          {
             
          },
          tag
      ).then((res) => {
        this.setState({ categories_list: res.data.result });
          // setgroupdatalist(res.data.result)
          console.log(tag+" Success -----------------",res.data.result);
          return res;
      });
  }
//   componentDidMount() {
//     this.fetchData();
// }

// fetchData = async () => {
//   alert('hello')
//   try {
//     const response = await axios.get('http://192.168.1.34/data_entry_software/public/api/categories');
//     this.setState({ categories_list: response.data.result });
//   } catch (error) {
//     console.error("Error fetching data:", error);
//   }
// }
  // handleSubmit = (event) => {
  //   event.preventDefault()
  //   const form = event.currentTarget
  //   if (form.checkValidity() === false) {
  //     event.stopPropagation();
  //   }
  //   if(form.checkValidity() === true){
  //     this.props.onRegisterContributor(
  //         this.state.role,
  //         this.state.name,
  //         this.state.email,
  //         this.state.password,
  //         this.state.confirm_password,
  //         this.state.category_id,
  //         this.state.affiliation, 
  //         this.state.corresponding_author, 
  //         this.state.publication_reviewed, 
  //         this.state.publication_title,
  //         this.state.publication_weblink
  //       )
  //     // this.props.onRegister(this.state.role, this.state.name, this.state.email, this.state.password, this.state.confirm_password, this.state.category_id, this.state.affiliation, this.state.corresponding_author, this.state.confirm_password, this.state.publication_reviewed, this.state.publication_title,this.state.publication_weblink)
  //   }
  // };

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
  
    let RegisterButton = !this.props.loading ? "Register" : "Please Wait ....";
    return (
      <div class="text-flex">
        <div class="sidebar-image">
          <img src={image} class="img" />
        </div>
        <div class="gradient-linear">
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
                id="role"
                type="hidden"
                placeholder="Role"
                value={this.state.role}
                onChange={this.handleChange} />
                <CRow>
            <LabelMain title={"Name"} color={Color.hdh}  marginTop={40} marginBottom={0}/>
        </CRow>
            <CInputGroup className="mb-3">
                <CFormInput
                    id="name"
                    type="text"
                    placeholder="Enter name"
                    value={this.state.name}
                    onChange={this.handleChange}
                    required />
                <CFormFeedback invalid>Please enter a valid name.</CFormFeedback>
            </CInputGroup>
            <CRow>
              <LabelMain title={"Category"} color={Color.hdh} marginBottom={0} />
            </CRow>
            <CInputGroup className="mb-3">
              <CFormSelect
                id="category_id"
                value={this.state.category_id}
                onChange={this.handleChange}
              >
                {this.state.categories_list.map((data) => (
                  <option key={data.id} value={data.id}>{data.name}</option>
                ))}
              </CFormSelect>
              <CFormFeedback invalid>Please enter a valid category.</CFormFeedback>
            </CInputGroup>
            <CRow>
              <LabelMain title={"Email"} color={Color.hdh} marginBottom={0} />
            </CRow>
            <CInputGroup className="mb-3">
              <CFormInput
                id="email"
                type="text"
                placeholder="Enter Email Address"
                value={this.state.email}
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
              <LabelMain title={"Affiliation"} color={Color.hdh} marginBottom={0} />
            </CRow>
            {/* {errorMessage} */}
            <CInputGroup className="mb-3">
              <CFormInput
                id="affiliation"
                type="text"
                placeholder="Enter Affiliation"
                value={this.state.affiliation}
                onChange={this.handleChange}
                border={0}
                borderRadius={5}
                width={400}
                height={40}
                inputpadding={15}
                paddingRight={15}
                required
              />
              <CFormFeedback invalid> Please enter a affiliation. </CFormFeedback>
            </CInputGroup>

            <CRow>
              <LabelMain title={"Publication Reviewed"} color={Color.hdh} marginBottom={0} />
            </CRow>
            <CInputGroup className="mb-3">      
            <CFormSelect
                    id="publication_reviewed"
                   // className="material"
                    value={this.state.publication_reviewed}
                    onChange={this.handleChange}
                >
                    <option value="1"> Yes</option>
                    <option value="2">No</option>
                  
                </CFormSelect>
              <CFormFeedback invalid>
                Please enter a valid publication reviewed.
              </CFormFeedback>
            </CInputGroup>
            <CRow>
              <LabelMain title={"Corresponding Author"} color={Color.hdh} marginBottom={0} />
            </CRow>
            <CInputGroup className="mb-3">
              <CFormInput
                id="corresponding_author"
                type="text"
                placeholder="Enter Corresponding Author"
                value={this.state.corresponding_author}
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
                Please enter a valid corresponding author.
              </CFormFeedback>
            </CInputGroup>
            <CRow>
              <LabelMain title={"Publication Title"} color={Color.hdh} marginBottom={0} />
            </CRow>
            <CInputGroup className="mb-3">
              <CFormInput
                id="publication_title"
                type="text"
                placeholder="Enter publication Title"
                value={this.state.publication_title}
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
                Please enter a valid publication title.
              </CFormFeedback>
            </CInputGroup>
            <CRow>
              <LabelMain title={"Publication Weblink"} color={Color.hdh} marginBottom={0} />
            </CRow>
            <CInputGroup className="mb-3">
              <CFormInput
                id="publication_weblink"
                type="text"
                placeholder="Enter publication Weblink"
                value={this.state.publication_weblink}
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
                Please enter a valid publication weblink.
              </CFormFeedback>
            </CInputGroup>
            <CRow>
              <LabelMain title={"Password"} color={Color.hdh}  marginBottom={0} />
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
              <LabelMain title={"Confirm Password"} color={Color.hdh}  marginBottom={0} />
            </CRow>
            <CInputGroup className="mb-4">
                <CFormInput
                    id="confirm_password"
                    type="password"
                    placeholder="Enter confirm password"
                    value={this.state.confirm_password}
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
    // onRegister: (role, name, email, password, confirm_password,category_id,affiliation,publication_reviewed,corresponding_author,publication_title,publication_weblink) => dispatch(actions.userRegister(role, name, email, password, confirm_password,category_id,affiliation,publication_reviewed,publication_title,publication_weblink))
    onRegisterContributor: (
      role, 
      name, 
      email, 
      password, 
      confirm_password,
      category_id,
      affiliation,
      corresponding_author,
      categories_list,
      publication_reviewed,
      publication_title,
      publication_weblink) => dispatch(actions.userContributorRegister(
        role, 
        name, 
        email, 
        password, 
        confirm_password,
        category_id,
        categories_list,
        affiliation,
        corresponding_author,
        publication_reviewed,
        publication_title,
        publication_weblink))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ContributorRegister);
