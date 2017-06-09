Meteor.methods({
	updateUserBookRemoved: function(appUUID, contactParameters) {
		for (var contactParametersKey in contactParameters) {
		
			console.log(appUUID 
				+ ":updateUserBookRemoved:"
				+ contactParametersKey + "=" + contactParameters[contactParametersKey]
				);
		}
		var userProfile = UserProfile.findOne({userId: Meteor.userId()});
		var book = Books.findOne({"_id":contactParameters.ilendbooksId });
		contactParameters.appUUID = appUUID;
		contactParameters.toUserId = Meteor.userId();
		contactParameters.emailSubject =  "Book removed from your shelf!";

		if(ilendbooks.public.contactPreference.EMAIL === userProfile.contactPreference) {

			contactParameters.email = userProfile.email;
			contactParameters.contactPreference = userProfile.contactPreference;
			contactParameters.emailBody = "Would like let you know that the below book is removed from your shelf:"
		    	+ "\n"
		    	+ book.ItemAttributes[0].Title[0]; 

		} else if (ilendbooks.public.contactPreference.CELL === userProfile.contactPreference){
			contactParameters.phoneNumber = userProfile.phoneNumber;
			contactParameters.contactPreference = userProfile.contactPreference;
			contactParameters.smsMessage = "Would like let you know that the below book is removed from your shelf:"
		    	+ "\n"
		    	+ book.ItemAttributes[0].Title[0]; 
		}

	    // var updateStatusInfo = {
	    // 	status : ilendbooks.public.status.REMOVED,
	    // 	ilendbooksId : contactParameters.ilendbooksId ,
	    // 	lenderUserId : Meteor.userId(),
	    // }
	    contactParameters.lenderUserId=Meteor.userId();
	    contactParameters.status=ilendbooks.public.status.REMOVED;

		Meteor.call('updateStatus', appUUID, contactParameters);
		Meteor.call('contact', appUUID, contactParameters);
		Meteor.call('insertHistory', appUUID, contactParameters);
		Meteor.call('addNewBookBookcoin', appUUID, ilendbooks.private.bitCoin.REMOVE_ONE_BOOK);
	}
})