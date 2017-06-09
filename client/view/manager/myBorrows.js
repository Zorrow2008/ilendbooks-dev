Template.myBorrows.helpers({
	getBorrowedBooks: function() {
		console.log("getBorrowBooks is called");
		var doc = UserBorrowShelf.findOne({userId: Meteor.userId()});
		return doc.bookInfo;
	},

	hasBooks: function() {
		console.log("hasBooks was called");
		if( UserBorrowShelf.findOne({userId: Meteor.userId()})) {
			return true;
		}
		return false;
	},

	isMatchedAcceptedBorrower: function(status) {
		return status == ilendbooks.public.status.MATCHED_ACCEPTED;
	},
})

Template.myBorrows.events({
	'click .yes' :function(event) {
		Meteor.call('updateBorrowerLentReceived', this.bookInfo);
		var borrowerName = UserProfile.findOne({userId: Meteor.userId()}).fName;
		var notificationLink = "";
		var emailInfo = {
			from: "admin@ilendbooks.com",
			to: UserProfile.findOne({userId: this.bookInfo.matchedUserId}).email,
			subject: "Borrower lent received",
			text: borrowerName + "has received your book. Please visit " + notificationLink + " to confirm that you have lent him your book."
		}
		Meteor.call('emailMatchedUser', emailInfo);
	},

	'click .lenderReview': function(event) {
		Session.setAuth('ilendbooksId', this.ilendbooksId);
		Session.setAuth('lenderId', this.matchedUserId);
		Session.setAuth('borrowerId', Meteor.userId());
		console.log("myBorrows ilendbooksId set");
		Modal.show("lenderReview");
		
	}

})