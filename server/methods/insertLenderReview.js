Meteor.methods({
	insertLenderReview(appUUID, lenderUserId, userInteractionRating, advertisedQualityRating,optionalNotes ) {
		var lenderReviewDoc = Reviews.findOne({userId: lenderUserId});
		var lenderReview = {
			matchedReviewerId: Meteor.userId(),
			userInteractionRating: userInteractionRating,
			advertisedQualityRating: advertisedQualityRating,
			optionalNotes: optionalNotes
		}
		var totalLenderRatings = 0;
		var keyCount = 1;
		for(var key in lenderReviewDoc.asLenderReviews) {
			totalLenderRatings = lenderReviewDoc.asLenderReviews[key].userInteractionRating 
			+ lenderReviewDoc.asLenderReviews[key].advertisedQualityRating;
			keyCount++;
		}
		if(keyCount == 1) {
		averageLenderRating = userInteractionRating + advertisedQualityRating;
		if(lenderReviewDoc.averageBorrowerRating == 0) {
			averageUserRating = averageLenderRating;
		}else{
			averageUserRating = Math.round(((lenderReviewDoc.averageBorrowerRating + averageLenderRating)/2)* 100) / 100
	    	}
		}else{
			totalLenderRatings += userInteractionRating + advertisedQualityRating;
			averageLenderRating = Math.round((totalLenderRatings / ((2 * keyCount).toPrecision(3)))* 100) / 100;
			averageUserRating = Math.round(((lenderReviewDoc.averageBorrowerRating + averageLenderRating)/2)* 100) / 100
			console.log("averageLenderRating: " + averageLenderRating);
			Reviews.update({userId: lenderUserId}, {$set: {averageLenderRating: averageLenderRating, averageUserRating: averageUserRating}});
			Reviews.update({userId: lenderUserId}, {$push: {asLenderReviews: lenderReview}});
		}


	}

})