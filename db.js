const mongoose = require("mongoose");

const connect = (dsn) => {
	mongoose.connect(dsn, {
    	useNewUrlParser: true,
		useUnifiedTopology: true,
		useCreateIndex: true,
  	})
  	.then(() => console.log("db connected"))
  	.catch(() => console.log("Fail to connect db."));
}

module.exports = {
	connect
}