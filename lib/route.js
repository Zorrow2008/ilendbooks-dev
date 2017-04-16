Router.configure({
   layoutTemplate: 'layout',
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

Router.route('/emailSent', {
   name:'emailSent',
   template: 'emailSent'
});

Router.route('/login',{
   name:"login",
   template:'login'
});


Router.route('/specificBookPage',{
   name:"specificBookPage",
   template:'specificBookPage'
});

Router.route('/', {
   name: 'home',
   template: 'home'
});

Router.route('/user',{
   name: 'user',
   template: 'user'
});


Router.route('/bookSearch',{
   name: 'bookSearch',
   template: 'bookSearch'
});

Router.route('/searchResult',{
   name: 'searchResult',
   template: 'searchResult'
});

Router.route('/verify-email/:token', {
   name: 'verify-email',
   action(){
      console.log('this.params.token=' + this.params.token);
      Accounts.verifyEmail(this.params.token, (error) => {
         if(error) {
            Bert.alert (error.reason, 'danger');
            Router.go('/emailVerificationFail')
         }
         else {
            Router.go('/user')
            Bert.alert( 'Email verified! Thanks!', 'success' );
         }
         
      });
   }
});

