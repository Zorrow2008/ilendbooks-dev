Meteor.methods({
	updateMatchDeclined(contactParameters) {       
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