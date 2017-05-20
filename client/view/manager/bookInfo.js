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
	   	var matchedUserName="";
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
		    case ilendbooks.public.status.MATCHED_NOTIFIED:
		        matchedUserName= UserProfile.findOne({userId: this.matchedUserId}).fName;
		        modalTitle = "Lender Notified";
		        modalBody =  "Lender  " + matchedUserName + " is notified of borrower request to borrow this book";
		        break;
		    case ilendbooks.public.status.MATCHED_ACCEPTED:
		        modalTitle = "Lender Accepted the Borrowe Request";
		        modalBody =  "Lender  " + matchedUserName + " accepted the borrower's request to borrow this book. Please arrange a meet up for exchange.";
		        break;
		    case ilendbooks.public.status.BORROWER_LENT_RECEIVED:
		        modalTitle = "Borrower received the book";
		        modalBody =  "The borrower indicated that received the book from the lender,  lender yet to confirm.";
		        break;
		    case ilendbooks.public.status.LENDER_LENT_DECLARED:
		        modalTitle = "Lender gave the book";
		        modalBody =  "The lender indicated that gave the book to borrower,  borrower yet to confirm.";
		        break;
		    case ilendbooks.public.status.WITH_BORROWER:
		        matchedUserName= UserProfile.findOne({userId: this.matchedUserId}).fName;
		        modalTitle = "With Borrower";
		        modalBody = "This book is with your friend " + matchedUserName;
		        break;
		    case ilendbooks.public.status.BORROWED:
		        matchedUserName= UserProfile.findOne({userId: this.matchedUserId}).fName;
		        modalTitle = "Borrowed";
		        modalBody = "You have borrowed this book from " + matchedUserName;
		        break;
		    case ilendbooks.public.status.LENDER_RETURN_RECEIVED:
		        modalTitle = "Lender got the book back";
		        modalBody =  "The lender indicated that received the book back from the borrower, borrower yet to confirm.";
		        break;
		    case ilendbooks.public.status.BORROWER_RETURN_DECLARED:
		        modalTitle = "Borrower returned the book";
		        modalBody =  "The Borrower indicated that returned the book back to the lender, lender yet to confirm.";
		        break;
		    case ilendbooks.public.status.MATCHED:
		        matchedUserName= UserProfile.findOne({userId: this.matchedUserId}).fName;
		        modalTitle = "Borrower Matched";
		        modalBody =  "This book is set to be lended to " + matchedUserName + ". Please contact " + matchedUserName ;
		        break;
		    case ilendbooks.public.status.NO_LENDER:
		        modalTitle = "No Lender";
		        modalBody =  "You don't worry! we are working hard to find a lender will contact you as soon as we find one.";
		        break;
		    case ilendbooks.public.status.TRANSACTION_COMPLETE:
		        modalTitle = "Transaction Complete";
		        modalBody = "Transaction Complete, borrower returned the book back to lender";
		        break;
	    }
	    Session.set(ilendbooks.public.modal.TITLE, modalTitle);
	    Session.set(ilendbooks.public.modal.BODY, modalBody);

	    Modal.show('ilendInfoModal');
	}
})
