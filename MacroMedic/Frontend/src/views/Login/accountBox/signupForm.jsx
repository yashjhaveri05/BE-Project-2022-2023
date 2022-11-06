import React, { useContext, useState } from "react";
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
import { GlobalContext } from "../../../GlobalContext";
import api from "utils/api";
import { useHistory } from "react-router-dom";
import Modal from "components/Modal/Modal";

import "../login.css";

export function SignupForm(props) {
  const { switchToSignin } = useContext(AccountContext);

  const { user } = useContext(GlobalContext);
  const [userData, setUserData] = user;

  const history = useHistory();
  const [ visible, setVisible ] = useState(false);

  return (
    <BoxContainer>
      <FormContainer>
        <Input
          type="text"
          placeholder="Full Name"
          onChange={(e) => setUserData({ ...userData, name: e.target.value })}
        />
        <Input
          type="email"
          placeholder="Email"
          onChange={(e) => setUserData({ ...userData, email: e.target.value })}
        />
        <Input
          type="password"
          placeholder="Password"
          onChange={(e) =>
            setUserData({ ...userData, password: e.target.value })
          }
        />
        <Input type="password" placeholder="Confirm Password" />
        {/* <Input type="text" placeholder="Phone Number" />
        <Input type="text" placeholder="Role" />
        <Input type="text" placeholder="Age" />
        <Input type="text" placeholder="Sex" />
        <Input type="text" placeholder="Specialization" /> */}
      </FormContainer>
      <Marginer direction="vertical" margin={10} />
      <SubmitButton
        type="submit"
        onClick={async () => {
          let data = {};
          try {
            data = await api.registerUser(
              userData.name,
              userData.email,
              userData.password
            );
            setUserData(data);
          } catch (error) {
            console.log(error);
          }

          if (userData.email && data.token) {
            history.push("/user/dashboard");
          } else {
            setVisible(true)
          }
        }}
      >
        Signup
      </SubmitButton>
      <Marginer direction="vertical" margin="1em" />
      <MutedLink href="#">
        Already have an account?
        <BoldLink href="#" onClick={switchToSignin}>
          Signin
        </BoldLink>
      </MutedLink>
      <Modal status={visible} setVisible={setVisible} title="Alert" text="Account already exits, kindly enter another Email ID!" />
    </BoxContainer>
  );
}
