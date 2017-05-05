Template.myShelf.helpers({
	getLentBooks: function() {
		console.log("getLendBooks is called");
		var doc = UserLendShelf.findOne({userId: Meteor.userId()});
		return doc.bookInfo;
	}
})