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

      var contactParameters = PendingTransactions.find({
         lenderUserId: Meteor.userId(),  
         ilendbooksId: Session.get('ilendbooksId'),
         status:ilendbooks.public.status.MATCHED_NOTIFIED
      }).contactParameters;
      contactParameters.userReason=userReason;
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

   // 'click .matched-accepted': function(event) {
   //    event.preventDefault();
   //    var appUUID = Session.get('appUUID');
   //    var contactParameters = PendingTransactions.find({
   //       lenderUserId: Meteor.userId(),  
   //       ilendbooksId: Session.get('ilendbooksId'),
   //       status:ilendbooks.public.status.MATCHED_NOTIFIED
   //    }).contactParameters;
   //    Meteor.call("updateMatchAcceptedAndContactBorrower", contactParameters);
   //    Modal.hide('ilendActionModal');

   // },

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
      var contactParameters = PendingTransactions.find({
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
      // for(var key in contactParameters) {
      //    console.log("contactParametersKey: " + key + "value: " + contactParameters[key]);
      // }
      console.log("contactParameters =" + contactParameters );
      Meteor.call("updateLenderLentDeclared", appUUID, contactParameters);
   },

   'click .borrower-lent-received': function(event) {
      event.preventDefault();
      var appUUID = Session.get('appUUID');
      var contactParameters = Session.get(ilendbooks.public.other.CONTACT_PARAMETERS);

      Meteor.call("updateBorrowerLentReceived", appUUID, contactParameters);
   }
})
