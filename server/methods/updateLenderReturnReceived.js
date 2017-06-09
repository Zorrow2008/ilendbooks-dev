Meteor.methods({
	updateLenderReturnReceived(appUUID, contactParameters) {   
		console.log(appUUID +':contactParameters='+ contactParameters);
		for (var contactParametersKey in contactParameters) {
			console.log( appUUID 
				+ ":updateLenderReturnReceived:" 
				+ contactParametersKey + "=" + contactParameters[contactParametersKey]
			);
		}
	

		var lenderUserProfile = UserProfile.findOne({userId: contactParameters.lenderUserId});
		var borrowerUserProfile = UserProfile.findOne({userId: contactParameters.borrowerUserId});
		contactParameters.appUUID = appUUID;
		contactParameters.toUserId = contactParameters.lenderUserId;
		contactParameters.emailSubject =  "Borrower received book";

		if(ilendbooks.public.contactPreference.EMAIL === borrowerUserProfile.contactPreference) {

			contactParameters.email = borrowerUserProfile.email;
			contactParameters.contactPreference = borrowerUserProfile.contactPreference;
			contactParameters.emailBody = lenderUserProfile.fName 
		    	+ " has declared that he received  the book to back from you,please go online and confirm " 
		    	+ (Router.routes['myBorrows'].url({_id: 1})) 


		} else if (ilendbooks.public.contactPreference.CELL === borrowerUserProfile.contactPreference){
			contactParameters.phoneNumber = borrowerUserProfile.phoneNumber;
			contactParameters.contactPreference = borrowerUserProfile.contactPreference;
			contactParameters.smsMessage = lenderUserProfile.fName 
		    	+ " has declared that he received  the book to back from you,please go online and confirm " 
		    	+ (Router.routes['myBorrows'].url({_id: 1}))  
		}

	    var updateStatusInfo = {
	    	appUUID : appUUID,
	    	status : ilendbooks.public.status.LENDER_RETURN_RECEIVED,
	    	ilendbooksId : contactParameters.ilendbooksId,
	    	lenderUserId : contactParameters.lenderUserId,
	    	borrowerUserId : contactParameters.borrowerUserId
	    }
		Meteor.call("updateStatus", appUUID, updateStatusInfo );
		Meteor.call("contact", appUUID, contactParameters);
		Meteor.call('insertHistory', appUUID, updateStatusInfo );
   	}
})