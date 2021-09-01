const express = require("express");
const app = express();
const mysql = require("mysql");
const cors = require("cors");

app.use(cors());
app.use(express.json());

const db_mysql = mysql.createConnection({
  user: "admin",
  host: "localhost",
  password: "Tom0896390897",
  database: "kabao101",
});

//_________________________________________________________________________________________________________________________
var A01_personal_info;
var A02_experience;
var A03_education;
var B01_skills_type;
var B02_skills_topic;
var B03_skills_info;

db_mysql.query("SELECT * FROM A01_personal_info", (err, result) => {
  if (err) {
    console.log(err);
  } else {
    A01_personal_info = result;
  }
});
db_mysql.query("SELECT * FROM A02_experience", (err, result) => {
  if (err) {
    console.log(err);
  } else {
    A02_experience = result;
  }
});
db_mysql.query("SELECT * FROM A03_education", (err, result) => {
  if (err) {
    console.log(err);
  } else {
    A03_education = result;
  }
});
db_mysql.query("SELECT * FROM B01_skills_type", (err, result) => {
  if (err) {
    console.log(err);
  } else {
    B01_skills_type = result;
  }
});
db_mysql.query("SELECT * FROM B02_skills_topic", (err, result) => {
  if (err) {
    console.log(err);
  } else {
    B02_skills_topic = result;
  }
});
db_mysql.query("SELECT * FROM B03_skills_info", (err, result) => {
  if (err) {
    console.log(err);
  } else {
    B03_skills_info = result;
  }
});

//_________________________________________________________________________________________________________________________

app.get("/info", (req, res) => {
  res.send({
    A_profile: {
      A01_personal_info: A01_personal_info,
      A02_experience: A02_experience,
      A03_education: A03_education,
    },
    B_skills: {
      B01_skills_type: B01_skills_type,
      B02_skills_topic: B02_skills_topic,
      B03_skills_info: B03_skills_info,
    },
  });
});

//_________________________________________________________________________________________________________________________

// app.post("/userLoginRec", (req, res) => {
//   const username = req.body.username;
//   const password = req.body.password;

//   db_mysql.query(
//     "INSERT INTO permission_mt900_tb (username, password) VALUES(?,?)",
//     [username, password],
//     (err, result) => {
//       if (err) {
//         console.log(err);
//       } else {
//         res.send("Value inseted");
//       }
//     }
//   );
// });

app.listen("4001", () => {
  console.log("Server is running on port 4001");
});
