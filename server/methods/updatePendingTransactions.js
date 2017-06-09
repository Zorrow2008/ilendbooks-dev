
Meteor.methods({
  updatePendingTransactions(appUUID, lenderUserId, borrowerUserId, ilendbooksId, status){
    console.log(appUUID + ":updatePendingTransactions:lenderUserId="+ lenderUserId);
    console.log(appUUID + ":updatePendingTransactions:borrowerUserId="+ borrowerUserId);
    console.log(appUUID + ":updatePendingTransactions:ilendbooksId="+ ilendbooksId);
    console.log(appUUID + ":updatePendingTransactions:status="+ status);

    PendingTransactions.update({
      lenderUserId: lenderUserId,
      borrowerUserId: borrowerUserId,
      ilendbooksId: ilendbooksId
    }, { $set: { status: status } });
  }

});
