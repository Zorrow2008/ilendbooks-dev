Meteor.methods({
  	insertInitialReview(appUUID) {
  		console.log(appUUID + ":insertInitialReview:userId=" + Meteor.userId());
	    Reviews.insert({
	         userId: Meteor.userId(),
	         asLenderReviews: [],
	         asBorrowerReviews: [],
	         averageLenderRating: 0,
	         averageBorrowerRating: 0,
	         averageUserRating: 0
	    });
	}

});