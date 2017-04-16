Template.bookSearch.events({
   'submit form' ( event, template ) {
      event.preventDefault();
      var title = event.target.title.value;
      var author = event.target.author.value;
      console.log("title = " + title);
      console.log("author = " + author);
      var appUUID = Session.get('appUUID');
      Session.setAuth("title", title);
      Session.setAuth("author", author);
      Meteor.call( 'itemSearch', appUUID, title, author);
      Router.go('searchResult');
   }
})



