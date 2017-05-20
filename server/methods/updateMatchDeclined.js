Meteor.methods({
	updateMatchDeclined(contactParameters) {   
		console.log('contactParameters='+ contactParameters);
		for (var contactParametersKey in contactParameters) {
			console.log( appUUID 
				+ ":updateMatchDeclined:" 
				+ contactParametersKey + "=" + contactParameters[contactParametersKey]
			);
		}

	    ToLend.update({
	        "ilendbooksId": contactParameters.ilendbooksId,
	        "lender.userId": Meteor.userId()
	    }, {
	        "$set": {
	            "lender.$.status": ilendbooks.public.status.AVAILABLE
	        }
	    });

		UserLendShelf.update({
		    "userId": Meteor.userId(),
		    "bookInfo.ilendbooksId": contactParameters.ilendbooksId
		}, {
		    "$set": {
		        "bookInfo.$.status": ilendbooks.public.status.AVAILABLE
		        
		    }

		});

		var currentBook = ToLend.findOne({
      		ilendbooksId: Session.get('specificBook-ilendbooksId'), 
      		lender: {$elemMatch:{userId:{$ne: contactParameters.borrowerUserId }, status:ilendbooks.public.status.AVAILABLE}}
    	});

    	

	  	ToBorrow.update({
	        "ilendbooksId": contactParameters.ilendbooksId,
	        "borrower.userId": contactParameters.borrowerUserId
	    }, {
	        "$set": {
	            "borrower.$.status": ilendbooks.public.status.AVAILABLE
	        }
	    });

		UserBorrowShelf.update({
		    "userId": contactParameters.borrowerUserId,
		    "bookInfo.ilendbooksId": contactParameters.ilendbooksId
		}, {
		    "$set": {
		        "bookInfo.$.status": ilendbooks.public.status.AVAILABLE
		       
		    }

		})


	}


})