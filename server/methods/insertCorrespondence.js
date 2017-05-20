Meteor.methods({
  	insertCorrespondence(appUUID, toUserId, correspondanceDetail) {
		console.log( appUUID + ":insertCorrespondence:toUserId=" + toUserId);
		for (var correspondanceDetailKey in correspondanceDetail) {
			console.log( appUUID 
				+ ":insertCorrespondence:" 
				+ correspondanceDetailKey + "=" + correspondanceDetail[correspondanceDetailKey]
			);
		}
            Correspondence.upsert({
				toUserId:toUserId
            }, {
                  $set: {
					toUserId:toUserId
                  },
                  $push: {
                        correspondanceDetail:correspondanceDetail
                  }
               }
            )
  }
});

