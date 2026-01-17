const express = require("express");
const cors = require("cors");
require("dotenv").config();

const connectDB = require("./config/db");

const app = express();

connectDB();

app.use(cors());
app.use(express.json());

app.use("/api/identity", require("./routes/identityRoutes"));
app.use("/api/consent", require("./routes/consentRoutes"));
app.use("/api/token", require("./routes/tokenRoutes"));
app.use("/api/data", require("./routes/dataRoutes"));

app.get("/", (req, res) => {
  res.send("Privacy ID Backend Running");
});

app.listen(process.env.PORT, "0.0.0.0", () => {
  console.log("Backend running on port", process.env.PORT);
});
