Router.configure({
   layoutTemplate: 'layoutSideBar',
});
/**************************/
/* no login verification */
/**************************/

Router.route('/signup',{
   name:'signup',
   template: 'signup',
   layoutTemplate: 'layout'
});

Router.route('/login',{
   name:"login",
   template:'login',
   layoutTemplate: 'layout'
});

Router.route('/verificationEmailSent', {
   name:'verificationEmailSent',
   template: 'verificationEmailSent',
   layoutTemplate: 'layout'
});

Router.route('/verificationEmailFailed', {
   name:'verificationEmailFailed',
   template: 'verificationEmailFailed',
   layoutTemplate: 'layout'
});

Router.route('/forgotPassword',{
   name: "forgotPassword",
   template: 'forgotPassword',
   layoutTemplate: 'layout'
});

Router.route('/accountNotVerified',{
   name: 'accountNotVerified',
   template: 'accountNotVerified'
});

Router.route('/notLoggedIn',{
   name: 'notLoggedIn',
   template: 'notLoggedIn'
});

Router.route('/aboutUs',{
   name: 'aboutUs',
   template: 'aboutUs',
   layoutTemplate: 'layout'
});


Router.route('/logout',{
   name:"logout",
   template:'logout',
   action: function () {
      console.log("logout clicked...")
      Meteor.logout(function(error){
         Router.go("home")
         // if(error) {
         //    console("error logging out...")
         // }else{
           
         // }
      });
      
   }
});

Router.route('/',{
   name: 'home',
   template: 'home',
   layoutTemplate: 'layoutHome',
   action(){

   if (Meteor.userId() ) {
      Router.go("userHome")
   } else { 
      //user is not logged in
      this.render('home');
   }

   }
});

/*************************************************/
/* need login verifciation call onBeforeAction() */
/*************************************************/

Router.route('/userSearch',{
   name: "userSearch",
   template: 'userSearch'
});

Router.route('/myShelf',{
   name: "myShelf",
   template: 'myShelf'
});

Router.route('/myBorrows', {
   name: "myBorrows",
   template: 'myBorrows'
});

Router.route('/myNotifications', {
   name: "myNotifications",
   template: 'myNotifications'
});

Router.route('/books',{
   name:'books',
   template: 'books'
});

Router.route('/userHome', {
   name:'userHome',
   template: 'userHome'
});
//changed login.js to go to userHome instead of /

Router.route('/specificBookPage',{
   name:"specificBookPage",
   template:'specificBookPage'
});

Router.route('/user',{
   name: 'user',
   template: 'user',
   layoutTemplate: 'layout'
});


Router.route('/bookSearch',{
   name: 'bookSearch',
   template: 'bookSearch'
});

Router.route('/searchResults',{
   name: 'searchResults',
   template: 'searchResults'
});


Router.route('/verify-email/:token', {
   name: 'verify-email',
   action(){
      console.log('this.params.token=' + this.params.token);
      Accounts.verifyEmail(this.params.token, (error) => {
         if(error) {
            //Bert.alert (error.reason, 'danger');
            Router.go('/verificationEmailFailed')
         }
         else {
            Router.go('/user')
            //Bert.alert( 'Email verified! Thanks!', 'success' );
         }
         
      });
   }
});


Router.onBeforeAction(verifiedAndLoggedInUser, {
  //only: ['admin']
  except: ['signup'
   , 'verify-email'
   , 'login'
   , 'verificationEmailSent'
   , 'verificationEmailFailed'
   , 'forgotPassword'
   , 'accountNotVerified'
   , 'notLoggedIn'
   , 'logout'
   , 'home'
   , 'aboutUs'
   ]
});

function verifiedAndLoggedInUser(){
   console.log('Meteor.userId()=' + Meteor.userId());
   console.log('Meteor.user().emails[ 0 ].verified='+ Meteor.user().emails[ 0 ].verified);
   if (Meteor.userId() && Meteor.user().emails[ 0 ].verified) {
      // user email is verified and logged in
      this.next();
   } else if (Meteor.userId() && ! Meteor.user().emails[ 0 ].verified) {
      // user email is *not* verified and logged in
      Router.go('accountNotVerified');
   } else{
      //user is not logged in
      Router.go('login');
   }
}

