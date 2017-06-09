Template.user.events({
   'submit form': function(event) {
      event.preventDefault();
      console.log("Form submitted");
      console.log(event.type);
      var firstName = event.target.firstName.value;
      var lastName = event.target.lastName.value;
      var studentID = event.target.studentID.value;
      //var grade = event.target.grade.value;
      var newPhoneNumber = "";
      var phoneNumber = event.target.phoneNumber.value;
      for(var i = 0;  i < phoneNumber.length; i++) {
         if(!isNaN(parseFloat(phoneNumber.charAt(i))) && isFinite(phoneNumber.charAt(i))){
            newPhoneNumber += phoneNumber.charAt(i);
         }
      }
      var degreeElement = document.getElementById("degrees");
      var degree = degreeElement.options[degreeElement.selectedIndex].value;


      var contactElement = document.getElementById('contacts');
      var contactPreference = contactElement.options[contactElement.selectedIndex].value;

      
      UserProfile.insert({
         userId: Meteor.userId(),
         fName: firstName,
         lName: lastName,
         studentID: studentID,
         phoneNumber : newPhoneNumber,
         email: Meteor.user().emails[0].address,
         contactPreference: contactPreference,
         degree: degree,
         bookcoin: ilendbooks.private.bitCoin.ACCOUT_CREATION
      });
      Reviews.insert({
         userId: Meteor.userId(),
         asLenderReviews: [],
         asBorrowerReviews: [],
         averageLenderRating: 0,
         averageBorrowerRating: 0,
         averageUserRating: 0
      });
      Router.go('userHome');
   }
})




