Template.myShelf.helpers({
	getLentBooks: function() {
		console.log("getLendBooks is called");
		var doc = UserLendShelf.findOne({userId: Meteor.userId()});
		return doc.bookInfo;
	},

	// storeInSession:function(ilendbooksId) {
	// 	console.log("storeInSession is called");
	// 	var currentLentBook = Books.findOne({_id: ilendbooksId});
	// 	Session.setAuth('currentLentBook' , currentLentBook);
	// },

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

	isAvailable: function(status) {
		console.log("isAvailable called");
		return status == 'available';
	},

	isMatched: function(status) {
		console.log("isMatched called");
		return status == 'matched';
	},

	noLender: function(status) {
		console.log("noLender called");
		return status == 'no-lender';
	},

	isComplete: function(status) {
		console.log("isComplete called");
		return status == 'transaction-complete'
	},

	

})