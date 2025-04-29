const express = require("express");
const cors = require("cors");

const app = express();

var corsOptions = {
  origin: "*",
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Simple welcome route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to the server." });
});

// Mount auth routes under /api/auth
const authRoutes = require("./app/routes/user.routes.js");
app.use("/api/auth", authRoutes);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
