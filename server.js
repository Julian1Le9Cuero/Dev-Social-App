const express = require("express");
const app = express();
const path = require("path");

const userRoute = require("./routes/api/user");
const authRoute = require("./routes/api/auth");
const profileRoute = require("./routes/api/profile");
const postsRoute = require("./routes/api/posts");

const connectDB = require("./config/db");

// Parse incoming JSON
app.use(express.json());

// Connect to DB
connectDB();

// Set API routes
app.use("/api/users", userRoute);
app.use("/api/auth", authRoute);
app.use("/api/profile", profileRoute);
app.use("/api/posts", postsRoute);

// Serve static assets in production
if (process.env.NODE_ENV === "production") {
  // Set the build static folder
  app.use(express.static("client/build"));

  // Serve the index.html file
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
