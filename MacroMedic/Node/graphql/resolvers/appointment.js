const User = require("../../models/user.js");
const { loggedin, admin } = require("../../utils/verifyUser");
const generateToken = require("../../utils/generateToken.js");
const Appointment = require("../../models/appointment.js");
const Nexmo = require("nexmo");

const nexmo = new Nexmo({
  apiKey: process.env.NEXMO_API_KEY,
  apiSecret: process.env.NEXMO_API_SECRET,
});

const createAppointment = async (args, { req }) => {
  try {
    // if(loggedin(req)) {
    const patient = await User.findById(args.appointmentInput.patientId);
    const appointment = await Appointment.create({
      patientId: args.appointmentInput.patientId,
      doctorId: args.appointmentInput.doctorId,
      description: args.appointmentInput.description,
      date: args.appointmentInput.date,
      status: "Pending",
    });
    if (appointment) {
      // const from = "CodeX Clinic";
      // const to = process.env.PHONENO;
      // const text = "Your appointment has been booked";
      // nexmo.message.sendSms(from, to, text, function (error, result) {
      //   if (error) {
      //     console.log("ERROR", error);
      //   } else {
      //     console.log("RESULT", result);
      //     console.log(text);
      //   }
      // });
      return {
        ...appointment._doc,
      };
    } else {
      throw new Error("Some error occured! Please try again later");
    }
    // }
  } catch (err) {
    throw err;
  }
};

const viewAppointment = async (args, { req }) => {
  try {
    // if(loggedin(req)) {
    let d = new Date();
    let x = [];
    const user = await User.findById(args.user_id);
    if (user.role == "patient") {
      const appointment = await Appointment.find({
        patientId: user._id,
      }).populate("doctorId");
      if (appointment) {
        appointment.forEach((element) => {
          let status = "";
          let date = element.date;
          let a = date.substring(0, 4);
          let b = date.substring(5, 7);
          let c = date.substring(8, 10);
          let y = date.substring(11, 13);
          let z = date.substring(14, 16);
          let x = y + z;
          let time = d.getHours().toString() + d.getMinutes().toString();
          if (element.status == "Visited") {
            element = Appointment.findByIdAndUpdate(element._id, {
              $set: { status: "Visited" },
            });
          } else if (element.status == "Canceled") {
            element = Appointment.findByIdAndUpdate(element._id, {
              $set: { status: "Canceled" },
            });
          } else if (
            a == d.getFullYear() &&
            b == d.getMonth() + 1 &&
            c == d.getDate() &&
            +x + +100 > time
          ) {
            element = Appointment.findByIdAndUpdate(element._id, {
              $set: { status: "Pending" },
            });
          } else {
            element = Appointment.findByIdAndUpdate(element._id, {
              $set: { status: "Not Visited" },
            });
          }
        });
        return appointment;
      } else {
        throw new Error("No appointments found!!");
      }
    } else {
      const appointment = await Appointment.find({ doctorId: user_id });
      if (appointment) {
        appointment.forEach((element) => {
          let date = element.date;
          let a = date.substring(0, 4);
          let b = date.substring(5, 7);
          let c = date.substring(8, 10);
          let y = date.substring(11, 13);
          let z = date.substring(14, 16);
          let x = y + z;
          let time = d.getHours().toString() + d.getMinutes().toString();
          if (element.status == "Visited") {
            element = Appointment.findByIdAndUpdate(element._id, {
              $set: { status: "Visited" },
            });
          } else if (element.status == "Canceled") {
            element = Appointment.findByIdAndUpdate(element._id, {
              $set: { status: "Canceled" },
            });
          } else if (
            a == d.getFullYear() &&
            b == d.getMonth() + 1 &&
            c == d.getDate() &&
            +x + +100 > time
          ) {
            element = Appointment.findByIdAndUpdate(element._id, {
              $set: { status: "Pending" },
            });
          } else {
            element = Appointment.findByIdAndUpdate(element._id, {
              $set: { status: "Not Visited" },
            });
          }
        });
        return appointment;
      } else {
        throw new Error("No appointments found!!");
      }
    }
    // }
  } catch (err) {
    throw err;
  }
};

const getAllAppointments = async (args, { req }) => {
  try {
    const user = await User.findById(args.user_id);
    await updateAppointmentStatus();
    if (user.role == "patient") {
      const appointment = Appointment.find({
        patientId: args.user_id,
      }).populate("doctorId");
      if (appointment) {
        return appointment;
      }
    } else {
      const appointment = Appointment.find({ doctorId: args.user_id }).populate(
        "patientId"
      );
      if (appointment) {
        return appointment;
      }
    }
  } catch (err) {
    throw err;
  }
};

const updateAppointmentStatus = async () => {
  try {
    let appointments = await Appointment.find({ status: "Pending" });
    appointments.forEach((appointment) => {
      var app_date = new Date(appointment.date);
      var date = new Date();
      app_date.setHours(app_date.getHours() + 1);
      if (app_date < date && appointment.status == "Pending") {
        appointment.status = "Not Visited";
        appointment.save();
      }
    });
  } catch (err) {
    throw err;
  }
};

const getAllUpcomingAppointments = async (args, { req }) => {
  try {
    const user = await User.findById(args.user_id);
    await updateAppointmentStatus();
    if (user.role == "patient") {
      const appointment = Appointment.find({
        patientId: args.user_id,
        status: "Pending",
      }).populate("doctorId patientId");
      if (appointment) {
        return appointment;
      }
    } else {
      const appointment = Appointment.find({
        doctorId: args.user_id,
        status: "Pending",
      }).populate("patientId doctorId");
      if (appointment) {
        return appointment;
      }
    }
  } catch (err) {
    throw err;
  }
};

const getAllPreviousAppointments = async (args, { req }) => {
  try {
    const user = await User.findById(args.user_id);
    await updateAppointmentStatus();
    if (user.role == "patient") {
      const appointment = Appointment.find({
        patientId: args.user_id,
        status: { $ne: "Pending" },
      }).populate("doctorId");
      if (appointment) {  
        return appointment;
      }
    } else {
      const appointment = Appointment.find({
        doctorId: args.user_id,
        status: { $ne: "Pending" },
      }).populate("patientId");
      if (appointment) {    
        return appointment;   
      }
    }
  } catch (err) {
    throw err;
  }
};

const cancelAppointment = async (args, { req }) => {
  try {
    // if(loggedin(req)) {
    const appointment = await Appointment.findById(args.appointment_id);
    if (appointment) {
      appointment.status = "Canceled";
      const updatedAppointment = await appointment.save();
      if (updatedAppointment) {
        // const from = 'CodeX Clinic';
        // const to = process.env.PHONENO;
        // const text = 'Your appointment has been canceled';
        // nexmo.message.sendSms(from, to, text,
        //     function(error, result) {
        //     if(error) {
        //         console.log("ERROR", error)
        //     }
        //     else {
        //         console.log("RESULT", result)
        //         console.log(text);
        //     }
        // });
        return { msg: "Appointment canceled!!" };
      } else {
        return { msg: "Some error occures! Please try again later" };
      }
    } else {
      throw new Error("No appointments found!!");
    }
    // }
  } catch (err) {
    throw err;
  }
};

const changeStatus = async (args, { req }) => {
  try {
    // if(loggedin(req)) {
    const appointment = await Appointment.findById(args.appointment_id);
    if (appointment) {
      appointment.status = "Visited";
      const updatedAppointment = await appointment.save();
      if (updatedAppointment) {
        // const from = 'CodeX Clinic';
        // const to = process.env.PHONENO;
        // const text = 'You have visited your appointment';
        // nexmo.message.sendSms(from, to, text,
        //     function(error, result) {
        //     if(error) {
        //         console.log("ERROR", error)
        //     }
        //     else {
        //         console.log("RESULT", result)
        //         console.log(text);
        //     }
        // });
        return { msg: "Appointment visited!!" };
      } else {
        return { msg: "Some error occures! Please try again later" };
      }
    } else {
      throw new Error("No appointments found!!");
    }
    // }
  } catch (err) {
    throw err;
  }
};

const getStatistics_Appointment = async (args, { req }) => {
  try {
    let appoinments = await Appointment.find();
    return appoinments.length;
  } catch (err) {
    throw err;
  }
};

const getStatistics_Successful_App = async (args, { req }) => {
  try {
    let appoinments = await Appointment.find({ status: "Visited" });
    return appoinments.length;
  } catch (err) {
    throw err;
  }
};

const isValid = async (args, { req }) => {
  try {
    let state = "true";
    let appointments = await Appointment.find({
      doctorId: args.IsValid.doctorId,
      status: "Pending",
    });
    let req_date = new Date(args.IsValid.date);
    let today = new Date();
    if (req_date < today) {
      return { msg: "false" };
    }
    appointments.forEach((elem) => {
      let bef_date = new Date(elem.date);
      let after_date = new Date(elem.date);
      bef_date.setMinutes(bef_date.getMinutes() - 30);
      after_date.setMinutes(after_date.getMinutes() + 30);
      if (req_date > bef_date && req_date < after_date) {
        state = "false";
      }
    });
    return { msg: state };
  } catch (err) {
    throw err;
  }
};

const graph = async (args, { req }) => {
  try {
    let curr = new Date();
    let first = curr.getDate() - curr.getDay() + 1;
    let a = new Array(7).fill(0);
    let apps = await Appointment.find({});
    for (let i = 0; i < 7; i++) {
      let count = 0;
      new_day = first + i;
      let day = new Date(curr.setDate(new_day)).toUTCString();
      day = new Date(day);
      apps.forEach((app) => {
        if (
          app.createdAt.getDate() === day.getDate() &&
          app.createdAt.getMonth() === day.getMonth() &&
          app.createdAt.getFullYear() === day.getFullYear()
        ) {
          count++;
        }
      });
      a[i] = count;
    }
    return {
      monday: a[0],
      tuesday: a[1],
      wednesday: a[2],
      thursday: a[3],
      friday: a[4],
      saturday: a[5],
      sunday: a[6],
    };
  } catch (err) {
    throw err;
  }
};

module.exports = {
  createAppointment,
  viewAppointment,
  cancelAppointment,
  changeStatus,
  getAllAppointments,
  getAllPreviousAppointments,
  getStatistics_Appointment,
  getStatistics_Successful_App,
  getAllUpcomingAppointments,
  isValid,
  graph,
};
