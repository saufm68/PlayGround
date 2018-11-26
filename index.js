require("dotenv").config();
const express = require("express");
const methodOverride = require("method-override");
const cookieParser = require("cookie-parser");
const fileUpload = require("express-fileupload");
const cloudinary = require("cloudinary");
const db = require("./db");

//Initialize express app
const app = express();
const http = require("http").Server(app);
const io = require("socket.io")(http);

//Set up middleware
app.use(methodOverride("_method"));
app.use(cookieParser());
app.use(
  express.urlencoded({
    extended: true
  })
);

//configure cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET
});

//Set up file-upload
app.use(fileUpload());
//To allow to link to public folder
app.use(express.static("public"));

//Set react-views to be the default view-engine
const reactEngine = require("express-react-views").createEngine();
app.set("views", __dirname + "/views");
app.set("view engine", "jsx");
app.engine("jsx", reactEngine);

//Import Routes
require("./routes")(app, db, cloudinary);

//Socket.io for real time messaging
io.on("connection", function(socket) {
  socket.on("chat", message => {
    io.emit("chat", message);
  });
});

/**
 * ===================================
 * Listen to requests on port 3000
 * ===================================
 */

const PORT = process.env.PORT || 3000;

const server = http.listen(PORT, () => console.log("~~ PlayGround running ~~"));

//Run clean up actions when server shuts down
server.on("close", () => {
  console.log("closing server");

  db.pool.end(() => {
    console.log("Shut down database connection");
  });
});
