Meteor.methods({
	emailBorrower(emailInfo){
		var emailResult = Email.send({
			from: emailInfo.from,
			to: emailInfo.to,
			subject: emailInfo.subject,
			text: emailInfo.text
		});

		console.log("borrower successfully emailed");
	}
})