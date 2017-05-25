Meteor.methods({
    updateUserLendShelf(appUUID, currentlenderBookInfo) {
        for (var currentlenderBookInfoKey in currentlenderBookInfo) {
            console.log(appUUID + ":updateUserLendShelf:" + currentlenderBookInfoKey + "=" + currentlenderBookInfo[currentlenderBookInfoKey]);
        }


        var dateTime = Meteor.call('getLocalTime');

        var currentUserFromUserLendShelfDB = UserLendShelf.findOne({
            userId: Meteor.userId()
        });
        for (var currentUserFromUserLendShelfDBKey in currentUserFromUserLendShelfDB) {
            console.log(appUUID + ":currentUserFromUserLendShelfDBKey=" + currentUserFromUserLendShelfDBKey + ":value=" + currentUserFromUserLendShelfDB[currentUserFromUserLendShelfDBKey])
        }
        var bookInfo = {
            ilendbooksId: currentlenderBookInfo.ilendbooksId,
            dateTime: dateTime,
            status: ilendbooks.public.status.AVAILABLE,
            matchedUserId: ""
        };
        if (currentUserFromUserLendShelfDB == null) {
            UserLendShelf.upsert({
                userId: Meteor.userId()
            }, {
                $set: {
                    userId: Meteor.userId()
                }
            });

            UserLendShelf.upsert({
                userId: Meteor.userId()
            }, {
                $push: {
                    bookInfo: bookInfo
                }
            });

        } else {

            //     var isBookInUserLendShelf = false;

            //       // for(currentBookInfoKey in currentUserFromUserLendShelfDB.bookInfo) {
            //       //     if(currentUserFromUserLendShelfDB.bookInfo[currentBookInfoKey].ilendbooksId === currentlenderBookInfo.ilendbooksId) {
            //       //       isBookInUserLendShelf = true;
            //       //       break; 
            //       //     }
            //       // }

            // 	   for(key in bookInfo) {
            //          if(bookInfo[key].ilendbooksId == bookInfo.ilendbooksId) {
            //            if(bookInfo[key].status == ilendbooks.public.status.REMOVED ) {
            //               isBookInUserLendShelf = false;
            //            }else{
            //               isBookInUserLendShelf = true;
            //            }
            //         }
            //      }

            //       if(isBookInUserLendShelf) {
            //         console.log(appUUID + ":updateUserLendShelf:current book is already in the user lend shelf: userId=" + Meteor.userId() + ";ilendbooksId=" + currentlenderBookInfo.ilendbooksId);
            //       } else {
            //       	console.log(appUUID + ":updateUserLendShelf:user exist, trying to upsert the book");
            //  UserLendShelf.upsert(
            // 		{
            // userId: Meteor.userId()
            //      }, 
            //      {
            //          $push: 	{
            //                  	bookInfo: bookInfo
            //                	}
            //      }
            //  );
            //       }
            var currentUserLendShelfDoc = UserLendShelf.findOne({
                userId: Meteor.userId()
             });
            var statusRemoved = false;
            for (key in currentUserLendShelfDoc.bookInfo) {
                if (currentUserLendShelfDoc.bookInfo[key].ilendbooksId == currentlenderBookInfo.ilendbooksId) {
                    if (currentUserLendShelfDoc.bookInfo[key].status == ilendbooks.public.status.REMOVED) {
                        statusRemoved = true;
                    } else {
                        statusRemoved = false;
                    }
                }
            }

            if (statusRemoved) {
                //'' console.log(appUUID + ":updateToLend:current user is marked as lender already:" + currentBookFromToLendDB.lender[currentBookKey].userId)
                // var currentUserLendShelfDoc = UserLendShelf.findOne({
                //     userId: Meteor.userId()
                // });
                console.log("status is removed confirmed");
                for (var key in currentUserLendShelfDoc.bookInfo) {
                    if (currentUserLendShelfDoc.bookInfo[key].ilendbooksId == currentlenderBookInfo.ilendbooksId) {
                        if (currentUserLendShelfDoc.bookInfo[key].status == ilendbooks.public.status.REMOVED) {
                            //currentUserLendShelfDoc.bookInfo[key].status == ilendbooks.public.status.AVAILABLE;
                            UserLendShelf.update({
                                "userId": Meteor.userId(),
                                "bookInfo.ilendbooksId": currentlenderBookInfo.ilendbooksId
                            }, {
                                "$set": {
                                    "bookInfo.$.status": ilendbooks.public.status.AVAILABLE
                                }
                            });
                        }
                    }
                }
            }else{
            UserLendShelf.upsert({
                userId: Meteor.userId()
            }, {
                $push: {
                    bookInfo: bookInfo
                }
            });
        }
        }
    }
})
