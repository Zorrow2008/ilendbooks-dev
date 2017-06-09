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
      var clickedLend = false;
      for(key in currentBook.lender) {
         if(currentBook.lender[key].userId == Meteor.userId()) {
            if(currentBook.lender[key].status == ilendbooks.public.status.REMOVED 
               || currentBook.lender[key].status == ilendbooks.public.status.DELETE) {
               clickedLend = false;
            }else{
               clickedLend = true;
            }
         }
      }

     // for(key in currentBook.lender) {
     //     if(currentBook.lender[key].userId == Meteor.userId()) {
     //        clickedLend = true;
     //     } else {
     //         clickedLend = false;
     //     }
     //  }
     
      return clickedLend;
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
   
})

Template.searchResult.events({
   'click .lend' : function(event) {
      event.preventDefault();
      var title = this.ItemAttributes[0].Title[0];
      console.log("searchResult:lend:title=" + title);
      var ilendbooksId = this.ilendbooksId;
      if(! ilendbooksId) {
         ilendbooksId = this._id; // if data is from 'books' collection
      }
      console.log("searchResult:lend:ilendbooksId=" + ilendbooksId);
      Session.set('condition-lendBook-title', title);
      Session.set('condition-lendBook-ilendbooksId', ilendbooksId);
      Modal.show('clickedLendModal');
   },

   'click .ownThisBook' : function(event) {
      event.preventDefault();

      var modalTitle = "Wait...";
      var title = "Title : " + this.ItemAttributes[0].Title[0];
      var modalBodyArray = [title, "You own this book and have added to your shelf.." ];

      Session.set(ilendbooks.public.modal.TITLE, modalTitle);
      //remove if there any in the session
      Session.delete(ilendbooks.public.modal.BODY);
      Session.set(ilendbooks.public.modal.BODY_ARRAY, modalBodyArray);
      Modal.show('ilendInfoModal');
   },

   'click .notNewLender' : function(event) {
      event.preventDefault();

      var modalTitle = "Wait...";
      var title = "Title : " + this.ItemAttributes[0].Title[0];
      var modalBodyArray = [title, "This book is already in your lender shelf..." ];

      Session.set(ilendbooks.public.modal.TITLE, modalTitle);

      //remove if there any in the session
      Session.delete(ilendbooks.public.modal.BODY);
      Session.set(ilendbooks.public.modal.BODY_ARRAY, modalBodyArray);

      Modal.show('ilendInfoModal');

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
      ToAmazon.insert(data);
   },
   
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
      Session.setAuth('specificBook-title', element.title);
      Session.setAuth('specificBook-ilendbooksId' , element.ilendbooksId);
      Router.go("specificBookPage");
      
   }

})