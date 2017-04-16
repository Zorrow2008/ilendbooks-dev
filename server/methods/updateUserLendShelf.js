Meteor.methods({
	updateUserLendShelf(appUUID, currentlenderBookInfo) {   
		console.log( appUUID + ":updateUserLendShelf:currentlenderBookInfo.ilendbooksId=" + currentlenderBookInfo.ilendbooksId);

		var currentdate = new Date();
      	var dateTime = currentdate.getDate() + "/"
                + (currentdate.getMonth()+1)  + "/" 
                + currentdate.getFullYear() + " @ "  
                + currentdate.getHours() + ":"  
                + currentdate.getMinutes() + ":" 
                + currentdate.getSeconds();  

		var currentUserFromUserLendShelfDB = UserLendShelf.findOne({userId: Meteor.userId()});
		for(var currentUserFromUserLendShelfDBKey in currentUserFromUserLendShelfDB) {
			console.log(appUUID + ":currentUserFromUserLendShelfDBKey=" + currentUserFromUserLendShelfDBKey +":value=" + currentUserFromUserLendShelfDB[currentUserFromUserLendShelfDBKey])
		}
	    var bookInfo = {
	        ilendbooksId: currentlenderBookInfo.ilendbooksId,
	        dateTime:dateTime,
	        hasLended :false
	    };
		if(currentUserFromUserLendShelfDB==null) {
		    UserLendShelf.upsert(
		    	{
					userId: Meteor.userId()
		        }, 
		        {
		             $set: 	{
								userId: Meteor.userId()
		                  	}
		        }
		    );

		    UserLendShelf.upsert(
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

          var isBookInUserLendShelf = false;

            for(currentBookInfoKey in currentUserFromUserLendShelfDB.bookInfo) {
                if(currentUserFromUserLendShelfDB.bookInfo[currentBookInfoKey].ilendbooksId === currentlenderBookInfo.ilendbooksId) {
                  isBookInUserLendShelf = true;
                  break; 
                }
            }
            if(isBookInUserLendShelf) {
              console.log(appUUID + ":updateUserLendShelf:current book is already in the user lend shelf: userId=" + Meteor.userId() + ";ilendbooksId=" + currentlenderBookInfo.ilendbooksId);
            } else {
            	console.log("trying to upsert");
			    UserLendShelf.upsert(
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