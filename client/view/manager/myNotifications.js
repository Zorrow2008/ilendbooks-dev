Template.myNotifications.helpers({
	getPendingTransactions: function() {
		return PendingTransactions.find({lenderUserId: Meteor.userId()});
	},

	getBorrowerName: function(contactParameters) {
		return UserProfile.findOne({userId: contactParameters.borrowerUserId}).fName;
	},

	getLenderBook: function(contactParameters) {
		return Books.findOne({_id: contactParameters.ilendbooksId}).ItemAttributes[0].Title[0];
	},

	getPath: function() {
		console.log("current path: " + Iron.Location.get().path);
		//console.log(Router.current().route.path(this))
		console.log("current url: " + Router.current().url);
		return Iron.Location.get().path;
	}
})