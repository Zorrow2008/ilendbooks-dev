Meteor.methods({
	updateLenderStatus(currentBorrowerInfo, borrowerBookInfo) {
		ToLend.update(
		    { "ilendbooksId": borrowerBookInfo.ilendbooksId,
			  "lender.userId": borrowerBookInfo.lenderUserId },
		    { "$set": { "lender.$.status": ilendbooks.public.status.MATCHED		     			
	 				  } 
	 		}
		)

		UserLendShelf.update( {
			"userId": borrowerBookInfo.lenderUserId,
			"bookInfo.ilendbooksId" : borrowerBookInfo.ilendbooksId
		},
		{ "$set": {"bookInfo.$.status": ilendbooks.public.status.MATCHED,
				   "bookInfo.$.matchedUserId": currentBorrowerInfo.userId
				 }

		}
		)
	}
})