Template.searchResults.helpers({
   
   getSearchResults:function() {
      var searchResult = Session.get('SearchResult');
      return searchResult.results;    
   },
   
})
