const mailgun = require('mailgun-js')
const domain = 'YOUR_DOMAIN_NAME'
const apiKey = ''
const mg = mailgun({ apiKey, domain })

const sendMail = ({ toEmail, subject, content }) => {
	try {
		const data = {
			from: 'Jim from GranGran',
			to: toEmail,
			subject: subject,
			text: content,
		}
		mg.messages().send(data, function (error, body) {
			console.log(body)
		})
	} catch (error) {}
}

module.exports = {
	sendMail,
}
