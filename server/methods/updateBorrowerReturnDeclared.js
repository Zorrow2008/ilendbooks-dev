Meteor.methods({
	updateBorrowerReturnDeclared(appUUID, contactParameters) {   
		console.log(appUUID +':contactParameters='+ contactParameters);
		for (var contactParametersKey in contactParameters) {
			console.log( appUUID 
				+ ":updateBorrowerReturnDeclared:" 
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

	    var updateStatusInfo = {
	    	appUUID : appUUID,
	    	status : ilendbooks.public.status.BORROWER_RETURN_DECLARED,
	    	ilendbooksId : contactParameters.ilendbooksId,
	    	lenderUserId : contactParameters.lenderUserId,
	    	borrowerUserId : contactParameters.borrowerUserId
	    }
		Meteor.call("updateStatus", appUUID, updateStatusInfo );
		Meteor.call("contact", appUUID, contactParameters);
		Meteor.call('insertHistory', appUUID, updateStatusInfo );
   	}
})