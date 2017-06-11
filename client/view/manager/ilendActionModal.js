//Note: make sure you set the data as below in the Session before calling the Modal
//
//Note: add a new event handler with "'click .matched-declined'"  to handle your action in this file
// Session.set(ilendbooks.public.modal.action.TITLE,"Borrow request declined.");
// Session.set(ilendbooks.public.modal.action.BODY, "Are you sure you want to decline " + borrowerName + "'s borrow request?");
// Session.set(ilendbooks.public.modal.action.FEED_BACK_FLAG, true);
// Session.set(ilendbooks.public.modal.action.FEED_BACK_LABEL, "Would you like to give a reason?");
// Session.set(ilendbooks.public.modal.action.DISPLAY, "Yes, please");
// Session.set(ilendbooks.public.modal.action.CLASS, "matched-declined");



Template.ilendActionModal.helpers({
   getActionModalTitle: function() {
      	return Session.get(ilendbooks.public.modal.action.TITLE);
   },

   getActionModalBody: function() {
      	return Session.get(ilendbooks.public.modal.action.BODY);
   },
   isActionModalFeedBackFlag:function() {
	   	if(Session.get(ilendbooks.public.modal.action.FEED_BACK_FLAG)) {
	   		return true;
	   	} else {
			return false
	   	}
   },
   getActionModalFeedBackFlag: function(){
   	return Session.get(ilendbooks.public.modal.action.FEED_BACK_FLAG);
   },

   getActionModalClass: function() {
		return Session.get(ilendbooks.public.modal.action.CLASS);
   },

   getActionModalDisplay: function() {
   		return Session.get(ilendbooks.public.modal.action.DISPLAY);
   },

   getActionModalFeedBackLabel: function() {
   		return Session.get(ilendbooks.public.modal.action.FEED_BACK_LABEL);
   }


})


Template.ilendActionModal.events({
   'click .delete': function(event, target) {
      event.preventDefault();
      var appUUID = Session.get('appUUID');
      console.log("appUUID=" + appUUID);
      var ilendbooksId = Session.get ("ilendbooksId");
      console.log("delete:ilendbookdsId=" + ilendbooksId );
      var userReason = $('textarea#ilendActionModalTextArea').val();
      console.log("delete:userReason=" + userReason );
      var contactParameters = {
         ilendbooksId: ilendbooksId,
         userReason: userReason
      };
      Meteor.call("updateUserBookDelete", appUUID, contactParameters );
      Modal.hide('ilendActionModal');
   },

   'click .removed': function(event, target) {
      event.preventDefault();
      var appUUID = Session.get('appUUID');
      console.log("appUUID=" + appUUID);
      var ilendbooksId = Session.get ("ilendbooksId");
      console.log("removed:ilendbookdsId=" + ilendbooksId );
      var userReason = $('textarea#ilendActionModalTextArea').val();
      console.log("removed:userReason=" + userReason );

      var contactParameters={};
      contactParameters.ilendbooksId=ilendbooksId;
      contactParameters.userReason=userReason;

      Meteor.call("updateUserBookRemoved", appUUID, contactParameters );
      Modal.hide('ilendActionModal');
   },

	'click .matched-declined': function(event) {
	   //set status in userLendShelf and userBorrowShelf to matched-accepted
      event.preventDefault();
	   var appUUID = Session.get('appUUID');
      console.log("appUUID=" + appUUID);
      //var contactParameters = Session.get(ilendbooks.public.other.CONTACT_PARAMETERS);
      // var contactParameters = {
      //    ilendbooksId: Session.get('ilendbooksId'),
      //    lenderUserId: Meteor.userId(),
      //    borrowerUserId: PendingTransactions.find({lenderUserId: Meteor.userId()
      // }
      var contactParameters = PendingTransactions.findOne({
         lenderUserId: Meteor.userId(),  
         ilendbooksId: Session.get('ilendbooksId'),
         status:ilendbooks.public.status.MATCHED_NOTIFIED
      }).contactParameters;

      console.log("contactParameters =" + contactParameters );  
      Meteor.call("updateMatchDeclined", appUUID, contactParameters );
	   Modal.hide('ilendActionModal');		
	},

   'click .lender-lent-declared': function(event) {
      event.preventDefault();
      var appUUID = Session.get('appUUID');
      var contactParameters = Session.get(ilendbooks.public.other.CONTACT_PARAMETERS);
      ilendbooksId = Session.get('ilendbooksId');
      borrowerUserId = PendingTransactions.findOne({lenderUserId: Meteor.userId(), ilendbooksId: ilendbooksId}).contactParameters.borrowerUserId;
      var contactParameters = {
         ilendbooksId: ilendbooksId,
         lenderUserId: Meteor.userId(),
         borrowerUserId: borrowerUserId
      }
      console.log("contactParameters =" + contactParameters );
      Meteor.call("updateLenderLentDeclared", appUUID, contactParameters);
      Modal.hide('ilendActionModal');
   },

   'click .borrower-lent-received': function(event) {
      event.preventDefault();
      var appUUID = Session.get('appUUID');
      var ilendbooksId = Session.get('ilendbooksId');
      var lenderUserId = PendingTransactions.findOne({borrowerUserId: Meteor.userId(), ilendbooksId: ilendbooksId}).contactParameters.lenderUserId;
      var contactParameters = {
         ilendbooksId: ilendbooksId,
         lenderUserId: lenderUserId,
         borrowerUserId: Meteor.userId()
      }

      Meteor.call("updateBorrowerLentReceived", appUUID, contactParameters);
      Modal.hide('ilendActionModal');
   },

   'click .with-borrower': function(event) {
      event.preventDefault();
      var appUUID = Session.get('appUUID');
      ilendbooksId = Session.get('ilendbooksId');
      borrowerUserId = PendingTransactions.findOne({lenderUserId: Meteor.userId(), ilendbooksId: ilendbooksId}).contactParameters.borrowerUserId;
      var contactParameters = {
         ilendbooksId: ilendbooksId,
         lenderUserId: Meteor.userId(),
         borrowerUserId: borrowerUserId
      }
      Meteor.call('updateWithBorrower', appUUID, contactParameters);
      Modal.hide('ilendActionModal');
   },

   'click .borrowed': function(event) {
      event.preventDefault();
      var appUUID = Session.get('appUUID');
      var ilendbooksId = Session.get('ilendbooksId');
      var lenderUserId = PendingTransactions.findOne({borrowerUserId: Meteor.userId(), ilendbooksId: ilendbooksId}).contactParameters.lenderUserId;
      var contactParameters = {
         ilendbooksId: ilendbooksId,
         lenderUserId: lenderUserId,
         borrowerUserId: Meteor.userId()
      }   
      Meteor.call('updateBorrowed', appUUID, contactParameters);
      Modal.hide('ilendActionModal');
   },

   'click .lender-return-received': function(event) {
      event.preventDefault();
      var appUUID = Session.get('appUUID');
      var ilendbooksId = Session.get('ilendbooksId');
      borrowerUserId = PendingTransactions.findOne({lenderUserId: Meteor.userId(), ilendbooksId: ilendbooksId}).contactParameters.borrowerUserId;
      var contactParameters = {
         ilendbooksId: ilendbooksId,
         lenderUserId: Meteor.userId(),
         borrowerUserId: borrowerUserId
      }
      Meteor.call('updateLenderReturnReceived', appUUID, contactParameters);
      Modal.hide('ilendActionModal');
   },

   'click .borrower-return-declared': function(event) {
      event.preventDefault();
      var appUUID = Session.get('appUUID');
      var ilendbooksId = Session.get('ilendbooksId');
      var lenderUserId = PendingTransactions.findOne({borrowerUserId: Meteor.userId(), ilendbooksId: ilendbooksId}).contactParameters.lenderUserId;
      var contactParameters = {
         ilendbooksId: ilendbooksId,
         lenderUserId: lenderUserId,
         borrowerUserId: Meteor.userId()
      } 
      Meteor.call('updateBorrowerReturnDeclared', appUUID, contactParameters);  
      Modal.hide('ilendActionModal');    
   },

   'click .transaction-complete': function(event) {
      event.preventDefault();
      var appUUID = Session.get('appUUID');
      var ilendbooksId = Session.get('ilendbooksId');
      var lenderUserId = PendingTransactions.findOne({borrowerUserId: Meteor.userId(), ilendbooksId: ilendbooksId}).contactParameters.lenderUserId;
      var contactParameters = {
         ilendbooksId: ilendbooksId,
         lenderUserId: lenderUserId,
         borrowerUserId: Meteor.userId()
      }  
      Meteor.call('updateTransactionComplete', appUUID, contactParameters);  
    //  Meteor.call('updateAvailable', appUUID, contactParameters);
      Modal.hide('ilendActionModal');
   },

   'click .transaction-complete-lender': function(event) {
      event.preventDefault();
      var appUUID = Session.get('appUUID');
      var ilendbooksId = Session.get('ilendbooksId');
      borrowerUserId = PendingTransactions.findOne({lenderUserId: Meteor.userId(), ilendbooksId: ilendbooksId}).contactParameters.borrowerUserId;
      var contactParameters = {
         ilendbooksId: ilendbooksId,
         lenderUserId: Meteor.userId(),
         borrowerUserId: borrowerUserId
      }
     // Meteor.call('updateAvailable', appUUID, contactParameters);
      Meteor.call('updateTransactionCompleteLender', appUUID, contactParameters);
      Modal.hide('ilendActionModal');
   }
})
