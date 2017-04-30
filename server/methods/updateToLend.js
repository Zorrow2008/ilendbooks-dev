Meteor.methods({
updateToLend(appUUID, currentlenderBookInfo) {   

      for ( var currentlenderBookInfoKey in currentlenderBookInfo ){
        console.log( appUUID + ":updateToLend:currentlenderBookInfo." + currentlenderBookInfoKey +"=" + currentlenderBookInfo[currentlenderBookInfoKey]);
      }

      var currentdate = new Date();
      var dateTime = currentdate.getDate() + "/"
                + (currentdate.getMonth()+1)  + "/" 
                + currentdate.getFullYear() + " @ "  
                + currentdate.getHours() + ":"  
                + currentdate.getMinutes() + ":" 
                + currentdate.getSeconds();     
      var currentBookFromToLendDB = ToLend.findOne({title: currentlenderBookInfo.title, ilendbooksId: currentlenderBookInfo.ilendbooksId});
      var lenderInfo = {
            userId:Meteor.userId(),
            dateTime:dateTime,
            status : ilendbooks.public.status.AVAILABLE,
            bookCondition: currentlenderBookInfo.condition,
            bookDescription: currentlenderBookInfo.description
      };
      if(currentBookFromToLendDB == null) {
            ToLend.upsert({
                  title: currentlenderBookInfo.title,
                  ilendbooksId: currentlenderBookInfo.ilendbooksId
              }, {
                  $set: {
                     title: currentlenderBookInfo.title,
                     ilendbooksId: currentlenderBookInfo.ilendbooksId
                  }
               }
            );

            ToLend.upsert({
                  title: currentlenderBookInfo.title,
                  ilendbooksId: currentlenderBookInfo.ilendbooksId
               }, {
                  $push: {
                        lender: lenderInfo
                  }
               }
            );
      } else {
          var isUserMarkedLender = false;

            for(currentBookKey in currentBookFromToLendDB.lender) {
                if(currentBookFromToLendDB.lender[currentBookKey].userId === Meteor.userId()) {
                  isUserMarkedLender = true;
                  break; 
                }
            }
            if(isUserMarkedLender) {
              console.log(appUUID + ":updateToLend:current user is marked as lender already:" + currentBookFromToLendDB.lender[currentBookKey].userId)
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
      // update user lender shelf
      Meteor.call('updateUserLendShelf', appUUID, currentlenderBookInfo);
    }
  }
)


