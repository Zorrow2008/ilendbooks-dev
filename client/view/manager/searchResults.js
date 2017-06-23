Template.searchResults.helpers({
   
   getSearchResults:function() {
      var searchResult = Session.get('SearchResult');
      return searchResult.results;    
   },

   isVerifiedUser: function() {
      var userProfile = UserProfile.findOne({userId: Meteor.userId()});
      return userProfile && Meteor.user().emails[ 0 ].verified;
   }
})

Template.searchResults.events({
	'click .resend-verification-link':function(event, template) {
       Meteor.call( 'sendVerificationLink', ( error, response ) => {
          if ( error ) {
             Router.go('login');
             Bert.alert( error.reason, 'danger' );
          } else {
             Bert.alert( 'Welcome!', 'success' );
             Router.go('verificationEmailSent');
          }
       });
	}
})
