const dotenv = require("dotenv").config();
// dotenv.config({ path: "./config.env" });
const app = require("./app");

const connectToDB = require("./util/dbconfig");

connectToDB();

const port = process.env.port;
app.listen(port, () => {
  console.log("Server up and running on port ", port);
});
