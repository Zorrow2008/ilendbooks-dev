Template.myBorrows.helpers({
	getBorrowedBooks: function() {
		console.log("getBorrowBooks is called");
		var doc = UserBorrowShelf.findOne({userId: Meteor.userId()});
		return doc.bookInfo;
	},

	// storeInSession:function(ilendbooksId) {
	// 	console.log("storeInSession is called");
	// 	var currentBorrowBook = Books.findOne({_id: ilendbooksId});
	// 	Session.setAuth('currentBorrowBook' , currentBorrowBook);
	// },

	getAuthor: function(ilendbooksId) {
		//var currentBorrowBook = Session.get('currentBorrowBook');
		var currentBorrowBook = Books.findOne({_id: ilendbooksId});
		return currentBorrowBook.ItemAttributes[0].Author[0];
	},

	getTitle: function(ilendbooksId) {
		//var currentBorrowBook = Session.get('currentBorrowBook');
		var currentBorrowBook = Books.findOne({_id: ilendbooksId});
		return currentBorrowBook.ItemAttributes[0].Title[0];
	},

	getImage: function(ilendbooksId) {
		//var currentBorrowBook = Session.get('currentBorrowBook');
		var currentBorrowBook = Books.findOne({_id: ilendbooksId});
		return currentBorrowBook.MediumImage[0].URL[0];
	},

	getPublisher: function(ilendbooksId) {
		//var currentBorrowBook = Session.get('currentBorrowBook');
		var currentBorrowBook = Books.findOne({_id: ilendbooksId});
		return currentBorrowBook.ItemAttributes[0].Publisher[0];

	},

	getISBN: function(ilendbooksId) {
		//var currentBorrowBook = Session.get('currentBorrowBook');
		var currentBorrowBook = Books.findOne({_id: ilendbooksId});
		return currentBorrowBook.ItemAttributes[0].ISBN[0];
	},

	getEdition: function(ilendbooksId) {
		//var currentBorrowBook = Session.get('currentBorrowBook');
		var currentBorrowBook = Books.findOne({_id: ilendbooksId});
		return currentBorrowBook.ItemAttributes[0].Edition[0];
	},

	getPublicationDate: function(ilendbooksId) {
		//var currentBorrowBook = Session.get('currentBorrowBook');
		var currentBorrowBook = Books.findOne({_id: ilendbooksId});
		return currentBorrowBook.ItemAttributes[0].PublicationDate[0];
	}
	// getBooks: function() {
	// 	console.log("getBooks is called");
	// 	var borrowerBooks = ToBorrow.find({"borrower.userId": Meteor.userId()});
	// 	var completeBookInformation = [];
	// 	for(var doc in borrowerBooks) {
	// 		var currentBookInfo = Books.findOne();
	// 		completeBookInformation.push(currentBookInfo);

	// 	}
	// 	console.log("made the new array of documents");
	// 	for(var key in completeBookInformation) {
	// 		console.log("key: " + key + ";value: " + completeBookInformation[key]);
	// 	}
	// 	console.log("printed out the array of new documents");
	// 	return completeBookInformation;
	// },

	// getTitle: function() {
	// 	return title;
	// },

	// getCompleteInformation: function(ilendbooksId) {
	// 	var currentBookCompleteInfo = Books.findOne({_id: ilendbooksId})
	// 	console.log(currentBookCompleteInfo);
	// 	return currentBookCompleteInfo;
	// },

	// getImage: function(completeBookInformation) {
	// 	return completeBookInformation.
	// }
	
})