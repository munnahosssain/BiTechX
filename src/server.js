const dotenv = require("dotenv").config();
const colors = require("colors");

const app = require("./app");

// imported all routes
const authRoutes = require("./routes/v1/auth.route");

//TODO: add here auth routes
app.use("/api/v1/auth", authRoutes);

const port = process.env.PORT || 8080;

app.listen(port, () => {
  console.log(`App is running on port ${port}`.yellow.bold);
});
