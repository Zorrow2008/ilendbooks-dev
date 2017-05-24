Meteor.methods({
	insertBorrowerReview(borrowerUserId, userInteractionRating, returnQuality,optionalNotes ) {
		var borrowerReviewDoc = Reviews.findOne({userId: borrowerUserId});
		var borrowerReview = {
			matchedReviewerId: Meteor.userId(),
			userInteractionRating: userInteractionRating,
			returnQuality: returnQuality,
			optionalNotes: optionalNotes
		}
		var totalBorrowerRatings = 0;
		var keyCount = 0;
		for(var key in borrowerReviewDoc.asBorrowerReviews) {
			totalBorrowerRatings = borrowerReviewDoc.asBorrowerReviews[key].userInteractionRating 
			+ borrowerReviewDoc.asBorrowerReviews[key].returnQuality;
			keyCount++;
		}
		averageBorrowerRating = (totalBorrowerRatings/(2*keyCount)).toPrecision(3);
		averageUserRating = borrowerReviewDoc.averageLenderRating + averageBorrowerRating;
		Reviews.update({userId: borrowerUserId}, {$set: {averageBorrowerRating: averageBorrowerRating, averageUserRating: averageUserRating}});
		Reviews.update({userId: borrowerUserId}, {$push: {asBorrowerReviews: borrowerReview}});



	}
})