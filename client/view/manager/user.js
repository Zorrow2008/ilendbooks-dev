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

      var radios = document.getElementsByName('contact');
      //var degree = document.getElementsByName('degree');
      var option = document.getElementById("degrees");
      var degree = option.options[option.selectedIndex].value;

      if (radios[0].checked) {
        // do whatever you want with the checked radio
        var contactPreference = ilendbooks.public.contactPreference.EMAIL;
      }else{
         var contactPreference = ilendbooks.public.contactPreference.CELL;
      }

      console.log(firstName);
      console.log(lastName);
      
      console.log(degree);
      UserProfile.insert({
         userId: Meteor.userId(),
         fName: firstName,
         lName: lastName,
         studentID: studentID,
         phoneNumber : newPhoneNumber,
         email: Meteor.user().emails[0].address,
         contactPreference: contactPreference,
         degree: degree,
         points: 10
      })
      Router.go('userHome');
   }
})




