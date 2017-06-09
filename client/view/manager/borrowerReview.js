Template.borrowerReview.helpers({
	getBorrowerName: function() {
		var borrowerId = Session.get('borrowerId');
		var borrowerName = UserProfile.findOne({userId: borrowerId}).fName;
		return borrowerName;
	}
})

Template.borrowerReview.events({

	'submit form': function(event) {
	 	 event.preventDefault();
		var rating1 = $('#rating1').data('userrating');
		var rating2 = $('#rating2').data('userrating');
		var notes = event.target.notes.value;
		console.log("rating1: " + rating1);
		console.log("rating2: " + rating2);
		console.log("notes: " + notes)
		var borrowerId = Session.get('borrowerId');
		Meteor.call('insertBorrowerReview', borrowerId, rating1, rating2, notes);
		Modal.hide('borrowerReview');
	  	Router.go("myShelf");
	   }
})