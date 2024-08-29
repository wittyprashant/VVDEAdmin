import React, { Component } from "react";
import {
  CButton,
  CForm,
  CTabContent,
  CTabPane,
  CFormInput,
  CRow,
  CNavItem,
  CNav,
  CAlert,
  CNavLink,
  CFormSelect,
  CFormLabel,
  CFormFeedback,
} from "@coreui/react";
import { FaCheck, FaAngleRight } from "react-icons/fa";
import image from "../../assets/Images/sidebar-img.png";
import { LabelMain } from "../front-end/Header";
import { Color } from "../../const/const";
import "react-datepicker/dist/react-datepicker.css";
import DatePicker from "react-datepicker";
import { updateObject } from "../../store/Utility";
import { connect } from "react-redux";
import header from "../../assets/Images/header.png";
import footer from "../../assets/Images/footer.png";
import cement from "../../assets/Images/cement.png";
import * as actions from "../../store/actions/index";
import { formToJSON } from "axios";
import { endPoint } from "../../frontend_api/API/constant_api";
import { CallAPICommonDML } from "../../frontend_api/API/api_call";


const md5 = require("md5");
const months = [
  { value: "01", label: "January" },
  { value: "02", label: "February" },
  { value: "03", label: "March" },
  { value: "04", label: "April" },
  { value: "05", label: "May" },
  { value: "06", label: "June" },
  { value: "07", label: "July" },
  { value: "08", label: "August" },
  { value: "09", label: "September" },
  { value: "10", label: "October" },
  { value: "11", label: "November" },
  { value: "12", label: "December" },
];
const currentYear = new Date().getFullYear();

// Generate an array of years from current year to 10 years ago
const years = [];
for (let year = currentYear; year >= currentYear - 30; year--) {
  years.push(year);
}

class MaterialForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      material_id: "",
      material_name: "",
      category_id: "",
      category_name: "",
      data_type_id: "",
      data_reliability_id: "",
      data_source_id: "",
      process_review_id: "",
      dataset_category_id: "",
      lifeCycleCoveredA1: "",
      lifeCycleCoveredA2: "",
      lifeCycleCoveredA3: "",
      form_input_data: "",
      inputs: [],
      formData: {},
      formInputData: {},
      activeKey: 1,
      subActiveKey: 1,
      inputkey: [],
      showError: false,
      start_date: null,
      end_date: null,
      formFilled: false,
      formqty: false,
      formtimeline: false,
      formproperties: false,
      formA1cycle: false,
      formupload: false,
      errors: {},
      dataset_category_id: "",
      beginningYear: "",
      beginningMonth: "",
      endingYear: "",
      endingMonth: "",
      rawMaterials: [
        {
          unitvalue: "",
          u_value: "",
        },
      ],
      raw_materials:[],
      formDataA1:[
        {
        a1_raw_material:"",
        a1_raw_material_qty:"",
        a1_raw_material_extraction_status:"",
        a1_raw_material_extraction_process:"",
        a1_raw_material_extraction_site_lat:"",
        a1_raw_material_extraction_site_lon:"",
        a1_raw_material_extraction_site_district: "",
        a1_raw_material_extraction_site_state: "",
        a1_fuel_mix: "",
        a1_fuel_qty: "",
        a1_fuel_density: "",
        a1_fuel_calorific_value: "",
        a1_embodied_energy_details: "",
        a1_characterization_factor: "",
        a1_embodied_energy_unit: "",
        

      }],
    
    formDataA2:[
      {
        a2_raw_material:"",
        a2_raw_material_manufacturing_plant:"",
        a2_raw_material_extraction_site:"",
        a2_raw_material_district:"" ,
        a2_raw_material_state: "",
        a2_raw_mat_distance_between_extraction_and_manufacturing_site:"",
        a2_raw_material_vehicle_make: "",
        a2_raw_material_vehicle_model: "",
        a2_raw_material_vehicle_capacity: "",
        a2_raw_material_vehicle_category: "",
        a2_raw_material_trip_required_transporting_raw_material_qty: "",
        a2_raw_material_total_distance_travel_transporting_raw_material: "",
        a2_fuel_mix: "",
        a2_fuel_mix_qty: "",
        a2_fuel_density: "",
        a2_fuel_calorific_value: "",
        a2_fuel_embodied_energy_details_qty: "",
        a2_fuel_embodied_carbon_details_unit: "",
        a2_embodied_energy: "",
     
       

      }
    ],
    formDataA3:[{
      a3_raw_material: "",
      a3_manufacturing_technology: "",
      a3_processes_undertaken_during_manufacturing: "",
      a3_plant_standard_operation_temperature: "",
      a3_plant_standard_operation_pressure: "",
      a3_material_quality: "",
      a3_fuel_mix: "",
      a3_fuel_qty: "",
      a3_fuel_density: "",
      a3_calorific_value: "",
      a1_embodied_energy_details_qty: "",
      a3_characterization_factor: "",
      a3_embodied_energy_for_reference_raw_materia_qty: "",
     
    }]
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSave = this.handleSave(this);
    this.handleAddInput = this.handleAddInput.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.setSubActiveKey = this.setSubActiveKey.bind(this);
  }

  componentDidMount() {
    this.getSampleMaster();

    // Load form data from local storage
    const data_type_id = localStorage.getItem("data_type_id") || "";
    const data_reliability_id =
      localStorage.getItem("data_reliability_id") || "";
    const process_review_id = localStorage.getItem("process_review_id") || "";
    const data_source_id = localStorage.getItem("data_source_id") || "";
    const start_date = localStorage.getItem("start_date")
      ? new Date(localStorage.getItem("start_date"))
      : null;
    const end_date = localStorage.getItem("end_date")
      ? new Date(localStorage.getItem("end_date"))
      : null;
    const material_id = localStorage.getItem("material_id") || "";
    const density = localStorage.getItem("density") || "";
    const u_value = localStorage.getItem("u_value") || "";
    const compressive_strength = localStorage.getItem("compressive_strength") || "";
    const tensile_strength = localStorage.getItem("tensile_strength") || "";
    const diameter = localStorage.getItem("diameter") || "";
    const coverage = localStorage.getItem("coverage") || "";
    const manufacturer = localStorage.getItem("manufacturer") || "";
    const material_name = localStorage.getItem("material_name") || "";
    const finishedqty = localStorage.getItem("finishedqty") || "";
    const unitqty = localStorage.getItem("unitqty") || "";
    const myfiles = localStorage.getItem("myfiles") || "";
    const unitcmp = localStorage.getItem("unitcmp") || "";
    const unitcvg = localStorage.getItem("unitcvg") || "";
    const unitdensty = localStorage.getItem("unitdensty") || "";
    const unitdmt = localStorage.getItem("unitdmt") || "";
    const unitten = localStorage.getItem("unitten") || "";
    const unitvalue = localStorage.getItem("unitvalue") || "";
    const typedetails = localStorage.getItem("typedetails") || "";

    // Determine form completion status
    const isFormdetails =
      material_id !== "" &&
      density !== "" &&
      u_value !== "" &&
      compressive_strength !== "" &&
      tensile_strength !== "" &&
      diameter !== "" &&
      coverage !== "" &&
      manufacturer !== "" &&
      unitcmp !== "" &&
      unitcvg !== "" &&
      unitdensty !== "" &&
      unitten !== "" &&
      unitdmt !== "" &&
      unitvalue !== "" &&
      typedetails !== "";

    const isFormqty = finishedqty !== "" && unitqty !== "";
    const isformdate = start_date !== null && end_date !== null;
    const isFormFilled =
      data_reliability_id !== "" &&
      process_review_id !== "" &&
      data_type_id !== "" &&
      data_source_id !== "";
    const isFormimg = myfiles !== "";

    // Set state
    this.setState({
      data_type_id,
      data_reliability_id,
      process_review_id,
      data_source_id,
      start_date,
      end_date,
      material_id,
      density,
      u_value,
      compressive_strength,
      tensile_strength,
      diameter,
      coverage,
      manufacturer,
      material_name,
      finishedqty,
      myfiles,
      unitqty,
      typedetails,
      unitcmp,
      unitcvg,
      unitten,
      unitdmt,
      unitdensty,
      unitvalue,
      formFilled: isFormdetails,
      formqty: isFormqty,
      formtimeline: isformdate,
      formproperties: isFormFilled,
      // formA1cycle:isA1FormFilled,
      formupload: isFormimg,
     
    
    });
    const formState = JSON.parse(localStorage.getItem("formState"));
    if (formState) {
      this.setState(formState, this.validateFormCompletion);
    }
  }

  getSampleMaster = () => {
  
    let tag = "Group";
      let url = endPoint.material;
      console.log( "url", url);
     
      return CallAPICommonDML(
          url,
          "GET",
          {
             
          },
          tag
      ).then((res) => {
        this.setState({ raw_materials: res.data.result });
          // setgroupdatalist(res.data.result)
          console.log(tag+" Success -----------------",res.data.result);
          return res;
      });
  }

  handleNavClick = (key) => {
    this.setState({ activeKey: key });
  };
  handleNavClicks = (key) => {
    this.setState({ subActiveKey: key });
  };

  handlechange = (e) => {
    const { id, value } = e.target;
    this.setState({ [id]: value, formproperties: false }, () => {
      // Update local storage with the form data
      localStorage.setItem(id, value);
      this.checkFormFilledprop();
    });
  };

  handleBeginningYearChange = (event) => {
    const beginningYear = event.target.value;
    this.setState({ beginningYear, formtimeline: false }, () => {
      localStorage.setItem("formState", JSON.stringify(this.state));
      this.checkFormFilleddate();
    });
  };

  handleBeginningMonthChange = (event) => {
    const beginningMonth = event.target.value;
    this.setState({ beginningMonth, formtimeline: false }, () => {
      localStorage.setItem("formState", JSON.stringify(this.state));
      this.checkFormFilleddate();
    });
  };

  handleEndingYearChange = (event) => {
    const endingYear = event.target.value;
    this.setState({ endingYear, formtimeline: false }, () => {
      localStorage.setItem("formState", JSON.stringify(this.state));
      this.checkFormFilleddate();
    });
  };

  handleEndingMonthChange = (event) => {
    const endingMonth = event.target.value;
    this.setState({ endingMonth, formtimeline: false }, () => {
      localStorage.setItem("formState", JSON.stringify(this.state));
      this.checkFormFilleddate();
    });
  };

  // Array of month names
  handleChangesA1 = (event) => {
    const { id, value } = event.target;
  
    // Check if the field belongs to formDataA1
    if (id.startsWith('a1_')) {
      this.setState(prevState => ({
        formDataA1: {
          ...prevState.formDataA1,
          [id]: value
        }
      }));
    } else {
      // Handle other fields
      this.setState({ [id]: value });
    }
  };
  handleChangesA2 = (event) => {
    const { id, value } = event.target;
    if (id.startsWith('a2_')) {
      this.setState(prevState => ({
        formDataA2: {
          ...prevState.formDataA2,
          [id]: value
        }
      }));
    } else {
      // Handle other fields
      this.setState({ [id]: value });
    }
  };
  handleChangesA3 = (event) => {
    const { id, value } = event.target;
    if (id.startsWith('a3_')) {
      this.setState(prevState => ({
        formDataA3: {
          ...prevState.formDataA3,
          [id]: value
        }
      }));
    } else {
      // Handle other fields
      this.setState({ [id]: value });
    }
  };
  handleChanges = (e) => {
    
    console.log(this.state.formDataA1);
    console.log(e.target);
    const { id, value } = e.target;
    this.setState({ [id]: value, formFilled: false }, () => {
      localStorage.setItem("formState", JSON.stringify(this.state));
      this.checkFormFilled();
    });
  };

  handleImgChange = (event) => {
    const file = event.target.files[0]; // Access the selected file from the event
    const id = event.target.id; // Assuming the ID of the input element is passed as the first argument to the function
    this.setState({ [id]: file, formupload: false }, () => {
      // Assuming you want to store the file data in local storage
      localStorage.setItem("formState", JSON.stringify(this.state)); // Store the file in local storage
      this.checkFormFilledimg(); // Call a function to check if the form is filled
    });
  };

  handleChanged = (e) => {
    const { id, value } = e.target;
    this.setState({ [id]: value, formqty: false }, () => {
      localStorage.setItem("formState", JSON.stringify(this.state));
      this.checkFormFilledqty();
    });
  };
  checkA1FormFilled = () => {
    const lifeCycleCoveredA1 = localStorage.getItem("lifeCycleCoveredA1") || "";
    const a1_raw_material = localStorage.getItem("a1_raw_material") || "";
    const a1_raw_material_qty =
      localStorage.getItem("a1_raw_material_qty") || "";
    const a1_raw_material_extraction_status =
      localStorage.getItem("a1_raw_material_extraction_status") || "";
    const a1_raw_material_extraction_process = localStorage.getItem("a1_raw_material_extraction_process") || "";
    const a1_raw_material_extraction_site_lat = localStorage.getItem("a1_raw_material_extraction_site_lat") || "";
    const a1_raw_material_extraction_site_lon = localStorage.getItem("a1_raw_material_extraction_site_lon") || "";
    const a1_raw_material_extraction_site_district = localStorage.getItem("a1_raw_material_extraction_site_district") || "";
    const a1_raw_material_extraction_site_state = localStorage.getItem("a1_raw_material_extraction_site_state") || "";
    const a1_fuel_mix = localStorage.getItem("a1_fuel_mix") || "";
    const a1_fuel_qty = localStorage.getItem("a1_fuel_qty") || "";
    const a1_fuel_density = localStorage.getItem("a1_fuel_density") || "";
    const a1_fuel_calorific_value =
      localStorage.getItem("a1_fuel_calorific_value") || "";
    const a1_embodied_energy_details = localStorage.getItem("a1_embodied_energy_details") || "";
    const a1_characterization_factor =
      localStorage.getItem("a1_characterization_factor") || "";
    const a1_embodied_energy_unit =
      localStorage.getItem("a1_embodied_energy_unit") || "";
    
    const formA1cycle =
      lifeCycleCoveredA1 === "yes" &&
      a1_raw_material !== "" &&
      a1_raw_material_qty !== "" &&
      a1_raw_material_extraction_status !== "" &&
      a1_raw_material_extraction_process !== "" &&
      a1_raw_material_extraction_site_lat !== "" &&
      a1_raw_material_extraction_site_lon !== "" &&
      a1_raw_material_extraction_site_district !== "" &&
      a1_raw_material_extraction_site_state !== "" &&
      a1_fuel_mix !== "" &&
      a1_fuel_qty !== "" &&
      a1_fuel_density !== "" &&
      a1_fuel_calorific_value !== "" &&
      a1_embodied_energy_details !== "" &&
      a1_characterization_factor !== "" &&
      a1_embodied_energy_unit !== "" &&
    
     

    this.setState({ formA1cycle });
  };

  checkFormFilled = () => {
    const {
      coverage,
      tensile_strength,
      material_id,
      material_name,
      compressive_strength,
      density,
      diameter,
      manufacturer,
      u_value,
      unitcmp,
      typedetails,
      unitcvg,
      unitten,
      unitdmt,
      unitdensty,
      unitvalue,
    } = this.state;

    // Check if all required fields are filled
    const formFilled =
      coverage &&
      tensile_strength &&
      material_id &&
      material_name &&
      compressive_strength &&
      density &&
      diameter &&
      manufacturer &&
      u_value &&
      unitcmp &&
      unitcvg &&
      unitten &&
      unitdmt &&
      unitdensty &&
      unitvalue &&
      typedetails;

    // Update the state with formFilled
    this.setState({ formFilled });
  };

  checkFormFilledprop = () => {
    const {
      data_type_id,
      data_reliability_id,
      process_review_id,
      data_source_id,
    } = this.state;
    const formproperties =
      data_type_id &&
      data_reliability_id &&
      process_review_id &&
      data_source_id;
    this.setState({ formproperties });
  };
  checkFormFilleddate = () => {
    const { beginningYear, beginningMonth, endingYear, endingMonth } =
      this.state;
    const formtimeline =
      beginningYear && beginningMonth && endingYear && endingMonth;
    this.setState({ formtimeline });
  };

  checkFormFilledqty = () => {
    const { finishedqty, unitqty } = this.state;
    const formqty = finishedqty && unitqty;
    this.setState({ formqty });
  };
  checkFormFilledimg = () => {
    const { myfiles } = this.state;
    const formupload = myfiles;
    this.setState({ formupload });
  };
  getTabIconimg = () => {
    const { formupload } = this.state;
    return formupload ? (
      <FaCheck style={{ color: "green", marginLeft: "5px" }} />
    ) : (
      <FaAngleRight style={{ color: "red" }} />
    );
  };
  getTabIconA1 = () => {
    const { formA1cycle } = this.state;
    return formA1cycle ? (
      <FaCheck style={{ color: "green", marginLeft: "5px" }} />
    ) : (
      <FaAngleRight style={{ color: "red" }} />
    );
  };
  getTabIcon = () => {
    const { formproperties } = this.state;
    return formproperties ? (
      <FaCheck style={{ color: "green", marginLeft: "5px" }} />
    ) : (
      <FaAngleRight style={{ color: "red" }} />
    );
  };
  getTabIcondate = () => {
    const { formtimeline } = this.state;
    return formtimeline ? (
      <FaCheck style={{ color: "green", marginLeft: "5px" }} />
    ) : (
      <FaAngleRight style={{ color: "red" }} />
    );
  };
  getTabIcondetails = () => {
    const { formFilled } = this.state;
    return formFilled ? (
      <FaCheck style={{ color: "green", marginLeft: "5px" }} />
    ) : (
      <FaAngleRight style={{ color: "red" }} />
    );
  };
  getTabIconqty = () => {
    const { formqty } = this.state;
    return formqty ? (
      <FaCheck style={{ color: "green", marginLeft: "5px" }} />
    ) : (
      <FaAngleRight style={{ color: "red" }} />
    );
  };
  setActiveKey = (newKey) => {
    this.setState({ activeKey: newKey });
  };
  setSubActiveKey = (key) => {
    this.setState({ subActiveKey: key });
  };
  handleAddInput = () => {
    this.setState((prevState) => ({
      inputs: [
        ...prevState.inputs,
        <div key={prevState.inputs.length}>
          <input type="text" />
        </div>,
      ],
    }));
  };
  handleInputkeyChange = (index, event) => {
    const inputkey = [...this.state.inputkey];
    inputkey[index][event.target.id] = event.target.value;
    this.setState({ inputkey });
  };

  handleChangess = (index, e) => {
    const { name, value } = e.target;
    const rawMaterials = [...this.state.rawMaterials];
    rawMaterials[index][name] = value;
    this.setState({ rawMaterials });
  };

  handleAddInput = () => {
    this.setState((prevState) => ({
      rawMaterials: [...prevState.rawMaterials, { unitvalue: "", u_value: "" }],
    }));
  };
  
  handleInputChange = (index, event) => {
    const { id, value } = event.target;
    this.setState(
      (prevState) => ({
        formData: {
          ...prevState.formData,
          [index]: {
            ...(prevState.formData[index] || {}),
            [id]: value,
          },
        },
      }),
      () => {
        localStorage.setItem(id, value);
        this.checkA1FormFilled();
      }
    );
  };

  handleChange = (e) => {
    const { id, value } = e.target;
    this.setState({ [id]: value, formA1cycle: false }, () => {
      localStorage.setItem(id, value);
      this.checkA1FormFilled();
      // You can now use isA1FormFilled as needed
    });
  };

  state = {
    validated: false,
    validatedate: false,
    validatedqty: false,
    validateddetails: false,
    validatedA1: false,
    validatedA2: false,
    validatedA3: false,
    validatedimg: false,
    showError: false,
    material_id: "",
    material_name: "",
    material_image: "",
    category_id: "",
    category_name: "",
    data_type_id: "",
    data_reliability_id: "",
    process_review_id: 1,
    u_value: "",
    unitvalue: "",
    density: "",
    unitdensty: "",
    compressive_strength: "",
    unitcmp: "",
    tensile_strength: "",
    unitten: "",
    diameter: "",
    unitdmt: "",
    coverage: "",
    unitcvg: "",
    manufacturer: "",
    material_name: "",
    dataset_category_id: "",
    form_input_data: "",
    finishedqty: "",
    myfiles: "",
    unitqty: "",
    unitqty: "",
    typedetails: "",
    data_category_id: "",
    isA1FormFilled: false,
  endingMonth:"",
  endingYear:"",
  beginningMonth:"",
  beginningYear:"",
    formDataA1:[
      {
      a1_raw_material:"",
      a1_raw_material_qty:"",
      a1_raw_material_extraction_status:"",
      a1_raw_material_extraction_process:"",
      a1_raw_material_extraction_site_lat:"",
      a1_raw_material_extraction_site_lon:"",
      a1_raw_material_extraction_site_district: "",
      a1_raw_material_extraction_site_state: "",
      a1_fuel_mix: "",
      a1_fuel_qty: "",
      a1_fuel_density: "",
      a1_fuel_calorific_value: "",
      a1_embodied_energy_details: "",
      a1_characterization_factor: "",
      a1_embodied_energy_unit: "",
      

    }],
  formDataA2:[
    {
      a2_raw_material:"",
      a2_raw_material_manufacturing_plant:"",
      a2_raw_material_extraction_site:"",
      a2_raw_material_district:"" ,
      a2_raw_material_state: "",
      a2_raw_mat_distance_between_extraction_and_manufacturing_site:"",
      a2_raw_material_vehicle_make: "",
      a2_raw_material_vehicle_model: "",
      a2_raw_material_vehicle_capacity: "",
      a2_raw_material_vehicle_category: "",
      a2_raw_material_trip_required_transporting_raw_material_qty: "",
      a2_raw_material_total_distance_travel_transporting_raw_material: "",
      a2_fuel_mix: "",
      a2_fuel_mix_qty: "",
      a2_fuel_density: "",
      a2_fuel_calorific_value: "",
      a2_fuel_embodied_energy_details_qty: "",
      a2_fuel_embodied_carbon_details_unit: "",
      a2_embodied_energy: "",
   
     

    }
  ],
  formDataA3:[{
    a3_raw_material: "",
    a3_manufacturing_technology: "",
    a3_processes_undertaken_during_manufacturing: "",
    a3_plant_standard_operation_temperature: "",
    a3_plant_standard_operation_pressure: "",
    a3_material_quality: "",
    a3_fuel_mix: "",
    a3_fuel_qty: "",
    a3_fuel_density: "",
    a3_calorific_value: "",
    a1_embodied_energy_details_qty: "",
    a3_characterization_factor: "",
    a3_embodied_energy_for_reference_raw_materia_qty: "",
    }
    ],
    data_category_id_A2: "",
    isA2FormFilled: false,
    data_category_id_A3: "",
    isA3FormFilled: false,
   
  };
  handleSave() {
    const {
      data_type_id,
      data_reliability_id,
      process_review_id,
      data_source_id,
    } = this.state;
    const isFormValid =
      data_type_id &&
      data_reliability_id &&
      process_review_id &&
      ((data_type_id === "1" && data_source_id) ||
        (data_type_id === "2" && data_source_id));

    this.setState({ isFormValid });

    // Perform form submission logic here
  }


  handleSubmit = (event) => {
    event.preventDefault(); // Prevent default form submission
    const form = event.currentTarget;
  
    if (form.checkValidity() === false) {
      event.stopPropagation();
      return; // Exit early if the form is not valid
    }
  
    this.setState({ validated: true });
    localStorage.setItem("formState", JSON.stringify(this.state));
  
    const MaterialForm = {
      material_id: this.state.material_id,
      material_name: this.state.material_name,
      material_density: this.state.density,
      material_uvalue: this.state.u_value,
      material_compressivestrength: this.state.compressive_strength,
      material_diameter: this.state.diameter,
      material_tensilestrength: this.state.tensile_strength,
      material_coverage: this.state.coverage,
      material_manufacturer: this.state.manufacturer,
      data_type_id: this.state.typedetails,
      data_reliability_id: this.state.data_reliability_id,
      data_source_id: this.state.data_source_id,
      process_review_id: this.state.process_review_id,
      dataset_category_id: this.state.dataset_category_id,
      beginningYear: this.state.beginningYear,
      beginningMonth: this.state.beginningMonth,
      endingYear: this.state.endingYear,
      endingMonth: this.state.endingMonth,
      rawMaterials: this.state.rawMaterials,
      formDataA1: JSON.stringify(this.state.formDataA1),
      formDataA2: JSON.stringify(this.state.formDataA2),
      formDataA3: JSON.stringify(this.state.formDataA3)
    };
  
    let tag = "DataSetMeta";
    let url = endPoint.datasetmeta;
  
    CallAPICommonDML(url, "POST", MaterialForm, tag)
      .then((res) => {
        console.log('API Response:', res); // Log the full response to inspect it
  
        // Ensure the response is defined and structured as expected
        if (res && res.data) {
          if (res.status === 400 && res.data.message.includes("email already exists")) {
            this.setState({ showError: true, errorMessage: 'Email already exists. Please use a different email.' });
          } else if (res.status === 200) {
            alert("Success: " + res.data.result);
          } else {
            console.error('Unexpected status code:', res.status);
          }
        } else {
          console.error('Unexpected response structure:', res);
        }
      })
      .catch((error) => {
        console.error('API Error:', error); // Log the error for debugging
        this.setState({ showError: true, errorMessage: error.message });
      });
  };
  handleSubmitdate = (event) => {
   
    event.preventDefault(); // Prevent default form submission
    const formdate = event.currentTarget;

    if (formdate.checkValidity() === false) {
      event.stopPropagation();
      return; // Stop further execution if form is invalid
    }

    this.setState({ validatedate: true });
    localStorage.setItem("formState", JSON.stringify(this.state));
    // Optionally, show a success message or perform other actions after saving
    alert("Form saved successfully!");
  };

  handleSubmitqty = (event) => {
    event.preventDefault(); // Prevent default form submission
    const formqty = event.currentTarget;

    if (formqty.checkValidity() === false) {
      event.stopPropagation();
    }

    // Filter out empty values from the form state
    const formData = { ...this.state };
    Object.keys(formData).forEach((key) => {
      if (
        formData[key] === "" ||
        formData[key] === null ||
        formData[key] === undefined ||
        formData[key] === false
      ) {
        delete formData[key];
      }
    });

    this.setState({ validatedqty: true });
    const formDataJSON = JSON.stringify(formData);
     // Convert filtered form data to JSON
    localStorage.setItem("formState", formDataJSON); // Store form data in local storage
    // Optionally, show a success message or perform other actions after saving
    alert("Form saved successfully!");

    // Print filtered form data in console
    console.log(formDataJSON);
  };
  handleSubmitdetails = (event) => {
    event.preventDefault(); // Prevent default form submission
    const formdetails = event.currentTarget;

    if (formdetails.checkValidity() === false) {
      event.stopPropagation();
    }
    this.setState({ validateddetails: true });
    const formDatas = JSON.stringify(formdetails);
    // Convert form data to JSON
    localStorage.setItem("formState", formDatas); // Store form data in local storage
    // Optionally, show a success message or perform other actions after saving
    alert("Form saved successfully!");

    // Print form data in console
    console.log(formDatas);
  };
  handleSubmitdA1 = (event) => {
    event.preventDefault(); // Prevent default form submission
    const forma1 = event.currentTarget;

    if (forma1.checkValidity() === false) {
      event.stopPropagation();
    }

    this.setState({ validatedA1: true });
  };
  handleSubmitA2 = (event) => {
    event.preventDefault(); // Prevent default form submission
    const forma2 = event.currentTarget;

    if (forma2.checkValidity() === false) {
      event.stopPropagation();
    }

    this.setState({ validatedA2: true });
  };
  handleSubmitA3 = (event) => {
    event.preventDefault(); // Prevent default form submission
    const forma3 = event.currentTarget;

    if (forma3.checkValidity() === false) {
      event.stopPropagation();
    }

    this.setState({ validatedA3: true });
  };
  handleSubmitimg = (event) => {
    event.preventDefault(); // Prevent default form submission
    const formimg = event.currentTarget;

    if (formimg.checkValidity() === false) {
      event.stopPropagation();
    }

    this.setState({ validatedimg: true });
    localStorage.setItem("formState", JSON.stringify(this.state));
    // Optionally, show a success message or perform other actions after saving
    alert("Form saved successfully!");
  };
  render() {
    const {
      activeKey,
      subActiveKey,
      inputkey,
      tabClicked,
      errors,
      isA1FormFilled,
      isA2FormFilled,
      isA3FormFilled,
      isFormValid,
    } = this.state;
    const { index, value } = this.state;
    let errorMessage = null;

    if (this.props.error && this.state.showError) {
      errorMessage = (
        <CAlert color="warning" dismissible>
          {this.props.error}
        </CAlert>
      );
    }

    let DataSetMetaButton = !this.props.loading ? "Submit" : "Please Wait ...";
    let DataSaveButton = !this.props.loading ? "Save" : "";

    return (
      <div class="text-flexml">
        <div class="sidebar-image">
          <img src={header} class="img-header" />
        </div>
        <LabelMain
          title={"Material Analysis"}
          textAlign={"center"}
          color={Color.purple}
          fontSize={"xx-large"}
          marginTop={10}
        />
        <div class="text-cement">
          <div class="imgtext-section">
            <div class="img-cem">
              <img src={cement} class="img-cement1" />
              <LabelMain
                title={"Cement"}
                marginTop={10}
                color={Color.purple}
                marginLeft={0}
              />
            </div>
            <div class="cementxt-section">
              <LabelMain
                title={
                  "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed efficitur diam vel tempus porta. Ut bibendum cursus dolor in suscipit. Proin auctor risus ac tincidunt cursus. Curabitur vel ante ut dolor dictum tincidunt.Sed efficitur diam vel tempus porta. Ut bibendum cursus dolor in suscipit.  "
                }
                color={Color.purple}
                marginLeft={0}
                marginRight={0}
                textAlign={"justify"}
              />
            </div>
          </div>
        </div>
        <div class="tabsection">
          <CNav variant="tabs" role="tablist">
            <CNavItem>
              <CNavLink
                href="#!"
                active={activeKey === 1}
                onClick={() => this.setActiveKey(1)}
              >
                Data Availability
              </CNavLink>
            </CNavItem>

            <CNavItem>
              <CNavLink
                href="#!"
                active={activeKey === 2}
                onClick={() => this.setActiveKey(2)}
              >
                Image
                {activeKey === 2 && this.getTabIconimg()}
              </CNavLink>
            </CNavItem>
            <CNavItem>
              <CNavLink
                href="#!"
                active={activeKey === 3}
                onClick={() => this.setActiveKey(3)}
              >
                Data Properties
                {activeKey === 3 && this.getTabIcon()}
              </CNavLink>
            </CNavItem>
            <CNavItem>
              <CNavLink
                href="#!"
                active={activeKey === 4}
                onClick={() => this.setActiveKey(4)}
              >
                Data Collection Timeline
                {activeKey === 4 && this.getTabIcondate()}
              </CNavLink>
            </CNavItem>
            <CNavItem>
              <CNavLink
                href="#!"
                active={activeKey === 5}
                onClick={() => this.setActiveKey(5)}
              >
                Material Details
                {activeKey === 5 && this.getTabIcondetails()}
              </CNavLink>
            </CNavItem>

            <CNavItem>
              <CNavLink
                href="#!"
                active={activeKey === 6}
                onClick={() => this.setActiveKey(6)}
              >
                Reference Quantity
                {activeKey === 6 && this.getTabIconqty()}
              </CNavLink>
            </CNavItem>
          </CNav>
        </div>
        {this.state.activeKey === 1 && (
          <>
            <CNav variant="tabs" role="tablist" className="form-pad">
              <CNavItem>
                <CNavLink
                  href="#!"
                  active={this.state.subActiveKey === 6}
                  onClick={() => this.setSubActiveKey(6)}
                >
                  A1 life cycle covered (data for A1 available?)
                  {subActiveKey === 6 && this.getTabIconA1()}
                </CNavLink>
              </CNavItem>
              <CNavItem>
                <CNavLink
                  href="#!"
                  active={this.state.subActiveKey === 7}
                  onClick={() => this.setSubActiveKey(7)}
                >
                  A2 life cycle covered (data for A2 available?)
                </CNavLink>
              </CNavItem>
              <CNavItem>
                <CNavLink
                  href="#!"
                  active={this.state.subActiveKey === 8}
                  onClick={() => this.setSubActiveKey(8)}
                >
                  A3 life cycle covered (data for A3 available?)
                </CNavLink>
              </CNavItem>
            </CNav>
            <CTabContent>
              <CTabPane visible={this.state.subActiveKey === 6}>
                <CForm
                  className="g-3 needs-validation"
                  noValidate
                  validated={this.state.validatedA1}
                  onSubmit={this.handleSubmitdA1}
                >
                  <CFormLabel class="Rawmaterialqty">
                    1. Raw Material Quantity
                  </CFormLabel>
                  <div className="Materialdetails">
                    <div className="Materialdetails-box">
                      <div class="materialdetailsform">
                        <CFormLabel class="materialtext">
                          Raw Material
                        </CFormLabel>
                        <CFormSelect
                            id="a1_raw_material"
                            placeholder="Enter Raw Material"
                            className="unitdropboxmaterial form-select"
                            value={this.state.a1_raw_material}
                            onChange={this.handleChangesA1}
                            feedbackInvalid="Please select a raw material."
                            required
                        >
                          {this.state.raw_materials.map((materialdata) => (
                            <option key={materialdata.id} value={materialdata.id}>
                              {materialdata.name}
                            </option>
                          ))}
                        </CFormSelect>
                      </div>
                      <div class="materialdetailsform">
                        <CFormLabel class="materialtext">Quantity</CFormLabel>
                        <div class="material-unit-box">
                          <CFormInput
                            className="category"
                            id="a1_raw_material_qty"
                            type="text"
                            placeholder="Enter Quantity"
                            value={this.state.a1_raw_material_qty}
                            onChange={this.handleChangesA1}
                            required
                          />

                          <CFormSelect
                            id="a1_raw_material_qty_unit"
                            class="unitdropbox form-select"
                            value={this.state.a1_raw_material_qty_unit}
                            onChange={this.handleChangesA1}
                            required
                          >
                            <option value=""> Unit</option>
                            <option value="w/m2.k">W/m2.K</option>
                          </CFormSelect>
                          {
                            <CFormFeedback invalid>
                              Please enter a quantity.
                            </CFormFeedback>
                          }
                        </div>
                      </div>
                      <div class="col-sm-12">
                        <div class="col-sm-12 mt-2">
                          <input
                            type="button"
                            class="btn btn-successadd"
                            value="Add Raw Material"
                            onClick={this.handleAddInput}
                          />
                        </div>
                      </div>

                      <CFormLabel class="Rawmaterial">
                        2. Raw Material Extraction
                      </CFormLabel>

                      <div class="materialdetailsform">
                        <CFormLabel class="materialtext">
                          Raw Material
                        </CFormLabel>
                        <CFormSelect
                          id="a1_raw_material"
                          class="unitdropboxmaterial form-select"
                          value={this.state.formDataA1.a1_raw_material}
                          onChange={this.handleChangesA1}
                          feedbackInvalid="Please select a raw material."
                          required
                        >
                          <option value=""> Select Raw Material</option>
                          <option value="cement">Cement</option>
                          <option value="sand">Sand</option>
                          <option value="bricks">Bricks</option>
                          <option value="other">Other</option>
                        </CFormSelect>
                        {
                          <CFormFeedback invalid>
                            Please enter a raw material.
                          </CFormFeedback>
                        }
                      </div>
                      <div class="materialdetailsform">
                        <CFormLabel class="materialtext">
                          Extraction Status
                        </CFormLabel>
                        <CFormSelect
                          id="a1_raw_material_extraction_status"
                          className="test"
                          value={this.state.formDataA1.a1_raw_material_extraction_status}
                          onChange={this.handleChangesA1}
                          required
                          feedbackInvalid="Please select a extraction status."
                        >
                          <option value=""> Extraction Status</option>
                          <option value="1">
                            Raw Material Transport Details
                          </option>
                          <option value="2">
                            Raw Material Transport Vehicle Details
                          </option>
                          <option value="3">
                            Fuel Consumed for Extraction
                          </option>
                          <option value="4">Embodied Energy Details</option>
                          <option value="5">Embodied Carbon Details</option>
                        </CFormSelect>
                      </div>
                      <div class="materialdetailsform">
                        <CFormLabel class="materialtext">
                          Extraction Processes
                        </CFormLabel>
                        <CFormSelect
                          id="a1_raw_material_extraction_process"
                          className="test"
                          value={this.state.formDataA1.a1_raw_material_extraction_process}
                          onChange={this.handleChangesA1}
                          required
                          feedbackInvalid="Please select a extraction processes."
                        >
                          <option value="">Extraction Processes</option>
                          <option value="1">
                            Raw Material Transport Details
                          </option>
                          <option value="2">
                            Raw Material Transport Vehicle Details
                          </option>
                          <option value="3">
                            Fuel Consumed for Extraction
                          </option>
                          <option value="4">Embodied Energy Details</option>
                          <option value="5">Embodied Carbon Details</option>
                        </CFormSelect>
                      </div>
                      <div class="materialdetailsform">
                        <CFormLabel class="materialtext">
                          Extraction Site (Latitude)
                        </CFormLabel>
                        <CFormInput
                          id="a1_raw_material_extraction_site_lat"
                          type="text"
                          placeholder="Enter Extraction Site Latitude"
                          value={this.state.a1_raw_material_extraction_site_lat}
                          onChange= {this.handleChangesA1}
                          required
                        />
                        {
                          <CFormFeedback invalid>
                            Please Enter extraction site latitude.
                          </CFormFeedback>
                        }
                      </div>
                      <div class="materialdetailsform">
                        <CFormLabel class="materialtext">
                          Extraction Site (Longitude)
                        </CFormLabel>
                        <CFormInput
                          id="a1_raw_material_extraction_site_lon"
                          type="text"
                          placeholder="Enter Extraction Site Longitude"
                          value={this.state.a1_raw_material_extraction_site_lon}
                          onChange= {this.handleChangesA1}
                          required
                        />
                        {
                          <CFormFeedback invalid>
                            Please Enter extraction site longitude.
                          </CFormFeedback>
                        }
                      </div>
                      <div class="materialdetailsform">
                        <CFormLabel class="materialtext">District</CFormLabel>
                        <CFormInput
                          id="a1_raw_material_extraction_site_district"
                          className="data-type"
                          value={this.state.formDataA1.a1_raw_material_extraction_site_district}
                          onChange={this.handleChangesA1}
                          required
                          placeholder="Enter district"
                          feedbackInvalid="Please select a district."
                        ></CFormInput>
                      </div>

                      <div class="materialdetailsform">
                        <CFormLabel class="materialtext">State</CFormLabel>
                        <CFormInput
                          id="a1_raw_material_extraction_site_state"
                          className="data-type"
                          value={this.state.formDataA1.a1_raw_material_extraction_site_state}
                          onChange={this.handleChangesA1}
                          required
                          placeholder="Enter state"
                          feedbackInvalid="Please select a state."
                        ></CFormInput>
                      </div>
                      {/* <div class="col-sm-12">
                        <div class="col-sm-12 mt-2">
                          <input
                            type="button"
                            class="btn btn-successadd"
                            value="Add Raw Material"
                            onClick={this.handleAddInput}
                          />
                        </div>
                      </div> */}
                      <CFormLabel class="Rawmaterial">
                        3. Fuel Consumed for Extraction
                      </CFormLabel>
                      <div class="materialdetailsform">
                        <CFormLabel class="materialtext">
                          Raw Material
                        </CFormLabel>
                        <CFormSelect
                          id="a1_raw_material"
                          class="unitdropboxmaterial form-select"
                          value={this.state.formDataA1.a1_raw_material}
                          onChange={this.handleChangesA1}
                          feedbackInvalid="Please select a raw material."
                          required
                        >
                          <option value=""> Select Raw Material</option>
                          <option value="cement">Cement</option>
                          <option value="sand">Sand</option>
                          <option value="bricks">Bricks</option>
                          <option value="other">Other</option>
                        </CFormSelect>
                        {
                          <CFormFeedback invalid>
                            Please enter a raw material.
                          </CFormFeedback>
                        }
                      </div>
                      <div class="materialdetailsform">
                        <CFormLabel class="materialtext">Fuel Mix</CFormLabel>
                        <CFormSelect
                          id="a1_fuel_mix"
                          className="test"
                          value={this.state.formDataA1.a1_fuel_mix}
                          onChange={this.handleChangesA1}
                          required
                          feedbackInvalid="Please select a fuel mix."
                        >
                          <option value="">Fuel Mix</option>
                          <option value="1">
                            Raw Material Transport Details
                          </option>
                          <option value="2">
                            Raw Material Transport Vehicle Details
                          </option>
                          <option value="3">
                            Fuel Consumed for Extraction
                          </option>
                          <option value="4">Embodied Energy Details</option>
                          <option value="5">Embodied Carbon Details</option>
                        </CFormSelect>
                      </div>
                      <div class="materialdetailsform">
                        <CFormLabel class="materialtextmat">
                          Quantity
                        </CFormLabel>
                        <div class="material-unit-box">
                          <CFormInput
                            className="category"
                            id="a1_fuel_qty"
                            type="text"
                            placeholder="Enter Fuel Quantity"
                            value={this.state.formDataA1.a1_fuel_qty}
                            onChange={this.handleChangesA1}
                            required
                          />
                          <CFormSelect
                            id="a1_fuel_unit"
                            class="unitdropbox form-select"
                            value={this.state.formDataA1.a1_fuel_unit}
                            onChange={this.handleChangesA1}
                            required
                          >
                            <option value=""> Unit</option>
                            <option value="w/m2.k">W/m2.K</option>
                          </CFormSelect>
                          {
                            <CFormFeedback invalid>
                              Please enter a quantity.
                            </CFormFeedback>
                          }
                        </div>
                      </div>
                      <div class="materialdetailsform">
                        <CFormLabel class="materialtextmat">
                          Fuel Density
                        </CFormLabel>
                        <div class="material-unit-box">
                          <CFormInput
                            className="category"
                            id="a1_fuel_density"
                            type="text"
                            placeholder="Enter fuel density"
                            value={this.state.formDataA1.a1_fuel_density}
                            onChange={this.handleChangesA1}
                            required
                          />
                          <CFormSelect
                            id="a1_fuel_density_unit"
                            class="unitdropbox form-select"
                            value={this.state.formDataA1.a1_fuel_density_unit}
                            onChange={this.handleChangesA1}
                            required
                          >
                            <option value=""> Unit</option>
                            <option value="w/m2.k">W/m2.K</option>
                          </CFormSelect>
                          {
                            <CFormFeedback invalid>
                              Please Enter a fuel density.
                            </CFormFeedback>
                          }
                        </div>
                      </div>
                      <div class="materialdetailsform">
                        <CFormLabel class="materialtextmat">
                          Calorific Value
                        </CFormLabel>
                        <div class="material-unit-box">
                          <CFormInput
                            className="category"
                            id="a1_fuel_calorific_value"
                            type="text"
                            placeholder="Enter calorific value"
                            value={this.state.formDataA1.a1_fuel_calorific_value}
                            onChange={this.handleChangesA1}
                            required
                          />
                          <CFormSelect
                            id="unitvalue"
                            class="unitdropbox form-select"
                            value={this.state.unitvalue}
                            onChange={this.handleChangesA1}
                            required
                          >
                            <option value=""> Unit</option>
                            <option value="w/m2.k">W/m2.K</option>
                          </CFormSelect>
                          {
                            <CFormFeedback invalid>
                              Please enter a calorific value.
                            </CFormFeedback>
                          }
                        </div>
                      </div>
                      <div class="col-sm-12">
                        <div class="col-sm-12 mt-2">
                          <input
                            type="button"
                            class="btn btn-successadd"
                            value="Add Raw Material"
                            onClick={this.handleAddInput}
                          />
                        </div>
                      </div>
                      <CFormLabel class="Rawmaterial">
                        4. Embodied Energy Details
                      </CFormLabel>
                      <div class="materialdetailsform">
                        <CFormLabel class="materialtext">
                          Raw Material
                        </CFormLabel>
                        <CFormSelect
                          id="a1_raw_material"
                          class="unitdropboxmaterial form-select"
                          value={this.state.formDataA1.a1_raw_material}
                          onChange={this.handleChangesA1}
                          feedbackInvalid="Please select a raw material."
                          required
                        >
                          <option value=""> Select Raw Material</option>
                          <option value="cement">Cement</option>
                          <option value="sand">Sand</option>
                          <option value="bricks">Bricks</option>
                          <option value="other">Other</option>
                        </CFormSelect>
                      </div>
                      <div class="materialdetailsform">
                        <CFormLabel class="materialtext">Quantity</CFormLabel>
                        <div class="material-unit-box">
                          <CFormInput
                            className="category"
                            id="a1_embodied_energy_details"
                            type="text"
                            placeholder="Enter quantity"
                            value={this.state.formDataA1.a1_embodied_energy_details}
                            onChange={this.handleChangesA1}
                            required
                          />
                          <CFormSelect
                            id="a1_embodied_energy_details_unit"
                            class="unitdropbox form-select"
                            value={this.state.formDataA1.a1_embodied_energy_details_unit}
                            onChange={this.handleChangesA1}
                            required
                          >
                            <option value=""> Unit</option>
                            <option value="w/m2.k">W/m2.K</option>
                          </CFormSelect>
                          {
                            <CFormFeedback invalid>
                              Please enter a quantity.
                            </CFormFeedback>
                          }
                        </div>
                      </div>
                      <div class="col-sm-12">
                        <div class="col-sm-12 mt-2">
                          <input
                            type="button"
                            class="btn btn-successadd"
                            value="Add Raw Material"
                            onClick={this.handleAddInput}
                          />
                        </div>
                      </div>
                      <CFormLabel class="Rawmaterial">
                        5. Embodied Carbon Details
                      </CFormLabel>
                      <div class="materialdetailsform">
                        <CFormLabel class="materialtext">
                          Raw Material
                        </CFormLabel>
                        <CFormSelect
                          id="a1_raw_material"
                          class="unitdropboxmaterial form-select"
                          value={this.state.formDataA1.a1_raw_material}
                          onChange={this.handleChangesA1}
                          feedbackInvalid="Please select a raw material."
                          required
                        >
                          <option value=""> Select Raw Material</option>
                          <option value="cement">Cement</option>
                          <option value="sand">Sand</option>
                          <option value="bricks">Bricks</option>
                          <option value="other">Other</option>
                        </CFormSelect>
                        {
                          <CFormFeedback invalid>
                            Please enter a raw material.
                          </CFormFeedback>
                        }
                      </div>
                      <div class="materialdetailsform">
                        <CFormLabel class="materialtext">
                          Characterization Factor
                        </CFormLabel>
                        <div class="material-unit-box">
                          <CFormInput
                            className="category"
                            id="a1_characterization_factor"
                            type="text"
                            placeholder="Enter Characterization Factor"
                            value={this.state.formDataA1.a1_characterization_factor}
                            onChange={this.handleChangesA1}
                            required
                          />
                          <CFormSelect
                            id="a1_characterization_factor_unit"
                            class="unitdropbox form-select"
                            value={this.state.formDataA1.a1_characterization_factor_unit}
                            onChange={this.handleChangesA1}
                            required
                          >
                            <option value=""> Unit</option>
                            <option value="w/m2.k">W/m2.K</option>
                          </CFormSelect>
                          {
                            <CFormFeedback invalid>
                              Please enter a characterization factor.
                            </CFormFeedback>
                          }
                        </div>
                      </div>

                      <div class="materialdetailsform">
                        <CFormLabel class="materialtextmat">
                          Embodied Energy (for reference Raw Material Qty)
                        </CFormLabel>
                        <div class="material-unit-box">
                          <CFormInput
                            className="category"
                            id="a1_embodied_energy_unit"
                            type="text"
                            placeholder="Enter Embodied Energy (for reference raw material qty)"
                            value={this.state.formDataA1.a1_embodied_energy_unit}
                            onChange={this.handleChangesA1}
                            required
                          />
                          <CFormSelect
                            id="a1_embodied_energy_unit_qty"
                            class="unitdropbox form-select"
                            value={this.state.a1_embodied_energy_unit_qty}
                            onChange={this.handleChangesA1}
                            required
                          >
                            <option value=""> Unit</option>
                            <option value="w/m2.k">W/m2.K</option>
                          </CFormSelect>
                          {
                            <CFormFeedback invalid>
                              Please enter a Embodied Energy (for reference Raw
                              Material Qty).
                            </CFormFeedback>
                          }
                        </div>
                      </div>
                      <div class="col-sm-12">
                        <div class="col-sm-12 mt-2">
                          <input
                            type="button"
                            class="btn btn-successadd"
                            value="Add Raw Material"
                            onClick={this.handleAddInput}
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  <CRow>
                    <CButton
                      className="button_new_class_form"
                      type="button"
                      onClick={this.handleSubmitdA1}
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
                      {DataSaveButton}
                    </CButton>
                  </CRow>
                </CForm>
              </CTabPane>

              <CTabPane visible={this.state.subActiveKey === 8}>
                <CForm
                  noValidate
                  validated={this.state.validatedA3}
                  onSubmit={this.handleSubmitA3}
                >
                  <CFormLabel class="Rawmaterialqty">
                    1. Manufacturing Process Details
                  </CFormLabel>
                  <div className="Materialdetails">
                    <div className="Materialdetails-box">
                      <div class="materialdetailsform">
                        <CFormLabel class="materialtext">
                          Raw Material
                        </CFormLabel>
                        <CFormSelect
                          id="a3_raw_material"
                          value={this.state.a3_raw_material}
                          onChange={this.handleChangesA3}
                          feedbackInvalid="Please select a material."
                          required
                          >
                          <option value="">Select Material</option>
                          <option value="1"> Cement </option>
                          <option value="2"> Sand </option>
                          <option value="3"> Aggregate </option>
                          <option value="4"> Burnt Clay Bricks </option>
                          <option value="5"> AAC Blocks </option>
                          <option value="6"> Fly Ash Bricks </option>
                          <option value="other"> Other </option>
                        </CFormSelect>
                        {
                          <CFormFeedback invalid>
                            Please enter a raw material.
                          </CFormFeedback>
                        }
                      </div>
                      <div class="materialdetailsform">
                        <CFormLabel class="materialtext">
                          Manufacturing Technology
                        </CFormLabel>
                        <CFormSelect
                          id="a3_manufacturing_technology"
                          class="unitdropboxmaterial form-select"
                          value={this.state.a3_manufacturing_technology}
                          onChange={this.handleChangesA3}
                          feedbackInvalid="Please select a manufacturing technology"
                          required
                        >
                          <option value=""> Manufacturing Technology</option>
                          <option value="cement">Cement</option>
                          <option value="sand">Sand</option>
                          <option value="bricks">Bricks</option>
                          <option value="other">Other</option>
                        </CFormSelect>
                      </div>

                      {/* <CFormLabel class="materialtext">Unit</CFormLabel> */}
                      <div class="materialdetailsform">
                        <CFormLabel class="materialtext">
                          Processes undertaken during manufacturing
                        </CFormLabel>

                        <CFormSelect
                          id="a3_processes_undertaken_during_manufacturing"
                          class="unitdropboxmaterial form-select"
                          value={this.state.a3_processes_undertaken_during_manufacturing}
                          onChange={this.handleChangesA3}
                          feedbackInvalid="Please select a processes undertaken during manufacturing."
                          required
                        >
                          <option value="">
                            {" "}
                            Processes undertaken during manufacturing
                          </option>
                          <option value="w/m2.k">W/m2.K</option>
                        </CFormSelect>
                      </div>

                      <div class="col-sm-12">
                        <div class="col-sm-12 mt-2">
                          <input
                            type="button"
                            class="btn btn-successadd"
                            value="Add Raw Material"
                            onClick={this.handleAddInput}
                          />
                        </div>
                      </div>

                      <CFormLabel class="Rawmaterial">
                        2. Manufacturing Plant Details
                      </CFormLabel>

                      <div class="materialdetailsform">
                        <CFormLabel class="materialtext">
                          Raw Material
                        </CFormLabel>
                        <CFormSelect
                          id="a3_raw_material"
                          value={this.state.a3_raw_material}
                          onChange={this.handleChangesA3}
                          feedbackInvalid="Please select a material."
                          required
                          >
                          <option value="">Select Material</option>
                          <option value="1"> Cement </option>
                          <option value="2"> Sand </option>
                          <option value="3"> Aggregate </option>
                          <option value="4"> Burnt Clay Bricks </option>
                          <option value="5"> AAC Blocks </option>
                          <option value="6"> Fly Ash Bricks </option>
                          <option value="other"> Other </option>
                        </CFormSelect>
                        {
                          <CFormFeedback invalid>
                            Please enter a raw material.
                          </CFormFeedback>
                        }
                      </div>

                      <div class="materialdetailsform">
                        <div class="material-unit-box">
                          <CFormLabel class="materialtextmat">
                            Plant standard Operation Temperature
                          </CFormLabel>
                          <CFormSelect
                            id="a3_plant_standard_operation_temperature"
                            className="category"
                            value={this.state.a3_plant_standard_operation_temperature}
                            onChange={this.handleChangesA3}
                            required
                          >
                            <option value="">
                              {" "}
                              Plant standard Operation Temperature
                            </option>
                            <option value="w/m2.k">W/m2.K</option>
                          </CFormSelect>
                          <CFormSelect
                            id="a3_plant_standard_operation_temperature"
                            class="unitdropbox form-select"
                            value={this.state.a3_plant_standard_operation_temperature}
                            onChange={this.handleChangesA3}
                            required
                          >
                            <option value=""> Unit</option>
                            <option value="w/m2.k">W/m2.K</option>
                          </CFormSelect>
                          {
                            <CFormFeedback invalid>
                              Please enter a plant standard operation temperature.
                            </CFormFeedback>
                          }
                        </div>
                      </div>
                      <div class="materialdetailsform">
                        <CFormLabel class="materialtextmat">
                          Plant standard Operation Pressure
                        </CFormLabel>
                        <div class="material-unit-box">
                          <CFormSelect
                            id="a3_plant_standard_operation_pressure"
                            className="category"
                            value={this.state.a3_plant_standard_operation_pressure}
                            onChange={this.handleChangesA3}
                            required
                          >
                            <option value="">
                              {" "}
                              Plant standard Operation Pressure
                            </option>
                            <option value="w/m2.k">W/m2.K</option>
                          </CFormSelect>

                          <CFormSelect
                            id="a3_plant_standard_operation_pressure_unit"
                            class="unitdropbox form-select"
                            value={this.state.a3_plant_standard_operation_pressure_unit}
                            onChange={this.handleChangesA3}
                            required
                          >
                            <option value=""> Unit</option>
                            <option value="w/m2.k">W/m2.K</option>
                          </CFormSelect>
                          {
                            <CFormFeedback invalid>
                              Please enter a plant standard operation pressure.
                            </CFormFeedback>
                          }
                        </div>
                      </div>
                      <div class="materialdetailsform">
                        <CFormLabel class="materialtext">
                          Material quality
                        </CFormLabel>
                        <CFormSelect
                          id="a3_material_quality"
                          value={this.state.a3_material_quality}
                          onChange={this.handleChangesA3}
                          feedbackInvalid="Please select a material quality."
                          required
                        >
                          <option value=""> Material quality</option>
                          <option value="w/m2.k">W/m2.K</option>
                        </CFormSelect>
                      </div>
                      <div class="col-sm-12">
                        <div class="col-sm-12 mt-2">
                          <input
                            type="button"
                            class="btn btn-successadd"
                            value="Add Raw Material"
                            onClick={this.handleAddInput}
                          />
                        </div>
                      </div>
                      <CFormLabel class="Rawmaterial">
                        3. Fuel Consumed for Extraction
                      </CFormLabel>
                      <div class="materialdetailsform">
                        <CFormLabel class="materialtext">
                          Raw Material
                        </CFormLabel>
                        <CFormSelect
                          id="a3_raw_material"
                          value={this.state.a3_raw_material}
                          onChange={this.handleChangesA3}
                          feedbackInvalid="Please select a material."
                          required
                          >
                          <option value="">Select Material</option>
                          <option value="1"> Cement </option>
                          <option value="2"> Sand </option>
                          <option value="3"> Aggregate </option>
                          <option value="4"> Burnt Clay Bricks </option>
                          <option value="5"> AAC Blocks </option>
                          <option value="6"> Fly Ash Bricks </option>
                          <option value="other"> Other </option>
                        </CFormSelect>
                        {
                          <CFormFeedback invalid>
                            Please enter a raw material.
                          </CFormFeedback>
                        }
                      </div>
                      <div class="materialdetailsform">
                        <CFormLabel class="materialtext">Fuel Mix</CFormLabel>
                        <CFormSelect
                          id="a3_fuel_mix"
                          className="test"
                          value={this.state.a3_fuel_mix}
                          onChange={this.handleChangesA3}
                          required
                          feedbackInvalid="Please select a extraction processes."
                        >
                          <option value="">Fuel Mix</option>
                          <option value="1">
                            Raw Material Transport Details
                          </option>
                          <option value="2">
                            Raw Material Transport Vehicle Details
                          </option>
                          <option value="3">
                            Fuel Consumed for Extraction
                          </option>
                          <option value="4">Embodied Energy Details</option>
                          <option value="5">Embodied Carbon Details</option>
                        </CFormSelect>
                      </div>
                      <div class="materialdetailsform">
                        <CFormLabel class="materialtextmat">
                          Quantity
                        </CFormLabel>
                        <div class="material-unit-box">
                          <CFormInput
                            className="category"
                            id="a3_fuel_qty"
                            type="text"
                            placeholder="ENter Quantity"
                            value={this.state.a3_fuel_qty_unit}
                            onChange={this.handleChangesA3}
                            required
                          />
                          <CFormSelect
                            id="a3_fuel_qty"
                            class="unitdropbox form-select"
                            value={this.state.a3_fuel_qty_unit}
                            onChange={this.handleChangesA3}
                            required
                          >
                            <option value=""> Unit</option>
                            <option value="w/m2.k">W/m2.K</option>
                          </CFormSelect>
                          {
                            <CFormFeedback invalid>
                              Please enter a quantity.
                            </CFormFeedback>
                          }
                        </div>
                      </div>
                      <div class="materialdetailsform">
                        <CFormLabel class="materialtextmat">
                          Fuel Density
                        </CFormLabel>
                        <div class="material-unit-box">
                          <CFormInput
                            className="category"
                            id="a3_fuel_density"
                            type="text"
                            placeholder="Enter Fuel Density"
                            value={this.state.a3_fuel_density}
                            onChange={this.handleChangesA3}
                            required
                          />
                          <CFormSelect
                            id="a3_fuel_density_unit"
                            class="unitdropbox form-select"
                            value={this.state.a3_fuel_density_unit}
                            onChange={this.handleChangesA3}
                            required
                          >
                            <option value=""> Unit</option>
                            <option value="w/m2.k">W/m2.K</option>
                          </CFormSelect>
                          {
                            <CFormFeedback invalid>
                              Please enter a fuel density.
                            </CFormFeedback>
                          }
                        </div>
                      </div>
                      <div class="materialdetailsform">
                        <CFormLabel class="materialtextmat">
                          Calorific Value
                        </CFormLabel>
                        <div class="material-unit-box">
                          <CFormInput
                            className="category"
                            id="a3_calorific_value"
                            type="text"
                            placeholder="Enter Calorific Value"
                            value={this.state.a3_calorific_value}
                            onChange={this.handleChangesA3}
                            required
                          />
                          <CFormSelect
                            id="a3_calorific_value_unit"
                            class="unitdropbox form-select"
                            value={this.state.a3_calorific_value_unit}
                            onChange={this.handleChangesA3}
                            required
                          >
                            <option value=""> Unit</option>
                            <option value="w/m2.k">W/m2.K</option>
                          </CFormSelect>
                          {
                            <CFormFeedback invalid>
                              Please enter a calorific value.
                            </CFormFeedback>
                          }
                        </div>
                      </div>
                      <div class="col-sm-12">
                        <div class="col-sm-12 mt-2">
                          <input
                            type="button"
                            class="btn btn-successadd"
                            value="Add Raw Material"
                            onClick={this.handleAddInput}
                          />
                        </div>
                      </div>
                      <CFormLabel class="Rawmaterial">
                        4. Embodied Energy Details
                      </CFormLabel>
                      <div class="materialdetailsform">
                        <CFormLabel class="materialtext">
                          Raw Material
                        </CFormLabel>
                        <CFormSelect
                          id="a3_raw_material"
                          value={this.state.a3_raw_material}
                          onChange={this.handleChangesA3}
                          feedbackInvalid="Please select a material."
                          required
                          >
                          <option value="">Select Material</option>
                          <option value="1"> Cement </option>
                          <option value="2"> Sand </option>
                          <option value="3"> Aggregate </option>
                          <option value="4"> Burnt Clay Bricks </option>
                          <option value="5"> AAC Blocks </option>
                          <option value="6"> Fly Ash Bricks </option>
                          <option value="other"> Other </option>
                        </CFormSelect>
                      </div>
                      <div class="materialdetailsform">
                        <CFormLabel class="materialtext">Quantity</CFormLabel>
                        <div class="material-unit-box">
                          <CFormInput
                            className="category"
                            id="a1_embodied_energy_details_qty"
                            type="text"
                            placeholder="Enter Quantity"
                            value={this.state.a1_embodied_energy_details_qty}
                            onChange={this.handleChangesA3}
                            required
                          />
                          <CFormSelect
                            id="a1_embodied_energy_details_unit"
                            class="unitdropbox form-select"
                            value={this.state.a1_embodied_energy_details_unit}
                            onChange={this.handleChangesA3}
                            required
                          >
                            <option value=""> Unit</option>
                            <option value="w/m2.k">W/m2.K</option>
                          </CFormSelect>
                          {
                            <CFormFeedback invalid>
                              Please enter a quantity.
                            </CFormFeedback>
                          }
                        </div>
                      </div>
                      <div class="col-sm-12">
                        <div class="col-sm-12 mt-2">
                          <input
                            type="button"
                            class="btn btn-successadd"
                            value="Add Raw Material"
                            onClick={this.handleAddInput}
                          />
                        </div>
                      </div>
                      <CFormLabel class="Rawmaterial">
                        5. Embodied Carbon Details
                      </CFormLabel>
                      <div class="materialdetailsform">
                        <CFormLabel class="materialtext">
                          Raw Material
                        </CFormLabel>
                        <CFormSelect
                          id="a3_raw_material"
                          value={this.state.a3_raw_material}
                          onChange={this.handleChangesA3}
                          feedbackInvalid="Please select a material."
                          required
                          >
                          <option value="">Select Material</option>
                          <option value="1"> Cement </option>
                          <option value="2"> Sand </option>
                          <option value="3"> Aggregate </option>
                          <option value="4"> Burnt Clay Bricks </option>
                          <option value="5"> AAC Blocks </option>
                          <option value="6"> Fly Ash Bricks </option>
                          <option value="other"> Other </option>
                        </CFormSelect>
                        {
                          <CFormFeedback invalid>
                            Please enter a raw material.
                          </CFormFeedback>
                        }
                      </div>
                      <div class="materialdetailsform">
                        <CFormLabel class="materialtext">
                          Characterization Factor
                        </CFormLabel>
                        <div class="material-unit-box">
                          <CFormInput
                            className="category"
                            id="a3_characterization_factor"
                            type="text"
                            placeholder="Enter Characterization Factor"
                            value={this.state.a3_characterization_factor}
                            onChange={this.handleChangesA3}
                            required
                          />
                          <CFormSelect
                            id="a3_characterization_factor_unit"
                            class="unitdropbox form-select"
                            value={this.state.a3_characterization_factor_unit}
                            onChange={this.handleChangesA3}
                            required
                          >
                            <option value=""> Unit</option>
                            <option value="w/m2.k">W/m2.K</option>
                          </CFormSelect>
                          {
                            <CFormFeedback invalid>
                              Please enter a characterization factor.
                            </CFormFeedback>
                          }
                        </div>
                      </div>

                      <div class="materialdetailsform">
                        <CFormLabel class="materialtextmat">
                          Embodied Energy (for reference Raw Material Qty)
                        </CFormLabel>
                        <div class="material-unit-box">
                          <CFormInput
                            className="category"
                            id="a3_embodied_energy_for_reference_raw_materia_qty"
                            type="text"
                            placeholder="Enter Embodied Energy (for reference Raw Material Qty)"
                            value={this.state.a3_embodied_energy_for_reference_raw_materia_qty}
                            onChange={this.handleChangesA3}
                            required
                          />
                          <CFormSelect
                            id="a3_embodied_energy_for_reference_raw_materia_qty_unit"
                            class="unitdropbox form-select"
                            value={this.state.a3_embodied_energy_for_reference_raw_materia_qty_unit}
                            onChange={this.handleChangesA3}
                            required
                          >
                            <option value=""> Unit</option>
                            <option value="w/m2.k">W/m2.K</option>
                          </CFormSelect>
                          {
                            <CFormFeedback invalid>
                              Please enter a embodied energy (for reference raw material qty).
                            </CFormFeedback>
                          }
                        </div>
                      </div>
                      <div class="col-sm-12">
                        <div class="col-sm-12 mt-2">
                          <input
                            type="button"
                            class="btn btn-successadd"
                            value="Add Raw Material"
                            onClick={this.handleAddInput}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <CRow>
                    <CButton
                      className="button_new_class_form"
                      type="button"
                      onClick={this.handleSubmitA3}
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
                      {DataSaveButton}
                    </CButton>
                  </CRow>
                </CForm>
              </CTabPane>
            </CTabContent>
            <CTabContent>
              <CTabPane visible={this.state.subActiveKey === 7}>
                <CForm
                  noValidate
                  validated={this.state.validatedA2}
                  onSubmit={this.handleSubmitA2}
                >
                  <CFormLabel class="Rawmaterialqty">
                    1. Raw Material Transport Details
                  </CFormLabel>
                  <div className="Materialdetails">
                    <div className="Materialdetails-box">
                      <div class="materialdetailsform">
                        <CFormLabel class="materialtext">
                          Raw Material
                        </CFormLabel>
                        <CFormSelect
                          id="a2_raw_material"
                          value={this.state.a2_raw_material}
                          onChange={this.handleChangesA2}
                          feedbackInvalid="Please select a material."
                          required
                        >
                          <option value="">Select Material</option>
                          <option value="1"> Cement </option>
                          <option value="2"> Sand </option>
                          <option value="3"> Aggregate </option>
                          <option value="4"> Burnt Clay Bricks </option>
                          <option value="5"> AAC Blocks </option>
                          <option value="6"> Fly Ash Bricks </option>
                          <option value="other"> Other </option>
                        </CFormSelect>
                        {
                          <CFormFeedback invalid>
                            Please enter a raw material.
                          </CFormFeedback>
                        }
                      </div>
                      <div class="materialdetailsform">
                        <CFormLabel class="materialtext">
                          Manufacturing Plant (latitude)
                        </CFormLabel>
                        <CFormInput
                          id="a2_raw_material_manufacturing_plant"
                          className="data-type"
                          value={this.state.a2_raw_material_manufacturing_plant}
                          onChange={this.handleChangesA2}
                          required
                          placeholder="Enter Manufacturing Plant (latitude)"
                          feedbackInvalid="Please enter manufacturing plant (latitude)."
                        ></CFormInput>
                      </div>
                      <div class="materialdetailsform">
                        <CFormLabel class="materialtext">
                          Extraction Site (longitude)
                        </CFormLabel>
                        <CFormInput
                          id="a2_raw_material_extraction_site"
                          className="data-type"
                          value={this.state.a2_raw_material_extraction_site}
                          onChange={this.handleChangesA2}
                          required
                          placeholder="Enter Extraction Site (longitude)"
                          feedbackInvalid="Please enter extraction site (longitude)."
                        ></CFormInput>
                      </div>

                      <div class="materialdetailsform">
                        <CFormLabel class="materialtext">District</CFormLabel>
                        <CFormInput
                          id="a2_raw_material_district"
                          className="data-type"
                          value={this.state.a2_raw_material_district}
                          onChange={this.handleChangesA2}
                          required
                          placeholder="District"
                          feedbackInvalid="Please select a District."
                        ></CFormInput>
                      </div>

                      <div class="materialdetailsform">
                        <CFormLabel class="materialtext">State</CFormLabel>
                        <CFormInput
                          id="a2_raw_material_state"
                          className="data-type"
                          value={this.state.a2_raw_material_state}
                          onChange={this.handleChangesA2}
                          required
                          placeholder="State"
                          feedbackInvalid="Please select a state."
                        ></CFormInput>
                      </div>
                      <div class="materialdetailsform">
                        <CFormLabel class="materialtext">
                          Distance Between Extraction and Manufacturing Sites
                          (km)
                        </CFormLabel>
                        <CFormInput
                          id="a2_raw_material_distance_between_extraction_and_manufacturing_sites"
                          className="data-type"
                          value={this.state.a2_raw_material_distance_between_extraction_and_manufacturing_sites}
                          onChange={this.handleChangesA2}
                          required
                          placeholder="Enter Distance between Extraction and Manufacturing Sites (km)"
                          feedbackInvalid="Please enter distance between extraction and manufacturing sites (km)."
                        ></CFormInput>
                      </div>
                      <div class="col-sm-12">
                        <div class="col-sm-12 mt-2">
                          <input
                            type="button"
                            class="btn btn-successadd"
                            value="Add Raw Material"
                            onClick={this.handleAddInput}
                          />
                        </div>
                      </div>

                      <CFormLabel class="Rawmaterial">
                        2. Raw Material Transport Vehicle Details
                      </CFormLabel>

                      <div class="materialdetailsform">
                        <CFormLabel class="materialtext">
                          Raw Material
                        </CFormLabel>
                        <CFormSelect
                        id="a2_raw_material"
                        value={this.state.a2_raw_material}
                        onChange={this.handleChangesA2}
                        feedbackInvalid="Please select a material."
                        required
                      >
                        <option value="">Select Material</option>
                        <option value="1"> Cement </option>
                        <option value="2"> Sand </option>
                        <option value="3"> Aggregate </option>
                        <option value="4"> Burnt Clay Bricks </option>
                        <option value="5"> AAC Blocks </option>
                        <option value="6"> Fly Ash Bricks </option>
                        <option value="other"> Other </option>
                      </CFormSelect>
                        {
                          <CFormFeedback invalid>
                            Please enter a raw material.
                          </CFormFeedback>
                        }
                      </div>
                      <div class="materialdetailsform">
                        <CFormLabel class="materialtext">
                          Vehicle (make)
                        </CFormLabel>
                        <CFormInput
                          id="a2_raw_material_vehicle_make"
                          className="data-type"
                          value={this.state.a2_raw_material_vehicle_make}
                          onChange={this.handleChangesA2}
                          required
                          placeholder="Enter Vehicle (make)"
                          feedbackInvalid="Please enter vehicle (make)."
                        ></CFormInput>
                      </div>
                      <div class="materialdetailsform">
                        <CFormLabel class="materialtext">
                          Vehicle (model)
                        </CFormLabel>
                        <CFormInput
                          id="a2_raw_material_vehicle_model"
                          className="data-type"
                          value={this.state.a2_raw_material_vehicle_model}
                          onChange={this.handleChangesA2}
                          required
                          placeholder="Enter Vehicle (model)"
                          feedbackInvalid="Please enter vehicle (model)."
                        ></CFormInput>
                      </div>
                      <div class="materialdetailsform">
                        <CFormLabel class="materialtext">
                          Vehicle (capacity)
                        </CFormLabel>
                        <CFormInput
                          id="a2_raw_material_vehicle_capacity"
                          type="text"
                          placeholder="Enter Vehicle (capacity)"
                          value={this.state.a2_raw_material_vehicle_capacity}
                          onChange={(event) => {}}
                          required
                        />
                        {
                          <CFormFeedback invalid>
                            Please enter vehicle (capacity).
                          </CFormFeedback>
                        }
                      </div>
                      <div class="materialdetailsform">
                        <CFormLabel class="materialtext">
                          Vehicle (catergory)
                        </CFormLabel>
                        <CFormSelect
                          id="a2_raw_material_vehicle_category"
                          className="test"
                          value={this.state.a2_raw_material_vehicle_category}
                          onChange={this.handleChangesA2}
                          required
                          feedbackInvalid="Please select a vehicle(category)."
                        >
                          <option value="">Vehicle(category)</option>
                          <option value="1">HDV</option>
                          <option value="2">MDV</option>
                          <option value="3">LDV</option>
                        </CFormSelect>
                      </div>
                      <div class="materialdetailsform">
                        <CFormLabel class="materialtext">
                          No. of Trips required for transporting given Raw Material qty
                        </CFormLabel>
                        <CFormInput
                          id="a2_raw_material_trip_required_transporting_raw_material_qty"
                          className="data-type"
                          value={this.state.a2_raw_material_trip_required_transporting_raw_material_qty}
                          onChange={this.handleChangesA2}
                          required
                          placeholder="Enter No. of Trips required for transporting given Raw Material qty"
                          feedbackInvalid="Please enter no. of trips required for transporting given raw material qty."
                        ></CFormInput>
                      </div>

                      <div class="materialdetailsform">
                        <CFormLabel class="materialtext">
                          Total Distance travelled for transporting Raw Material
                          (km)
                        </CFormLabel>
                        <CFormInput
                          id="a2_raw_material_total_distance_travel_transporting_raw_material"
                          className="data-type"
                          value={this.state.a2_raw_material_total_distance_travel_transporting_raw_material}
                          onChange={this.handleChangesA2}
                          required
                          placeholder="Enter total distance travelled for transporting raw material (km)"
                          feedbackInvalid="Please total distance travelled for transporting raw material (km)."
                        ></CFormInput>
                      </div>
                      <div class="col-sm-12">
                        <div class="col-sm-12 mt-2">
                          <input
                            type="button"
                            class="btn btn-successadd"
                            value="Add Raw Material"
                            onClick={this.handleAddInput}
                          />
                        </div>
                      </div>
                      <CFormLabel class="Rawmaterial">
                        3. Fuel Consumed for Extraction
                      </CFormLabel>
                      <div class="materialdetailsform">
                        <CFormLabel class="materialtext">
                          Raw Material
                        </CFormLabel>
                        <CFormSelect
                        id="a2_raw_material"
                        value={this.state.a2_raw_material}
                        onChange={this.handleChangesA2}
                        feedbackInvalid="Please select a material."
                        required
                      >
                        <option value="">Select Material</option>
                        <option value="1"> Cement </option>
                        <option value="2"> Sand </option>
                        <option value="3"> Aggregate </option>
                        <option value="4"> Burnt Clay Bricks </option>
                        <option value="5"> AAC Blocks </option>
                        <option value="6"> Fly Ash Bricks </option>
                        <option value="other"> Other </option>
                      </CFormSelect>
                        {
                          <CFormFeedback invalid>
                            Please enter a raw material.
                          </CFormFeedback>
                        }
                      </div>
                      <div class="materialdetailsform">
                        <CFormLabel class="materialtext">Fuel Mix</CFormLabel>
                        <CFormSelect
                          id="a2_fuel_mix"
                          className="test"
                          value={this.state.a2_fuel_mix}
                          onChange={this.handleChangesA2}
                          required
                          feedbackInvalid="Please select a extraction processes."
                        >
                          <option value="">Fuel Mix</option>
                          <option value="1">
                            Raw Material Transport Details
                          </option>
                          <option value="2">
                            Raw Material Transport Vehicle Details
                          </option>
                          <option value="3">
                            Fuel Consumed for Extraction
                          </option>
                          <option value="4">Embodied Energy Details</option>
                          <option value="5">Embodied Carbon Details</option>
                        </CFormSelect>
                      </div>
                      <div class="materialdetailsform">
                        <CFormLabel class="materialtextmat">
                          Quantity
                        </CFormLabel>
                        <div class="material-unit-box">
                          <CFormInput
                            className="category"
                            id="a2_fuel_mix_qty"
                            type="text"
                            placeholder="Enter Quantity"
                            value={this.state.a2_fuel_mix_qty}
                            onChange={this.handleChangesA2}
                            required
                          />
                          <CFormSelect
                            id="a2_fuel_mix_unit"
                            class="unitdropbox form-select"
                            value={this.state.a2_fuel_mix_unit}
                            onChange={this.handleChangesA2}
                            required
                          >
                            <option value=""> Unit</option>
                            <option value="w/m2.k">W/m2.K</option>
                          </CFormSelect>
                          {
                            <CFormFeedback invalid>
                              Please enter a quantity.
                            </CFormFeedback>
                          }
                        </div>
                      </div>
                      <div class="materialdetailsform">
                        <CFormLabel class="materialtextmat">
                          Fuel Density
                        </CFormLabel>
                        <div class="material-unit-box">
                          <CFormInput
                            className="category"
                            id="a2_fuel_density"
                            type="text"
                            placeholder="Enter Fuel Density"
                            value={this.state.a2_fuel_density}
                            onChange={this.handleChangesA2}
                            required
                          />

                          <CFormSelect
                            id="a2_fuel_value"
                            class="unitdropbox form-select"
                            value={this.state.a2_fuel_value}
                            onChange={this.handleChangesA2}
                            required
                          >
                            <option value=""> Unit</option>
                            <option value="w/m2.k">W/m2.K</option>
                          </CFormSelect>
                          {
                            <CFormFeedback invalid>
                              Please enter a fuel density.
                            </CFormFeedback>
                          }
                        </div>
                      </div>
                      <div class="materialdetailsform">
                        <CFormLabel class="materialtextmat">
                          Calorific Value
                        </CFormLabel>
                        <div class="material-unit-box">
                          <CFormInput
                            className="category"
                            id="a2_fuel_calorific_value"
                            type="text"
                            placeholder="Enter Calorific Value"
                            value={this.state.a2_fuel_calorific_value}
                            onChange={this.handleChangesA2}
                            required
                          />
                          <CFormSelect
                            id="a2_fuel_calorific_unit"
                            class="unitdropbox form-select"
                            value={this.state.a2_fuel_calorific_unit}
                            onChange={this.handleChangesA2}
                            required
                          >
                            <option value=""> Unit</option>
                            <option value="w/m2.k">W/m2.K</option>
                          </CFormSelect>
                          {
                            <CFormFeedback invalid>
                              Please enter a calorific value.
                            </CFormFeedback>
                          }
                        </div>
                      </div>
                      <div class="col-sm-12">
                        <div class="col-sm-12 mt-2">
                          <input
                            type="button"
                            class="btn btn-successadd"
                            value="Add Raw Material"
                            onClick={this.handleAddInput}
                          />
                        </div>
                      </div>
                      <CFormLabel class="Rawmaterial">
                        4. Embodied Energy Details
                      </CFormLabel>
                      <div class="materialdetailsform">
                        <CFormLabel class="materialtext">
                          Raw Material
                        </CFormLabel>
                        <CFormSelect
                        id="a2_raw_material"
                        value={this.state.a2_raw_material}
                        onChange={this.handleChangesA2}
                        feedbackInvalid="Please select a material."
                        required
                      >
                        <option value="">Select Material</option>
                        <option value="1"> Cement </option>
                        <option value="2"> Sand </option>
                        <option value="3"> Aggregate </option>
                        <option value="4"> Burnt Clay Bricks </option>
                        <option value="5"> AAC Blocks </option>
                        <option value="6"> Fly Ash Bricks </option>
                        <option value="other"> Other </option>
                      </CFormSelect>
                      </div>
                      <div class="materialdetailsform">
                        <CFormLabel class="materialtext">Quantity</CFormLabel>
                        <div class="material-unit-box">
                          <CFormInput
                            className="category"
                            id="a2_fuel_embodied_energy_details_qty"
                            type="text"
                            placeholder="Enter Quantity"
                            value={this.state.a2_fuel_embodied_energy_details_qty}
                            onChange={this.handleChangesA2}
                            required
                          />
                          <CFormSelect
                            id="a2_fuel_embodied_energy_details_unit"
                            class="unitdropbox form-select"
                            value={this.state.a2_fuel_embodied_energy_details_unit}
                            onChange={this.handleChangesA2}
                            required
                          >
                            <option value=""> Unit</option>
                            <option value="w/m2.k">W/m2.K</option>
                          </CFormSelect>
                          {
                            <CFormFeedback invalid>
                              Please enter a quantity.
                            </CFormFeedback>
                          }
                        </div>
                      </div>
                      <div class="col-sm-12">
                        <div class="col-sm-12 mt-2">
                          <input
                            type="button"
                            class="btn btn-successadd"
                            value="Add Raw Material"
                            onClick={this.handleAddInput}
                          />
                        </div>
                      </div>
                      <CFormLabel class="Rawmaterial">
                        5. Embodied Carbon Details
                      </CFormLabel>
                      <div class="materialdetailsform">
                        <CFormLabel class="materialtext">
                          Raw Material
                        </CFormLabel>
                        <CFormSelect
                        id="a2_raw_material"
                        value={this.state.a2_raw_material}
                        onChange={this.handleChangesA2}
                        feedbackInvalid="Please select a material."
                        required
                      >
                        <option value="">Select Material</option>
                        <option value="1"> Cement </option>
                        <option value="2"> Sand </option>
                        <option value="3"> Aggregate </option>
                        <option value="4"> Burnt Clay Bricks </option>
                        <option value="5"> AAC Blocks </option>
                        <option value="6"> Fly Ash Bricks </option>
                        <option value="other"> Other </option>
                      </CFormSelect>
                        {
                          <CFormFeedback invalid>
                            Please enter a raw material.
                          </CFormFeedback>
                        }
                      </div>
                      <div class="materialdetailsform">
                        <CFormLabel class="materialtext">
                          Characterization Factor
                        </CFormLabel>
                        <div class="material-unit-box">
                          <CFormInput
                            className="category"
                            id="a2_fuel_embodied_carbon_details_unit"
                            type="text"
                            placeholder="Characterization Factor"
                            value={this.state.a2_fuel_embodied_carbon_details_unit}
                            onChange={this.handleChangesA2}
                            required
                          />
                          <CFormSelect
                            id="a2_fuel_embodied_carbon_details_unit_qty"
                            class="unitdropbox form-select"
                            value={this.state.a2_fuel_embodied_carbon_details_unit_qty}
                            onChange={this.handleChangesA2}
                            required
                          >
                            <option value=""> Unit</option>
                            <option value="w/m2.k">W/m2.K</option>
                          </CFormSelect>
                          {
                            <CFormFeedback invalid>
                              Please enter a characterization factor.
                            </CFormFeedback>
                          }
                        </div>
                      </div>

                      <div class="materialdetailsform">
                        <CFormLabel class="materialtextmat">
                          Embodied Energy (for reference Raw Material Qty)
                        </CFormLabel>
                        <div class="material-unit-box">
                          <CFormInput
                            className="category"
                            id="a2_embodied_energy"
                            type="text"
                            placeholder="Enter Embodied Energy (for reference raw material qty)"
                            value={this.state.a2_embodied_energy}
                            onChange={this.handleChangesA2}
                            required
                          />
                          <CFormSelect
                            id="a2_embodied_energy_unit"
                            class="unitdropbox form-select"
                            value={this.state.a2_embodied_energy_unit}
                            onChange={this.handleChangesA2}
                            required
                          >
                            <option value=""> Unit</option>
                            <option value="w/m2.k">W/m2.K</option>
                          </CFormSelect>
                          {
                            <CFormFeedback invalid>
                              Please enter a embodied energy (for reference Raw
                              material qty).
                            </CFormFeedback>
                          }
                        </div>
                      </div>

                      <div class="col-sm-12">
                        <div class="col-sm-12 mt-2">
                          <input
                            type="button"
                            class="btn btn-successadd"
                            value="Add Raw Material"
                            onClick={this.handleAddInput}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <CRow>
                    <CButton
                      className="button_new_class_form"
                      type="button"
                      onClick={this.handleSubmitA2}
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
                      {DataSaveButton}
                    </CButton>
                  </CRow>
                </CForm>
              </CTabPane>
            </CTabContent>
          </>
        )}
        <div>
          <CTabContent>
            <CTabPane
              role="tabpanel"
              aria-labelledby="Data Properties"
              visible={activeKey === 2}
            >
              <CForm
                noValidate
                validated={this.state.validatedimg}
                onSubmit={this.handleSubmitimg}
              >
                <div class="Materialdetails">
                  <div class="Materialdetails-box">
                    <div class="materialdetailsform">
                      <CFormLabel class="materialtext">File Upload</CFormLabel>
                      <CFormInput
                        name="material_image"
                        id="material_image"
                        type="file"
                        onChange={this.handleImgChange}
                        required
                      />
                      {
                        <CFormFeedback invalid>
                          Please choose the file.
                        </CFormFeedback>
                      }
                    </div>
                  </div>
                </div>
                <CRow>
                  <CButton
                    className="button_new_class_form"
                    type="submit"
                    // onClick={this.handleSave}
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
                    {DataSaveButton}
                  </CButton>
                </CRow>
              </CForm>
            </CTabPane>

            <CTabPane
              role="tabpanel"
              aria-labelledby="Data Properties"
              visible={activeKey === 3}
            >
              <CForm
                // className="row g-3 needs-validation"
                noValidate
                validated={this.state.validated}
                onSubmit={this.handleSubmit}
              >
                <div class="Materialdetails">
                  <div class="Materialdetails-box">
                    <div class="materialdetailsform">
                      <CFormLabel class="materialtext">Data Type</CFormLabel>
                      <CFormSelect
                        id="data_type_id"
                        className="data-type"
                        value={this.state.data_type_id}
                        onChange={this.handlechange}
                        feedbackInvalid="Please select a valid datatype."
                        required
                      >
                        <option value="">Select Data Type</option>
                        <option value="1">Primary</option>
                        <option value="2">Secondary</option>
                      </CFormSelect>
                    </div>

                    <div class="materialdetailsform">
                      <CFormLabel class="materialtext">
                        Data Reliability
                      </CFormLabel>
                      <CFormSelect
                        id="data_reliability_id"
                        className="data-reliability"
                        value={this.state.data_reliability_id}
                        onChange={this.handlechange}
                        feedbackInvalid="Please select a data reliability."
                        required
                      >
                        <option value="">Select Data Reliability</option>
                        {this.state.data_type_id === "1" && (
                          <>
                            <option value="measured">Measured</option>
                          </>
                        )}

                        {this.state.data_type_id === "2" && (
                          <>
                            <option value="calculated">Calculated</option>
                            <option value="estimated">Estimated</option>
                          </>
                        )}
                      </CFormSelect>
                    </div>

                    <div class="materialdetailsform">
                      <CFormLabel class="materialtext">Data Review</CFormLabel>
                      <CFormSelect
                        id="process_review_id"
                        className="material"
                        value={this.state.process_review_id}
                        onChange={this.handlechange}
                        //aria-describedby="validationReliability"
                        feedbackInvalid="Please select a data review."
                        required
                      >
                        <option value="">Select Data Review</option>
                        <option value="1">Yes</option>
                        <option value="2">No</option>
                      </CFormSelect>
                    </div>
                  </div>
                </div>
                <div class="Materialdetails">
                  {this.state.data_type_id === "1" && (
                    <>
                      <div class="materialdetailsform">
                        <CFormLabel class="materialtext">
                          Data Source
                        </CFormLabel>
                        <CFormSelect
                          id="data_source_id"
                          className="material"
                          value={this.state.data_source_id}
                          onChange={this.handlechange}
                          feedbackInvalid="Please select a data source."
                          required
                        >
                          <option value="">Select Data Source</option>
                          <option value="epd">EPD</option>
                          <option value="company">Company</option>
                          <option value="sustainability_report">
                            Sustainability Report
                          </option>
                          <option value="energy_audit">Energy Audit</option>
                        </CFormSelect>
                      </div>
                    </>
                  )}
                </div>
                <div class="Materialdetails">
                  {this.state.data_type_id === "2" && (
                    <div class="materialdetailsform">
                      <CFormLabel class="materialtext">
                        Add New Data Source
                      </CFormLabel>
                      <CFormInput
                        className=""
                        id="data_source_id"
                        type="text"
                        placeholder="Enter Data Source"
                        value={this.state.data_source_id}
                        onChange={this.handlechange}
                        required
                      />
                      {
                        <CFormFeedback invalid>
                          Please enter a data source.
                        </CFormFeedback>
                      }
                    </div>
                  )}
                </div>
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
                    {DataSaveButton}
                  </CButton>
                </CRow>
              </CForm>
            </CTabPane>
            <CTabPane
              role="tabpanel2"
              aria-labelledby="Data Collection Timeline"
              visible={activeKey === 4}
            >
              <CForm
                // className="row g-3 needs-validation"
                noValidate
                validated={this.state.validatedate}
                onSubmit={this.handleSubmitdate}
              >
                <div class="Materialdetails">
                  <div class="Materialdetails-box">
                    <div className="materialdetailsform">
                      <CFormLabel className="materialtext">
                        Beginning
                      </CFormLabel>
                      <div class="material-unit-timeline">
                        <CFormSelect
                          id="beginning_year"
                          name="year"
                          value={this.state.beginningYear}
                          onChange={this.handleBeginningYearChange}
                          required
                        >
                          <option value="">Year</option>
                          {years.map((year) => (
                            <option key={year} value={year}>
                              {year}
                            </option>
                          ))}
                        </CFormSelect>

                        <CFormSelect
                          id="beginning_month"
                          name="month"
                          value={this.state.beginningMonth}
                          onChange={this.handleBeginningMonthChange}
                          required
                        >
                          <option value="">Month</option>
                          {months.map((month) => (
                            <option key={month.value} value={month.value}>
                              {month.label}
                            </option>
                          ))}
                        </CFormSelect>
                        {
                          <CFormFeedback className="error" invalid>
                            Please enter a beginning year and month.
                          </CFormFeedback>
                        }
                      </div>
                    </div>
                    {
                      <CFormFeedback className="error" invalid>
                        Please Enter a Uvalue.
                      </CFormFeedback>
                    }
                    <div className="materialdetailsform">
                      <CFormLabel className="materialtext">Ending</CFormLabel>
                      <div class="material-unit-timeline">
                        <CFormSelect
                          id="ending_year"
                          name="year"
                          value={this.state.endingYear}
                          onChange={this.handleEndingYearChange}
                          required
                        >
                          <option value="">Year</option>
                          {years.map((year) => (
                            <option key={year} value={year}>
                              {year}
                            </option>
                          ))}
                        </CFormSelect>
                        <CFormSelect
                          id="ending_month"
                          name="month"
                          value={this.state.endingMonth}
                          onChange={this.handleEndingMonthChange}
                          required
                        >
                          <option value="">Month</option>
                          {months.map((month) => (
                            <option key={month.value} value={month.value}>
                              {month.label}
                            </option>
                          ))}
                        </CFormSelect>
                        {
                          <CFormFeedback className="error" invalid>
                            Please enter a ending year and month.
                          </CFormFeedback>
                        }
                      </div>
                    </div>
                  </div>
                </div>
              </CForm>
              <CRow>
                <CButton
                  className="button_new_class_form"
                  type="button"
                  onClick={this.handleSubmitdate}
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
                  {DataSaveButton}
                </CButton>
              </CRow>
            </CTabPane>
            <CTabPane
              role="tabpanel"
              aria-labelledby="Material Details"
              visible={activeKey === 5}
            >
              <CForm
                // className="row g-3 needs-validation"
                noValidate
                validated={this.state.validateddetails}
                onSubmit={this.handleSubmitdetails}
              >
                <div class="Materialdetails">
                  <div class="Materialdetails-box">
                    <div class="materialdetailsform">
                      <CFormLabel class="materialtext">Material</CFormLabel>
                      <CFormSelect
                            id="material_name"
                            placeholder="Enter Raw Material"
                            className="unitdropboxmaterial form-select"
                            value={this.state.material_name}
                            onChange={this.handleChanges}
                            feedbackInvalid="Please select a raw material."
                            required
                        >
                        
                          {this.state.raw_materials.map((materialdata) => (
                            <option key={materialdata.id} value={materialdata.id}>
                              {materialdata.name}
                            </option>
                          ))}
                        </CFormSelect>
                        
                    </div>

                    <div class="materialdetailsform">
                      <CFormLabel class="materialtext">Type</CFormLabel>
                      <CFormSelect
                        id="typedetails"
                        value={this.state.typedetails}
                        onChange={this.handleChanges}
                        //aria-describedby="validationReliability"
                        feedbackInvalid="Please select a type."
                        required
                      >
                        <option value="">Select Type</option>
                        <option value="1"> Cement </option>
                        <option value="2"> Sand </option>
                        <option value="3"> Aggregate </option>
                        <option value="4"> Burnt Clay Bricks </option>
                        <option value="5"> AAC Blocks </option>
                        <option value="6"> Fly Ash Bricks </option>
                        <option value="other"> Other </option>
                      </CFormSelect>
                    </div>
                    <div class="materialdetailsform">
                      <CFormLabel class="materialtext">Density</CFormLabel>
                      <div class="material-unit-box">
                        <CFormInput
                          className="category unittxt"
                          id="density"
                          type="text"
                          placeholder="Enter Density"
                          value={this.state.density}
                          onChange={this.handleChanges}
                          required
                        />
                        <CFormSelect
                          id="unitdensty"
                          class="unitdropbox form-select"
                          value={this.state.unitdensty}
                          onChange={this.handleChanges}
                          //aria-describedby="validationReliability"

                          required
                        >
                          <option value=""> Unit</option>
                          <option value="kg"> kg/m3 </option>
                          <option value="cm3"> g/cm3 </option>
                          <option value="l"> kg/L </option>
                        </CFormSelect>
                        {
                          <CFormFeedback invalid>
                            Please enter a density.
                          </CFormFeedback>
                        }
                      </div>
                    </div>

                    <div class="materialdetailsform">
                      <CFormLabel class="materialtext">U-value</CFormLabel>
                      <div class="material-unit-box">
                        <CFormInput
                          className="category"
                          id="u_value"
                          type="text"
                          placeholder="Enter UValue"
                          value={this.state.u_value}
                          onChange={this.handleChanges}
                          required
                        />

                        <CFormSelect
                          id="unitvalue"
                          class="unitdropbox form-select"
                          value={this.state.unitvalue}
                          onChange={this.handleChanges}
                          //aria-describedby="validationReliability"

                          required
                        >
                          <option value=""> Unit</option>
                          <option value="w/m2.k">W/m2.K</option>
                        </CFormSelect>
                        {
                          <CFormFeedback invalid>
                            Please enter a unit value.
                          </CFormFeedback>
                        }
                      </div>
                    </div>

                    <div class="materialdetailsform">
                      <CFormLabel class="materialtext">
                        Compressive strength
                      </CFormLabel>
                      <div class="material-unit-box">
                        <CFormInput
                          className="category"
                          id="compressive_strength"
                          type="text"
                          placeholder="Enter Compressive strength"
                          value={this.state.compressive_strength}
                          onChange={this.handleChanges}
                          required
                        />
                        <CFormSelect
                          id="unitcmp"
                          value={this.state.unitcmp}
                          class="unitdropbox form-select"
                          onChange={this.handleChanges}
                          //aria-describedby="validationReliability"
                          required
                        >
                          <option value=""> Unit</option>
                          <option value="kg"> Kg </option>
                          <option value="nos"> Nos </option>
                          <option value="nos"> Nos </option>
                        </CFormSelect>
                        {
                          <CFormFeedback invalid>
                            Please enter a compressive strength.
                          </CFormFeedback>
                        }
                      </div>
                    </div>
                    <div class="materialdetailsform">
                      <CFormLabel class="materialtext">
                        Tensile strength
                      </CFormLabel>
                      <div class="material-unit-box">
                        <CFormInput
                          className="category"
                          id="tensile_strength"
                          type="text"
                          placeholder="Enter Tensile strength"
                          value={this.state.tensile_strength}
                          onChange={this.handleChanges}
                          required
                        />

                        {/* <CFormLabel class="materialtext">Unit</CFormLabel> */}

                        <CFormSelect
                          id="unitten"
                          value={this.state.unitten}
                          onChange={this.handleChanges}
                          //aria-describedby="validationReliability"
                          class="unitdropbox form-select"
                          required
                        >
                          <option value=""> Unit</option>
                          <option value="kg"> Kg </option>
                          <option value="nos"> Nos </option>
                          <option value="nos"> Nos </option>
                          <option value="m3"> M3 </option>
                          <option value="mt"> MT </option>
                          <option value="l"> L </option>
                          <option value="m2"> M2 </option>
                        </CFormSelect>
                        {
                          <CFormFeedback invalid>
                            Please enter a tensile strength.
                          </CFormFeedback>
                        }
                      </div>
                    </div>
                    <div class="materialdetailsform">
                      <CFormLabel class="materialtext">Diameter</CFormLabel>
                      <div class="material-unit-box">
                        <CFormInput
                          className="category"
                          id="diameter"
                          type="text"
                          placeholder="Enter Diameter"
                          value={this.state.diameter}
                          onChange={this.handleChanges}
                          required
                        />

                        {/* <CFormLabel class="materialtext">Unit</CFormLabel> */}

                        <CFormSelect
                          id="unitdmt"
                          class="unitdropbox form-select"
                          value={this.state.unitdmt}
                          onChange={this.handleChanges}
                          //aria-describedby="validationReliability"

                          required
                        >
                          <option value=""> Unit</option>
                          <option value="kg"> Kg </option>
                          <option value="nos"> Nos </option>
                          <option value="nos"> Nos </option>
                          <option value="m3"> M3 </option>
                          <option value="mt"> MT </option>
                          <option value="l"> L </option>
                          <option value="m2"> M2 </option>
                        </CFormSelect>
                        {
                          <CFormFeedback invalid>
                            Please enter a diameter.
                          </CFormFeedback>
                        }
                      </div>
                    </div>

                    <div className="materialdetailsform">
                      <CFormLabel className="materialtext">Coverage</CFormLabel>
                      <div className="material-unit-box">
                        <CFormInput
                          className="category"
                          id="coverage"
                          type="text"
                          placeholder="Enter Coverage"
                          value={this.state.coverage}
                          onChange={this.handleChanges}
                          required
                        />
                        <CFormSelect
                          id="unitcvg"
                          className="unitdropbox form-select"
                          value={this.state.unitcvg}
                          onChange={this.handleChanges}
                          required
                        >
                          <option value="">Unit</option>
                          <option value="kg">Kg</option>
                          <option value="nos">Nos</option>
                          <option value="m3">M3</option>
                          <option value="mt">MT</option>
                          <option value="l">L</option>
                          <option value="m2">M2</option>
                        </CFormSelect>
                        {
                          <CFormFeedback invalid>
                            Please enter a coverage.
                          </CFormFeedback>
                        }
                      </div>
                    </div>

                    <div class="materialdetailsform">
                      <CFormLabel class="materialtext">Manufacturer</CFormLabel>

                      <CFormSelect
                        id="manufacturer"
                        value={this.state.manufacturer}
                        onChange={this.handleChanges}
                        //aria-describedby="validationReliability"
                        feedbackInvalid="Please select a manufacturer."
                        required
                      >
                        <option value="">Select Manufacturer</option>
                        <option value="1"> Option1 </option>
                        <option value="2"> Option2 </option>
                      </CFormSelect>
                    </div>
                  </div>
                </div>
                <div class="Materialdetails">
                  {this.state.material_id === "other" && (
                    <>
                      <div class="materialdetailsform">
                        <CFormLabel class="materialtext">
                          Add New Material
                        </CFormLabel>
                        <CFormInput
                          className="material"
                          id="material_name"
                          type="text"
                          placeholder="Enter Material Name"
                          value={this.state.material_name}
                          onChange={this.handleChanges}
                          required
                        />
                        {
                          <CFormFeedback invalid>
                            Please enter a material name.
                          </CFormFeedback>
                        }
                      </div>
                    </>
                  )}
                </div>
              </CForm>
              <CRow>
                <CButton
                  className="button_new_class_form"
                  type="button"
                  onClick={this.handleSubmitdetails}
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
                  {DataSaveButton}
                </CButton>
              </CRow>
            </CTabPane>
            <CTabPane
              role="tabpanel"
              aria-labelledby="Referencequantity"
              visible={activeKey === 6}
            >
              <CForm
                // className="row g-3 needs-validation"
                noValidate
                validated={this.state.validatedqty}
                onSubmit={this.handleSubmitqty}
              >
                <div class="Materialdetails">
                  <div class="Materialdetails-boxqty">
                    <div class="materialdetailsform">
                      <CFormLabel class="materialtext">
                        Finished Material Declared quantity
                      </CFormLabel>
                      <div class="material-unit-box">
                        <CFormInput
                          className="category"
                          id="finishedqty"
                          type="text"
                          placeholder="Enter Finished Material Declared Quantity"
                          value={this.state.finishedqty}
                          onChange={this.handleChanged}
                          required
                        />

                        {/* <CFormLabel class="materialtext">Unit</CFormLabel> */}

                        <CFormSelect
                          id="unitqty"
                          class="unitdropbox form-select"
                          value={this.state.unitqty}
                          onChange={this.handleChanged}
                          //aria-describedby="validationReliability"
                          // feedbackInvalid="Please select a Unit"
                          required
                        >
                          <option value=""> Unit</option>
                          <option value="kg"> Kg </option>
                          <option value="nos"> Nos </option>
                          <option value="nos"> Nos </option>
                          <option value="m3"> M3 </option>
                          <option value="mt"> MT </option>
                          <option value="l"> L </option>
                          <option value="m2"> M2 </option>
                        </CFormSelect>
                        {
                          <CFormFeedback invalid>
                            Please enter a finished material declared quantity.
                          </CFormFeedback>
                        }
                      </div>
                    </div>
                  </div>
                </div>
              </CForm>
              <CRow>
                <CButton
                  className="button_new_class_form"
                  type="button"
                  onClick={this.handleSubmitqty}
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
                  {DataSaveButton}
                </CButton>
              </CRow>
            </CTabPane>
          </CTabContent>
        </div>

        <div class="text-form">
          <CForm
            className="g-3 needs-validation"
            // noValidate
            validated={this.state.validated}
            // onSubmit={this.handleSubmit}
          >
             <CRow>
              <CButton
                className="button_new_class_form"
                type="button"
                onClick={this.handleSubmit}
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
        <div class="sidebar-image">
          <img src={footer} class="img-header" alt="im-header" style={{ marginTop: "10px" }} />
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
    onDataSetMetaRegister: (
      material_id,
      material_image,
      category_id,
      category_name,
      data_type_id,
      data_reliability_id,
      process_review_id,
      start_date,
      end_date,
      density,
      u_value,
      compressive_strength,
      tensile_strength,
      diameter,
      coverage,
      manufacturer,
      material_name,
      dataset_category_id,
      form_input_data,
      finishedqty,
      myfiles,
      unitqty,
      unitcmp,
      unitcvg,
      unitten,
      unitdmt,
      unitdensty,
      unitvalue,
      typedetails,
      data_category_id,
      isA1FormFilled,
      data_category_id_A2,
      isA2FormFilled,
      data_category_id_A3,
      isA3FormFilled,
      //form_input_data,
      formData,
      formDataA1,
      formDataA2,
        formDataA3,
    ) =>
      dispatch(
        actions.datasetmetaFormData(
          formDataA1,
          formDataA2,
          formDataA3,
          formData,
          material_id,
          material_image,
          category_id,
          category_name,
          data_type_id,
          data_reliability_id,
          process_review_id,
          start_date,
          end_date,
          density,
          u_value,
          compressive_strength,
          tensile_strength,
          diameter,
          coverage,
          manufacturer,
          material_name,
          dataset_category_id,
          form_input_data,
          finishedqty,
          myfiles,
          unitqty,
          unitcmp,
          unitcvg,
          unitten,
          unitdmt,
          unitdensty,
          unitvalue,
          typedetails,
          data_category_id,
          isA1FormFilled,
          data_category_id_A2,
          isA2FormFilled,
          data_category_id_A3,
          isA3FormFilled
        )
      ),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MaterialForm);
