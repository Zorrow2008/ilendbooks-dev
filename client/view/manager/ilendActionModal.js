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

	'click .matched-declined': function() {
	    //set status in userLendShelf and userBorrowShelf to matched-accepted
	    var appUUID = Session.get('appUUID');
        console.log("appUUID=" + appUUID);
	    Modal.hide('ilendActionModal');		
	}	
})
