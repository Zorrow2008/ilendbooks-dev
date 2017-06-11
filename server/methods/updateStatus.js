Meteor.methods({
	// updateStatusInfo object should ccontain
	// 1. updateStatusInfo.status - required
	// 2. updateStatusInfo.ilendbooksId - required
	// 3. updateStatusInfo.lenderUserId - required
	// 4. updateStatusInfo.borrowerUserId - required
	updateStatus(appUUID, updateStatusInfo ) {

      for ( var updateStatusInfoKey in updateStatusInfo ){
        console.log( appUUID 
        	+ ":updateStatus:updateStatusInfo." 
        	+ updateStatusInfoKey +"=" + updateStatusInfo[updateStatusInfoKey]);
      }

	   	switch(updateStatusInfo.status) {
		    case ilendbooks.public.status.AVAILABLE: // this is called on Add Back
		        Meteor.call("updateLenderStatus"
		        	, appUUID
		        	, updateStatusInfo.ilendbooksId
		        	, updateStatusInfo.lenderUserId
		        	, updateStatusInfo.status
		        );
		        break;
		    case ilendbooks.public.status.REMOVED:
		        Meteor.call("updateLenderStatus"
		        	, appUUID
		        	, updateStatusInfo.ilendbooksId
		        	, updateStatusInfo.lenderUserId
		        	, updateStatusInfo.status
		        );
		        break;
		    case ilendbooks.public.status.DELETE:
		        Meteor.call("updateLenderStatus"
		        	, appUUID
		        	, updateStatusInfo.ilendbooksId
		        	, updateStatusInfo.lenderUserId
		        	, updateStatusInfo.status
		        );
		        break;
		    case ilendbooks.public.status.MATCHED_NOTIFIED:
		        // Meteor.call("updatePendingTransactions"
		        // 	, appUUID
		        // 	, updateStatusInfo.lenderUserId
		        // 	, updateStatusInfo.borrowerUserId
		        // 	, updateStatusInfo.ilendbooksId
		        // 	, updateStatusInfo.status
		        // );
		        break;
		    case ilendbooks.public.status.MATCHED_ACCEPTED:
		        Meteor.call("updateBorrowerStatus"
		        	, appUUID
		        	, updateStatusInfo.ilendbooksId
		        	, updateStatusInfo.borrowerUserId
		        	, updateStatusInfo.status
		        );
		        Meteor.call("updateLenderStatus"
		        	, appUUID
		        	, updateStatusInfo.ilendbooksId
		        	, updateStatusInfo.lenderUserId
		        	, updateStatusInfo.status
		        );
		        Meteor.call("updatePendingTransactions"
		        	, appUUID
		        	, updateStatusInfo.lenderUserId
		        	, updateStatusInfo.borrowerUserId
		        	, updateStatusInfo.ilendbooksId
		        	, updateStatusInfo.status
		        );
		        break;
		    case ilendbooks.public.status.MATCHED_DECLINED:
		        Meteor.call("updateBorrowerStatus"
		        	, appUUID
		        	, updateStatusInfo.ilendbooksId
		        	, updateStatusInfo.borrowerUserId
		        	, updateStatusInfo.status
		        );
		        Meteor.call("updateLenderStatus"
		        	, appUUID
		        	, updateStatusInfo.ilendbooksId
		        	, updateStatusInfo.lenderUserId
		        	, ilendbooks.public.status.AVAILABLE
		        );
		        break;
		        Meteor.call("updatePendingTransactions"
		        	, appUUID
		        	, updateStatusInfo.lenderUserId
		        	, updateStatusInfo.borrowerUserId
		        	, updateStatusInfo.ilendbooksId
		        	, updateStatusInfo.status
		        );
		    case ilendbooks.public.status.BORROWER_LENT_RECEIVED:
		        Meteor.call("updateBorrowerStatus"
		        	, appUUID
		        	, updateStatusInfo.ilendbooksId
		        	, updateStatusInfo.borrowerUserId
		        	, updateStatusInfo.status
		        );
		        Meteor.call("updateLenderStatus"
		        	, appUUID
		        	, updateStatusInfo.ilendbooksId
		        	, updateStatusInfo.lenderUserId
		        	, updateStatusInfo.status
		        );
		        Meteor.call("updatePendingTransactions"
		        	, appUUID
		        	, updateStatusInfo.lenderUserId
		        	, updateStatusInfo.borrowerUserId
		        	, updateStatusInfo.ilendbooksId
		        	, updateStatusInfo.status
		        );
		        break;
		    case ilendbooks.public.status.LENDER_LENT_DECLARED:
		        Meteor.call("updateBorrowerStatus"
		        	, appUUID
		        	, updateStatusInfo.ilendbooksId
		        	, updateStatusInfo.borrowerUserId
		        	, updateStatusInfo.status
		        );
		        Meteor.call("updateLenderStatus"
		        	, appUUID
		        	, updateStatusInfo.ilendbooksId
		        	, updateStatusInfo.lenderUserId
		        	, updateStatusInfo.status
		        );
		        Meteor.call("updatePendingTransactions"
		        	, appUUID
		        	, updateStatusInfo.lenderUserId
		        	, updateStatusInfo.borrowerUserId
		        	, updateStatusInfo.ilendbooksId
		        	, updateStatusInfo.status
		        );
		        break;
		    case ilendbooks.public.status.WITH_BORROWER:
		        Meteor.call("updateBorrowerStatus"
		        	, appUUID
		        	, updateStatusInfo.ilendbooksId
		        	, updateStatusInfo.borrowerUserId
		        	, ilendbooks.public.status.BORROWED
		        );
		        Meteor.call("updateLenderStatus"
		        	, appUUID
		        	, updateStatusInfo.ilendbooksId
		        	, updateStatusInfo.lenderUserId
		        	, updateStatusInfo.status
		        );
		        Meteor.call("updatePendingTransactions"
		        	, appUUID
		        	, updateStatusInfo.lenderUserId
		        	, updateStatusInfo.borrowerUserId
		        	, updateStatusInfo.ilendbooksId
		        	, updateStatusInfo.status
		        );
		        break;
		    case ilendbooks.public.status.BORROWED:
		        Meteor.call("updateBorrowerStatus"
		        	, appUUID
		        	, updateStatusInfo.ilendbooksId
		        	, updateStatusInfo.borrowerUserId
		        	, updateStatusInfo.status
		        );
		        Meteor.call("updateLenderStatus"
		        	, appUUID
		        	, updateStatusInfo.ilendbooksId
		        	, updateStatusInfo.lenderUserId
		        	, ilendbooks.public.status.WITH_BORROWER
		        );
		        Meteor.call("updatePendingTransactions"
		        	, appUUID
		        	, updateStatusInfo.lenderUserId
		        	, updateStatusInfo.borrowerUserId
		        	, updateStatusInfo.ilendbooksId
		        	, updateStatusInfo.status
		        );
		        break;
		    case ilendbooks.public.status.LENDER_RETURN_RECEIVED:
		        Meteor.call("updateBorrowerStatus"
		        	, appUUID
		        	, updateStatusInfo.ilendbooksId
		        	, updateStatusInfo.borrowerUserId
		        	, updateStatusInfo.status
		        );
		        Meteor.call("updateLenderStatus"
		        	, appUUID
		        	, updateStatusInfo.ilendbooksId
		        	, updateStatusInfo.lenderUserId
		        	, updateStatusInfo.status
		        );
		        Meteor.call("updatePendingTransactions"
		        	, appUUID
		        	, updateStatusInfo.lenderUserId
		        	, updateStatusInfo.borrowerUserId
		        	, updateStatusInfo.ilendbooksId
		        	, updateStatusInfo.status
		        );
		        break;
		    case ilendbooks.public.status.BORROWER_RETURN_DECLARED:
		        Meteor.call("updateBorrowerStatus"
		        	, appUUID
		        	, updateStatusInfo.ilendbooksId
		        	, updateStatusInfo.borrowerUserId
		        	, updateStatusInfo.status
		        );
		        Meteor.call("updateLenderStatus"
		        	, appUUID
		        	, updateStatusInfo.ilendbooksId
		        	, updateStatusInfo.lenderUserId
		        	, updateStatusInfo.status
		        );
		        Meteor.call("updatePendingTransactions"
		        	, appUUID
		        	, updateStatusInfo.lenderUserId
		        	, updateStatusInfo.borrowerUserId
		        	, updateStatusInfo.ilendbooksId
		        	, updateStatusInfo.status
		        );
		        break;
		    case ilendbooks.public.status.MATCHED:
				//No Action
		        break;
		    case ilendbooks.public.status.NO_LENDER:
		        Meteor.call("updateBorrowerStatus"
		        	, appUUID
		        	, updateStatusInfo.ilendbooksId
		        	, updateStatusInfo.borrowerUserId
		        	, updateStatusInfo.status
		        );
		        break;
		    case ilendbooks.public.status.TRANSACTION_COMPLETE:
		        Meteor.call("updateBorrowerStatus"
		        	, appUUID
		        	, updateStatusInfo.ilendbooksId
		        	, updateStatusInfo.borrowerUserId
		        	, updateStatusInfo.status
		        );
		        Meteor.call("updateLenderStatus"
		        	, appUUID
		        	, updateStatusInfo.ilendbooksId
		        	, updateStatusInfo.lenderUserId
		        	, ilendbooks.public.status.TRANSACTION_COMPLETE_LENDER
		        );		        
		        Meteor.call("updatePendingTransactions"
		        	, appUUID
		        	, updateStatusInfo.lenderUserId
		        	, updateStatusInfo.borrowerUserId
		        	, updateStatusInfo.ilendbooksId
		        	, updateStatusInfo.status
		        );
		        break;
	        case ilendbooks.public.status.TRANSACTION_COMPLETE_LENDER:
		        Meteor.call("updateLenderStatus"
		        	, appUUID
		        	, updateStatusInfo.ilendbooksId
		        	, updateStatusInfo.lenderUserId
		        	, updateStatusInfo.status
		        );
		        Meteor.call("updateBorrowerStatus"
		        	, appUUID
		        	, updateStatusInfo.ilendbooksId
		        	, updateStatusInfo.borrowerUserId
		        	, ilendbooks.public.status.TRANSACTION_COMPLETE
		        );		        
		        Meteor.call("updatePendingTransactions"
		        	, appUUID
		        	, updateStatusInfo.lenderUserId
		        	, updateStatusInfo.borrowerUserId
		        	, updateStatusInfo.ilendbooksId
		        	, updateStatusInfo.status
		        );	
		       	break;	        
	        case ilendbooks.public.status.PAST_BORROW:
	        	Meteor.call('updateBorrowerStatus'
	        		, appUUID
	        		, updateStatusInfo.ilendbooksId
	        		, updateStatusInfo.borrowerUserId
	        		, updateStatusInfo.status
        		);
	    }
	}
})
