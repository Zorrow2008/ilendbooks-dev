Template.searchResult.helpers({
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
   getFirstName: function() {
      console.log("Meteor.userId(): " +  Meteor.userId());
      var userProfile = UserProfile.findOne({userId: Meteor.userId()})
      console.log("userProfile: " + userProfile);
      console.log("userProfile.fName: " + userProfile.fName);
      return userProfile.fName;
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

   getSearchParameter:function() {
      return Session.get('keywords');
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
   }
   
}),

Template.searchResult.events({
   'submit form': function(event) {
      var title = this.ItemAttributes[0].Title[0];
     // var ilendbooksId = this.ilendbooksId;
      console.log(title);
      //console.log(ilendbooksId);
      event.preventDefault();
      var condition = event.target.bookCondition.value;
      var description = event.target.bookDescription.value;
      var currentLender = {
         title: title,
         condition: condition,
         description: description
      }

      for(key in currentLender) {
         console.log(key + currentLender[key]);
      }
      //var title = this.ItemAttributes[0].Title[0];
      var appUUID = Session.get('appUUID');
      console.log("title" + title);
      var element = {};
      element.title = title;
      element.users = [];
      element.ilendbooksId = this.ilendbooksId;
      console.log("element" + element);
      Meteor.call('updateToLend', appUUID, element);
      console.log("upsert finished")
      Meteor.call('updateBookCondition', currentLender);
      Router.go("myShelf");

   },

   'click .toAmazon': function(event) {
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
   
   // 'click .confirmLend': function(event) {
   //    var title = this.ItemAttributes[0].Title[0];
   //    var appUUID = Session.get('appUUID');
   //    console.log("title" + title);
   //    var element = {};
   //    element.title = title;
   //    element.users = [];
   //    element.ilendbooksId = this.ilendbooksId;
   //    console.log("element" + element);
   //    Meteor.call('updateToLend', appUUID, element);
   //    console.log("upsert finished")
      
   // },
   
   'click .borrow': function(event) {
      var title = this.ItemAttributes[0].Title[0];
      console.log("title" + title);
      var appUUID = Session.get('appUUID');
      var element = {};
      element.title = title;
      element.users = [];
      element.currentBorrowerId = Meteor.userId();
      element.ilendbooksId = this.ilendbooksId
      console.log("element" + element);
      //Meteor.call('updateToBorrow', appUUID, element);
      //Meteor.call('setMatch', element);
     // console.log("upsert finished")
      Session.setAuth('specificBookTitle', element.title);
      Session.setAuth('ilendbooksId' , element.ilendbooksId);
      //Session.setAuth('specificBookImage', this.LargeImage[0].URL[0]);
      Router.go("specificBookPage");
      
   }
})
