Meteor.methods({
	insertBorrowerReview(borrowerUserId, userInteractionRating, returnQuality,optionalNotes ) {
		var borrowerReviewDoc = Reviews.findOne({userId: borrowerUserId});
		var borrowerReview = {
			matchedReviewerId: Meteor.userId(),
			userInteractionRating: userInteractionRating,
			returnQuality: returnQuality,
			optionalNotes: optionalNotes
		}
		for(var key in borrowerReview) {
			console.log("borrowerReviewKey: " + key + "value: " + borrowerReview[key]);
		}
		var totalBorrowerRatings = 0;
		var keyCount = 1;
		//if(borrowerReviewDoc.asBorrowerReviews.length >= 1) {
			for(var key in borrowerReviewDoc.asBorrowerReviews) {
				totalBorrowerRatings = borrowerReviewDoc.asBorrowerReviews[key].userInteractionRating 
				+ borrowerReviewDoc.asBorrowerReviews[key].returnQuality;
				keyCount++;
			}
		//}
		console.log("asBorrowerReviews size: " + borrowerReviewDoc.asBorrowerReviews.length)
		totalBorrowerRatings += userInteractionRating + returnQuality;
		console.log("totalBorrowerRatings: " + totalBorrowerRatings);
		averageBorrowerRating = totalBorrowerRatings / ((2 * keyCount).toPrecision(3));
		averageBorrowerRating = Math.round(averageBorrowerRating * 100)/100;
		averageUserRating = (borrowerReviewDoc.averageLenderRating + averageBorrowerRating)/2;
		averageUserRating = Math.round(averageUserRating * 100) / 100;
		console.log("averageBorrowerRating: " + averageBorrowerRating);
		Reviews.update({userId: borrowerUserId}, {$set: {averageBorrowerRating: averageBorrowerRating, averageUserRating: averageUserRating}});
		Reviews.update({userId: borrowerUserId}, {$push: {asBorrowerReviews: borrowerReview}});
	}
})