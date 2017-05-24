Meteor.methods({
	insertLenderReview(lenderUserId, userInteractionRating, advertisedQualityRating,optionalNotes ) {
		var lenderReviewDoc = Reviews.findOne({userId: lenderUserId});
		var lenderReview = {
			matchedReviewerId: Meteor.userId(),
			userInteractionRating: userInteractionRating,
			advertisedQualityRating: advertisedQualityRating,
			optionalNotes: optionalNotes
		}
		var totalLenderRatings = 0;
		var keyCount = 0;
		for(var key in lenderReviewDoc.asLenderReviews) {
			totalLenderRatings = lenderReviewDoc.asLenderReviews[key].userInteractionRating 
			+ lenderReviewDoc.asLenderReviews[key].advertisedQualityRating;
			keyCount++;
		}
		averageLenderRating = (totalLenderRatings/(2*keyCount)).toPrecision(3);
		averageUserRating = lenderReviewDoc.averageBorrowerRating + averageLenderRating;
		Reviews.update({userId: lenderUserId}, {$set: {averageLenderRating: averageLenderRating, averageUserRating: averageUserRating}});
		Reviews.update({userId: lenderUserId}, {$push: {asLenderReviews: lenderReview}});



	}
})