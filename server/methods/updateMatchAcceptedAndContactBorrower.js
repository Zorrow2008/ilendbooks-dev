Meteor.methods({
	updateMatchAcceptedAndContactBorrower(appUUID, contactParameters) {
		console.log('contactParameters='+ contactParameters);
		for (var contactParametersKey in contactParameters) {
			console.log( appUUID 
				+ ":updateMatchAcceptedAndContactBorrower:" 
				+ contactParametersKey + "=" + contactParameters[contactParametersKey]
			);
		}
		var lenderUserProfile = UserProfile.findOne({userId: contactParameters.lenderUserId});
		var borrowerUserProfile = UserProfile.findOne({userId: contactParameters.borrowerUserId});
		contactParameters.appUUID = appUUID;
		contactParameters.toUserId = contactParameters.borrowerUserId;
   		contactParameters.statusLend= ilendbooks.public.status.MATCHED_ACCEPTED
   		contactParameters.statusBorrow= ilendbooks.public.status.MATCHED_ACCEPTED;
		contactParameters.emailSubject =  "Borrow request accepted";


		if(ilendbooks.public.contactPreference.EMAIL === borrowerUserProfile.contactPreference) {

			contactParameters.email = borrowerUserProfile.email;
			contactParameters.contactPreference = borrowerUserProfile.contactPreference;
			contactParameters.emailBody = lenderUserProfile.fName 
		    	+ " has accepted your borrow request. Contact lender at " 
		    	+ lenderUserProfile.email 
		    	+ " to set up a book exchange. When you have received the book, make sure to go back to my borrows " 
		    	+ (Router.routes['myBorrows'].url({_id: 1}))
		    	+ " and let us know you have it!";

		} else if (ilendbooks.public.contactPreference.CELL === borrowerUserProfile.contactPreference){
			contactParameters.phoneNumber = borrowerUserProfile.phoneNumber;
			contactParameters.contactPreference = borrowerUserProfile.contactPreference;
			contactParameters.smsMessage = lenderUserProfile.phoneNumber
		    	+ " has accepted your borrow request. Contact lender at " 
		    	+ lenderUserProfile.email 
		    	+ " to set up a book exchange. When you have received the book, make sure to go back to my borrows " 
		    	+ (Router.routes['myBorrows'].url({_id: 1}))
		    	+ " and let us know you have it!";
		}

	    // var updateStatusInfo = {
	    // 	status : ilendbooks.public.status.MATCHED_ACCEPTED,
	    // 	ilendbooksId : contactParameters.ilendbooksId,
	    // 	lenderUserId : contactParameters.lenderUserId,
	    // 	borrowerUserId : contactParameters.borrowerUserId
	    // }
		Meteor.call("updateStatus", appUUID, contactParameters );
		Meteor.call("contact", appUUID, contactParameters);
   	}
})