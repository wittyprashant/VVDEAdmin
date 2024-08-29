// import React from "react";
// import header from "../../assets/Images/header.png";
// import brick from "../../assets/Images/brick1.png";
// import {  LabelMain } from "../front-end/Header";
// import { Color } from "../../const/const";
// import cement from "../../assets/Images/cement.png";
// import Aggregate from "../../assets/Images/Aggregate.png";
// import stone1 from "../../assets/Images/new183.png";
// import steel from "../../assets/Images/steel2.png";
// import glass from "../../assets/Images/glass1.png";
// import wood from "../../assets/Images/wood.png";
// import plastic from "../../assets/Images/plastic.png";
// import Tiles from "../../assets/Images/tiles2.png";
// import footer from "../../assets/Images/footer.png";
// import { TextInputt } from "../front-end/Textinput";
// import { TextButton } from "../front-end/Button";

// export default function AnalysisScreen()
// {

//     return(
//         <div class='text-flexml'>
//             <div class="sidebar-image">
//             <img src={header}  class='img-header'/>
//             </div>
//             <LabelMain title={'Material Analysis'} textAlign={'center'} color={Color.purple} fontSize={'xx-large'} marginTop={10}/>
//             <div class='text-cement'>
//             <div class='img-cem'>
//               <img src={cement} class='img-cement1' />
//               <LabelMain  title={'Cement'} marginTop={10} color={Color.purple} marginLeft={35}/>
//               <div>
//                 <LabelMain title={'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed efficitur diam vel tempus porta. Ut bibendum cursus dolor in suscipit. Proin auctor risus ac tincidunt cursus. Curabitur vel ante ut dolor dictum tincidunt.Sed efficitur diam vel tempus porta. Ut bibendum cursus dolor in suscipit.  '} color={Color.purple} marginLeft={-100} marginRight={100} />
//               </div>
//               </div>
//               <div class='text-form'>
//               <LabelMain  title={'Material Name'} marginTop={5} color={Color.purple} />
//               <TextInputt  borderRadius={5} width={400} height={35} inputpadding={15} paddingRight={15} placeholder={'Enter Name'} />
//               <div class='text-country'>
//                 <div class='text-country1'>
//                 <LabelMain  title={'Country'} marginTop={5} color={Color.purple} />
//               <TextInputt  borderRadius={5} width={180} height={35} inputpadding={15} paddingRight={15} placeholder={'Enter country'} />
//                 </div>
//                 <div class='text-country1'>
//                 <LabelMain  title={'Country'} marginTop={5} color={Color.purple} />
//               <TextInputt  borderRadius={5} gap={10} width={180} height={40} inputpadding={15} paddingRight={15} placeholder={'Enter country'} />
//                 </div>
//               </div>
//               <LabelMain  title={'Loreum ipsum'} marginTop={5} color={Color.purple} />
//               <TextInputt  borderRadius={5} width={400}  height={35} inputpadding={15} paddingRight={15} placeholder={'Enter Name'} />
//               <LabelMain  title={'Loreum ipsum'} marginTop={5} color={Color.purple} />
//               <TextInputt  borderRadius={5} width={400} height={35} inputpadding={15} paddingRight={15} placeholder={'Enter Name'} />
//               <LabelMain  title={'Country'} marginTop={5} color={Color.purple} />
//               <TextInputt  borderRadius={5}  width={400} height={35} inputpadding={15} paddingRight={15} placeholder={'Enter Name'} />
//               <TextButton title={'submit'} backgroundColor={Color.grey} margintop={2} marginTop={15} borderRadius={10} border={0} width={170} height={30} marginLeft={'auto'} marginRight={'auto'} display={'block'} color={Color.black} />
//               </div>

//             </div>

//             <div class="sidebar-image">
//             <img src={footer}  class='img-header' style={{marginTop:'10px'}}/>
//             </div>

//         </div>
//     );
// }

// import image from "../../assets/Images/sidebar-img.png";
// import { LabelMain } from "../front-end/Header";
// import { Color } from "../../const/const";
// import { TextInputt } from "../front-end/Textinput.js";
// import { TextButton } from "../front-end/Button.js";
// import React, { Component } from "react";
// import "react-datepicker/dist/react-datepicker.css";
// import DatePicker from "react-datepicker";
// import { updateObject } from '../../store/Utility'
// import { connect } from "react-redux";

// import {
//   CButton,
//   CForm,
//   CFormInput,
//   CInputGroup,
//   CRow,
//   CAlert,
//   CFormSelect,
//   CFormLabel,
//   CFormFeedback,
// } from "@coreui/react";
// import CIcon from "@coreui/icons-react";
// import * as actions from "../../store/actions/index";
// const md5 = require("md5");

// class MaterialForm extends Component {
//   state = {
//     validated: true,
//     datasetMaterialId: "",
//     datasetCategoryId: "",
//     datasetManufacturer: "",
//     datasetMaterialImage: "",
//     datasetDataType: "",
//     datasetDataReliability: "",
//     datasetDataSource: "",
//     datasetProcessReviewed: "",
//     datasetStartDate: "",
//     datasetEndTime: "",
//   };

//   handleSubmit = (event) => {
//     event.preventDefault();
//     const form = event.currentTarget;
//     if (form.checkValidity() === false) {
//       event.stopPropagation();
//     }
//     if (form.checkValidity() === true) {
//       this.props.onDataSetMetaRegister(
//         this.state.roleRegister,
//         this.state.nameRegister,
//         this.state.emailRegister,
//         this.state.passwordRegister,
//         this.state.confirmPasswordRegister
//       );
//     }
//   };

//   handleChange = (event) => {
//     this.setState({
//       [event.target.id]: event.target.value,
//     });
//   };
  
//   render() {
    
//     let errorMessage = null;
//     if (this.props.error) {
//       errorMessage = (
//         <CAlert color="warning" dismissible>
//           {this.props.error}
//         </CAlert>
//       );
//     }
    
//     let DataSetMetaButton = !this.props.loading ? "Submit" : "Please Wait ...";
    
//     return (
//       <div class="text-flex">
//         {errorMessage}
//         <div class="sidebar-image">
//           <img src={image} class="img" />
//         </div>
//         <div class="gradient-linear">
//           <CForm
//             className="row g-3 needs-validation"
//             noValidate
//             validated={this.state.validated}
//             onSubmit={this.handleSubmit}
//           >
//             <CFormInput
//               id="roleRegister"
//               type="hidden"
//               placeholder="Role"
//               value={this.state.roleRegister}
//               onChange={this.handleChange}
//             />
//             {/* <CRow>
//             <LabelMain title={"Name"} color={Color.hdh} />
//         </CRow> */}
//             {/* <CInputGroup className="mb-3">
//                 <CFormInput
//                     id="nameRegister"
//                     type="text"
//                     placeholder="Enter name"
//                     value={this.state.nameRegister}
//                     onChange={this.handleChange}
//                     required />
//                 <CFormFeedback invalid>Please enter a valid name.</CFormFeedback>
//             </CInputGroup>   */}
//             <CFormSelect
//               id="categoryId"
//               value={this.state.categoryId}
//               onChange={this.handleChange}
//             >
//               <option value={null}> --- Select Material ---</option>
//               <option value="cement"> Cement </option>
//               <option value="sand">Sand</option>
//               <option value="aggregate">Aggregate</option>
//               <option value="burnt_clay_bricks">Burnt Clay Bricks</option>
//               <option value="aac_blocks">AAC Blocks</option>
//               <option value="fly_ash_bricks">Fly Ash Bricks</option>
//             </CFormSelect>
//             <CInputGroup className="mb-3">
//                 <CFormInput
//                     id="newMaterialAdd"
//                     type="text"
//                     placeholder="Enter Material Name"
//                     value={this.state.newMaterialAdd}
//                     onChange={this.handleChange}
//                     // required
//                      />
//                 {/* <CFormFeedback invalid>Please enter a valid name.</CFormFeedback> */}
//             </CInputGroup>
//             <CFormSelect
//                 id="categoryIds"
//                 value={this.state.categoryIds}
//                 onChange={this.handleChange}
//             >
//                 <option value={null}> --- Select Category ---</option>
//                 <option value="material_manufacturer">Material Manufacturer</option>
//                 <option value="researcher">Researcher</option>
//                 <option value="phd_scholar">Ph. D. scholar</option>
//                 <option value="epd_lca_consultant">EPD or LCA consultant</option>
//                 <option value="government_official">Government official</option>
//                 <option value="other">Other</option>
//             </CFormSelect>
//             <CInputGroup className="mb-3">
//                 <CFormInput
//                     id="newMaterialAdds"
//                     type="text"
//                     placeholder="Enter Category"
//                     value={this.state.newMaterialAdds}
//                     onChange={this.handleChange}
//                     // required
//                      />
//                 {/* <CFormFeedback invalid>Please enter a valid name.</CFormFeedback> */}
//             </CInputGroup>
//             <CFormSelect
//                 id="categoryIdss"
//                 value={this.state.categoryIdss}
//                 onChange={this.handleChange}
//             >
//                 <option value={null}> --- Select Data Reliability ---</option>
//                 <option value="measured">Measured</option>
//                 <option value="calculated">Calculated</option>
//                 <option value="estimated">Estimated</option>
//             </CFormSelect>
//             <CFormSelect
//                 id="categoryIdsas"
//                 value={this.state.categoryIdssa}
//                 onChange={this.handleChange}
//             >
//                 <option value={null}> --- Select Data Type ---</option>
//                 <option value="primary">Primary</option>
//                 <option value="secondary">Secondary</option>
//             </CFormSelect>
//             <CFormSelect
//                 id="categoryIdsas"
//                 value={this.state.categoryIdssa}
//                 onChange={this.handleChange}
//             >
//                 <option value={null}> --- Select Data Source ---</option>
//                 <option value="epd">EPD</option>
//                 <option value="company">Company</option>
//                 <option value="sustainability_report">Sustainability Report</option>
//                 <option value="energy_audit">Energy Audit</option>
//             </CFormSelect>
//             <CFormSelect
//                 id="categoryIdsas"
//                 value={this.state.categoryIdssa}
//                 onChange={this.handleChange}
//             >
//                 <option value={null}> --- Select Process Review ---</option>
//                 <option value="yes">Yes</option>
//                 <option value="no">No</option>
//             </CFormSelect>
//             <DatePicker
//                                 className='form-control'
//                                 dateFormat={"MM/dd/yyyy"}
//                                 minDate={this.state.startDate}
//                                 selected={this.state.endDate}
//                                 id="endDate"
//                                 placeholderText="Select a end date"
//                                 required
//                                 ariaInvalid="Please select a valid start date."
//                                 onChange={(date) => {
//                                     let updatedStateData = updateObject(this.state, { "endDate": date })
//                                     this.setState(updatedStateData);
//                                 }
//                                 }
//                             />
//                             <DatePicker
//                                 className='form-control'
//                                 dateFormat={"MM/dd/yyyy"}
//                                 minDate={this.state.startDate}
//                                 selected={this.state.endDate}
//                                 id="endDate"
//                                 placeholderText="Select a end date"
//                                 required
//                                 ariaInvalid="Please select a valid end date."
//                                 onChange={(date) => {
//                                     let updatedStateData = updateObject(this.state, { "endDate": date })
//                                     this.setState(updatedStateData);
//                                 }
//                                 }
//                             />
//             <CRow>
//               <CButton
//                 type="submit"
//                 backgroundColor={Color.hdh}
//                 marginTop={40}
//                 margintop={3}
//                 borderRadius={10}
//                 border={0}
//                 width={170}
//                 height={35}
//                 marginLeft={"auto"}
//                 marginRight={"auto"}
//                 display={"block"}
//                 color={Color.darkpink}
//               >
//                 {DataSetMetaButton}
//               </CButton>
//             </CRow>
//           </CForm>
//         </div>
//       </div>
//     );
//   }
// }

// const mapStateToProps = (state) => {
//   return {
//     loading: state.auth.loading,
//     error: state.auth.error,
//     isAuthenticated: state.auth.token !== null,
//   };
// };

// const mapDispatchToProps = (dispatch) => {
//   return {
//     onDataSetMetaRegister: (role, name, email, password, confirm_password) =>
//       dispatch(
//         actions.userRegister(role, name, email, password, confirm_password)
//       ),
//   };
// };

// export default connect(mapStateToProps, mapDispatchToProps)(MaterialForm);


import image from "../../assets/Images/sidebar-img.png";
import { LabelMain } from "../front-end/Header";
import { Color } from "../../const/const";
import { TextInputt } from "../front-end/Textinput.js";
import { TextButton } from "../front-end/Button.js";
import React, { Component } from "react";
import "react-datepicker/dist/react-datepicker.css";
import DatePicker from "react-datepicker";
import { updateObject } from '../../store/Utility'
import { connect } from "react-redux";
import header from "../../assets/Images/header.png";
import footer from "../../assets/Images/footer.png";
import cement from "../../assets/Images/cement.png";

import {
  CButton,
  CForm,
  CFormInput,
  CInputGroup,
  CRow,
  CAlert,
  CFormSelect,
  CFormLabel,
  CFormFeedback,
} from "@coreui/react";
import CIcon from "@coreui/icons-react";
import * as actions from "../../store/actions/index";
const md5 = require("md5");

class MaterialForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // categoryId: null,
      materialId: null,
      newMaterial:'',
      categoryId: null,
      newCategory: '',
      dataTypeId: null,
      dataReliabilityId: null,
      newDataSource: '',
      dataSourceId: '',
      processReviewId: '',
      lifeCycleCoveredA1: '',
      lifeCycleCoveredA2:'',
      lifeCycleCoveredA3:'',
      extractionDetails:'',
      rawmaterialforsupplier:'',
      processesinvolved:'',
      fuelconsumption:'',
      embodiedDetails:'',
      // newMaterialAdd: '',
      // categoryIds: null,
      // newcategoryAdd:''
    };
    this.handleChange = this.handleChange.bind(this);
  }
  handleChange(event) {
    const { id, value } = event.target;
    this.setState({
      [id]: value
    });
      // Check if the changed dropdown is extractionDetails
  if (id === 'extractionDetails') {
    // Update extractionDetails state
    this.setState({
      [id]: value,
      rawmaterialforsupplier: 'select', // Reset the rawmaterialforsupplier when extractionDetails changes
    });
  } else {
    // Update other dropdowns
    this.setState({
      [id]: value,
    });
   
  }
  if(id === 'fuelconsumption')
  {
    this.setState({
      [id]: value,
      rawmaterialforsupplier: 'select', // Reset the rawmaterialforsupplier when extractionDetails changes
    });
  }
  else{
    this.setState({
      [id]: value,
    });
  } 
  if(id === 'embodiedDetails')
  {
    this.setState({
      [id]: value,
      rawmaterialforsupplier: 'select', // Reset the rawmaterialforsupplier when extractionDetails changes
    });
  }
  else{
    this.setState({
      [id]: value,
    });
  }

  }
  state = {
    // validated: true,
    // datasetMaterialId: "",
    // datasetCategoryId: "",
    // datasetManufacturer: "",
    // datasetMaterialImage: "",
    // datasetDataType: "",
    // datasetDataReliability: "",
    // datasetDataSource: "",
    // datasetProcessReviewed: "",
    // datasetStartDate: "",
    // datasetEndTime: "",
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.stopPropagation();
    }
    if (form.checkValidity() === true) {
      this.props.onDataSetMetaRegister(
        this.state.roleRegister,
        this.state.nameRegister,
        this.state.emailRegister,
        this.state.passwordRegister,
        this.state.confirmPasswordRegister
      );
    }
  };

  // handleChange = (event) => {
  //   this.setState({
  //     [event.target.id]: event.target.value,
  //   });
  // };
  
  render() {
    let errorMessage = null;
    if (this.props.error) {
      errorMessage = (
        <CAlert color="warning" dismissible>
          {this.props.error}
        </CAlert>
      );
    }
    
    let DataSetMetaButton = !this.props.loading ? "Submit" : "Please Wait ...";
    
    return (
      <div class='text-flexml'>
         {errorMessage}
            <div class="sidebar-image">
            <img src={header}  class='img-header'/>
            </div>
            <LabelMain title={'Material Analysis'} textAlign={'center'} color={Color.purple} fontSize={'xx-large'} marginTop={10}/>
            <div class='text-cement'>
            <div class='img-cem'>
              <img src={cement} class='img-cement1' />
              <LabelMain  title={'Cement'} marginTop={10} color={Color.purple} marginLeft={0}/>
              <div>
                <LabelMain title={'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed efficitur diam vel tempus porta. Ut bibendum cursus dolor in suscipit. Proin auctor risus ac tincidunt cursus. Curabitur vel ante ut dolor dictum tincidunt.Sed efficitur diam vel tempus porta. Ut bibendum cursus dolor in suscipit.  '} color={Color.purple} marginLeft={0} marginRight={0} textAlign={'justify'} />
              </div>
              </div>
              <div class='text-form'>
              <CForm
            className="g-3 needs-validation"
            noValidate
            validated={this.state.validated}
            onSubmit={this.handleSubmit}
          >
            <CFormInput
              id="roleRegister"
              type="hidden"
              placeholder="Role"
              value={this.state.roleRegister}
              onChange={this.handleChange}
            />
            <CFormLabel>Material</CFormLabel>
            <CFormSelect
              id="materialId"
              value={this.state.materialId}
              onChange={this.handleChange}
            >
              <option value="cement"> Cement </option>
              <option value="sand">Sand</option>
              <option value="aggregate">Aggregate</option>
              <option value="burnt_clay_bricks">Burnt Clay Bricks</option>
              <option value="aac_blocks">AAC Blocks</option>
              <option value="fly_ash_bricks">Fly Ash Bricks</option>
              <option value='other'>Other</option>
            </CFormSelect>
            {this.state.materialId === 'other' && (
              <>
                <CInputGroup className="mb-3">
                <CFormLabel>Add New Material</CFormLabel>
                  <CFormInput
                  className="material"
                      id="newMaterial"
                      type="text"
                      placeholder="Enter Material Name"
                      value={this.state.newMaterial}
                      onChange={this.handleChange}
                      // required
                      />
                  { <CFormFeedback invalid>Please enter a valid name.</CFormFeedback> }
                </CInputGroup>
                <CFormInput type="file" id="materialImage" label="Material Image" />
              </>
            )}
            <CFormLabel>Category</CFormLabel>
            <CFormSelect
                id="categoryId"
                className="category"
                value={this.state.categoryId}
                onChange={this.handleChange}
            >
                <option value="material_manufacturer">Material Manufacturer</option>
                <option value="researcher">Researcher</option>
                <option value="phd_scholar">Ph. D. scholar</option>
                <option value="epd_lca_consultant">EPD or LCA consultant</option>
                <option value="government_official">Government official</option>
                <option value="other">Other</option>
            </CFormSelect>
            {this.state.categoryId === 'other' && (
            <CInputGroup className="mb-3">
              <CFormLabel>Add New Category</CFormLabel>
                <CFormInput
                    className="category"
                    id="newCategory"
                    type="text"
                    placeholder="Enter Category"
                    value={this.state.newCategory}
                    onChange={this.handleChange}
                    // required
                     />
                { <CFormFeedback invalid>Please enter a valid name.</CFormFeedback> }
            </CInputGroup>
             )}
            <CFormLabel>Data Type</CFormLabel>
            <CFormSelect
                id="dataTypeId"
                className="data-type"
                value={this.state.dataTypeId}
                onChange={this.handleChange}
            >
                <option value="primary">Primary</option>
                <option value="secondary">Secondary</option>
            </CFormSelect>
            <CFormLabel>Data Reliability</CFormLabel>
            <CFormSelect
                id="dataReliabilityId"
                className="data-reliability"
                value={this.state.dataReliabilityId}
                onChange={this.handleChange}
            >
              {this.state.dataTypeId === 'primary' && (
                <><option value="measured">Measured</option></>
              )}

              {this.state.dataTypeId === 'secondary' && (
                <><option value="calculated">Calculated</option><option value="estimated">Estimated</option></>
              )}
            </CFormSelect>
            {this.state.dataTypeId === 'primary' && (
              <>
              <CFormLabel>Data Source</CFormLabel>
              <CFormSelect
                    id="dataSourceId"
                   // className="material"
                    value={this.state.dataSourceId}
                    onChange={this.handleChange}
                >
                    <option value="epd">EPD</option>
                    <option value="company">Company</option>
                    <option value="sustainability_report">Sustainability Report</option>
                    <option value="energy_audit">Energy Audit</option>
                </CFormSelect>
              </>
                
              )}
            {this.state.dataTypeId === 'secondary' && (
              <CInputGroup className="mb-3">
                <CFormLabel>Add New Data Source</CFormLabel>
                  <CFormInput
                      className=""
                      id="newDataSource"
                      type="text"
                      placeholder="Enter Data Source"
                      value={this.state.newDataSource}
                      onChange={this.handleChange}
                      // required
                      />
                  { <CFormFeedback invalid>Please enter a valid name.</CFormFeedback> }
              </CInputGroup>
              )}
              <CFormLabel>Process Review</CFormLabel>
              <CFormSelect
                  id="processReviewId"
                // className="material"
                  value={this.state.processReviewId}
                  onChange={this.handleChange}
              >
                <option value="yes">Yes</option>
                <option value="no">No</option>
            </CFormSelect>
            <CFormLabel>Start Date</CFormLabel>
            <DatePicker
                className='form-control '
                dateFormat={"MM/dd/yyyy"}
                minDate={this.state.startDate}
                selected={this.state.startDate}
                id="startDate"
                placeholderText="Select a start date"
                required
                ariaInvalid="Please select a valid start date."
                onChange={(date) => {
                    let updatedStateData = updateObject(this.state, { "startDate": date })
                    this.setState(updatedStateData);
                }
                }
            />
            <CFormLabel>End Date</CFormLabel>
            <DatePicker
                className='form-control'
                dateFormat={"MM/dd/yyyy"}
                minDate={this.state.startDate}
                selected={this.state.endDate}
                id="endDate"
                placeholderText="Select a end date"
                required
                ariaInvalid="Please select a valid end date."
                onChange={(date) => {
                    let updatedStateData = updateObject(this.state, { "endDate": date })
                    this.setState(updatedStateData);
                }
                }
            />

            <hr></hr>
            <CFormLabel>Covered Lifecycles</CFormLabel>
                <br></br>
            <CFormLabel>A1 life cycle covered (data for A1 available?)</CFormLabel>
            <CFormSelect
                id="lifeCycleCoveredA1"
                className="data-type"
                value={this.state.lifeCycleCoveredA1}
                onChange={this.handleChange}
            >
                <option value="np">No</option>
                <option value="yes">Yes</option>
            </CFormSelect>
            {this.state.lifeCycleCoveredA1 === 'yes' && (
              <>
              <CFormLabel>Category Update</CFormLabel>
              <CFormSelect
                  id=""
                  className="category"
                  value={this.state.categoryId}
                  onChange={this.handleChange}
              >
                  <option value="material_manufacturer">Material Manufacturer</option>
                  <option value="researcher">Researcher</option>
                  <option value="phd_scholar">Ph. D. scholar</option>
                  <option value="epd_or_lca_consultant">EPD or LCA consultant</option>
                  <option value="goverment_official">Government official</option>
                  <option value="other">Other</option>
              </CFormSelect>
              <CFormLabel>Raw Material requirement for reference Finished Material</CFormLabel>
              <CFormSelect
                    id="dataSourceId"
                  //  className="material"
                    value={this.state.dataSourceId}
                    onChange={this.handleChange}
                >
                    <option value="finishedmaterial1">Reference (Basal) Qty of Finished Material </option>
                    <option value="finishedmaterial2">Reference (Basal) Qty of Finished Material </option>

                </CFormSelect>

                <CFormLabel>Raw Material details</CFormLabel>
              <CFormSelect
                    id="dataSourceId"
                  //  className="material"
                    value={this.state.dataSourceId}
                    onChange={this.handleChange}
                >
                    <option value="production-1">Raw Materials needed for Finished Material production- 1(+)  </option>
                    <option value="production-2">Raw Materials needed for Finished Material production- 2(+)  </option>
                    <option value="production-3">Raw Materials needed for Finished Material production- 3(+)  </option>

                </CFormSelect>
              
                
                <CFormLabel>Raw Material Extraction Details</CFormLabel>
              <CFormSelect
                    id="extractionDetails"
                  //  className="material"
                    value={this.state.extractionDetails}
                    onChange={this.handleChange}
                >
                    <option value="select">Select</option>
                    <option value="ep-1">Raw Materials needed for Finished Material production- 1(+)  </option>
                    <option value="ep-2">Raw Materials needed for Finished Material production- 2(+)  </option>
                    <option value="ep-3">Raw Materials needed for Finished Material production- 3(+)  </option>

                </CFormSelect>
                <div class='extraction'>
                {this.state.extractionDetails &&  (
              <>
            <div class='extraction-left'>
              <CFormLabel>Raw Materials</CFormLabel>
              <CFormSelect
                    id="rawmaterialforsupplier"
                    //className="material"
                    value={this.state.rawmaterialforsupplier}
                    onChange={this.handleChange}
                >
                    <option value="extracted">Extracted for Supplier</option>
                    <option value="bought">Bought for Supplier</option>
                   
                </CFormSelect>
                </div>
                <div class='extraction-right'>
                <CFormLabel>Processes Involved in Extraction</CFormLabel>
              <CFormSelect
                    id="rawmaterialforsupplier"
                    //className="material"
                    value={this.state.rawmaterialforsupplier}
                    onChange={this.handleChange}
                >
                    <option value="extracted">Extracted for Supplier</option>
                    <option value="bought">Bought for Supplier</option>
                   
                </CFormSelect>
                </div>

                <div class='extraction-left'>
              <CFormLabel>Extraction Site (State)</CFormLabel>
              <CFormSelect
                    id="rawmaterialforsupplier"
                    //className="material"
                    value={this.state.rawmaterialforsupplier}
                    onChange={this.handleChange}
                >
                    <option value="extracted">Extracted for Supplier</option>
                    <option value="bought">Bought for Supplier</option>
                   
                </CFormSelect>
                </div>
                <div class='extraction-right'>
                <CFormLabel>Extraction Site (District)</CFormLabel>
              <CFormSelect
                    id="rawmaterialforsupplier"
                    //className="material"
                    value={this.state.rawmaterialforsupplier}
                    onChange={this.handleChange}
                >
                    <option value="extracted">Extracted for Supplier</option>
                    <option value="bought">Bought for Supplier</option>
                   
                </CFormSelect>
                </div>
                <div class='extraction-left'>
              <CFormLabel>Extraction Site Location (Latitude)</CFormLabel>
              <CFormSelect
                    id="rawmaterialforsupplier"
                    //className="material"
                    value={this.state.rawmaterialforsupplier}
                    onChange={this.handleChange}
                >
                    <option value="extracted">Extracted for Supplier</option>
                    <option value="bought">Bought for Supplier</option>
                   
                </CFormSelect>
                </div>
                <div class='extraction-right'>
                <CFormLabel>Extraction Site Location (Longitude)</CFormLabel>
              <CFormSelect
                    id="rawmaterialforsupplier"
                    //className="material"
                    value={this.state.rawmaterialforsupplier}
                    onChange={this.handleChange}
                >
                    <option value="extracted">Extracted for Supplier</option>
                    <option value="bought">Bought for Supplier</option>
                   
                </CFormSelect>
                </div>
              </>  
              )}
              </div>
                
                <CFormLabel>Fuel Consumption</CFormLabel>
              <CFormSelect
                    id="fuelconsumption"
                  //  className="material"
                    value={this.state.fuelconsumption}
                    onChange={this.handleChange}
                >
                    <option value='select'>Select</option>
                    <option value="fuelconsumptionproduction-1">Raw Materials needed for Finished Material production- 1(+)  </option>
                    <option value="fuelconsumptionproduction-2">Raw Materials needed for Finished Material production- 2(+)  </option>
                    <option value="fuelconsumptionextractionproduction-3">Raw Materials needed for Finished Material production- 3(+)  </option>

                </CFormSelect>
                <div class='extraction'>
                {this.state.fuelconsumption  &&  (
              <>
            <div class='extraction-left'>
              <CFormLabel>Raw Materials</CFormLabel>
              <CFormSelect
                    id="rawmaterialforsupplier"
                    //className="material"
                    value={this.state.rawmaterialforsupplier}
                    onChange={this.handleChange}
                >
                    <option value="extracted">Extracted for Supplier</option>
                    <option value="bought">Bought for Supplier</option>
                   
                </CFormSelect>
                </div>
                <div class='extraction-right'>
                <CFormLabel>Processes Involved in Extraction</CFormLabel>
              <CFormSelect
                    id="rawmaterialforsupplier"
                    //className="material"
                    value={this.state.rawmaterialforsupplier}
                    onChange={this.handleChange}
                >
                    <option value="extracted">Extracted for Supplier</option>
                    <option value="bought">Bought for Supplier</option>
                   
                </CFormSelect>
                </div>

                <div class='extraction-left'>
              <CFormLabel>Extraction Site (State)</CFormLabel>
              <CFormSelect
                    id="rawmaterialforsupplier"
                    //className="material"
                    value={this.state.rawmaterialforsupplier}
                    onChange={this.handleChange}
                >
                    <option value="extracted">Extracted for Supplier</option>
                    <option value="bought">Bought for Supplier</option>
                   
                </CFormSelect>
                </div>
                <div class='extraction-right'>
                <CFormLabel>Extraction Site (District)</CFormLabel>
              <CFormSelect
                    id="rawmaterialforsupplier"
                    //className="material"
                    value={this.state.rawmaterialforsupplier}
                    onChange={this.handleChange}
                >
                    <option value="extracted">Extracted for Supplier</option>
                    <option value="bought">Bought for Supplier</option>
                   
                </CFormSelect>
                </div>
                <div class='extraction-left'>
              <CFormLabel>Extraction Site Location (Latitude)</CFormLabel>
              <CFormSelect
                    id="rawmaterialforsupplier"
                    //className="material"
                    value={this.state.rawmaterialforsupplier}
                    onChange={this.handleChange}
                >
                    <option value="extracted">Extracted for Supplier</option>
                    <option value="bought">Bought for Supplier</option>
                   
                </CFormSelect>
                </div>
                <div class='extraction-right'>
                <CFormLabel>Extraction Site Location (Longitude)</CFormLabel>
              <CFormSelect
                    id="rawmaterialforsupplier"
                    //className="material"
                    value={this.state.rawmaterialforsupplier}
                    onChange={this.handleChange}
                >
                    <option value="extracted">Extracted for Supplier</option>
                    <option value="bought">Bought for Supplier</option>
                   
                </CFormSelect>
                </div>
                <div class='extraction-left'>
              <CFormLabel>Fuel Mix</CFormLabel>
              <CFormInput
                  //className="material"
                      id="newMaterial"
                      type="text"
                      placeholder="Fuel Mix"
                      value={this.state.newMaterial}
                      onChange={this.handleChange}
                      // required
                      />
                </div>
                <div class='extraction-right'>
                <CFormLabel>Fuel Consumed</CFormLabel>
                <CFormInput
                  //className="material"
                      id="newMaterial"
                      type="text"
                      placeholder="Fuel Consumed"
                      value={this.state.newMaterial}
                      onChange={this.handleChange}
                      // required
                      />
                </div>
                <div class='extraction-left'>
              <CFormLabel>Unit</CFormLabel>
              <CFormInput
                  //className="material"
                      id="newMaterial"
                      type="text"
                      placeholder="Unit"
                      value={this.state.newMaterial}
                      onChange={this.handleChange}
                      // required
                      />
                </div>
                <div class='extraction-right'>
                <CFormLabel>Fuel density (kg/L)</CFormLabel>
                <CFormInput
                  //className="material"
                      id="newMaterial"
                      type="text"
                      placeholder="Fuel density (kg/L)"
                      value={this.state.newMaterial}
                      onChange={this.handleChange}
                      // required
                      />
                </div>

                <div class='extraction-left'>
              <CFormLabel>Calrific Value</CFormLabel>
              <CFormInput
                  //className="material"
                      id="newMaterial"
                      type="text"
                      placeholder="Calrific Value"
                      value={this.state.newMaterial}
                      onChange={this.handleChange}
                      // required
                      />
                </div>
                <div class='extraction-right'>
                <CFormLabel>Calorific Value</CFormLabel>
                <CFormInput
                  //className="material"
                      id="newMaterial"
                      type="text"
                      placeholder="Calorific Value"
                      value={this.state.newMaterial}
                      onChange={this.handleChange}
                      // required
                      />
                </div>
              </>  
              )}
              </div>
                <CFormLabel>Embodied Energy Details</CFormLabel>
              <CFormSelect
                    id="embodiedDetails"
                  //  className="material"
                    value={this.state.embodiedDetails}
                    onChange={this.handleChange}
                >
                    <option value='select'>Select</option>
                    <option value="Engerydetailsproduction-1">Raw Materials needed for Finished Material production- 1(+)  </option>
                   
                </CFormSelect>
                <div class='extraction'>
                {this.state.embodiedDetails  &&  (
              <>
            <div class='extraction-left'>
              <CFormLabel>Raw Materials</CFormLabel>
              <CFormSelect
                    id="rawmaterialforsupplier"
                    //className="material"
                    value={this.state.rawmaterialforsupplier}
                    onChange={this.handleChange}
                >
                    <option value="extracted">Extracted for Supplier</option>
                    <option value="bought">Bought for Supplier</option>
                   
                </CFormSelect>
                </div>
                <div class='extraction-right'>
                <CFormLabel>Processes Involved in Extraction</CFormLabel>
              <CFormSelect
                    id="rawmaterialforsupplier"
                    //className="material"
                    value={this.state.rawmaterialforsupplier}
                    onChange={this.handleChange}
                >
                    <option value="extracted">Extracted for Supplier</option>
                    <option value="bought">Bought for Supplier</option>
                   
                </CFormSelect>
                </div>

                <div class='extraction-left'>
              <CFormLabel>Extraction Site (State)</CFormLabel>
              <CFormSelect
                    id="rawmaterialforsupplier"
                    //className="material"
                    value={this.state.rawmaterialforsupplier}
                    onChange={this.handleChange}
                >
                    <option value="extracted">Extracted for Supplier</option>
                    <option value="bought">Bought for Supplier</option>
                   
                </CFormSelect>
                </div>
                <div class='extraction-right'>
                <CFormLabel>Extraction Site (District)</CFormLabel>
              <CFormSelect
                    id="rawmaterialforsupplier"
                    //className="material"
                    value={this.state.rawmaterialforsupplier}
                    onChange={this.handleChange}
                >
                    <option value="extracted">Extracted for Supplier</option>
                    <option value="bought">Bought for Supplier</option>
                   
                </CFormSelect>
                </div>
                <div class='extraction-left'>
              <CFormLabel>Extraction Site Location (Latitude)</CFormLabel>
              <CFormSelect
                    id="rawmaterialforsupplier"
                    //className="material"
                    value={this.state.rawmaterialforsupplier}
                    onChange={this.handleChange}
                >
                    <option value="extracted">Extracted for Supplier</option>
                    <option value="bought">Bought for Supplier</option>
                   
                </CFormSelect>
                </div>
                <div class='extraction-right'>
                <CFormLabel>Extraction Site Location (Longitude)</CFormLabel>
              <CFormSelect
                    id="rawmaterialforsupplier"
                    //className="material"
                    value={this.state.rawmaterialforsupplier}
                    onChange={this.handleChange}
                >
                    <option value="extracted">Extracted for Supplier</option>
                    <option value="bought">Bought for Supplier</option>
                   
                </CFormSelect>
                </div>
                <div class='extraction-left'>
              <CFormLabel>Fuel Mix</CFormLabel>
              <CFormInput
                  //className="material"
                      id="newMaterial"
                      type="text"
                      placeholder="Fuel Mix"
                      value={this.state.newMaterial}
                      onChange={this.handleChange}
                      // required
                      />
                </div>
                <div class='extraction-right'>
                <CFormLabel>Fuel Consumed</CFormLabel>
                <CFormInput
                  //className="material"
                      id="newMaterial"
                      type="text"
                      placeholder="Fuel Consumed"
                      value={this.state.newMaterial}
                      onChange={this.handleChange}
                      // required
                      />
                </div>
                <div class='extraction-left'>
              <CFormLabel>Unit</CFormLabel>
              <CFormInput
                  //className="material"
                      id="newMaterial"
                      type="text"
                      placeholder="Unit"
                      value={this.state.newMaterial}
                      onChange={this.handleChange}
                      // required
                      />
                </div>
                <div class='extraction-right'>
                <CFormLabel>Fuel density (kg/L)</CFormLabel>
                <CFormInput
                  //className="material"
                      id="newMaterial"
                      type="text"
                      placeholder="Fuel density (kg/L)"
                      value={this.state.newMaterial}
                      onChange={this.handleChange}
                      // required
                      />
                </div>

                <div class='extraction-left'>
              <CFormLabel>Calrific Value</CFormLabel>
              <CFormInput
                  //className="material"
                      id="newMaterial"
                      type="text"
                      placeholder="Calrific Value"
                      value={this.state.newMaterial}
                      onChange={this.handleChange}
                      // required
                      />
                </div>
                <div class='extraction-right'>
                <CFormLabel>Calorific Value</CFormLabel>
                <CFormInput
                  //className="material"
                      id="newMaterial"
                      type="text"
                      placeholder="Calorific Value"
                      value={this.state.newMaterial}
                      onChange={this.handleChange}
                      // required
                      />
                </div>
              </>  
              )}
              </div>
              </>

              )}
            <CFormLabel>A2 life cycle covered (data for A2 available?)</CFormLabel>
            <CFormSelect
                id="lifeCycleCoveredA2"
                className="data-type"
                value={this.state.lifeCycleCoveredA2}
                onChange={this.handleChange}
            >
                <option value="np">No</option>
                <option value="yes">Yes</option>
            </CFormSelect>
            {this.state.lifeCycleCoveredA2 === 'yes' && (
              <>
              <CFormLabel>Data Source</CFormLabel>
              <CFormSelect
                    id="dataSourceId"
                   // className="material"
                    value={this.state.dataSourceId}
                    onChange={this.handleChange}
                >
                    <option value="epd">EPD</option>
                    <option value="company">Company</option>
                    <option value="sustainability_report">Sustainability Report</option>
                    <option value="energy_audit">Energy Audit</option>
                </CFormSelect>
              </>  
              )}

            <CFormLabel>A3 life cycle covered (data for A3 available?)</CFormLabel>
            <CFormSelect
                id="lifeCycleCoveredA3"
                className="data-type"
                value={this.state.lifeCycleCoveredA3}
                onChange={this.handleChange}
            >
                <option value="np">No</option>
                <option value="yes">Yes</option>
            </CFormSelect>
            {this.state.lifeCycleCoveredA3 === 'yes' && (
              <>
              <CFormLabel>Data Source</CFormLabel>
              <CFormSelect
                    id="dataSourceId"
                    //className="material"
                    value={this.state.dataSourceId}
                    onChange={this.handleChange}
                >
                    <option value="epd">EPD</option>
                    <option value="company">Company</option>
                    <option value="sustainability_report">Sustainability Report</option>
                    <option value="energy_audit">Energy Audit</option>
                </CFormSelect>
              </>  
              )}
            <CRow>
              <CButton
               className="button_new_class_form"
                type="submit"
                backgroundColor={Color.hdh}
                marginTop={60}
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
                {DataSetMetaButton}
              </CButton>
            </CRow>
          </CForm>
              </div>
            </div>
            <div class="sidebar-image">
            <img src={footer}  class='img-header' style={{marginTop:'10px'}}/>
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
    onDataSetMetaRegister: (role, name, email, password, confirm_password) =>
      dispatch(
        actions.userRegister(role, name, email, password, confirm_password)
      ),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MaterialForm);