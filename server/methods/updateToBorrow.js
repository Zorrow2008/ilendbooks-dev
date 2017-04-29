Meteor.methods({
   updateToBorrow(appUUID, borrowerInfoBook) {  

      var currentdate = new Date();
      var dateTime = currentdate.getDate() + "/"
          + (currentdate.getMonth()+1)  + "/" 
          + currentdate.getFullYear() + " @ "  
          + currentdate.getHours() + ":"  
          + currentdate.getMinutes() + ":" 
          + currentdate.getSeconds();   

      var currentBookFromToBorrowDB = ToBorrow.findOne({title: borrowerInfoBook.title, ilendbooksId: borrowerInfoBook.ilendbooksId});
      var currentBorrowerInfo = {
          userId : Meteor.userId(),
          dateTime: dateTime,
          hasMatched : false
      };
      if(currentBookFromToBorrowDB == null) {

            ToBorrow.upsert({
                  title: borrowerInfoBook.title,
                  ilendbooksId: borrowerInfoBook.ilendbooksId
              }, {
                  $set: {
                     title: borrowerInfoBook.title,
                     ilendbooksId: borrowerInfoBook.ilendbooksId
                  }
               }
            )

               ToBorrow.upsert({
                  title: borrowerInfoBook.title,
                  ilendbooksId: borrowerInfoBook.ilendbooksId
               }, {
                  $push: {
                        borrower: currentBorrowerInfo,
                  }
               })
      }else{
            var isUserMarkedBorrower = false;
            for(currentBookKey in currentBookFromToBorrowDB.borrower) {
                if(currentBookFromToBorrowDB.borrower[currentBookKey].userId === Meteor.userId()) {
                  isUserMarkedBorrower = true;
                  break; 
                }
            }
            if(isUserMarkedBorrower) {
              console.log(appUUID + ":updateToBorrow:current user is marked as borrower already:" + currentBookFromToBorrowDB.borrower[currentBookKey].userId)
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
   // Meteor.call('setMatch', appUUID, borrowerInfoBook, currentBorrowerInfo);
      Meteor.call('updateUserBorrowShelf', appUUID, currentBorrowerInfo)
   }

})