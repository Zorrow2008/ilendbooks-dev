Meteor.methods({
  	insertHistory(appUUID, transactionInfo) {

    for (var transactionInfoKey in transactionInfo) {
      console.log( appUUID 
        + ":insertHistory:" 
        + transactionInfoKey + "=" + transactionInfo[transactionInfoKey]
      );
    }

    var statusInfo = { 
      appUUID:appUUID,
      status:transactionInfo.status,
      createdAt: new Date()
    }

    History.upsert({
				lenderUserId: transactionInfo.lenderUserId,
        borrowerUserId: transactionInfo.borrowerUserId,
        ilendbooksId: transactionInfo.ilendbooksId
            }, {
                  $set: {
                      lenderUserId: transactionInfo.lenderUserId,
                      borrowerUserId: transactionInfo.borrowerUserId,
                      ilendbooksId: transactionInfo.ilendbooksId
                  },
                  $push: {
                      statusInfo
                  }
               }
            )
  }
});