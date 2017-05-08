Template.bookInfo.helpers({

	getAuthor: function(ilendbooksId) {
		//var currentLentBook = Session.get('currentLentBook');
		console.log("getAuthor called");
		var currentLentBook = Books.findOne({_id: ilendbooksId});
		return currentLentBook.ItemAttributes[0].Author[0];
	},

	getTitle: function(ilendbooksId) {
		//var currentLentBook = Session.get('currentLentBook');
		var currentLentBook = Books.findOne({_id: ilendbooksId});
		return currentLentBook.ItemAttributes[0].Title[0];
	},

	getImage: function(ilendbooksId) {
		//var currentLentBook = Session.get('currentLentBook');
		var currentLentBook = Books.findOne({_id: ilendbooksId});
		return currentLentBook.MediumImage[0].URL[0];
	},

	getPublisher: function(ilendbooksId) {
		//var currentLentBook = Session.get('currentLentBook');
		var currentLentBook = Books.findOne({_id: ilendbooksId});
		return currentLentBook.ItemAttributes[0].Publisher[0];

	},

	getISBN: function(ilendbooksId) {
		//var currentLentBook = Session.get('currentLentBook');
		var currentLentBook = Books.findOne({_id: ilendbooksId});
		return currentLentBook.ItemAttributes[0].ISBN[0];
	},

	getEdition: function(ilendbooksId) {
		//var currentLentBook = Session.get('currentLentBook');
		var currentLentBook = Books.findOne({_id: ilendbooksId});
		return currentLentBook.ItemAttributes[0].Edition[0];
	},

	getPublicationDate: function(ilendbooksId) {
		//var currentLentBook = Session.get('currentLentBook');
		var currentLentBook = Books.findOne({_id: ilendbooksId});
		return currentLentBook.ItemAttributes[0].PublicationDate[0];
	},


	isMatchedAcceptedLender: function(status) {
		return status = ilendbooks.public.status.MATCHED_ACCEPTED;
	}
})

Template.bookInfo.events({
	   'click .ilendInfoModal' : function(event) {
	   	var ilendbooksId = this.ilendbooksId;
	   	console.log("ilendbooksId: " + ilendbooksId);
	   	var status = this.status;
	   	console.log("status: " + status);
	   	var modalTitle = "ilendbooks";
	   	var modalBody = "It is great that you are lending/borrowing text books... SAVE THE EARTH!"
	   	// var lenderName = UserProfile.findOne({userId: Meteor.userId()}).fName;
	   	// console.log("lender name: " + lenderName);
	   	// var pendingTrans = PendingTransactions.findOne({lenderUserId: Meteor.userId()});
	   	// var borrowerName = UserProfile.findOne({userId: pendingTrans.contactParameters.borrowerUserId}).fName;
	   //	var matchedUserId = this.matchedUserId;
	   	var matchedUserName = UserProfile.findOne({userId: this.matchedUserId}).fName;
	 // 	var transKey;
	 //   	for(var contactParametersKey in pendingTrans.contactParameters) {
	 //   		if(pendingTrans.contactParameters[contactParametersKey].ilendbooksId == ilendbooksId) {
	 //   			transKey = contactParametersKey;
	 //   		}
	 //   	}

		// var borrowerName = UserProfile.findOne({userId: pendingTrans.contactParameters[transKey].borrowerUserId}).fName;


		
	   	switch(this.status) {
		    case ilendbooks.public.status.AVAILABLE:
		        modalTitle = "Available";
		        modalBody =  "This book is available for lending ...";
		        break;
		    case ilendbooks.public.status.MATCHED:
		        modalTitle = "Browwer Matched";
		        modalBody =  "This book is set to be lended to " + matchedUserName + ". Please contact " + matchedUserName ;
		        break;
		    case ilendbooks.public.status.NO_LENDER:
		        modalTitle = "No Lender";
		        modalBody =  "You don't worry! we are working hard to find a lender will contact you as soon as we find one.";
		        break;
		    case ilendbooks.public.status.TRANSACTION_COMPLETE:
		        modalTitle = "Transaction Complete";
		        modalBody = "Transaction Complete, borrower returned the book back to you";
		        break;
		    case ilendbooks.public.status.WITH_BORROWER:
		        modalTitle = "With Borrower";
		        modalBody = "This book is with your friend " + matchedUserName;
		        break;
		    case ilendbooks.public.status.BORROWED:
		        modalTitle = "Borrowed";
		        modalBody = "You have borrowed this book from " + matchedUserName;
		        break;
	    }
	    Session.set(ilendbooks.public.modal.TITLE, modalTitle);
	    Session.set(ilendbooks.public.modal.BODY, modalBody);

	    Modal.show('ilendInfoModal');
	},

})