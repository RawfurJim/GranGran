const express = require("express");
const cors = require('cors')
const morgan = require('morgan')
const userRoutes = require("./router/user");
const eventRoutes = require("./router/event");
const authRoutes = require("./router/auth");
const checkAuth = require('./middlewares/checkAuth')
const db = require('./db');

const app = express();
app.use(express.json());

const DSN = "mongodb+srv://rmjimj:rmjim123@cluster0.hex75.mongodb.net/gran"
db.connect(DSN)

app.use(cors())
app.use(morgan('tiny'))

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/users", [checkAuth], userRoutes);
app.use("/api/v1/events", [checkAuth], eventRoutes);

const port = process.env.PORT || 4000;

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});