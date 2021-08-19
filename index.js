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

app.get("/skill", (req, res) => {
  db_mysql.query("SELECT * FROM B01_skills_type", (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

app.get("/", (req, res) => {
  res.send("test");
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
