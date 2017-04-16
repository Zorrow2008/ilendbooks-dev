Template.user.events({
   'submit form': function(event) {
      event.preventDefault();
      console.log("Form submitted");
      console.log(event.type);
      var firstName = event.target.firstName.value;
      var lastName = event.target.lastName.value;
      var studentID = event.target.studentID.value;
      var grade = event.target.grade.value;
      var phoneNumber = event.target.phoneNumber.value;

      var radios = document.getElementsByName('contact');
      if (radios[0].checked) {
        // do whatever you want with the checked radio
        var contactPreference = ilendbooks.public.contactPreference.EMAIL;
      }else{
         var contactPreference = ilendbooks.public.contactPreference.CELL;
      }

      console.log(firstName);
      console.log(lastName);
      
      console.log(grade);
      UserProfile.insert({
         userId: Meteor.userId(),
         fName: firstName,
         lName: lastName,
         studentID: studentID,
         phoneNumber : phoneNumber,
         email: Meteor.user().emails[0].address,
         contactPreference: contactPreference,
         grade: grade,
         points: 10
      })
      Router.go('/');
   }
})




