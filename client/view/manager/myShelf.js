Template.myShelf.helpers({
	getBooks: function() {
		console.log("getLendBooks is called");
		var doc = UserLendShelf.findOne({userId: Meteor.userId()});
		return doc.bookInfo;
	},

	storeInSession:function(ilendbooksId) {
		console.log("storeInSession is called");
		var currentBook = Books.findOne({_id: ilendbooksId});
		Session.setAuth('currentBook' , currentBook);
	},

	getAuthor: function() {
		var currentBook = Session.get('currentBook');
		return currentBook.ItemAttributes[0].Author[0];
	},

	getTitle: function() {
		var currentBook = Session.get('currentBook');
		return currentBook.ItemAttributes[0].Title[0];
	},

	getImage: function() {
		var currentBook = Session.get('currentBook');
		return currentBook.MediumImage[0].URL[0];
	},

	getPublisher: function() {
		var currentBook = Session.get('currentBook');
		return currentBook.ItemAttributes[0].Publisher[0];

	},

	getISBN: function() {
		var currentBook = Session.get('currentBook');
		return currentBook.ItemAttributes[0].ISBN[0];
	},

	getEdition: function() {
		var currentBook = Session.get('currentBook');
		return currentBook.ItemAttributes[0].Edition[0];
	},

	getPublicationDate: function() {
		var currentBook = Session.get('currentBook');
		return currentBook.ItemAttributes[0].PublicationDate[0];
	}
})