Meteor.methods({
    updateAddToBorrowWishList(appUUID, currentBorrowBookInfo) {

        for (var currentBorrowBookInfoKey in currentBorrowBookInfo) {
            console.log(appUUID + ":updateAddToBorrowWishList:currentBorrowBookInfo." + currentBorrowBookInfoKey + "=" + currentBorrowBookInfo[currentBorrowBookInfoKey]);
        }

        var currentBookFromBorrowWishListDB = BorrowWishList.findOne({
         ilendbooksId:currentBorrowBookInfo.ilendbooksId
         , title: currentBorrowBookInfo.title
         , borrower: {$elemMatch:{userId: Meteor.userId() 
               , status:{$in:[ilendbooks.public.status.WISH_LISTED]}}}

        })

        if (currentBookFromBorrowWishListDB ) {
            console.log(appUUID + ":updateAddToBorrowWishList:ilendbooksId "
                + "'" + currentBookFromBorrowWishListDB.ilendbooksId + "'"
                + " is in user's "
                + "'" +currentBookFromBorrowWishListDB.borrower[0].userId + "'"
                +" wish list" 
            )
        } else {

            var currentBookFromBorrowWishListRemoved = BorrowWishList.findOne({
             ilendbooksId:currentBorrowBookInfo.ilendbooksId
             , title: currentBorrowBookInfo.title
             , borrower: {$elemMatch:{userId: Meteor.userId() 
                   , status:{$in:[ilendbooks.public.status.WISH_LISTED_REMOVED]}}}

            })

            if(currentBookFromBorrowWishListRemoved){
                BorrowWishList.update({
                    "ilendbooksId":currentBorrowBookInfo.ilendbooksId,
                    "title": currentBorrowBookInfo.title,
                    "borrower.userId": Meteor.userId()
                }, {
                    "$set": {
                        "borrower.$.status": ilendbooks.public.status.WISH_LISTED
                    }
                });
            } else {

                var borrowerInfo = {
                    userId: Meteor.userId(),
                    dateTime: Meteor.call('getLocalTime'),
                    status: ilendbooks.public.status.WISH_LISTED,
                };

                BorrowWishList.upsert({
                    title: currentBorrowBookInfo.title,
                    ilendbooksId: currentBorrowBookInfo.ilendbooksId
                }, {
                    $set: {
                        title: currentBorrowBookInfo.title,
                        ilendbooksId: currentBorrowBookInfo.ilendbooksId
                    }
                });

                BorrowWishList.upsert({
                    title: currentBorrowBookInfo.title,
                    ilendbooksId: currentBorrowBookInfo.ilendbooksId
                }, {
                    $push: {
                        borrower: borrowerInfo
                    }
                });
            }
            //Communicate to the user
            var userProfile = UserProfile.findOne({
                userId: Meteor.userId()
            });
            var book = Books.findOne({
                "_id": currentBorrowBookInfo.ilendbooksId
            });
            currentBorrowBookInfo.appUUID = appUUID;
            currentBorrowBookInfo.toUserId = Meteor.userId();
            currentBorrowBookInfo.emailSubject = "Book added to your borrow wish-list!";
            currentBorrowBookInfo.email = userProfile.email;
            currentBorrowBookInfo.contactPreference = userProfile.contactPreference;
            currentBorrowBookInfo.emailBody = "Would like let you know that the below book is added to your borrow wish shelf:" +
                    "\n" +
                    book.ItemAttributes[0].Title[0];

            if (ilendbooks.public.contactPreference.CELL === userProfile.contactPreference) {
                currentBorrowBookInfo.phoneNumber = userProfile.phoneNumber;
                currentBorrowBookInfo.contactPreference = userProfile.contactPreference;
                currentBorrowBookInfo.smsMessage = "Would like let you know that the below book is added to your borrow wish shelf:" +
                    "\n" +
                    book.ItemAttributes[0].Title[0];
            }

            currentBorrowBookInfo.borrowerUserId = Meteor.userId();
            // currentBorrowBookInfo.status = ilendbooks.public.status.AVILABLE;
            currentBorrowBookInfo.statusLend = "",
            currentBorrowBookInfo.statusBorrow = ilendbooks.public.status.WISH_LISTED,
            // update user borrower shelf
            Meteor.call('contact', appUUID, currentBorrowBookInfo);
            Meteor.call('insertHistory', appUUID, currentBorrowBookInfo);
        } 
    }})

