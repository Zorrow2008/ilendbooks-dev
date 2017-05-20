Meteor.methods({
	// updateStatusInfo object should ccontain
	// 1. contactParameters.contactPreference - required
	// 2. contactParameters.email- required (email)
	// 3. contactParameters.fromEmail - required (email)
	// 4. contactParameters.emailSubject - required (email)
	// 5. contactParameters.emailBody - required (email)
	// 6. contactParameters.phoneNumber - required (sms)
	// 7. contactParameters.smsMessage - required (sms)
	// 7. contactParameters.toUserId - required
	contact(appUUID, contactParameters){
		for (var contactParametersKey in contactParameters) {
			console.log( appUUID 
				+ ":contact:" 
				+ contactParametersKey + "=" + contactParameters[contactParametersKey]
			);
		}

		if(ilendbooks.public.contactPreference.EMAIL === contactParameters.contactPreference) {

		    var emailResult = Email.send({
		        to: contactParameters.email,	            
		        from: contactParameters.fromEmail,
		        subject: contactParameters.emailSubject,
		        text: contactParameters.emailBody,   
		    });

          	console.log(appUUID + ":contact:email sent." + emailResult);

		    contactParameters.contactResult = emailResult;
		    for(var contactResultKey in contactParameters.contactResult)
		    {
		        console.log(appUUID 
		        	+ ":contact:contactResult (email):"
		        	+ contactResultKey + "=" + contactParameters.contactResult[contactResultKey])
		        ;
		    }

		} else if (ilendbooks.public.contactPreference.CELL === contactParameters.contactPreference){
			var smsParameters = {
				to:contactParameters.phoneNumber,
				message: contactParameters.smsMessage 
			}
			var smsResult = Method.call('sendSMS', appUUID, )
			contactParameters.contactResult = smsResult;
			contactParameters.status = smsResult.status;
		} else {
				console.log(appUUID + ":contactLender: Fatal, no good, no contact preference...");
				contactParameters.status = ilendbooks.public.status.FAILED;
				contactParameters.contactResult = "No contact preference for this user " + contactParameters.borrowerUserId;
		}
		Meteor.call("insertCorrespondence", appUUID, contactParameters.toUserId, contactParameters);
		console.log(appUUID  + ":contact:matched partner successfully emailed");
	}
})