const dotenv = require("dotenv");
dotenv.config();
const app = require("./app");
const connectToDB = require("./util/dbconfig");

// Creating server that app listens on

connectToDB();

const port = process.env.port;
app.listen(port, () => {
  console.log("Server up and running on port ", port);
});
