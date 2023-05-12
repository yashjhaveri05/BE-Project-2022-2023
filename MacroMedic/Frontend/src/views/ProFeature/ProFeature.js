import React, { useState, useEffect, useContext } from "react";
import { useParams, useHistory } from "react-router-dom";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// core components
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import Button from "components/CustomButtons/Button.js";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
// import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import CustomButton from "components/CustomButtons/Button.js";
import TextField from "@material-ui/core/TextField";
import TextareaAutosize from "@material-ui/core/TextareaAutosize";
import { Avatar } from "@material-ui/core";
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import styled from "styled-components";
import api from "../../utils/api";
import axios from "axios";
import Notify from "../../notification/Notify";

import usePayment from "../../components/Payment/usePayment";
import Swal from "sweetalert2";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  backButton: {
    marginRight: theme.spacing(1),
  },
  instructions: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
  typo: {
    paddingLeft: "25%",
    marginBottom: "40px",
    position: "relative",
  },
  note: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    bottom: "10px",
    color: "#c0c1c2",
    display: "block",
    fontWeight: "400",
    fontSize: "13px",
    lineHeight: "13px",
    left: "0",
    marginLeft: "20px",
    position: "absolute",
    width: "260px",
  },
  cardCategoryWhite: {
    color: "rgba(255,255,255,.62)",
    margin: "0",
    fontSize: "14px",
    marginTop: "0",
    marginBottom: "0",
  },
  cardTitleWhite: {
    color: "#FFFFFF",
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "300",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none",
  },
  container: {
    display: "flex",
    flexWrap: "wrap",
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 200,
  },
  container: {
    display: "flex",
    flexWrap: "wrap",

    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 300,
    padding: 8,
  },
  avatar: {
    height: 200,
    width: 200,
  },
}));

export default function ProFeature() {
  const classes = useStyles();

  
  const [symptoms, setSymptoms] = useState({
    Diabetes: 0,
    Cholestrol: 0,
    BloodPressure:0
    })
    const [report,setReport]=React.useState(null);
    const [extract,setExtract]=React.useState(null);
    const [submitted,setSubmitted]=React.useState(false);

  

  function getSteps() {
    return [
      // "Choose Report Type",
      "Upload Medical Record",
      "Submit",
    ];
  }


  function getStepContent(stepIndex) {
    switch (stepIndex) {
      // case 0:
      //   return (
      //       <div>
      //           {symptomArr.length!=0 ?(
      //             <h5 style={{ margin: 8 }}>
      //         You have chosen the following report type: {symptomArr+" "}. Kindly complete the
      //         remaining steps to extract information
      //       </h5>):(null)}
      //       {symptoms &&
      //         Object.keys(symptoms).map((key) => (
      //           <Button
      //             color={symptoms[key] == 0 ? "primary" : "success"}
      //             onClick={() => onClickHandler(key)}
      //             style={{
      //               margin: 8,
      //             }}
      //           >
      //             {key}
      //           </Button>
      //         ))}
      //     </div>
      //   );
      case 0:
        return (
            <>
                <input
                placeholder="Update Image"
                type="file"
                onChange={async (e) => {
                  setReport(e.target.files[0]);
                  console.log(report);
                  //write api to send report 
                //   await api.uploadImage(userData._id, e.target.files[0]);
                }}
              /></>
       
        );
      case 1:
        return (
            <>
             <h5 style={{ margin: 8 }}>
              Press the submit button for summary of report 
            </h5>
            </>
          
        );
      default:
        return "Unknown stepIndex";
    }
  }

  const [activeStep, setActiveStep] = React.useState(0);
  const steps = getSteps();

  const handleNext = async () => {
    if (activeStep === steps.length - 1) {
    //   Swal.fire("Kindly make the payment to confirm appointment.");
    //   // handleGift();
    //   setSuccess(true);
        console.log("activeStep === steps.length - 1")
    } 
    // else if (activeStep === 0) {
    // if(symptomArr.length==0){
    //     Swal.fire("Select report type");
    // }
    // else{
    //     setActiveStep((prevActiveStep) => prevActiveStep + 1);
    // }
    // } 
    else if (activeStep === 1) {
        if(!report){
            Swal.fire("Please upload a report");
        }
        else{
            setActiveStep((prevActiveStep) => prevActiveStep + 1);
        }
    } 
    else {
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
    }

  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    // setActiveStep(0);
    // setBookAppointment({
    //   doctorId: docId,
    //   dateTime: "",
    //   description: "",
    // });
  };
  const updateSymptom = (symptom = "") => {
    console.log(symptom);
    setSymptoms({
      ...symptoms,
      [symptom]: 1,
    });
  };

  const unupdateSymptom = (symptom = "") => {
    console.log(symptom);
    setSymptoms({
      ...symptoms,
      [symptom]: 0,
    });
  };
  const [symptomArr, setSymptomArray] = useState([]);
  const onClickHandler = (key) => {
    if(symptomArr.includes(key)){
      unupdateSymptom(key);
      console.log(key);
      setSymptomArray(symptomArr.filter(value => {
        return value !== key
      }));
    }
    else {
      updateSymptom(key);
      console.log(key);
      setSymptomArray([...symptomArr, key]);
    }
  };

  const handleSubmit=async()=>{
    console.log("Code to extract summary")
    setSubmitted(true);
    // write api for summary
    var formdata = new FormData();
    console.log(report)
    formdata.append("file", report, "filepath");
    formdata.append("type", "2");
    console.log(formdata)

    // var requestOptions = {
    //   method: 'POST',
    //   body: formdata,
    //   redirect: 'follow',
    //   mode:'no-cors',
    //   headers: {
    //     "Content-type": "application/json; charset=UTF-8",
    //     "Accept": "application/json"

    //   }

    // };
    let response = await axios.post("http://127.0.0.1:8000/", formdata,{headers: {
      "Content-type": "application/json; charset=UTF-8",
      "Accept": "application/json"
      }
    }
    )
    setExtract(response.data)
    console.log("Extracted", response.data)
    // console.log("data",data)

    // await fetch("http://127.0.0.1:8000/", requestOptions)
    // .then(response => {
    //   console.log("res",response)
    //   if (response.ok) {
    //     response.json().then(json => {
    //       console.log(json);
    //     });
    //   }
    //   else{
    //     console.log("here")
    //   }
    // });
      // .then(result => setExtract(result))
      // .catch(error => console.log('error', error));
      // setExtract(response)
      // console.log("extract",extract)

  }
  return (
    <>
      <Card>
        {submitted?(<>{extract?(<>
          <CardHeader color="warning">
          <h4 className={classes.cardTitleWhite}>
            Summary of the report generated
          </h4>
        </CardHeader>
        <CardBody>
       <p><b>Observation:</b> {extract.start}</p>
       <p><b>Suggestion:</b> {extract.suggestion}</p>
       <h6><b>The elements which were extracted from the report are as follows:</b></h6>
       <div>
       {Object.keys(extract).map(ex=>{
        console.log(ex)
        if(ex=="start" || ex=="suggestion"){
          let list=(<></>);
          return list;
        
        }
        else{
          const list = (
            <Card>
              
              <CardHeader color="warning">
              <h4 className={classes.cardTitleWhite}>
              {extract[ex].elem}
              </h4>
                </CardHeader>
                <CardBody>
               
               Introduction: {extract[ex].intro1 +" "+ extract[ex].intro2}
               <hr style={{
                    borderWidth: 0.01,
                    padding: "4px auto", 
                  }}/>
               Effect: {extract[ex].effects}
               <hr style={{
                    borderWidth: 0.01,
                    padding: "4px auto",
                  }}/>
               Remedy: {extract[ex].rem1 +" "+ extract[ex].rem2}
                </CardBody>
              
          
              </Card>
           
          );
          return list;
        }
        
       })
       }
    </div>
      
       
        </CardBody>
        </>):(<>
          <CardHeader color="warning">
          <h4 className={classes.cardTitleWhite}>
            Extracting.....
          </h4>
        </CardHeader>
        <CardBody>
        <img src="https://assets.materialup.com/uploads/518165c7-66a8-4494-b954-c12e31373256/preview.gif" alt="loading..." style={{display:"flex" ,margin:"auto"}} />
        </CardBody>
        </>)}
         
        </>):(<>
          <CardHeader color="warning">
          <h4 className={classes.cardTitleWhite}>
            Get information about medical report
          </h4>
          <p className={classes.cardCategoryWhite}>
            Kindly fill the form to get summarisation of your report
          </p>
        </CardHeader>
        <CardBody>
          <GridContainer>
            <StyledGridItem className={classes.root} xs={12} sm={12} md={12}>
              <Stepper
                activeStep={activeStep}
                alternativeLabel
                style={{ marginTop: 30 }}
              >
                {steps.map((label) => (
                  <Step key={label}>
                    <StepLabel>{label}</StepLabel>
                  </Step>
                ))}
              </Stepper>
              <div style={{ marginTop: 30 }}>
                {activeStep === steps.length ? (
                  <div>
                    <Typography className={classes.instructions}>
                      All steps completed
                    </Typography>
                    <Button onClick={handleReset}>Reset</Button>
                  </div>
                ) : (
                  <div
                    style={{
                      marginTop: 30,
                      textAlign: "center",
                      margin: "auto",
                    }}
                  >
                    <Typography className={classes.instructions}>
                      {getStepContent(activeStep)}
                    </Typography>
                    <div>
                      <CustomButton
                        //fullWidth
                        color="warning"
                        disabled={activeStep === 0}
                        onClick={handleBack}
                        className={classes.backButton}
                      >
                        Back
                      </CustomButton>
                      {activeStep !== steps.length - 1 ? (
                        <CustomButton
                          variant="contained"
                          color="warning"
                          onClick={handleNext}
                        >
                          Next
                        </CustomButton>
                      ) : (
                        <CustomButton
                          style={{ display: "inline-block" }}
                          variant="contained"
                          color="warning"
                          onClick={handleSubmit}
                          id="name-kya-hai"
                        >
                          Submit
                        </CustomButton>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </StyledGridItem>
          </GridContainer>
        </CardBody></>)}
       
      </Card>

      
    </>
  );
}

const StyledFileInputContainer = styled.button`
  width: 75% !important;
  text-align: center;
  margin: auto;
  border-radius: 6px;
  background-color: #fafafa;
`;

const StyledFileInput = styled.input`
  border-radius: 10px;
  padding: 12px;
  width: 100%;
`;

const StyledGridItem = styled(GridItem)`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center !important;
`;

const StyledTextArea = styled(TextareaAutosize)`
  width: 75%;
  border-radius: 8px;
  font-family: sans-serif !important;
  padding: 8px !important;
`;

const StyledRightComponent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  margin: 8px;
  gap: 12px;
`;

const StyledButton = styled(CustomButton)`
  margin: 16px auto;
`;

const StyledDoctorContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, 250px);
  column-gap: 12px;
  row-gap: 12px;
  justify-content: center;
  align-items: center;
`;

const StyledIndividualDoctorPanel = styled.div`
  display: flex;
  flex-direction: column;
  padding-left: 6px;
`;
