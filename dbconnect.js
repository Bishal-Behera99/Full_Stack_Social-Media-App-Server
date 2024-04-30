const mongoose = require("mongoose");

module.exports = async () => {
  const mongouri = `mongodb+srv://beherabishal552:SCNUPPmGYyOCb0xU@cluster0.lcux4km.mongodb.net/?retryWrites=true&w=majority`;

  try {
    const connect = await mongoose.connect(mongouri, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    });

    console.log(`Mongoose Connected ${connect.connection.host}`);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};
