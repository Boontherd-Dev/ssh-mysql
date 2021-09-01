var mysql2 = require("mysql2");
var SSH2Client = require("ssh2").Client;

const express = require("express");
const app = express();
const cors = require("cors");

app.use(cors());
app.use(express.json());

var sshConf = {
  host: "167.71.218.61",
  port: 22,
  username: "root",
  password: "@Tom0896390897kabao",
};
var sqlConf = {
  user: "admin",
  password: "Tom0896390897",
  database: "kabao101",
  timeout: 100000,
};

var ssh = new SSH2Client();
ssh.on("ready", function () {
  ssh.forwardOut(
    // source IP the connection would have came from. this can be anything since we
    // are connecting in-process
    "127.0.0.1",
    // source port. again this can be randomized and technically should be unique
    24000,
    // destination IP on the remote server
    "127.0.0.1",
    // destination port at the destination IP
    3306,
    function (err, stream) {
      // you will probably want to handle this better,
      // in case the tunnel couldn't be created due to server restrictions
      if (err) throw err;

      // if you use `sqlConf` elsewhere, be aware that the following will
      // mutate that object by adding the stream object for simplification purposes
      sqlConf.stream = stream;
      var db_mysql = mysql2.createConnection(sqlConf);

      //_________________________________________________________________________________________________________________________

      app.get("/skillType", (req, res) => {
        db_mysql.query("SELECT * FROM B01_skills_type", (err, result) => {
          if (err) {
            console.log(err);
          } else {
            res.send(result);
          }
        });
      });

      app.get("/skillTopic", (req, res) => {
        db_mysql.query("SELECT * FROM B02_skills_topic", (err, result) => {
          if (err) {
            console.log(err);
          } else {
            res.send(result);
          }
        });
      });

      //_________________________________________________________________________________________________________________________
      // now use `db` to make your queries
    }
  );
});
ssh.connect(sshConf);

app.listen("4002", () => {
  console.log("Server is running on port 4002");
});
