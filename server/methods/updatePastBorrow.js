Meteor.methods({
	updatePastBorrow(appUUID, contactParameters) {
		console.log("updatePastBorrow called");
	    var updateStatusInfo = {
	    	status : ilendbooks.public.status.PAST_BORROW,
	    	ilendbooksId : contactParameters.ilendbooksId,
	    	lenderUserId : contactParameters.lenderUserId,
	    	borrowerUserId : contactParameters.borrowerUserId
	    }
		Meteor.call('updateStatus', appUUID, updateStatusInfo)
		//Meteor.call('updateBorrowerStatus', 0, ilendbooksId, borrowerUserId, ilendbooks.public.status.PAST_BORROW);
		console.log("updateStatus called");
		Meteor.call('insertHistory', appUUID, updateStatusInfo );
	}
})