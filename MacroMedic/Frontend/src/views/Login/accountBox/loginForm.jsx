import React, { useContext, useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';
// import Modal from '@material-ui/core/Modal';
// import {Button,TextField} from '@material-ui/core';
// import { Card,Grid } from '@material-ui/core';
import {
  BoldLink,
  BoxContainer,
  FormContainer,
  Input,
  MutedLink,
  SubmitButton,
} from "./common";
import { Marginer } from "../marginer";
import { AccountContext } from "./accountContext";
import api from "../../../utils/api";
import { GlobalContext } from "../../../GlobalContext";
import Modal from "components/Modal/Modal";

import "../login.css";
import axios from "axios";

// const useStyles = makeStyles((theme) => ({
//   paper: {
//     position: 'absolute',
//     width: 400,
//     backgroundColor: theme.palette.background.paper,
//     borderRadius: '5px',
//     boxShadow: theme.shadows[5],
//     padding: theme.spacing(2, 4, 3),
//   },
//   form: {
//     display: "flex",
//     flexDirection: "column",
//     justifyContent: "center",
//     textAlign: "center",
//   },
// }));

// function rand() {
//   return Math.round(Math.random() * 20) - 10;
// }

// function getModalStyle() {
//   const top = 50 + rand();
//   const left = 50 + rand();

//   return {
//     top: `${top}%`,
//     left: `${left}%`,
//     transform: `translate(-${top}%, -${left}%)`,
//   };
// }

export function LoginForm(props) {
  // const classes = useStyles();
  const history = useHistory();
  const { switchToSignup, switchToForgotPassword } = useContext(AccountContext);

  const { user } = useContext(GlobalContext);
  const [userData, setUserData] = user;
  const [ visible, setVisible ] = useState(false);
  // const [open, setOpen] = React.useState(false);
  // const [modalStyle] = React.useState(getModalStyle);
  // const [email,setEmail] = React.useState();

  // const handleOpen = () => {
  //   setOpen(true);
  // };

  // const handleClose = () => {
  //   setOpen(false);
  // };

  useEffect(() => {
    console.log(visible);
  }, [visible]);  

  // const body = (
  //   <div style={modalStyle} className={classes.paper}>
  //   <p id="simple-modal-description" className={classes.modalLabel}>
  //   <Grid item xs={12} sm={12} md={12}>
  //     <form 
  //       className={classes.form} 
  //       onSubmit={async () => {
  //         let data = {}
  //         try {
  //           data = await api.forgotPassword(email);
  //         } catch (error) {
  //           console.log(error);
  //           handleOpen();
  //         }
  //       }}
  //       >
  //         <div>Forgot Password?</div>
  //         <p>On submitting your email, we'll send you a link to get back into your account.</p>
  //         <small>Please Check Your Spam Box If Required</small>
  //         <div className={classes.textfield}>
  //           <TextField onChange={(e) => setEmail(e.target.value )} fullWidth id="standard-basic" label="Enter Email" />
  //         </div>
  //         <br />
  //         <Button variant="contained" color="secondary" type='submit' className={classes.btn} >Submit</Button>
  //     </form>
  //   </Grid>
  //   </p>
  //   </div>
  // );

  return (
    <BoxContainer>
      <FormContainer>
        <Input
          type="email"
          placeholder="Email"
          value={userData.email}
          onChange={(e) => setUserData({ ...userData, email: e.target.value })}
        />
        <Input
          type="password"
          placeholder="Password"
          value={userData.password}
          onChange={(e) =>
            setUserData({ ...userData, password: e.target.value })
          }
        />
      </FormContainer>
      <Marginer direction="vertical" margin={10} />
      <MutedLink href="#">
        <BoldLink href="#" onClick={switchToForgotPassword}>
          Forget your password?
        </BoldLink>
      </MutedLink>
      {/*<Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        {body}
      </Modal>*/}
      
      <Marginer direction="vertical" margin="1.6em" />
      <SubmitButton
        type="submit"
        onClick={async () => {
          let data = {};
          try {
            data = await api.authUser(userData.email, userData.password);
            setUserData(data);
          } catch (error) {
            console.log(error);
            // window.alert("Invalid Credentials");
            setVisible(true);
          }

          if (userData.email && data.token) {
            history.push("/user/dashboard");
          }
        }}
      >
        Signin
      </SubmitButton>
      <Marginer direction="vertical" margin="1em" />
      <MutedLink href="#">
        Don't have an account?{" "}
        <BoldLink href="#" onClick={switchToSignup}>
          Signup
        </BoldLink>
      </MutedLink>
      <Modal status={visible} setVisible={setVisible} title="Alert" text="Invalid Credentials, kindly enter valid credentials!" />
    </BoxContainer>
  );
}
