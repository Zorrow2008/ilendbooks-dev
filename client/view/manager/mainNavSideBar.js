Template.mainNavSideBar.helpers({
	getNotificationCount: function() {
		var pendingTransactions = PendingTransactions.find({lenderUserId: Meteor.userId()
			, statusLend:ilendbooks.public.status.MATCHED_NOTIFIED, statusBorrow:ilendbooks.public.status.MATCHED_NOTIFIED});
		console.log("length: " + pendingTransactions.count())
		return pendingTransactions.count();
	},

  getBookCoin: function() {
    var user = UserProfile.findOne({userId: Meteor.userId()});
    if(user == null) {
       return 0;   
    }else{
      return user.bookcoin;
    }

  }
})

Template.mainNavSideBar.events({
	'click .hamburger' : function(event) {

		console.log("hamburger - clicked");
		var trigger = $('.hamburger');
        var overlay = $('.overlay');
        //var isClosed = false;
        console.log(trigger.hasClass('hamburger'));
        console.log(trigger.hasClass('is-closed'));

        if (trigger.hasClass('is-closed')) {          

          overlay.show();
          trigger.removeClass('is-closed');
          trigger.addClass('is-open');
          // isClosed = false;
        } else {   
          overlay.hide();
          trigger.removeClass('is-open');
          trigger.addClass('is-closed');
          // isClosed = true;
        }
        $('#wrapper').toggleClass('toggled');

	},

  'click .feedback': function() {
    Modal.show('feedback');
  }

});
