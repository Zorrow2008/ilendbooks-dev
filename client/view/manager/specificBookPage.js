Template.specificBookPage.helpers({
   getTitle: function() {
      var title = Session.get('specificBook-title');
     // console.log("this was called" + title);
      return title;
   },

   getAuthor: function() {
      return Session.get('author');
   },

   getPublisher: function() {
      return Session.get('publisher');
   },

   getEdition: function() {
      return Session.get('edition');
   },

   getISBN: function() {
      return Session.get('ISBN');
   },

   getPublicationDate: function() {
      return Session.get('publication date');
   },

   getImage: function() {
    // console.log("i reached getImage");
     var ilendbooksId = Session.get('specificBook-ilendbooksId').valueOf();
    // console.log("ilendbooksId: " + ilendbooksId);
     var currentBook = Books.findOne({"_id": ilendbooksId});
    // console.log("currentbook:"+currentBook);
   //  var currentbook = Books.findOne({Session.get('ilendbooksId')});
     return currentBook.MediumImage[0].URL[0];

     // return Session.get('specificBookImage');
   },

   getLenders: function() {
     // console.log("getLenders called");
     // console.log("ilendbooksid: " + Session.get('ilendbooksId'));
      var currentBook = ToLend.findOne({ilendbooksId: Session.get('specificBook-ilendbooksId')});
      for(key in currentBook) {
         console.log("key: " + key + ";value: " + currentBook[key]);
      }
    //  console.log(currentBook.lender);
      return currentBook.lender;
   },

   getLenderFirstName: function(userId) {
      //console.log("getLenderName called");
      return UserProfile.findOne({userId: userId}).fName;
   },

   isEmail: function(userId) {
      var currentPendingTransaction = PendingTransactions.findOne({lenderUserId: userId});
      for(key in currentPendingTransaction) {
        console.log(key + "; " + currentPendingTransaction[key]);
      }
      var contactMethod = currentPendingTransaction && currentPendingTransaction.contactParameters && currentPendingTransaction.contactParameters.contactMethod;
      console.log("email: " + contactMethod );
      console.log("ilendbooks.public.contactPreference.EMAIL:" + ilendbooks.public.contactPreference.EMAIL);
      console.log("is email: "+ (contactMethod  == ilendbooks.public.contactPreference.EMAIL)); 
      return contactMethod  == ilendbooks.public.contactPreference.EMAIL;
   },

   hasClickedBorrow: function() {
      var title = Session.get('specificBook-title');
      var ilendbooksId = Session.get('specificBook-ilendbooksId')
      console.log("title" + title);
      var currentBook = ToBorrow.findOne({title: title, ilendbooksId:ilendbooksId});
      for(key in currentBook.borrower) {
         if(currentBook.borrower[key].userId == Meteor.userId()) {
            return true;
         }
      }
      return false;
   }
})

Template.specificBookPage.events({
   'click .borrow': function(event) {
      event.preventDefault();
      var appUUID = Session.get('appUUID');
      var bookTitle = Session.get('specificBook-title');
      var borrowerInfo = {
        title : bookTitle,
        borrowerUserId: Meteor.userId(),
        ilendbooksId :Session.get('specificBook-ilendbooksId'),
        lenderUserId:this.userId,
      };

      for(borrowerKey in borrowerInfo) {
        console.log(borrowerKey + "; " + borrowerInfo[borrowerKey]);
      }
      Meteor.call('updateToBorrowAndContactLender', appUUID, borrowerInfo);
      console.log("updateToBorrowAndContactLender finished");

   }
})