Meteor.methods({
	updateMatchDeclined(appUUID, contactParameters) {   
		console.log(appUUID +':contactParameters='+ contactParameters);
		for (var contactParametersKey in contactParameters) {
			console.log( appUUID 
				+ ":updateMatchDeclined:" 
				+ contactParametersKey + "=" + contactParameters[contactParametersKey]
			);
		}
	

		var lenderUserProfile = UserProfile.findOne({userId: contactParameters.lenderUserId});
		var borrowerUserProfile = UserProfile.findOne({userId: contactParameters.borrowerUserId});
		contactParameters.appUUID = appUUID;
		contactParameters.toUserId = contactParameters.borrowerUserId;
		contactParameters.emailSubject =  "Borrow request declined";

		if(ilendbooks.public.contactPreference.EMAIL === borrowerUserProfile.contactPreference) {

			contactParameters.email = borrowerUserProfile.email;
			contactParameters.contactPreference = borrowerUserProfile.contactPreference;
			contactParameters.emailBody = lenderUserProfile.fName 
		    	+ " has declined your borrow request. please go online " 
		    	+ (Router.routes['userHome'].url({_id: 1}))  
		    	+ " to search for another lender." 

		} else if (ilendbooks.public.contactPreference.CELL === borrowerUserProfile.contactPreference){
			contactParameters.phoneNumber = borrowerUserProfile.phoneNumber;
			contactParameters.contactPreference = borrowerUserProfile.contactPreference;
			contactParameters.smsMessage = lenderUserProfile.phoneNumber
		    	+ " has declined your borrow request. please go online " 
		    	+ (Router.routes['userHome'].url({_id: 1}))  
		    	+ " to search for another lender." 
		}

	    var updateStatusInfo = {
	    	appUUID : appUUID,
	    	status : ilendbooks.public.status.MATCHED_DECLINED,
	    	ilendbooksId : contactParameters.ilendbooksId,
	    	lenderUserId : contactParameters.lenderUserId,
	    	borrowerUserId : contactParameters.borrowerUserId
	    }
		Meteor.call("updateStatus", appUUID, updateStatusInfo );
		Meteor.call("contact", appUUID, contactParameters);
		Meteor.call('insertHistory', appUUID, updateStatusInfo );
   	}
})
