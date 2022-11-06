import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import MapNew from "views/Maps/MapsNew";
import api from "utils/api";
import Button from "components/CustomButtons/Button.js";
import Modal from "@material-ui/core/Modal";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "0.5px  #000",
  boxShadow: 24,
  p: 4,
};

// const useStyles = makeStyles(styles);
const Symptoms = () => {
  const history = useHistory();
  const [open, setOpen] = useState(false);
  const [specialDoc, setSpecialDoc] = useState("");
  const [symptoms, setSymptoms] = useState({
    itching: 0,
    skin_rash: 0,
    continuous_sneezing: 0,
    shivering: 0,
    chills: 0,
    joint_pain: 0,
    stomach_pain: 0,
    acidity: 0,
    ulcers_on_tongue: 0,
    vomiting: 0,
    fatigue: 0,
    weight_gain: 0,
    anxiety: 0,
    cold_hands_and_feets: 0,
    mood_swings: 0,
    weight_loss: 0,
    restlessness: 0,
    lethargy: 0,
    irregular_sugar_level: 0,
    cough: 0,
    high_fever: 0,
    sunken_eyes: 0,
    breathlessness: 0,
    sweating: 0,
    dehydration: 0,
    indigestion: 0,
    headache: 0,
    yellowish_skin: 0,
    dark_urine: 0,
    nausea: 0,
    loss_of_appetite: 0,
    pain_behind_the_eyes: 0,
    back_pain: 0,
    constipation: 0,
    abdominal_pain: 0,
    diarrhoea: 0,
    mild_fever: 0,
    yellow_urine: 0,
    yellowing_of_eyes: 0,
    acute_liver_failure: 0,
    swelling_of_stomach: 0,
    blurred_and_distorted_vision: 0,
    throat_irritation: 0,
    redness_of_eyes: 0,
    sinus_pressure: 0,
    runny_nose: 0,
    congestion: 0,
    chest_pain: 0,
    weakness_in_limbs: 0,
    fast_heart_rate: 0,
    pain_during_bowel_movements: 0,
    pain_in_anal_region: 0,
    bloody_stool: 0,
    irritation_in_anus: 0,
    neck_pain: 0,
    dizziness: 0,
    cramps: 0,
    bruising: 0,
    obesity: 0,
    swollen_legs: 0,
    swollen_blood_vessels: 0,
    puffy_face_and_eyes: 0,
    enlarged_thyroid: 0,
    brittle_nails: 0,
    excessive_hunger: 0,
    drying_and_tingling_lips: 0,
    slurred_speech: 0,
    knee_pain: 0,
    hip_joint_pain: 0,
    muscle_weakness: 0,
    stiff_neck: 0,
    swelling_joints: 0,
    movement_stiffness: 0,
    spinning_movements: 0,
    loss_of_balance: 0,
    unsteadiness: 0,
    weakness_of_one_body_side: 0,
    loss_of_smell: 0,
    bladder_discomfort: 0,
    foul_smell_of_urine: 0,
    continuous_feel_of_urine: 0,
    passage_of_gases: 0,
    internal_itching: 0,
    depression: 0,
    irritability: 0,
    muscle_pain: 0,
    red_spots_over_body: 0,
    belly_pain: 0,
    abnormal_menstruation: 0,
    watering_from_eyes: 0,
    increased_appetite: 0,
    polyuria: 0,
    lack_of_concentration: 0,
    visual_disturbances: 0,
    receiving_blood_transfusion: 0,
    stomach_bleeding: 0,
    distention_of_abdomen: 0,
    history_of_alcohol_consumption: 0,
    blood_in_sputum: 0,
    prominent_veins_on_calf: 0,
    palpitations: 0,
    painful_walking: 0,
    pus_filled_pimples: 0,
    blackheads: 0,
    scurring: 0,
    skin_peeling: 0,
    inflammatory_nails: 0,
    blister: 0,
    red_sore_around_nose: 0,
  });

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

  useEffect(() => {
    console.log(symptoms);
  }, [symptoms]);

  useEffect(() => {
    console.log(symptomArr);
  }, [symptomArr]);

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

  let specDoc;
  const sumbitHandler = async () => {
    // API LOGIC
    setOpen(true);
    const apiData = await api.symptomsToML(symptoms);
    setSpecialDoc(apiData.specialist);
    const xData = await api.searchDoctorBySpecialization(
      apiData.specialist,
      true
    );
    console.log(xData);
    // return <MapNew />
  };

  const handleClose = () => {
    history.push({
      pathname: "/user/doctors",
      search: `?query=${specialDoc}`,
    });
  };

  const cancelModal = () => {
    setOpen(false);
  }

  //   const classes = useStyles();

  return (
    <div>
      <div>
        <div style={{ margin: 8 }}>
          <p>Predict doctor specialists with just some clicks!</p>
        </div>

        <div>
          {symptoms &&
            Object.keys(symptoms).map((key) => (
              <Button
                color={symptoms[key] == 0 ? "primary" : "success"}
                onClick={() => onClickHandler(key)}
                style={{
                  margin: 8,
                }}
              >
                {key}
              </Button>
            ))}
        </div>
      </div>
      <div>
        <Button
          color="warning"
          style={{
            margin: 8,
            marginTop: 32,
            marginLeft: "40%",
            width: 200,
            fontSize: 15,
          }}
          onClick={() => {
            sumbitHandler();
          }}
        >
          Submit
        </Button>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={modalStyle}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Considering your symptoms, you should cosult a <span>{specialDoc}</span>
            </Typography>
            <Button
              color="warning"
              onClick={() => {
                handleClose();
              }}
              style={{
                marginRight: "10%",
                marginTop: "10px"
              }}
            >
              View All Doctors
            </Button>
            <Button
              color="warning"
              onClick={() => {
                cancelModal();
              }}
              style={{
                marginTop: "10px"
              }}
            >
              Cancel
            </Button>
            {/* <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              Your profile has been updated successfully
            </Typography> */}
          </Box>
        </Modal>
      </div>
    </div>
  );
};

export default Symptoms;
