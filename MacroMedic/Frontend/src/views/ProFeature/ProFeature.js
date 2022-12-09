import React from 'react';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import api from "../../utils/api";
import TextField from '@material-ui/core/TextField';

import {
    BoxContainer,
    FormContainer,
    SubmitButton,
  } from "../Login/accountBox/common";

const useStyles = makeStyles((theme) => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));
export default function ProFeature() {
  const [value, setValue] = React.useState('a');
  const [upload,setUpload]=React.useState(false);
  const [report,setReport]=React.useState(null);
  const classes = useStyles();
  const handleChange = (event) => {
    setValue(event.target.value);
  };

  return (
    <BoxContainer>
      <FormContainer>
      <FormLabel component="legend">Choose the ailments you have been suffering from</FormLabel>
      <RadioGroup aria-label="gender" name="gender1" value={value} onChange={handleChange}>
        <FormControlLabel value="a" control={<Radio />} label="Diabetes" />
        <FormControlLabel value="b" control={<Radio />} label="Cholestrol" />
        <FormControlLabel value="c" control={<Radio />} label="Blood Pressure" />
      </RadioGroup>
      </FormContainer>
      
    
      
      
      <SubmitButton
        type="submit"
        onClick={()=>setUpload(true)}
    
      >
        Submit
      </SubmitButton>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={upload}
        onClose={()=>setUpload(false)}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={upload}>
          <div className={classes.paper}>
            <h2 >Upload Reports</h2>
            <input
                placeholder="Update Image"
                type="file"
                onChange={async (e) => {
                  setReport(e.target.files[0]);
                  console.log(report);
                //   await api.uploadImage(userData._id, e.target.files[0]);
                }}
              />
            
          </div>
        </Fade>
      </Modal>
      {report?(<TextField id="outlined-basic" label="Outlined" variant="outlined" defaultValue="summary of report" />):(<></>)}

     </BoxContainer>
    // <FormControl component="fieldset">
    //   <FormLabel component="legend">Options</FormLabel>
    //   <RadioGroup aria-label="gender" name="gender1" value={value} onChange={handleChange}>
    //     <FormControlLabel value="a" control={<Radio />} label="A" />
    //     <FormControlLabel value="b" control={<Radio />} label="B" />
    //     <FormControlLabel value="c" control={<Radio />} label="C" />
    //   </RadioGroup>
    // </FormControl>
  );
}
