
Meteor.methods({
   	updateToBorrowAndContactLender(appUUID, borrowerInfoBook) {  
		for (var borrowerInfoBookKey in borrowerInfoBook) {
			console.log( appUUID + ":updateToBorrowAndContactLender:" + borrowerInfoBookKey + "=" + borrowerInfoBook[borrowerInfoBookKey]);
		}

		Meteor.call('updateToBorrow', appUUID, borrowerInfoBook);
		Meteor.call('contactLender', appUUID, borrowerInfoBook);
   	}
})
