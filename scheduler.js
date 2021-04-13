const schedule = require('node-schedule')

module.exports = {
	run: function (event, callback) {
		const job = schedule.scheduleJob(event.reminderStartDateTime, function () {
			callback(event)
		})
		return job
	}
}