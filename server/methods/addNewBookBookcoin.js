Meteor.methods({
	addNewBookBookcoin(appUUID, amount) {
		var currentUser = Meteor.userId();
		var currentUserDoc = UserProfile.findOne({userId: currentUser});
		var newScore = currentUserDoc.bookcoin + amount;
		UserProfile.update({userId: currentUser}, {$set: {bookcoin: newScore}});
	}
})
