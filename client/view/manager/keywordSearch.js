Template.keywordSearch.events({
  	'submit form' ( event, template ) {
      	event.preventDefault();
        var keywords = event.target.keyword.value;
    		var appUUID = Session.get('appUUID');
        Session.setAuth('keywords', keywords);
       var searchParameters = {
          keywords : keywords,
       }
       console.log("keywords: " + keywords)
       Meteor.call( 'itemSearch', appUUID, searchParameters);
       Router.go('searchResults');
	}	
})