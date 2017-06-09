Meteor.methods({
	updateTransactionComplete(appUUID, contactParameters) {

	    var updateStatusInfo = {
	    	status : ilendbooks.public.status.TRANSACTION_COMPLETE,
	    	ilendbooksId : contactParameters.ilendbooksId,
	    	lenderUserId : contactParameters.lenderUserId,
	    	borrowerUserId : contactParameters.borrowerUserId
	    }
		Meteor.call("updateStatus", appUUID, updateStatusInfo );
		//Meteor.call("contact", appUUID, contactParameters);
		Meteor.call('insertHistory', appUUID, updateStatusInfo );
	}
})