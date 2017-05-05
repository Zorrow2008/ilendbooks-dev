Template.myBorrows.helpers({
	getBorrowedBooks: function() {
		console.log("getBorrowBooks is called");
		var doc = UserBorrowShelf.findOne({userId: Meteor.userId()});
		return doc.bookInfo;
	}
})