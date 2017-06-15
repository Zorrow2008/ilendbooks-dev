Meteor.methods({
	updateBorrowed(appUUID, contactParameters) {
		contactParameters.appUUID = appUUID;
		contactParameters.statusLend = ilendbooks.public.status.WITH_BORROWER;
		contactParameters.statusBorrow = ilendbooks.public.status.BORROWED;

		var lenderUserProfile = UserProfile.findOne({userId: contactParameters.lenderUserId});
		var borrowerUserProfile = UserProfile.findOne({userId: contactParameters.borrowerUserId});
		contactParameters.appUUID = appUUID;
		contactParameters.toUserId = contactParameters.lenderUserId;
		contactParameters.emailSubject =  "Borrower status changed to Borrowed";
		for (var contactParametersKey in contactParameters) {
			console.log( appUUID 
				+ ":updateBorrowed:" 
				+ contactParametersKey + "=" + contactParameters[contactParametersKey]
			);
		}

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

		Meteor.call("updateStatus", appUUID, contactParameters );
		Meteor.call("contact", appUUID, contactParameters);
		Meteor.call('insertHistory', appUUID, contactParameters );
    	Meteor.call('addBookcoin', appUUID, contactParameters.lenderUserId, -5)
		Meteor.call('addBookcoin', appUUID, contactParameters.borrowerUserId, 5)
	}
})