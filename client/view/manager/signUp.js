Template.signup.events({
   'submit form' ( event, template ) {
      event.preventDefault();
      password = template.find( '[name="password"]' ).value;
      validationPassword = template.find( '[name="password2"]' ).value
      let user = {
         // email: template.find( '[name="emailAddress"]' ).value + "@uw.edu",
         email: template.find( '[name="emailAddress"]' ).value,
         password: template.find( '[name="password"]' ).value
         
      };
      console.log("did i make a user?");
      
      
      if(validationPassword == password) {
         
         Accounts.createUser( user, ( error ) => {
            if ( error ) {
               Bert.alert( error.reason, 'danger' );

            } else {
               Meteor.call( 'sendVerificationLink', ( error, response ) => {
                  if ( error ) {
                     Router.go('login');
                     Bert.alert( error.reason, 'danger' );
                  } else {
                     Bert.alert( 'Welcome!', 'success' );
                     Router.go('verificationEmailSent');
                  }
               });
            }
         });
      }else {
         document.getElementById("confirm").style.borderColor="red";
         Bert.alert('Your two password values didnt match.', 'danger');
      }
      
   }
});
//Make it only for UW email ----> should display an error when non-uw.edu signs up
//drop down for current degree
//drop down for Major - use tags
// ex: Economics book --> economics, firstyear, etc.
// amazong url api , adding book to list---> 1) search for name book if its in website
// 2)provide amazon url, 3)type in ISBN number
// url scrapers, prove url, call them, and gives all text from the page they findff