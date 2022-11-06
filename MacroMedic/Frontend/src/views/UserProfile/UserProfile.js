import React, { useState, useEffect, useContext } from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import CustomInput from "components/CustomInput/CustomInput.js";
import Button from "components/CustomButtons/Button.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardAvatar from "components/Card/CardAvatar.js";
import CardBody from "components/Card/CardBody.js";
import CardFooter from "components/Card/CardFooter.js";
import MyMap from "components/Map/map2.js";
import { GlobalContext } from "../../GlobalContext";
import api from "../../utils/api";
import Modal from "@material-ui/core/Modal";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";

import avatar from "assets/img/faces/marc.jpg";
import { useSprings } from "react-spring";

const styles = {
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
};

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

const useStyles = makeStyles(styles);

export default function UserProfile() {
  const { user } = useContext(GlobalContext);
  const [userData, setUserData] = user;
  const [users, setUsers] = React.useState({});
  const [open, setOpen] = useState(false);
  const [pickUp, setPickUp] = useState({
    address: "",
    lat: "",
    lng: "",
  });
  const [image, setImage] = useState();
  // const [cords, setCords] = useState({
  //   address: "",
  //   lat: "",
  //   lng: "",
  // });
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  React.useEffect(() => {
    let data = {};
    const mf = async () => {
      try {
        data = await api.getUserById(userData._id);
      } catch (err) {
        console.log(err);
      }
      console.log("Data");
      console.log(data);
      setUsers(data);
    };
    mf();
  }, [userData]);
  const [bool, setBool] = useState(false);
  useEffect(() => {
    console.log("0000");
    console.log(users);
    // console.log(users.location ? users.location.longitude : "");
    setPickUp({
      address: "",
      lat: users.location ? users.location.latitude : "",
      lng: users.location ? users.location.longitude : "",
    });
    setBool(!bool);
  }, [users]);
  const initials = users;
  const [updated, setUpdate] = useState(initials);
  let imageUrl = users.image;
  useEffect(() => {
    console.log("pickup", pickUp);
    console.log(imageUrl);
  }, [bool]);

  const dropInit = { address: "", lat: 0, lng: 0 };
  const [drop, setDrop] = useState(dropInit);

  const [mapInit, setMapInit] = useState(false);

  const classes = useStyles();

  return (
    <div>
      <GridContainer>
        <GridItem xs={12} sm={12} md={8}>
          <Card>
            <CardHeader color="primary">
              <h4 className={classes.cardTitleWhite}>Your Profile</h4>
              <p className={classes.cardCategoryWhite}>Update your profile</p>
            </CardHeader>
            <CardBody>
              <GridContainer>
                <GridItem xs={12} sm={12} md={6}>
                  <CustomInput
                    labelText="Name"
                    id="company-disabled"
                    formControlProps={{
                      fullWidth: true,
                    }}
                    value={users.name ? users.name : ""}
                    // defaultValue={users && users.name}
                    onChange={(e) =>
                      setUsers({ ...users, name: e.target.value })
                    }
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={3}>
                  <CustomInput
                    labelText="Age"
                    id="city"
                    formControlProps={{
                      fullWidth: true,
                    }}
                    value={users.age ? users.age : ""}
                    onChange={(e) =>
                      setUsers({ ...users, age: e.target.value })
                    }
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={3}>
                  {users && (
                    <CustomInput
                      labelText="Sex"
                      id="country"
                      formControlProps={{
                        fullWidth: true,
                      }}
                      // value={}
                      value={users.sex ? users.sex : ""}
                      onChange={(e) =>
                        setUsers({ ...users, sex: e.target.value })
                      }
                    />
                  )}
                </GridItem>
              </GridContainer>
              <br />
              <GridContainer>
                <GridItem xs={12} sm={12} md={6}>
                  {users && (
                    <CustomInput
                      labelText="Phone Number"
                      id="username"
                      formControlProps={{
                        fullWidth: true,
                      }}
                      // value={}
                      value={users.phoneNo ? users.phoneNo : ""}
                      onChange={(e) =>
                        setUsers({ ...users, phoneNo: e.target.value })
                      }
                    />
                  )}
                </GridItem>
                <GridItem xs={12} sm={12} md={6}>
                  {users && (
                    <CustomInput
                      labelText="Email address"
                      id="email-address"
                      formControlProps={{
                        fullWidth: true,
                      }}
                      // value={}
                      value={users.email ? users.email : ""}
                      onChange={(e) =>
                        setUsers({ ...users, email: e.target.value })
                      }
                    />
                  )}
                </GridItem>
                {/* <GridItem xs={12} sm={12} md={6}>
                  {users && (
                    <CustomInput
                      labelText="Latitude"
                      id="email-address"
                      formControlProps={{
                        fullWidth: true,
                      }}
                      // value={}
                      value={users.location ? users.location.latitude : ""}
                      onChange={(e) =>
                        setUsers({
                          ...users,
                          location: {
                            ...users.location,
                            latitude: e.target.value,
                          },
                        })
                      }
                    />
                  )}
                </GridItem> */}
                {/* <GridItem xs={12} sm={12} md={6}>
                  {users && (
                    <CustomInput
                      labelText="Longitude"
                      id="email-address"
                      formControlProps={{
                        fullWidth: true,
                      }}
                      // value={}
                      value={users.email ? users.email : ""}
                      onChange={(e) =>
                        setUsers({ ...users, email: e.target.value })
                      }
                    />
                  )}
                </GridItem> */}
                {users && users.role == "doctor" ? (
                  <GridItem xs={12} sm={12} md={6}>
                    <CustomInput
                      labelText="Specialization"
                      id="postal-code"
                      formControlProps={{
                        fullWidth: true,
                      }}
                      value={users.specialization ? users.specialization : ""}
                      onChange={(e) =>
                        setUsers({ ...users, specialization: e.target.value })
                      }
                    />
                  </GridItem>
                ) : (
                  ""
                )}
                {users && users.role == "doctor" ? (
                  <GridItem xs={12} sm={12} md={6}>
                    <CustomInput
                      labelText="Consulting Charges"
                      id="postal-code"
                      formControlProps={{
                        fullWidth: true,
                      }}
                      value={users.charge ? users.charge : ""}
                      onChange={(e) =>
                        setUsers({ ...users, charge: e.target.value })
                      }
                    />
                  </GridItem>
                ) : (
                  ""
                )}
              </GridContainer>
              <br />
              <GridContainer>
                <GridItem xs={12} sm={12} md={12}>
                  {users && (
                    <CustomInput
                      labelText="About me"
                      id="about-me"
                      formControlProps={{
                        fullWidth: true,
                      }}
                      inputProps={{
                        multiline: true,
                        rows: 5,
                      }}
                      // value={}
                      value={users.about ? users.about : ""}
                      onChange={(e) =>
                        setUsers({ ...users, about: e.target.value })
                      }
                    />
                  )}
                </GridItem>
              </GridContainer>
            </CardBody>
            <br />
            <CardFooter>
              <Button
                onClick={async () => {
                  try {
                    users.role == "patient"
                      ? await api.updateProfile_Patient(userData._id, users)
                      : await api.updateProfile_Doctor(userData._id, users);
                  } catch (error) {
                    console.log(error);
                  }
                  handleOpen();
                }}
                color="primary"
              >
                Update Profile
              </Button>
              <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
              >
                <Box sx={modalStyle}>
                  <Typography
                    id="modal-modal-title"
                    variant="h6"
                    component="h2"
                  >
                    Success!
                  </Typography>
                  <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                    Your profile has been updated successfully
                  </Typography>
                </Box>
              </Modal>
            </CardFooter>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={12} md={4}>
          <Card profile>
            <CardAvatar profile>
              <div>
                <img src={`http://localhost:5000${users.image}`} alt="..." />
              </div>
            </CardAvatar>
            <CardBody profile>
              {/* <h6 className={classes.cardCategory}>CEO / CO-FOUNDER</h6> */}
              <h4 className={classes.cardTitle}>{users ? users.name : ""}</h4>
              <p className={classes.description}>{users ? users.about : ""}</p>
              <input
                placeholder="Update Image"
                type="file"
                onChange={async (e) => {
                  // setImage(e.target.files[0]);
                  // console.log(image);
                  await api.uploadImage(userData._id, e.target.files[0]);
                }}
              />
            </CardBody>
          </Card>

          <Card profile>
            {/* <CardBody profile> */}
            <MyMap
              pU={pickUp}
              // sPU={setPickUp}
              // d={drop}
              // sD={setDrop}
              // // iD={isDriver}
              // // sS={setStep}
              // mI={mapInit}
              // coords={cords}
            />
            {/* </CardBody> */}
          </Card>
        </GridItem>
      </GridContainer>
    </div>
  );
}
