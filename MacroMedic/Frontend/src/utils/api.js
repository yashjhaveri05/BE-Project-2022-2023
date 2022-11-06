import axios from "axios";
import React, { useContext, useState } from "react";

const url = "http://localhost:5000/graphql";

const api = {
  authUser: async (email, password) => {
    const data = await axios.post(
      url,
      {
        query: `
              query {
                authUser(email: "${email}", password: "${password}"){
                  _id
                  name
                  phoneNo
                  email
                  password
                  role
                  age
                  sex
                  specialization
                  token
                }
              }
            `,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return data.data.data.authUser;
  },
  registerUser: async (
    name = "MacroMedic",
    // phoneNo = "1234567890",
    email = "macro@gmail.com",
    password = "1234"
    // isAdmin = false,
    // role = "Doctor",
    // sex = "M",
    // age = 18,
    // specialization = "Gen Phy"
  ) => {
    const data = await axios.post(
      url,
      {
        query: `
                mutation{
                  registerUser(userInput: {
                    name: "${name}",
                    password: "${password}",
                    phoneNo: "",
                    email: "${email}",
                    role: "patient",
                    sex: "",
                    age: ${0},
                    specialization: ""
                  }) {
                    _id
                  name
                  phoneNo
                  email
                  password
                  role
                  age
                  sex
                  specialization
                  token
                  }
                }
                `,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    console.log(data);
    return data.data.data.registerUser;
  },
  getDoctors: async () => {
    const data = await axios.post(
      url,
      {
        query: `
            query{
              getDoctors{
                _id
                name
                phoneNo
                email
                password
                role
                age
                sex
                specialization
                token
                about
                charge
                location {
                  latitude
                  longitude
                }
              }
            }
            `,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    console.log(data.data.data.getDoctors);
    return data.data.data.getDoctors;
  },
  searchParticularDoctor: async (docId) => {
    const data = await axios.post(
      url,
      {
        query: `
            query{
              searchParticularDoctor(userId: "${docId}"){
                _id
                name
                phoneNo
                email
                password
                role
                age
                sex
                specialization
                token
                about
                location {
                  latitude
                  longitude
                }
              }
            }
            `,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return data.data.data.searchParticularDoctor;
  },
  createAppointment: async (docId, date, description, pId) => {
    const data = await axios.post(
      url,
      {
        query: `
            mutation{
              createAppointment(appointmentInput: {
                doctorId: "${docId}",
                date: "${date}",
                description: "${description}",
                patientId: "${pId}",
              }){
                doctorId
                patientId
                _id
                date
                status
              }
            }
            `,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    console.log(data);
    return data.data.data.createAppointment;
  },
  uploadDoc: async (id, files) => {
    console.log(files);
    const postData = new FormData();
    postData.append("id", id);
    postData.append("doc", files);
    const data = await axios.post("http://localhost:5000/uploadDoc", postData);
    console.log(data);
    return data;
  },
  downloadDoc: async (id) => {
    const formData = JSON.stringify({ id: id });
    console.log("IDDDD");
    console.log(id);
    const data = await axios.post("http://localhost:5000/downloadDoc", {
      id: id,
    });
    console.log(data);
    return data;
  },
  searchDoctorByName: async (searchTerm) => {
    const data = await axios.post(
      url,
      {
        query: `
            query{
              searchDoctorByName(searchTerm: "${searchTerm}"){
                _id
                name
                phoneNo
                email
                password
                role
                age
                sex
                specialization
                charge
                token
                about
                location {
                  latitude
                  longitude
                }
              }
            }
            `,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return data.data.data.searchDoctorByName;
  },
  searchDoctorBySpecialization: async (searchTerm, status) => {
    const data = await axios.post(
      url,
      {
        query: `
            query{
              searchDoctorBySpecialization(searchTerm: "${searchTerm}", status: ${status}){
                _id
                name
                phoneNo
                email
                password
                role
                age
                sex
                specialization
                charge
                token
                about
                location {
                  latitude
                  longitude
                }
              }
            }
            `,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return data.data.data.searchDoctorBySpecialization;
  },
  updateUserProfile: async (
    ID,
    name,
    phoneNo,
    email,
    password,
    sex,
    age,
    about,
    lat,
    lng
  ) => {
    const data = await axios.post(
      url,
      {
        query: `
              mutation {
                updateUserProfile(userInput: {
                  _id: "${ID}"
                  name: "${name}",
                  phoneNo: "${phoneNo}",
                  email: "${email}",
                  password: "${password}",
                  age: ${age},
                  sex: "${sex}",
                  about: "${about}",
                  location: {
                    latitude: ${lat}
                    longitude: ${lng}
                  }
                }) {
                  name
                  phoneNo,
                  email,
                  password,
                  age,
                  sex,
                  about,
                  location {
                    latitude
                    longitude
                  }
                }
              }
              `,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return data.data.data.updateUserProfile;
  },
  authUser: async (email, password) => {
    const data = await axios.post(
      url,
      {
        query: `
          query {
            authUser(email: "${email}", password: "${password}"){
              _id
              name
              phoneNo
              email
              password
              role
              age
              sex
              specialization
              token
            }
          }
        `,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return data.data.data.authUser;
  },
  getUserById: async (ID) => {
    const data = await axios.post(
      url,
      {
        query: `
          query {
            getUserById(userId: "${ID}") {
              name
              phoneNo
              email
              password
              role
              age
              sex
              about
              image
              location {
                latitude
                longitude
              }
              charge
              specialization
              averageRating
              reviews {
                comment
                rating
                patient
                date
              }
            }
          }
        `,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    console.log("0000");
    console.log(data.data.data.getUserById);
    return data.data.data.getUserById;
  },
  viewAppointment: async (ID) => {
    const data = await axios.post(
      url,
      {
        query: `
          query {
            viewAppointment(user_id: "${ID}") {
              doctorId {
                name
                image
                specialization
              }
              description
              date
              status
              description
              report
            }
          }
        `,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return data.data.data.viewAppointment;
  },
  cancelAppointment: async (ID) => {
    console.log("ID: ", ID);
    const data = await axios.post(
      url,
      {
        query: `
          query {
            cancelAppointment(appointment_id: "${ID}") {
              msg
            }
          }
      `,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    console.log(data);
    return data.data.data.cancelAppointment.msg;
  },
  getAllAppointments: async (ID) => {
    const data = await axios.post(
      url,
      {
        query: `
          query {
            getAllUpcomingAppointments(user_id: "${ID}") {
              _id
              patientId{
                name
                _id
              }
              doctorId {
                name
                image
                specialization
                _id
              }
              description
              date
              status
              report
            }
          }
        `,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return data.data.data.getAllUpcomingAppointments;
  },
  getAllPreviousAppointments: async (ID) => {
    const data = await axios.post(
      url,
      {
        query: `
        query{
          getAllPreviousAppointments(user_id: "${ID}") {
            _id
            patientId{
              _id
              name
            }
            doctorId {
              name
              phoneNo
              password
              age
              sex
              specialization
              token
              about
              image
              _id
            }
            status
            description
            report
            date
          }
        }
        `,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return data.data.data.getAllPreviousAppointments;
  },
  getStatsUser: async () => {
    const data = await axios.post(
      url,
      {
        query: `
          query{
            getStatistics_Users 
          }
      `,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return data.data.data.getStatistics_Users;
  },
  getStatsTotalDocs: async () => {
    const data = await axios.post(
      url,
      {
        query: `
          query{
            getStatistics_Doctors
          }
      `,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return data.data.data.getStatistics_Doctors;
  },
  getAppointmentsStats: async () => {
    const data = await axios.post(
      url,
      {
        query: `
          query{
            getStatistics_Appointment
          }
        `,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return data.data.data.getStatistics_Appointment;
  },
  getSuccessStats: async () => {
    const data = await axios.post(
      url,
      {
        query: `
        query{
          getStatistics_Successful_App
        }
        `,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return data.data.data.getStatistics_Successful_App;
  },
  updateProfile_Patient: async (id, user) => {
    console.log("User", user);
    console.log("ID", id);
    const data = await axios.post(
      url,
      {
        query: `
        mutation{
          updateUserProfile(userInput: {
            _id: "${id}",
            name: "${user.name}"
            age: ${user.age}
            sex:"${user.sex}"
            phoneNo:"${user.phoneNo}"
            about:"${user.about}"
          }) {
            _id
            name
            age
            sex
            phoneNo
            about
          }
        }
        `,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return data.data.data.updateUserProfile;
  },

  updateProfile_Doctor: async (id, user) => {
    console.log("Id", user);
    const data = await axios.post(
      url,
      {
        query: `
        mutation{
          updateUserProfile(userInput: {
            _id: "${id}",
            name: "${user.name}"
            age: ${user.age}
            sex: "${user.sex}"
            phoneNo: "${user.phoneNo}"
            about: "${user.about}"
            specialization: "${user.specialization}"
            charge: ${user.charge}
          }) {
            _id
            name
            age
            sex
            phoneNo
            about
            specialization
            charge
          }
        }
        `,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return data.data.data.updateUserProfile;
  },
  dashboardChart: async () => {
    const data = await axios.post(
      url,
      {
        query: `
        query {
          graph {
            monday
            tuesday
            wednesday
            thursday
            friday
            saturday
            sunday
          }
        }
        `,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return data.data.data.graph;
  },
  forgotPassword: async (email) => {
    const data = axios.post(
      url,
      {
        query: `
          query{
            forgotPassword(email: "${email}") {
              msg
            }
          }
        `,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return data;
  },
  isValid: async (date, docId) => {
    console.log(date);
    const data = axios.post(
      url,
      {
        query: `
          query{
            isValid(IsValid: {
              date: "${date}"
              doctorId: "${docId}"
            }) {
              msg
            }
          }
        `,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return data;
  },
  uploadImage: async (id, img) => {
    console.log(img);
    const postData = new FormData();
    postData.append("id", id);
    postData.append("doc", img);
    const data = await axios.post(
      "http://localhost:5000/uploadImage",
      postData
    );
    console.log(data);
    console.log("File uploded");
    return data;
  },
  symptomsToML: async (symptomsDict) => {
    const data = symptomsDict;

    var config = {
      method: "post",
      url: "http://127.0.0.1:8000/ml/predict/",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        // 'Cookie': 'csrftoken=F6L97M9DobQPv9Zzg8y9Kz07XDrGiNTgrCefIVzqhXOpGC0vVbL3CNFgX1KWExOj'
      },
      data: data,
    };

    let receivedData = {};
    receivedData = axios(config)
      .then(function (response) {
        receivedData = response.data;
        // console.log(response.data)
        return receivedData;
      })
      .catch(function (error) {
        console.log(error);
      });

    // const xData = await axios.post(config);
    // console.log(xData);

    // console.log(receivedData);
    // console.log("ML receivedData");
    return receivedData;
  },
  fetchRating: async (comment) => {
    var data = JSON.stringify({
      "string": comment
    });

    var config = {
      method: 'post',
      url: 'http://127.0.0.1:8000/nlp/ratings/',
      headers: { 
        'Content-Type': 'application/json'
      },
      data : data
    };

    var response = 0;

    const res = await axios(config)
    // .then(function (response) {
    //   console.log(response.data.rating);
    //   response = response.data.rating;
    // })
    // .catch(function (error) {
    //   console.log(error);
    // });
    return res.data.rating;
  },
  addReview: async (doctorId, rating, comment, patientId) => {
    const date =
      new Date().getDate() +
      "-" +
      (new Date().getMonth() + 1) +
      "-" +
      new Date().getUTCFullYear();
    const data = await axios.post(
      url,
      {
        query: `
          mutation {
            addReview(doctorId: "${doctorId}", reviewInput:{
              comment:"${comment}",
              rating: ${rating},
              patient: "${patientId}",
              date: "${date}"
            }){
              msg
            }
          }
        `,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    console.log(data);
    console.log("File uploded");
    return data;
  },
};

export default api;
