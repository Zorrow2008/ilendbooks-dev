Meteor.methods({
	updateUserBookAddedBack: function(appUUID, ilendbooksId ) {
		console.log(appUUID + ":updateUserBookAddedBack:ilendbooksId="+ ilendbooksId);

		var userProfile = UserProfile.findOne({userId: Meteor.userId()});
		var book = Books.findOne({"_id":ilendbooksId});
		var contactParameters = {};
		contactParameters.appUUID = appUUID;
		contactParameters.toUserId = Meteor.userId();
		contactParameters.emailSubject =  "Book added back to  shelf!";

		if(ilendbooks.public.contactPreference.EMAIL === userProfile.contactPreference) {

			contactParameters.email = userProfile.email;
			contactParameters.contactPreference = userProfile.contactPreference;
			contactParameters.emailBody = "Would like let you know that the below book is added back to  your shelf:"
		    	+ "\n"
		    	+ book.ItemAttributes[0].Title[0]; 

		} else if (ilendbooks.public.contactPreference.CELL === userProfile.contactPreference){
			contactParameters.phoneNumber = userProfile.phoneNumber;
			contactParameters.contactPreference = userProfile.contactPreference;
			contactParameters.smsMessage = "Would like let you know that the below book is added back to  your shelf:"
		    	+ "\n"
		    	+ book.ItemAttributes[0].Title[0]; 
		}

	    contactParameters.ilendbooksId=ilendbooksId;
	    contactParameters.lenderUserId=Meteor.userId();
	    contactParameters.statusLend = ilendbooks.public.status.AVAILABLE;
	    contactParameters.statusBorrow = "";
	    contactParameters.bookCoin = ilendbooks.private.bitCoin.ADDONE_BOOK;
	    
		Meteor.call('updateStatus', appUUID, contactParameters);
		Meteor.call('contact', appUUID, contactParameters);
		Meteor.call('insertHistory', appUUID, contactParameters);
		Meteor.call('addNewBookBookcoin', appUUID, contactParameters.bookCoin);
	}
})
