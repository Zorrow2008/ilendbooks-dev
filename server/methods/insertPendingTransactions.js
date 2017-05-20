
Meteor.methods({
	insertPendingTransactions(appUUID, contactParameters, status){

		for (var contactParametersKey in contactParameters) {
			console.log( appUUID 
				+ ":insertPendingTransactions:" 
				+ contactParametersKey + "=" + contactParameters[contactParametersKey]
			);
		}
		console.log(appUUID + + ":insertPendingTransactions:status="+ status);
		PendingTransactions.insert({
			lenderUserId: contactParameters.lenderUserId,
			borrowerUserId: contactParameters.borrowerUserId,
			ilendbooksId: contactParameters.ilendbooksId,
			status:status,
			contactParameters: contactParameters
		});
	}

});
