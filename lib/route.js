Router.configure({
   layoutTemplate: 'layoutSideBar',
});

Router.route('/aboutUs',{
   name: "aboutUs",
   template: 'aboutUs'
});

Router.route('/userSearch',{
   name: "userSearch",
   template: 'userSearch'
});

Router.route('/myShelf',{
   name: "myShelf",
   template: 'myShelf'
});

Router.route('/forgotPassword',{
   name: "forgotPassword",
   template: 'forgotPassword'
});

Router.route('/myBorrows', {
   name: "myBorrows",
   template: 'myBorrows'
});

Router.route('/myNotifications', {
   name: "myNotifications",
   template: 'myNotifications'
});

Router.route('/signup',{
   name:'signup',
   template: 'signup'
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

Router.route('/emailSent', {
   name:'emailSent',
   template: 'emailSent'
});

Router.route('/login',{
   name:"login",
   template:'login',
   layoutTemplate: 'layout'
});

Router.route('/logout',{
   name:"logout",
   template:'logout',
   action: function () {
      console.log("logout clicked...")
      Meteor.logout();
      this.render('home');
      //close the side nav if it is in open state
      var $main = $('#main');
      var $mySidenav = $('#mySidenav');
      $main.removeClass('ilend-mainOpenSideNav');
      $mySidenav.removeClass('ilend-openSideNav');
      $main.addClass('ilend-mainCloseSideNav');
      $mySidenav.addClass('ilend-closeSideNav');
   }
});


Router.route('/specificBookPage',{
   name:"specificBookPage",
   template:'specificBookPage'
});

Router.route('/',{
   name: 'home',
   template: 'home',
   layoutTemplate: 'layout'
});



// Router.route('/', {
//    name: 'home',
//    template: 'home',
//    action: function (){
//       if(Meteor.userId() == null) {
//          this.layoutTemplate=layoutHome
//          this.render('home')
//       } else {
//          this.render('userHome')
//       }
//    }
// });

// Router.route('/', function () {
//   // add the subscription handle to our waitlist
//   this.wait(Meteor.subscribe('item', this.params._id));
//   // this.ready() is true if all items in the wait list are ready
//   if (Meteor.userId() != null) {
//     this.render('home');
//   } else {
//     this.render('userHome');
//   }
// });

Router.route('/user',{
   name: 'user',
   template: 'user'
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
            Bert.alert (error.reason, 'danger');
            //Router.go('/emailVerificationFail')
         }
         else {
            Router.go('/user')
            Bert.alert( 'Email verified! Thanks!', 'success' );
         }
         
      });
   }
});