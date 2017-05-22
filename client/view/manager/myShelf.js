Template.myShelf.helpers({
	getLentBooks: function() {
		console.log("getLendBooks is called");
		var doc = UserLendShelf.findOne({userId: Meteor.userId()});
		return doc.bookInfo;
	},

	hasBooks: function() {
		console.log("isEmpty was called");
		if( UserLendShelf.findOne({userId: Meteor.userId()}) != null) {
			return true;
		}
		return false;
	}
})