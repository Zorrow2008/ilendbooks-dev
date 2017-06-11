Meteor.methods({
    updateToBorrow(appUUID, borrowerInfoBook) {
        for (var borrowerInfoBookKey in borrowerInfoBook) {
            console.log(appUUID + ":updateToBorrow:borrowerInfoBook." + borrowerInfoBookKey + "=" + borrowerInfoBook[borrowerInfoBookKey]);
        }


        var dateTime = Meteor.call('getLocalTime');
        var currentBookFromToBorrowDB = ToBorrow.findOne({
            title: borrowerInfoBook.title,
            ilendbooksId: borrowerInfoBook.ilendbooksId
        });
        var currentBorrowerInfo = {
            ilendbooksId: borrowerInfoBook.ilendbooksId,
            userId: Meteor.userId(),
            dateTime: dateTime,
            status: borrowerInfoBook.status,
            matchedUserId: borrowerInfoBook.lenderUserId
        };
        if (currentBookFromToBorrowDB == null) {

            ToBorrow.upsert({
                title: borrowerInfoBook.title,
                ilendbooksId: borrowerInfoBook.ilendbooksId
            }, {
                $set: {
                    title: borrowerInfoBook.title,
                    ilendbooksId: borrowerInfoBook.ilendbooksId
                }
            })

            ToBorrow.upsert({
                title: borrowerInfoBook.title,
                ilendbooksId: borrowerInfoBook.ilendbooksId
            }, {
                $push: {
                    borrower: currentBorrowerInfo,
                }
            })
        } else {
            var userPastBorrower = false;
            var isUserMarkedBorrower = false;
            for (currentBookKey in currentBookFromToBorrowDB.borrower) {
                if (currentBookFromToBorrowDB.borrower[currentBookKey].userId === Meteor.userId()) {
                    isUserMarkedBorrower = true;
                    if (currentBookFromToBorrowDB.borrower[currentBookKey].status == ilendbooks.public.status.PAST_BORROWER) {
                        userPastBorrower = true;
                    } 
                }
                break;
            }

            if (isUserMarkedBorrower && !userPastBorrower) {
                console.log(appUUID + ":updateToBorrow:current user is marked as borrower already:" + currentBookFromToBorrowDB.borrower[currentBookKey].userId)
            } else if (userPastBorrower) {
                ToBorrow.insert({
                    title: borrowerInfoBook.title,
                    ilendbooksId: borrowerInfoBook.ilendbooksId
                }, {
                    $push: {
                        borrower: currentBorrowerInfo,
                    }
                })
            } else {
                ToBorrow.upsert({
                    title: borrowerInfoBook.title,
                    ilendbooksId: borrowerInfoBook.ilendbooksId
                }, {
                    $push: {
                        borrower: currentBorrowerInfo,
                    }
                })
            }
        }


        Meteor.call('updateUserBorrowShelf', appUUID, currentBorrowerInfo);
        //Currently logged user is the borrower 
        //matchedUserId is lender
        var transactionInfo = {
            appUUID: appUUID,
            ilendbooksId: currentBorrowerInfo.ilendbooksId,
            borrowerUserId: currentBorrowerInfo.userId,
            lenderUserId: currentBorrowerInfo.matchedUserId,
            status: ilendbooks.public.status.MATCHED_NOTIFIED

        }
        for (var key in transactionInfo) {
            console.log(appUUID + "updateToBorrowt:" + key + "transactionInfoValue: " + transactionInfo[key]);
        }
        Meteor.call('updateLenderStatusAndMatchedUserId', appUUID, transactionInfo);
        Meteor.call("updateStatus", appUUID, transactionInfo);
        Meteor.call('insertHistory', appUUID, transactionInfo);

    }

})