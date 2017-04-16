Meteor.methods({
	updateBookCondition(currentLender) {
	console.log("updateBookCondition called");
	console.log("title: " + currentLender.title);
	console.log("condition: " + currentLender.condition);
	console.log("description: " + currentLender.description);
	var lendDoc = ToLend.findOne({title: currentLender.title});
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
		bookCondition : currentLender.condition,
		bookDescription: currentLender.description
	}

	for(var key in finalLender) {
		console.log("key: " + key + "; value: " + finalLender[key]);
	}

	ToLend.update(
	    { "title": currentLender.title,
		  "lender.userId": Meteor.userId() },
	    { "$set": { "lender.$.bookCondition": finalLender.bookCondition,
	     			"lender.$.bookDescription": finalLender.bookDescription
 				  } 
 		}

	)

    // ToLend.upsert({
    //       title: currentLender.title,
    //    }, {
    //       $set: {
    //     	lender: finalLender
    //       }
    //    }
    // );

    // ToLend.update({
    // 	title: currentLender.title
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