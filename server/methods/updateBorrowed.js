Meteor.methods({
	updateBorrowed(appUUID, contactParameters) {
		// console.log(appUUID +':contactParameters='+ contactParameters);
		// for (var contactParametersKey in contactParameters) {
		// 	console.log( appUUID 
		// 		+ ":updateBorrowerLentReceived:" 
		// 		+ contactParametersKey + "=" + contactParameters[contactParametersKey]
		// 	);
		// }
	

		var lenderUserProfile = UserProfile.findOne({userId: contactParameters.lenderUserId});
		var borrowerUserProfile = UserProfile.findOne({userId: contactParameters.borrowerUserId});
		contactParameters.appUUID = appUUID;
		contactParameters.toUserId = contactParameters.lenderUserId;
		contactParameters.emailSubject =  "Borrower status changed to Borrowed";

		if(ilendbooks.public.contactPreference.EMAIL === lenderUserProfile.contactPreference) {

			contactParameters.email = lenderUserProfile.email;
			contactParameters.contactPreference = lenderUserProfile.contactPreference;
			contactParameters.emailBody = borrowerUserProfile.fName 
		    + "'s status has changed to \"Borrowed\""; 


		} else if (ilendbooks.public.contactPreference.CELL === lenderUserProfile.contactPreference){
			contactParameters.phoneNumber = lenderUserProfile.phoneNumber;
			contactParameters.contactPreference = lenderUserProfile.contactPreference;
			contactParameters.smsMessage = borrowerUserProfile.fName 
		    	+ "'s status has changed to \"Borrowed\""; 
		}

	    var updateStatusInfo = {
	    	appUUID : appUUID,
	    	status : ilendbooks.public.status.BORROWED,
	    	ilendbooksId : contactParameters.ilendbooksId,
	    	lenderUserId : contactParameters.lenderUserId,
	    	borrowerUserId : contactParameters.borrowerUserId
	    }
		Meteor.call("updateStatus", appUUID, updateStatusInfo );
		Meteor.call("contact", appUUID, contactParameters);
		Meteor.call('insertHistory', appUUID, updateStatusInfo );
	}
})