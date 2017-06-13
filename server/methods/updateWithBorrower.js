Meteor.methods({
	updateWithBorrower(appUUID, contactParameters) {   
		contactParameters.appUUID = appUUID;
		contactParameters.statusLend = ilendbooks.public.status.WITH_BORROWER;
		contactParameters.statusBorrow = ilendbooks.public.status.BORROWED;
		// console.log(appUUID +':contactParameters='+ contactParameters);
		// for (var contactParametersKey in contactParameters) {
		// 	console.log( appUUID 
		// 		+ ":updateLenderLentDeclared:" 
		// 		+ contactParametersKey + "=" + contactParameters[contactParametersKey]
		// 	);
		// }
	

		 var lenderUserProfile = UserProfile.findOne({userId: contactParameters.lenderUserId});
		 var borrowerUserProfile = UserProfile.findOne({userId: contactParameters.borrowerUserId});
		 contactParameters.appUUID = appUUID;
		 contactParameters.toUserId = contactParameters.lenderUserId;
		 contactParameters.emailSubject =  "Status changed to with borrower";

		 if(ilendbooks.public.contactPreference.EMAIL === borrowerUserProfile.contactPreference) {

		 	contactParameters.email = borrowerUserProfile.email;
		 	contactParameters.contactPreference = borrowerUserProfile.contactPreference;
		 	contactParameters.emailBody = lenderUserProfile.fName 
		     	+ "'s status has changed to \"With Borrower\"";
     	}  else if (ilendbooks.public.contactPreference.CELL === borrowerUserProfile.contactPreference){
		 	contactParameters.phoneNumber = borrowerUserProfile.phoneNumber;
			contactParameters.contactPreference = borrowerUserProfile.contactPreference;
		 	contactParameters.smsMessage = lenderUserProfile.fName 
		     	+ "'s status has changed to \"With Borrower\"";  
		 }

	    //  var updateStatusInfo = {
	    //  	appUUID : appUUID,
	    //  	status : ilendbooks.public.status.WITH_BORROWER,
	    //  	ilendbooksId : contactParameters.ilendbooksId,
	    //  	lenderUserId : contactParameters.lenderUserId,
	    //  	borrowerUserId : contactParameters.borrowerUserId
	    // }
		 Meteor.call("updateStatus", appUUID, contactParameters);
		 Meteor.call("contact", appUUID, contactParameters);
		 Meteor.call('insertHistory', appUUID, contactParameters);
		 Meteor.call('lendBookCoin', appUUID, contactParameters.lenderUserId, -5)
		 Meteor.call('borrowBookCoin', appUUID, contactParameters.borrowerUserId, 5)
   	}
})