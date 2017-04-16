Template.registerHelper('getSearchResult', function() {
	var appUUID = Session.get('appUUID');
	var title = Session.get('title');
	var author = Session.get('author');
	var keywords = Session.get('keywords');
	//var searchResult = SearchResult.findOne({$and : [{appUUID: appUUID}, {title:title}, {author: author}]});
	var searchResult = {};
	if(title && author) {
		searchResult = SearchResult.findOne({$and : [{appUUID: appUUID}, {title:title}, {author: author}]});
	}else{
		searchResult = SearchResult.findOne({$and : [{appUUID: appUUID}, {keyWords: keywords} ]});
	}

	for(key in searchResult) {
		console.log("searchResult key: " + key + "; searchResult value: " + searchResult[key]);
	}
	Session.set('SearchResult', searchResult);
	return searchResult;
})