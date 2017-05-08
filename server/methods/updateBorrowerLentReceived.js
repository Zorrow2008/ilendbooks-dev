Meteor.methods({
	updateBorrowerLentReceived(bookInfo) {
	  	ToBorrow.update({
	        "ilendbooksId": bookInfo.ilendbooksId,
	        "borrower.userId": Meteor.userId()
	    }, {
	        "$set": {
	            "borrower.$.status": ilendbooks.public.status.BORROWER_LENT_RECEIVED
	        }
	    });

		UserBorrowShelf.update({
		    "userId": Meteor.userId(),
		    "bookInfo.ilendbooksId": bookInfo.ilendbooksId
		}, {
		    "$set": {
		        "bookInfo.$.status": ilendbooks.public.status.BORROWER_LENT_RECEIVED
		       
		    }

		})

		console.log("Borrower collection status updated to BORROWER_LENT_RECEIVED");
	}
})