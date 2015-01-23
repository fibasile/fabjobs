

Template.profileEditForm.helpers({
   username: function () {
     return Meteor.user() && Meteor.user().username;
   },
   fullname: function(){
      return Meteor.user() && Meteor.user().profile.name;
   },
   email: function () {
     return Meteor.user() && Meteor.user().emails[0].address;
   },
   errorIfError: function(){
      Session.setDefault('hasError',false);
      if (Session.get('hasError') == true) return 'has-error';
      return '';
   }
});


Template.profileEditForm.events({
   'click button[type="submit"]' : function(ev,template){
      ev.preventDefault();
      var pass1 = template.$('#password').val();
      var pass2 = template.$('#password-confirm').val();
      var fullname = template.$('#fullname').val();
      var profile = {
         fullname: fullname
      };
      if (pass1.length  && pass1.length < 6) {
         template.$('#password-length').show();
         Session.set('hasError',  true);
         return;
      } else {
         template.$('#password-length').hide();
      }
      if (pass1.length && pass1 != pass2) {
         Session.set('hasError',  true);
         template.$('#password-notmatch').show();
         return;
      } else {
         template.$('#password-notmatch').hide();
         profile.password = pass1;
      }
      if (fullname.length == 0){
         template.$('#fullname-empty').show();
         return;         
      } else {
         template.$('#fullname-empty').hide();         
      }
      
      Session.setDefault('hasError',false);      
      Meteor.call('updateUserProfile', profile, function(error,result){
         if (error) {
            Errors.insert(error);
            $(document).scrollTop(0);
         } else {
            if (profile.password){
               Router.go('/user/profile/updated');
            } else {
               Router.go('/');
            }
         }
      });
   }
   
   
});