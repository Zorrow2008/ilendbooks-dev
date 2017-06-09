Template.myShelf.helpers({
	getLentBooks: function() {
		console.log("getLendBooks is called");
		//var doc = UserLendShelf.findOne({userId: Meteor.userId()});
		var doc=UserLendShelf.findOne({
			userId: Meteor.userId(),
			bookInfo:{$elemMatch:{status:{$ne: ilendbooks.public.status.DELETE}}}});
		return doc.bookInfo;
	},

	hasBooks: function() {
		console.log("hasBooks was called");
		var doc = UserLendShelf.findOne({userId: Meteor.userId()})
		console.log("hasBooks was called" + doc);

		if( doc.bookInfo) {
			for(key in  doc.bookInfo) {
				if(doc.bookInfo[key].status != ilendbooks.public.status.DELETE) {
					return true;
					break;
				} 
			}
		}
		return false;

	},

	isNotDelete: function(status) {
		console.log("isNotDelete:status=" + status);
		return status != ilendbooks.public.status.DELETE;
	}

})

Template.myShelf.events({
	'click .borrowerReview': function(event) {
		Session.setAuth('ilendbooksId', this.ilendbooksId);
		Session.setAuth('lenderId', Meteor.userId());
		Session.setAuth('borrowerId',this.matchedUserId);
		console.log("myShelf ilendbooksId set");
		Modal.show("borrowerReview");
		
	}
})