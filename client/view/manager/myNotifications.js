Template.myNotifications.helpers({
	getPendingTransactions: function() {
		return PendingTransactions.find({lenderUserId: Meteor.userId()});
	},

	getBorrowerName: function(contactParameters) {
		return UserProfile.findOne({userId: contactParameters.borrowerUserId}).fName;
	},

	getLenderBook: function(contactParameters) {
		return Books.findOne({_id: contactParameters.ilendbooksId}).ItemAttributes[0].Title[0];
	},
	//if theres none, display a message saying theres none.
	// getPath: function() {
	// 	console.log("current path: " + Iron.Location.get().path);
	// 	//console.log(Router.current().route.path(this))
	// 	console.log("current url: " + Router.routes['myNotifications'].url({_id: 1}));
	// 	return Iron.Location.get().path;
	// },
	// toLogin: function() {

	// 	Session.setAuth("backPath", Iron.Location.get().path)
	// 	Session.setAuth("author", author);
	// 	this.redirect('login')
	// },

	setPathInSession: function() {
		
		Session.setAuth("backPath", Router.current().route.getName());
		Session.setAuth("author", author);
		//this.redirect('login')
	},

 	isLoggedIn: function() {
 		return Meteor.userId() != null;
    },	

    getModalTitle: function() {
      return Session.get(ilendbooks.public.modal.TITLE);
   },

    getModalBody: function() {
      return Session.get(ilendbooks.public.modal.BODY);
   },
})

Template.myNotifications.events({
	'click .accept': function() {
	    console.log("I CLICKED ACCEPT");
	    //set status in userLendShelf and userBorrowShelf to matched-accepted
	    var borrowerUserId = this.contactParameters.borrowerUserId
	    var borrowerName = UserProfile.findOne({userId: this.contactParameters.borrowerUserId}).fName;
	    var lenderName = UserProfile.findOne({userId: Meteor.userId()}).fName;
	    Meteor.call('updateMatchAccepted', this.contactParameters);
		console.log("matched-accepted");
		var modalTitle = "Borrow request accepted!";
		var modalBody = "You accepted " + borrowerName + "'s borrow request! We will provide " + borrowerName +" with your contact information for him to reach out to you.";
	    Session.set(ilendbooks.public.modal.TITLE, modalTitle);
	    Session.set(ilendbooks.public.modal.BODY, modalBody);
	    Modal.show('ilendInfoModal');
	    var emailInfo = {
	    	to: UserProfile.findOne({userId: borrowerUserId}).email,
	    	from: this.contactParameters.fromEmail,
	    	subject: "Borrow request accepted",
	    	text: lenderName + " has accepted your borrow request. Contact him at " + this.contactParameters.email + " to set up a book exchange."
	    }
	    Meteor.call('emailBorrower', emailInfo);     
	},

	'click .decline': function() {
	    console.log("I CLICKED DECLINE");
	    //set status in userLendShelf and userBorrowShelf to matched-accepted
	    var borrowerName = UserProfile.findOne({userId: this.contactParameters.borrowerUserId}).fName;
		var modalTitle = "Borrow request declined.";
		var modalBody = "Are you sure you want to decline " + borrowerName + "'s borrow request?";
	    Session.set(ilendbooks.public.modal.TITLE, modalTitle);
	    Session.set(ilendbooks.public.modal.BODY, modalBody);
	    //Modal.show('ilendActionModal');		
	},

	'click .confirm': function() {
		console.log("matched-declined");
    	var borrowerUserId = this.contactParameters.borrowerUserId
	    var borrowerName = UserProfile.findOne({userId: this.contactParameters.borrowerUserId}).fName;
	    Meteor.call('updateMatchDeclined', this.contactParameters);
	    var lenderName = UserProfile.findOne({userId: Meteor.userId()}).fName;
	    var emailInfo = {
	    	to: UserProfile.findOne({userId: borrowerUserId}).email,
	    	from: this.contactParameters.fromEmail,
	    	subject: "Borrow request declined",
	    	text: lenderName + " has declined your trade request."
	    }
	    Meteor.call('emailBorrower', emailInfo);
		//console.log("matched-declined");
	}
})

