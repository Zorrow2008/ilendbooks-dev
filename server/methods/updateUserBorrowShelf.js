Meteor.methods({
	updateUserBorrowShelf(appUUID, currentborrowerBookInfo) {   
		for (var currentborrowerBookInfoKey in currentborrowerBookInfo) {
			console.log( appUUID + ":updateUserBorrowShelf:" + currentborrowerBookInfoKey +"=" + currentborrowerBookInfo[currentborrowerBookInfoKey]);
		}

		var currentdate = new Date();
      	var dateTime = currentdate.getDate() + "/"
                + (currentdate.getMonth()+1)  + "/" 
                + currentdate.getFullYear() + " @ "  
                + currentdate.getHours() + ":"  
                + currentdate.getMinutes() + ":" 
                + currentdate.getSeconds();  

		var currentUserFromUserBorrowSheldDB = UserBorrowShelf.findOne({userId: Meteor.userId()});
		for(var currentUserFromUserBorrowShelfDBKey in currentUserFromUserBorrowSheldDB) {
			console.log(appUUID + ":currentUserFromUserBorrowShelfDBKey=" + currentUserFromUserBorrowShelfDBKey +":value=" + currentUserFromUserBorrowSheldDB[currentUserFromUserBorrowShelfDBKey])
		}
	    var bookInfo = {
	        ilendbooksId: currentborrowerBookInfo.ilendbooksId,
	        dateTime:dateTime,
	        hasBorrowed :false
	    };
		if(currentUserFromUserBorrowSheldDB==null) {
		    UserBorrowShelf.upsert(
		    	{
					userId: Meteor.userId()
		        }, 
		        {
		             $set: 	{
								userId: Meteor.userId()
		                  	}
		        }
		    );

		    UserBorrowShelf.upsert(
		   		{
					userId: Meteor.userId()
		        }, 
		        {
		            $push: 	{
		                    	bookInfo: bookInfo
		                  	}
		        }
		    );

		} else {

          var isBookInUserBorrowShelf = false;

            for(currentBookInfoKey in currentUserFromUserBorrowSheldDB.bookInfo) {
                if(currentUserFromUserBorrowSheldDB.bookInfo[currentBookInfoKey].ilendbooksId === currentborrowerBookInfo.ilendbooksId) {
                  isBookInUserBorrowShelf = true;
                  break; 
                }
            }
            if(isBookInUserBorrowShelf) {
              console.log(appUUID + ":updateUserBorrowShelf:current book is already in the user borrow shelf: userId=" + Meteor.userId() + ";ilendbooksId=" + currentborrowerBookInfo.ilendbooksId);
            } else {
            	console.log("trying to upsert");
			    UserBorrowShelf.upsert(
			   		{
						userId: Meteor.userId()
			        }, 
			        {
			            $push: 	{
			                    	bookInfo: bookInfo
			                  	}
			        }
			    );
            }
		}
	}
});