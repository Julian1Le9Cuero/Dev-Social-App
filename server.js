const express = require("express");
const app = express();

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

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
