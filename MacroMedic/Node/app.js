const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const { graphqlHTTP } = require("express-graphql");
const app = express();
const graphqlschema = require("./graphql/schema/index.js");
const graphqlResolvers = require("./graphql/resolvers/index.js");
const connectDB = require("./config/db.js");
const cors = require("cors");
app.use(express.json());
const paymentRouter = require("./routes/paymentRouter.js");
const schedule = require("node-schedule");

dotenv.config();

connectDB();

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.use(express.json());
app.use(express.urlencoded());
app.use(cors({ credentials: true }));
app.use(cors());

app.use(paymentRouter);
app.use(
  "/graphql",
  graphqlHTTP((req, res, graphQLParams) => {
    return {
      schema: graphqlschema,
      rootValue: graphqlResolvers,
      context: { req },
      graphiql: true,
    };
  })
);

let server = require("http").Server(app);
let io = require("socket.io")(server);
let stream = require("./ws/stream");
let path = require("path");
let favicon = require("serve-favicon");

app.use(favicon(path.join(__dirname, "favicon.ico")));
app.use("/assets", express.static(path.join(__dirname, "assets")));
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

const attendedMeet = async (id) => {
  try {
    let appointment = await Appointment.findById(id);
    if (appointment) {
      appointment.status = "Visited";
      await appointment.save();
    } else {
      console.log("n");
    }
  } catch (err) {
    console.log(err);
    throw err;
  }
};

app.get("/", (req, res) => {
  let id = req.originalUrl.substring(7);
  console.log(id);
  let date = new Date();
  date.setHours(date.getHours() + 1);
  const job = schedule.scheduleJob(date, function () {
    attendedMeet(id);
  });
  res.sendFile(__dirname + "/index.html");
});

io.of("/stream").on("connection", stream);

const multer = require("multer");
let DIR = "./uploads/";
const { uuid } = require("uuidv4");
const User = require("./models/user.js");
const Appointment = require("./models/appointment.js");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, DIR);
  },
  filename: (req, file, cb) => {
    const fileName = file.originalname.toLowerCase().split(" ").join("-");
    cb(null, uuid() + "-" + fileName);
  },
});
//multer middleware
let upload = multer({
  storage: storage,
  fileFilter: function (req, file, cb) {
    checkFileType(file, cb);
  },
});
function checkFileType(file, cb) {
  const filetypes = /pdf|jpg|png|jpeg/;
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = filetypes.test(file.mimetype);
  if (mimetype && extname) {
    return cb(null, true);
  } else {
    cb("Error: Files Only!");
  }
}

app.post("/uploadDoc", upload.single("doc"), async (req, res) => {
  const { id } = req.body;
  const appointment = await Appointment.findById(id);
  if (appointment) {
    appointment.report = `/${req.file.path}`;
    const resp = await appointment.save();
    if (resp) {
      console.log("success");
    } else {
      console.log("err");
    }
  }
});

app.post("/uploadImage", upload.single("doc"), async (req, res) => {
  const { id } = req.body;
  console.log(id);
  const user = await User.findById(id);
  if (user) {
    console.log(req.file);
    user.image = `/${req.file.path}`;
    const resp = await user.save();
    if (resp) {
      console.log("Successfully uploaded image");
    } else {
      console.log("Some err has occured!!");
    }
  }
});

const PORT = process.env.PORT || 5000;

server.listen(
  PORT,
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold
  )
);

module.exports = {
  server,
};
