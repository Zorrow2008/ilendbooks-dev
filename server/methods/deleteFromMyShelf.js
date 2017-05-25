Meteor.methods({
	deleteFromMyShelf: function(ilendbooksId ) {
		console.log("method called");
		var doc = UserLendShelf.findOne({userId: Meteor.userId()});
		var bookInfoArray = doc.bookInfo;
		var realKey;

		UserLendShelf.update({
		    "userId": Meteor.userId(),
		    "bookInfo.ilendbooksId": ilendbooksId
		}, {
		    	"$set": {
		        	"bookInfo.$.status": ilendbooks.public.status.REMOVED
		    	}
		});
	    ToLend.update({
	        "ilendbooksId": ilendbooksId,
	        "lender.userId": Meteor.userId()
	    }, {
	        "$set": {
	            "lender.$.status": ilendbooks.public.status.REMOVED
	        }
	    });
		Meteor.call('addBookcoin', -2);
		console.log("method done");


	}
})