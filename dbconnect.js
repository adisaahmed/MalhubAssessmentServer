const mongoose = require("mongoose");

const dbconnect = async (DB_MONGO_URL) => {
  try {
    const conn = await mongoose.connect(DB_MONGO_URL, {
      useUnifiedTopology: true,
    });
    mongoose.set("strictQuery", true);
    console.log(`DB connected Successfully. ${conn.connection.host}`);
    return true;
  } catch (error) {
    console.log("DB connect failed", error.message);
    return false;
  }
};

module.exports = dbconnect;
