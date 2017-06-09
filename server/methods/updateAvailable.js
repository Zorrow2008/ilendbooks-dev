Meteor.methods({
	updateAvailable(appUUID, contactParameters) {
		// var lenderUserProfile = UserProfile.findOne({userId: contactParameters.lenderUserId});
		// var borrowerUserProfile = UserProfile.findOne({userId: contactParameters.borrowerUserId});
		// contactParameters.appUUID = appUUID;
		// contactParameters.toUserId = contactParameters.borrowerUserId;
		// contactParameters.emailSubject =  "Borrow request accepted";

		// if(ilendbooks.public.contactPreference.EMAIL === borrowerUserProfile.contactPreference) {

		// 	contactParameters.email = borrowerUserProfile.email;
		// 	contactParameters.contactPreference = borrowerUserProfile.contactPreference;
		// 	contactParameters.emailBody = lenderUserProfile.fName 
		//     	+ " has accepted your borrow request. Contact lender at " 
		//     	+ lenderUserProfile.email 
		//     	+ " to set up a book exchange. When you have received the book, make sure to go back to my borrows " 
		//     	+ (Router.routes['myBorrows'].url({_id: 1}))
		//     	+ " and let us know you have it!";

		// } else if (ilendbooks.public.contactPreference.CELL === borrowerUserProfile.contactPreference){
		// 	contactParameters.phoneNumber = borrowerUserProfile.phoneNumber;
		// 	contactParameters.contactPreference = borrowerUserProfile.contactPreference;
		// 	contactParameters.smsMessage = lenderUserProfile.phoneNumber
		//     	+ " has accepted your borrow request. Contact lender at " 
		//     	+ lenderUserProfile.email 
		//     	+ " to set up a book exchange. When you have received the book, make sure to go back to my borrows " 
		//     	+ (Router.routes['myBorrows'].url({_id: 1}))
		//     	+ " and let us know you have it!";
		// }

	    var updateStatusInfo = {
	    	status : ilendbooks.public.status.AVAILABLE,
	    	ilendbooksId : contactParameters.ilendbooksId,
	    	lenderUserId : contactParameters.lenderUserId,
	    	borrowerUserId : contactParameters.borrowerUserId
	    }
		Meteor.call("updateStatus", appUUID, updateStatusInfo );
		//Meteor.call("contact", appUUID, contactParameters);
		Meteor.call('insertHistory', appUUID, updateStatusInfo );
	}
})