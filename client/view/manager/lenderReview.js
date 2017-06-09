Template.lenderReview.helpers({
	getLenderName: function() {
		var lenderId = Session.get('lenderId');
		var borrowerName = UserProfile.findOne({userId: lenderId}).fName;
		return borrowerName;
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
		Meteor.call('insertLenderReview', lenderId, rating1, rating2, notes);
		Modal.hide('lenderReview');
	  	Router.go("myShelf");
	   }
})