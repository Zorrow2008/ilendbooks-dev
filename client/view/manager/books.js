Template.books.helpers({
   getBooks: function() {
      return Books.find();
   },
   
   getTitle: function (ItemAttributes){
      return ItemAttributes[0].Title[0];
   },
   
   getAuthor: function(ItemAttributes) {
      return ItemAttributes[0].Author[0];
   },
   
   getMediumImage: function (MediumImage){
      //console.log('getMediumImage:URL=' + MediumImage[0].URL[0]);
      return MediumImage[0].URL[0];
   },
   
   hasClickedBorrow: function() {
      var title = this.ItemAttributes[0].Title[0];
      console.log("title" + title);
      var borrowerBookInfo = {};
      borrowerBookInfo.title = title;
      borrowerBookInfo.users = [];
      var currentBook = ToBorrow.findOne({title: borrowerBookInfo.title});
      var BorrowerInfo = {};
      for(key in currentBook.borrower) {
         if(currentBook.borrower[key].userId == Meteor.userId()) {
            return true;
         }
      }
      return false;
   },
   
   hasClickedLend: function() {
      var title = this.ItemAttributes[0].Title[0];
      console.log("title" + title);
      var lenderBookInfo = {};
      lenderBookInfo.title = title;
      lenderBookInfo.users = [];
      var currentBook = ToLend.findOne({title: lenderBookInfo.title});
      var lenderInfo = {};
      for(key in currentBook.lender) {
         if(currentBook.lender[key].userId == Meteor.userId()) {
            return true;
         }
      }
      return false;
   },
   
   getSearchAuthor: function() {
      var searchResult = Session.get('SearchResult');
      console.log("getSearchAuthor:searchResults=" + searchResult);
      return searchResult.author;
   },
   
   getSearchResults:function() {
      
      var searchResult = Session.get('SearchResult');
      return searchResult.results;
      
   },
   
   getAuthor: function (ItemAttributes){
      
      return ItemAttributes[0].Author[0];
   },
   
   getBinding: function (ItemAttributes){
      
      return ItemAttributes[0].Binding[0];
   },
   getEAN: function (ItemAttributes){
      
      return ItemAttributes[0].EAN[0];
   },
   getEdition: function (ItemAttributes){
      
      return ItemAttributes[0].Edition[0];
   },
   getISBN: function (ItemAttributes){
      
      return ItemAttributes[0].ISBN[0];
   },
   getManufacturer: function (ItemAttributes){
      
      return ItemAttributes[0].Manufacturer[0];
   },
   getNumberOfPages: function (ItemAttributes){
      
      return ItemAttributes[0].NumberOfPages[0];
   },
   getPublicationDate: function (ItemAttributes){
      
      return ItemAttributes[0].PublicationDate[0];
   },
   getPublisher: function (ItemAttributes){
      
      return ItemAttributes[0].Publisher[0];
   },
   getTitle: function (ItemAttributes){
      
      return ItemAttributes[0].Title[0];
   },
   
   getSmallImage: function (SmallImage){
      //console.log('getSmallImage:URL=' + SmallImage[0].URL[0]);
      return SmallImage[0].URL[0];
   },
   getMediumImage: function (MediumImage){
      //console.log('getMediumImage:URL=' + MediumImage[0].URL[0]);
      return MediumImage[0].URL[0];
   },
   getLargeImage: function (LargeImage){
      //console.log('getLargeImage:URL=' + LargeImage[0].URL[0]);
      return LargeImage[0].URL[0];
   },
}),

Template.books.events({
   'click .toAmazon': function(event) {
      //event.preventDefault();
      var myURL = event.target.href;
      var currentdate = new Date();
      var dateTime = currentdate.getDate() + "/"
      + (currentdate.getMonth()+1)  + "/"
      + currentdate.getFullYear() + " @ "
      + currentdate.getHours() + ":"
      + currentdate.getMinutes() + ":"
      + currentdate.getSeconds();
      var data = {
         userID: Meteor.userId(),
         url: myURL,
         dateTimeStamp: dateTime,
      }
      console.log("right before upsert fails Amazon");
      ToAmazon.insert(data);
      console.log("sent to toAmazon collection");
   },
   
   'click .lend': function(event) {
      //event.preventDefault();
      var title = this.ItemAttributes[0].Title[0];
      console.log("title" + title);
      var element = {};
      element.title = title;
      element.users = [];
      console.log("element" + element);
      Meteor.call('updateToLend', element);
      console.log("upsert finished")
      
   },
   
   'click .borrow': function(event) {
      //event.preventDefault();
      var title = this.ItemAttributes[0].Title[0];
      console.log("title" + title);
      var element = {};
      element.title = title;
      element.users = [];
      console.log("element" + element);
      Meteor.call('updateToBorrow', element);
      console.log("upsert finished")
      
   }
   
})