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

export function ForgotPasswordForm(props) {
  const { switchToSignin } = useContext(AccountContext);
  const [email, setEmail] = useState();
  const history = useHistory();
  const [ visible, setVisible ] = useState(false);

  return (
    <BoxContainer>
      <Marginer direction="vertical" margin="1em" />
      <FormContainer>
        <Input
          type="email"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />
      </FormContainer>
      <Marginer direction="vertical" margin="2em" />
      <SubmitButton
        type="submit"
        onClick={async () => {
            let data = {}
            try {
              data = await api.forgotPassword(email);
            } catch (error) {
              console.log(error);
            }
            if (data.status===200) {
              window.location.reload(false);
            }
        }}
      >
        Submit
      </SubmitButton>
      <Marginer direction="vertical" margin="1em" />
      <MutedLink href="#">
        <BoldLink href="#" onClick={switchToSignin}>
            Back To Sign In
        </BoldLink>
      </MutedLink>
    </BoxContainer>
  );
}
