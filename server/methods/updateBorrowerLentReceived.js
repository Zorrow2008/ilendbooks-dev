Meteor.methods({
	updateBorrowerLentReceived(appUUID, contactParameters) {   
		console.log(appUUID +':contactParameters='+ contactParameters);
		contactParameters.appUUID = appUUID;
		contactParameters.statusBorrow = ilendbooks.public.status.BORROWER_LENT_RECEIVED;
		contactParameters.statusLend = ilendbooks.public.status.BORROWER_LENT_RECEIVED;	
		for (var contactParametersKey in contactParameters) {
			console.log( appUUID 
				+ ":updateBorrowerLentReceived:" 
				+ contactParametersKey + "=" + contactParameters[contactParametersKey]
			);
		}
	

		var lenderUserProfile = UserProfile.findOne({userId: contactParameters.lenderUserId});
		var borrowerUserProfile = UserProfile.findOne({userId: contactParameters.borrowerUserId});
		contactParameters.appUUID = appUUID;
		contactParameters.toUserId = contactParameters.lenderUserId;
		contactParameters.emailSubject =  "Borrower received book";

		if(ilendbooks.public.contactPreference.EMAIL === lenderUserProfile.contactPreference) {

			contactParameters.email = lenderUserProfile.email;
			contactParameters.contactPreference = lenderUserProfile.contactPreference;
			contactParameters.emailBody = borrowerUserProfile.fName 
		    	+ " has declared that he received the book from you,please go online and confirm " 
		    	+ (Router.routes['myShelf'].url({_id: 1}))  


		} else if (ilendbooks.public.contactPreference.CELL === lenderUserProfile.contactPreference){
			contactParameters.phoneNumber = lenderUserProfile.phoneNumber;
			contactParameters.contactPreference = lenderUserProfile.contactPreference;
			contactParameters.smsMessage = borrowerUserProfile.fName 
		    	+ " has declared that he received the book from you,please go online and confirm " 
		    	+ (Router.routes['myShelf'].url({_id: 1}))  
		}

	    // var updateStatusInfo = {
	    // 	appUUID : appUUID,
	    // 	status : ilendbooks.public.status.BORROWER_LENT_RECEIVED,
	    // 	ilendbooksId : contactParameters.ilendbooksId,
	    // 	lenderUserId : contactParameters.lenderUserId,
	    // 	borrowerUserId : contactParameters.borrowerUserId
	    // }
		Meteor.call("updateStatus", appUUID, contactParameters );
		Meteor.call("contact", appUUID, contactParameters);
		Meteor.call('insertHistory', appUUID, contactParameters );
   	}
})
