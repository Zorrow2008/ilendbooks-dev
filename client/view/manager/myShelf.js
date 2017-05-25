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
	},

	notRemoved: function(ilendbooksId) {
		var doc = UserLendShelf.findOne({userId: Meteor.userId()});
		var bookKey;
		for(var key in doc.bookInfo) {
			if(doc.bookInfo[key].ilendbooksId == ilendbooksId) {
				bookKey = key;
			}
		}
		return (doc.bookInfo[bookKey].status != ilendbooks.public.status.REMOVED) && (doc.bookInfo[bookKey].status == ilendbooks.public.status.AVAILABLE);		
	}
})

// Template.myShelf.events({
// 	'click .remove': function(event) {
// 		var ilendbooksId = this.ilendbooksId;
// 		console.log(ilendbooksId);
// 		Meteor.call('deleteFromMyShelf', ilendbooksId);
		
// 	}
// })