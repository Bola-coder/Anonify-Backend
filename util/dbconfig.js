const mongoose = require("mongoose");

const connectToDB = () => {
  const connectionUri = process.env.mongoURI;
  //   mongoose.set("strictQuery", false);
  mongoose
    .connect(connectionUri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then((con) => {
      console.log("DB connected successfuly ");
    })
    .catch((err) => {
      console.log("Error occured when cinecting db.", err);
    });
};

module.exports = connectToDB;
