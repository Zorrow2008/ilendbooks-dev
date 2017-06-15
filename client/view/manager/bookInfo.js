Template.bookInfo.helpers({

	getNumberOfPages: function(ilendbooksId) {
		//var currentLentBook = Session.get('currentLentBook');
		var currentLentBook = Books.findOne({_id: ilendbooksId});
		return currentLentBook.ItemAttributes[0].NumberOfPages[0];
	},

	getAuthor: function(ilendbooksId) {
		//var currentLentBook = Session.get('currentLentBook');
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
	}, 

   getNextStatePrompt() {
   		var currentRoute=Router.current().route.getName();
   		var forWho;
   		if(currentRoute == "myBorrows"){
   			forWho=ilendbooks.public.userType.BORROWER;
   		} else if(currentRoute == "myShelf") {
   			forWho=ilendbooks.public.userType.LENDER;
   		}
		var iLendMetaData = ILendMetaData.findOne(
			{
				$and: [
					{status:this.status},
					{ $or: [{forWho:forWho},{forWho:ilendbooks.public.userType.BOTH}]}
				]
			}
		)
		return iLendMetaData.statusMeta;



		

     //  	switch(this.status) {
     //      	case ilendbooks.public.status.AVAILABLE:
     //          	nextStatus = ilendbooks.public.status.REMOVED;
     //          	prompt= "Remove from shelf?";
     //          	break;
     //      	case ilendbooks.public.status.MATCHED_NOTIFIED:
     //          	nextStatus = ilendbooks.public.status.MATCHED_ACCEPTED;
     //          	prompt= "Remove from shelf?";
     //          	break;
     //      	case ilendbooks.public.status.MATCHED_ACCEPTED:
     //          	nextStatus = ilendbooks.public.status.LENDER_LENT_DECLARED;
     //          	prompt= "Handed over the book to borrower?";
     //          	break;
     //     	case ilendbooks.public.status.MATCHED_DECLINED:
     //          	modalTitle = "Lender Declined the Borrow Request";
     //          	modalBody =  "Lender  " + matchedUserName 
     //          		+ " declined the borrower's request to borrow this book. Please search for another lender.";
     //          	break;
     //      	case ilendbooks.public.status.LENDER_LENT_DECLARED:
     //          	nextStatus = ilendbooks.public.status.LENDER_RETURN_RECEIVED;
     //          	prompt= "Received the book back?";
     //          	break;
		  	// case ilendbooks.public.status.BORROWER_LENT_RECEIVED:
		   //      modalTitle = "Borrower received the book";
		   //      prompt= "Did you gave the book to borrower?";
		   //      break;
     //      	case ilendbooks.public.status.WITH_BORROWER:
     //          	nextStatus = ilendbooks.public.status.LENDER_RETURN_RECEIVED;
     //          	prompt= "Received the book back?";
     //          	break;
		  	// case ilendbooks.public.status.LENDER_RETURN_RECEIVED:
			  // 	nextStatus = ilendbooks.public.status.LENDER_RETURN_REVIEW;
			  // 	prompt= "Provide review, pretty please!!!";
		   //    	break;

     //   	}
   }
})

Template.bookInfo.events({

	'click .option': function(event) {
		event.preventDefault();

		// for (var thisKey in this) {
		// 	console.log("option-1:" + thisKey +"=" + this[thisKey]);
		// }
		// for (var eventKey in event) {
		// 	console.log("option-1:" + eventKey +"=" + event[eventKey]);
		// }
		var ilendbooksId=event.currentTarget.id;
		var appUUID = Session.get('appUUID');
		console.log('option:ilendbooksId=' + ilendbooksId)
		if (this.actionModalNext){
		    Session.set(ilendbooks.public.modal.action.TITLE,this.modalTitle);
		    Session.set(ilendbooks.public.modal.action.BODY, this.modalBody);
		    Session.set(ilendbooks.public.modal.action.FEED_BACK_FLAG, this.modalFeedBackFlag);
		    Session.set(ilendbooks.public.modal.action.FEED_BACK_LABEL, this.modalFeedBackLabel);
		    Session.set(ilendbooks.public.modal.action.DISPLAY, this.modalDisplay);
		    Session.set(ilendbooks.public.modal.action.CLASS, this.modalClass);
		    Session.set("ilendbooksId", ilendbooksId);

		    Modal.show('ilendActionModal');	
		} else {
	   		switch(this.nextStatus) {
	   		case ilendbooks.public.status.AVAILABLE:
	   			Meteor.call("updateUserBookAddedBack", appUUID, ilendbooksId);
	   			break;
			case ilendbooks.public.status.MATCHED_ACCEPTED:
		    	  var appUUID = Session.get('appUUID');
		    	  console.log("lenderUserId: " + Meteor.userId());
			      var contactParameters = PendingTransactions.findOne({
			         lenderUserId: Meteor.userId(),  
			         ilendbooksId: ilendbooksId,
			         statusLend:ilendbooks.public.status.MATCHED_NOTIFIED,
                     statusBorrow:ilendbooks.public.status.MATCHED_NOTIFIED
			      }).contactParameters;
			      Meteor.call("updateMatchAcceptedAndContactBorrower", appUUID, contactParameters);
		        break;
	        case ilendbooks.public.status.PAST_BORROW:
		        var contactParameters = PendingTransactions.findOne({
			         borrowerUserId: Meteor.userId(),  
			         ilendbooksId: ilendbooksId,
			         statusLend:ilendbooks.public.status.TRANSACTION_COMPLETE_LENDER,
                     statusBorrow:ilendbooks.public.status.TRANSACTION_COMPLETE
			      }).contactParameters;	  
			    console.log("bookInfo:contactParameters.lenderUserId=" + contactParameters.lenderUserId);  	
				Session.set('ilendbooksId', ilendbooksId);
				Session.set('lenderUserId', contactParameters.lenderUserId);
				Session.set('borrowerUserId', Meteor.userId());
				Modal.show("lenderReview");
				break;
			case ilendbooks.public.status.PAST_LEND:
		        var contactParameters = PendingTransactions.findOne({
			         lenderUserId: Meteor.userId(),  
			         ilendbooksId: ilendbooksId,
			         statusLend:ilendbooks.public.status.TRANSACTION_COMPLETE_LENDER,
                     statusBorrow:ilendbooks.public.status.TRANSACTION_COMPLETE
			      }).contactParameters;	
			      Session.set('ilendbooksId', ilendbooksId);
			      Session.set('lenderUserId', Meteor.userId());
			      Session.set('borrowerUserId', contactParameters.borrowerUserId);
			      Modal.show("borrowerReview");		
				break;

	        // case ilendbooks.public.status.BORROWER_RETURN_DECLARED:
	        // 	var appUUID = Session.get('appUUID');
	        // 	var contactParameters = PendingTransactions.findOne({
	        // 		lenderUserId: Meteor.userId(),
	        // 		borrowerUserId: PendingTransactions.findOne({lenderUserId: Meteor.userId(), ilendbooksId: ilendbooksId}).contactParameters.borrowerUserId,
	        // 		ilendbooksId: ilendbooksId,
	        // 		status: ilendbooks.public.status.BORROWER_RETURN_DECLARED
	        // 	}).contactParameters;
	        // 	Meteor.call('updateAvailable', appUUID, contactParameters);
	        // 	Meteor.call('updateTransactionComplete', appUUID, contactParameters);
        	// case ilendbooks.public.status.LENDER_RETURN_RECEIVED:
        	// 	var appUUID = Session.get('appUUID');
	        // 	var contactParameters = PendingTransactions.findOne({
	        // 		borrowerUserId: Meteor.userId(),
	        // 		lenderUserId: PendingTransactions.findOne({borrowerUserId: Meteor.userId(), ilendbooksId: ilendbooksId}).contactParameters.lenderUserId,
	        // 		ilendbooksId: ilendbooksId,
	        // 		status: ilendbooks.public.status.BORROWER_RETURN_DECLARED
	        // 	}).contactParameters;
	        // 	Meteor.call('updateAvailable', appUUID, contactParameters);
	        // 	Meteor.call('updateTransactionComplete', appUUID, contactParameters);
			}
		}
	},
	   'click .ilendInfoModal' : function(event) {
	   	var ilendbooksId = this.ilendbooksId;
	   	var status = this.status;
	   	console.log("status: " + status);
	   	var modalTitle = "ilendbooks";
	   	var modalBodyArray = ["It is great that you are lending/borrowing text books... SAVE THE EARTH!"];

	   	var matchedUserName="";
		
	   	switch(this.status) {
		    case ilendbooks.public.status.AVAILABLE:
		        modalTitle = "Available";
		        modalBodyArray =  ["This book is available for lending ..."];
		        break;
		    case ilendbooks.public.status.REMOVED:
		        modalTitle = "Removed";
		        modalBodyArray =  ["This book has been removed from your shelf ..."];
		        break;
		    case ilendbooks.public.status.MATCHED_NOTIFIED:
		        matchedUserName= UserProfile.findOne({userId: this.matchedUserId}).fName;
		        modalTitle = "Lender Notified";
		        modalBodyArray =  ["Lender  " + matchedUserName + " is notified of borrower request to borrow this book"];
		        break;
		    case ilendbooks.public.status.MATCHED_ACCEPTED:
		        modalTitle = "Lender Accepted the Borrowe Request";
		        modalBodyArray =  ["Lender  " 
		        					+ matchedUserName 
		        					+ " accepted the borrower's request to borrow this book. Please arrange a meet up for exchange."
		        				  ];
		        break;
			case ilendbooks.public.status.MATCHED_DECLINED:
		        modalTitle = "Lender Declined the Borrow Request";
		        modalBodyArray =  ["Lender  " 
		        					+ matchedUserName 
		        					+ " declined the borrower's request to borrow this book. Please search for another lender."
		        				   ];
		        break;
		    case ilendbooks.public.status.BORROWER_LENT_RECEIVED:
		        modalTitle = "Borrower received the book";
		        modalBodyArray =  ["The borrower indicated that received the book from the lender,  lender yet to confirm."];
		        break;
		    case ilendbooks.public.status.LENDER_LENT_DECLARED:
		        modalTitle = "Lender gave the book";
		        modalBodyArray =  ["The lender indicated that gave the book to borrower,  borrower yet to confirm."];
		        break;
		    case ilendbooks.public.status.WITH_BORROWER:
		        matchedUserName= UserProfile.findOne({userId: this.matchedUserId}).fName;
		        modalTitle = "With Borrower";
		        modalBodyArray = ["This book is with your friend " + matchedUserName];
		        break;
		    case ilendbooks.public.status.BORROWED:
		        matchedUserName= UserProfile.findOne({userId: this.matchedUserId}).fName;
		        modalTitle = "Borrowed";
		        modalBodyArray = ["You have borrowed this book from " + matchedUserName];
		        break;
		    case ilendbooks.public.status.LENDER_RETURN_RECEIVED:
		        modalTitle = "Lender got the book back";
		        modalBodyArray =  ["The lender indicated that received the book back from the borrower, borrower yet to confirm."];
		        break;
		    case ilendbooks.public.status.BORROWER_RETURN_DECLARED:
		        modalTitle = "Borrower returned the book";
		        modalBodyArray =  ["The Borrower indicated that returned the book back to the lender, lender yet to confirm."];
		        break;
		    case ilendbooks.public.status.MATCHED:
		        matchedUserName= UserProfile.findOne({userId: this.matchedUserId}).fName;
		        modalTitle = "Borrower Matched";
		        modalBodyArray =  ["This book is set to be lended to " + matchedUserName + ". Please contact " + matchedUserName ];
		        break;
		    case ilendbooks.public.status.NO_LENDER:
		        modalTitle = "No Lender";
		        modalBodyArray =  ["You don't worry! we are working hard to find a lender will contact you as soon as we find one."];
		        break;
		    case ilendbooks.public.status.TRANSACTION_COMPLETE:
		        modalTitle = "Transaction Complete";
		        modalBodyArray = ["Transaction Complete, borrower returned the book back to lender."];
		        break;
		    case ilendbooks.public.status.PAST_BORROW:
		        modalTitle = "Past Borrow";
		        modalBodyArray = ["You have enjoyed this book in the past."];
		        break;
	    }
	    Session.set(ilendbooks.public.modal.TITLE, modalTitle);
	    Session.set(ilendbooks.public.modal.BODY_ARRAY, modalBodyArray);

	    Modal.show('ilendInfoModal');
	}
})
