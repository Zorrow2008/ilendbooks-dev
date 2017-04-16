Meteor.methods({
	// contactParameters should contain 
	// contactParameters.lenderUserId 
	// contactParameters.borrowerUserId 
	// contactParameters.ilendbooksId  -- (Books Id)
	contactLender(appUUID, contactParameters){
		for(var contactParametersKey in contactParameters) {
			console.log(appUUID + ":contactLender:"+ contactParametersKey + "=" +contactParameters[contactParametersKey]);
		}
		contactParameters.appUUID = appUUID;
		var lenderUserProfile = UserProfile.findOne({userId:contactParameters.lenderUserId});
		var book = Books.findOne({"_id" : contactParameters.ilendbooksId});
		var borrowerUserProfile = UserProfile.findOne({userId:contactParameters.borrowerUserId });
		if(book && lenderUserProfile && borrowerUserProfile) {
			for(var lenderUserProfileKey in lenderUserProfile) {
				console.log(appUUID + ":contactLender:userProfile(lender):"+ lenderUserProfileKey + "=" + lenderUserProfile[lenderUserProfileKey]);
			}
			
			if(ilendbooks.public.contactPreference.EMAIL === lenderUserProfile.contactPreference) {
				// email the lender that someone is intrested in borrowing the book
				contactParameters.contactMethod = lenderUserProfile.contactPreference;
				contactParameters.email = lenderUserProfile.email;
				contactParameters.fromEmail = ilendbooks.private.generic.FROM_EMAIL;
				contactParameters.emailSubject = 'Lender found',
				contactParameters.emailBody = 'TO-DO: improve this message  - A lender would like to borrow the book ' + book.title
				console.log(appUUID + ":contactLender:start email sending ...");
				for(var contactParametersKey in contactParameters) {
					console.log(appUUID + ":contactLender(email):"+ contactParametersKey + "=" + contactParameters[contactParametersKey]);
				}
				console.log(appUUID + ":contactLender:start email sending ...");
		        var emailResult = Email.send({
		            to: contactParameters.email,
		            //to:'jayjo7@hotmail.com',
		            from: contactParameters.fromEmail,
		            subject: contactParameters.emailSubject,
		            text: contactParameters.emailBody
		        });
         //  var emailResult = Email.send({
         //    to: "jayjo7@hotmail.com",
         //    from: "admin@ilendbooks.com",
         //    subject: "itemSearch - Jay",
         //    text: "test mesage"
         // });
          		console.log(appUUID + ":contactLender:email sent." + emailResult);

		        contactParameters.contactResult = emailResult;
		        for(var contactResultKey in contactParameters.contactResult)
		        {
		        	console.log(appUUID + ":contactLender:contactResult (email):"+ contactResultKey + "=" + contactParameters.contactResult[contactResultKey]);
		        }

			} else if (ilendbooks.public.contactPreference.CELL === lenderUserProfile.contactPreference){ 
				contactParameters.contactMethod = lenderUserProfile.contactPreference;
				contactParameters.phoneNumber = lenderUserProfile.phoneNumber
				contactParameters.smsMessage = 'TO-DO: improve this message  - A lender would like to borrow the book ' + book.title
				var smsParameters = {
					to:contactParameters.phoneNumber,
					message: contactParameters.smsMessage 
				}
				var smsResult = Method.call('sendSMS', appUUID, )
				contactParameters.contactResult = smsResult;
				contactParameters.status = smsResult.status;
			} else {
				console.log(appUUID + ":contactLender: Fatal, no good, no contact preference...");
			}

		} else {
			contactParameters.status = ilendbooks.public.status.FAILED;
			console.log(appUUID + ":contactLender:************************* Fatal *************************");
			console.log(appUUID + ":contactLender: Fatal, no good, not all data available");
			console.log(appUUID + ":contactLender: Fatal: lenderUserProfile = " + lenderUserProfile);
			console.log(appUUID + ":contactLender: Fatal: borrowerUserProfile = " + borrowerUserProfile);
			console.log(appUUID + ":contactLender: Fatal: book = " + book);
			console.log(appUUID + ":contactLender:************************* Fatal *************************");
		}
		PendingTransactions.insert({
			lenderUserId: contactParameters.lenderUserId,
			contactParameters: contactParameters
		})
	}
});