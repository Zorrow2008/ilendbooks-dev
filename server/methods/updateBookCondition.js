Meteor.methods({
	updateBookCondition(appUUID, bookConditionInfo) {
	console.log(appUUID + ":executing updateBookCondition ...");
	for( var bookConditionInfoKey in  bookConditionInfo) {
		console.log(appUUID + ":" + bookConditionInfoKey + "=" + bookConditionInfo[bookConditionInfoKey] );
	}

	var lendDoc = ToLend.findOne({title: bookConditionInfo.title});
	for(var lenderKey in lendDoc.lender) {
		if(lendDoc.lender[lenderKey].userId = Meteor.userId()) {
			var userKey = lenderKey;
			break;
		}
	}
	
	var finalLender = {
		userId : Meteor.userId(),
		dateTime : lendDoc.lender[userKey].dateTime,
		hasMatched : lendDoc.lender[userKey].hasMatched,
		bookCondition : bookConditionInfo.condition,
		bookDescription: bookConditionInfo.description
	}

	for(var key in finalLender) {
		console.log("key: " + key + "; value: " + finalLender[key]);
	}

	ToLend.update(
	    { "title": bookConditionInfo.title,
		  "lender.userId": Meteor.userId() },
	    { "$set": { "lender.$.bookCondition": finalLender.bookCondition,
	     			"lender.$.bookDescription": finalLender.bookDescription
 				  } 
 		}

	)

    // ToLend.upsert({
    //       title: bookConditionInfo.title,
    //    }, {
    //       $set: {
    //     	lender: finalLender
    //       }
    //    }
    // );

    // ToLend.update({
    // 	title: bookConditionInfo.title
    // }, {
    // 	$pull: {
    // 		lender: {
    // 			bookCondition: null
    // 		}

    // 	}
    // })




    // var selector = { title: title};
    // var modifier = {$set: { 'lender.$.bookCondition': condition, 'lender.$.bookDescription' : description }};
 	 // ToLend.update(
   //      { title: title}, 
   //      {$set: { 'lender.$.bookCondition': condition, 'lender.$.bookDescription' : description }}
   //    );
   }

})