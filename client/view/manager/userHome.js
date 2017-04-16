Template.userHome.events({
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
   },
   
   // 'submit form'( event, template ) {
   //    event.preventDefault();
   //    var title = event.target.title.value;
   //    var author = event.target.author.value;
   //    console.log("title = " + title);
   //    console.log("author = " + author);
   //    var appUUID = Session.get('appUUID');
   //    Session.setAuth("title", title);
   //    Session.setAuth("author", author);
   //    Meteor.call( 'itemSearch', appUUID, title, author);
   //    Router.go('searchResult');
   // }
})

Template.userHome.helpers({
   getFirstName: function() {
      console.log("Meteor.userId(): " +  Meteor.userId());
      var userProfile = UserProfile.findOne({userId: Meteor.userId()})
      console.log("userProfile: " + userProfile);
      console.log("userProfile.fName: " + userProfile.fName);
      return userProfile.fName;
   },
})
