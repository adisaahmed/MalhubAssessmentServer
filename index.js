const express = require("express");
const dbconnect = require("./dbconnect");
const cors = require("cors");

const app = express();
app.use(express.json());
app.options("*", cors());
app.use(cors());

require("dotenv").config();

const path = require("path");
const dir = path.join(__dirname, "public");
app.use(express.static(dir));

const control = require("./routes/control");

app.get("/api/", (req, res) => {
  res.redirect("/notfound.html");
});

app.use("/api/trans", control);

app.get("*", (req, res) => {
  res.redirect("/notfound.html");
});

const errorHandler = (err, req, res, next) => {
  console.log("Error handling.", err);
  if (err) {
    res.status(403).json({
      success: false,
      error: err,
    });
  }
};
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
const DATABASE = process.env.DB_MONGO_URL;

if (dbconnect(DATABASE)) {
  app.listen(PORT, () => console.log(`Server is running ${PORT}`));
}
