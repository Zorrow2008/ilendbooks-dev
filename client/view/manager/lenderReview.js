Template.lenderReview.helpers({
	getLenderName: function() {
		var lenderId = Session.get('lenderId');
		var lenderName = UserProfile.findOne({userId: lenderId}).fName;
		return lenderName;
	}
})

Template.lenderReview.events({

	'submit form': function(event) {
	    event.preventDefault();
		var rating1 = $('#rating1').data('userrating');
		var rating2 = $('#rating2').data('userrating');
		var notes = event.target.notes.value;
		console.log("rating1: " + rating1);
		console.log("rating2: " + rating2);
		console.log("notes: " + notes)
		var lenderId = Session.get('lenderId');
		var ilendbooksId = Session.get('ilendbooksId');
		var appUUID = Session.get('appUUID');
		Meteor.call('insertLenderReview', appUUID, lenderId, rating1, rating2, notes);
		var contactParameters = {
			ilendbooksId: ilendbooksId,
			lenderUserId: Session.get('lenderId'),
			borrowerUserId: Meteor.userId()
		}
		Meteor.call('updatePastBorrow', appUUID, contactParameters)
		Modal.hide('lenderReview');
	  	Router.go("myBorrows");
	   }
})