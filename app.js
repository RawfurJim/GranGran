const express = require("express");
const http = require('http')
const socketio = require('socket.io')
const cors = require('cors')
const morgan = require('morgan')
const userRoutes = require("./router/user");
const eventRoutes = require("./router/event");
const notificationRoutes = require("./router/notification");
const authRoutes = require("./router/auth");
const checkAuth = require('./middlewares/checkAuth')
const db = require('./db');

const app = express();
const server = http.createServer(app)
const io = socketio(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
    credentials: true
  }
})
app.use(express.json());

const DSN = "mongodb+srv://rmjimj:rmjim123@cluster0.hex75.mongodb.net/gran"
db.connect(DSN)

app.use(cors())
app.use(morgan('tiny'))

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/users", [checkAuth], userRoutes);
app.use("/api/v1/events", [checkAuth], eventRoutes);
app.use("/api/v1/notifications", [checkAuth], notificationRoutes);


io.on('connection', function(socket) {
  console.log('A user connected');

  socket.on('disconnect', function () {
     console.log('A user disconnected');
  });
});

const port = process.env.PORT || 4000;
server.listen(port, () => {
  console.log(`Server running on port ${port}`);
});