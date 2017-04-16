Template.navigation.events({
   'click .login': function(event){
      event.preventDefault();
      Router.go('login');
   },
   
   'click .bookSearch': function(event){
      event.preventDefault();
      Router.go('bookSearch');
   },
   
   'click .aboutUs': function(event) {
      event.preventDefault();
      Router.go('aboutUs');
   },
   
   'click .logout': function(event){
      event.preventDefault();
      Meteor.logout();
      Router.go('login');
   }
})

Template.navigation.helpers({
   getFirstName: function() {
      console.log("Meteor.userId(): " +  Meteor.userId());
      var userProfile = UserProfile.findOne({userId: Meteor.userId()})
      console.log("userProfile: " + userProfile);
      console.log("userProfile.fName: " + userProfile.fName);
      return userProfile.fName;
   },
})
