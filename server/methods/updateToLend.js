Meteor.methods({
    updateToLend(appUUID, currentlenderBookInfo) {

        for (var currentlenderBookInfoKey in currentlenderBookInfo) {
            console.log(appUUID + ":updateToLend:currentlenderBookInfo." + currentlenderBookInfoKey + "=" + currentlenderBookInfo[currentlenderBookInfoKey]);
        }

        var dateTime = Meteor.call('getLocalTime');
        var currentBookFromToLendDB = ToLend.findOne({
            title: currentlenderBookInfo.title,
            ilendbooksId: currentlenderBookInfo.ilendbooksId
        });
        var lenderInfo = {
            userId: Meteor.userId(),
            dateTime: dateTime,
            status: ilendbooks.public.status.AVAILABLE,
            bookCondition: currentlenderBookInfo.condition,
            bookDescription: currentlenderBookInfo.description
        };
        if (currentBookFromToLendDB == null) {
            ToLend.upsert({
                title: currentlenderBookInfo.title,
                ilendbooksId: currentlenderBookInfo.ilendbooksId
            }, {
                $set: {
                    title: currentlenderBookInfo.title,
                    ilendbooksId: currentlenderBookInfo.ilendbooksId
                }
            });

            ToLend.upsert({
                title: currentlenderBookInfo.title,
                ilendbooksId: currentlenderBookInfo.ilendbooksId
            }, {
                $push: {
                    lender: lenderInfo
                }
            });
        } else {
            var statusRemoved = false;

            // for(currentBookKey in currentBookFromToLendDB.lender) {
            //     if(currentBookFromToLendDB.lender[currentBookKey].userId === Meteor.userId()) {
            //       isUserMarkedLender = true;
            //       break; 
            //     }
            // }
            for (key in currentBookFromToLendDB.lender) {
                if (currentBookFromToLendDB.lender[key].userId == Meteor.userId()) {
                    if (currentBookFromToLendDB.lender[key].status == ilendbooks.public.status.REMOVED) {
                        statusRemoved = true;
                    } else {
                        statusRemoved = false;
                    }
                }
            }

            if (statusRemoved) {
                //'' console.log(appUUID + ":updateToLend:current user is marked as lender already:" + currentBookFromToLendDB.lender[currentBookKey].userId)
                var currentToLendDoc = ToLend.findOne({
                    title: currentlenderBookInfo.title
                });
                for (var key in currentToLendDoc.lender) {
                    if (currentToLendDoc.lender[key].userId == Meteor.userId()) {
                        if (currentToLendDoc.lender[key].status == ilendbooks.public.status.REMOVED) {
                            //currentToLendDoc.lender[key].status == ilendbooks.public.status.AVAILABLE;
                            ToLend.update({
                                "ilendbooksId": currentlenderBookInfo.ilendbooksId,
                                "lender.userId": Meteor.userId()
                            }, {
                                "$set": {
                                    "lender.$.status": ilendbooks.public.status.AVAILABLE
                                }
                            });
                        }
                    }
                }
            } else {
                ToLend.upsert({
                    title: currentlenderBookInfo.title,
                    ilendbooksId: currentlenderBookInfo.ilendbooksId
                }, {
                    $push: {
                        lender: lenderInfo
                    }
                })
            }
        }

        (console.log("removed to available again"))
        // update user lender shelf
        Meteor.call('updateUserLendShelf', appUUID, currentlenderBookInfo);
        Meteor.call('addBookcoin', 2);
    }
})