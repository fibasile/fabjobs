Router.route('/user/profile', function(){
   this.render('profileEditForm');
},{
   onBeforeAction: AuthHooks.checkLoggedIn
});

Router.route('/user/profile/updated', function(){
   this.render('profileUpdated');
});