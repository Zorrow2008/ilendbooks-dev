Meteor.methods({
	emailMatchedUser(emailInfo){
		var emailResult = Email.send({
			from: emailInfo.from,
			to: emailInfo.to,
			subject: emailInfo.subject,
			text: emailInfo.text
		});

		console.log("matched partner successfully emailed");
	}
})