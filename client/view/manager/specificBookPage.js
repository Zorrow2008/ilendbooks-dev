Template.specificBookPage.helpers({
   getTitle: function() {
      var title = Session.get('specificBookTitle');
     // console.log("this was called" + title);
      return title;
   },

   getImage: function() {
    // console.log("i reached getImage");
     var ilendbooksId = Session.get('ilendbooksId').valueOf();
    // console.log("ilendbooksId: " + ilendbooksId);
     var currentBook = Books.findOne({"_id": ilendbooksId});
    // console.log("currentbook:"+currentBook);
   //  var currentbook = Books.findOne({Session.get('ilendbooksId')});
     return currentBook.LargeImage[0].URL[0];

     // return Session.get('specificBookImage');
   },

   getLenders: function() {
     // console.log("getLenders called");
     // console.log("ilendbooksid: " + Session.get('ilendbooksId'));
      var currentBook = ToLend.findOne({ilendbooksId: Session.get('ilendbooksId')});
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
   }
})

Template.specificBookPage.events({
   'click .borrow': function(event) {
      event.preventDefault();
      for (var thisKey in this) {
       // console.log(thisKey + ":" + this[thisKey]);
      }
      var appUUID = Session.get('appUUID');
      var contactParameters = {
        lenderUserId:this.userId,
        borrowerUserId: Meteor.userId(),
        ilendbooksId:Session.get('ilendbooksId')
     }
      for (var contactParametersKey in contactParameters) {
      //  console.log(contactParametersKey + ":" + contactParameters[contactParametersKey]);
      }
    // console.log("i clicked request a lend");
     Meteor.call('contactLender', appUUID, contactParameters, function (err, result) {
      // handle any errors returned by the server by informing the user of
      // the error and logging out any information that may be helpful in 
      // diagnosing the issue and then returning. the return in the if block
      // prevents the need for an else block to protect to following code.
      if (err) {
        alert("There was an error sending the message. See the console for more info");
        console.warn("There was an error sending the message.", contactParameters, err);
        return;
      }
      // inform the user that the message was sent correctly.
      alert("Message sent successfully. See the console for more info.");
      // log out the db object that was created.
     // console.log("Message sent. Result: ", result);
    });



   }
})