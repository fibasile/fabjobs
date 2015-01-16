Template.profilebox.helpers({
  username: function () {
    return Meteor.user() && Meteor.user().emails[0].address;
  },
  isAdminOrManager: function(){
     var roles = Meteor.user().roles;
     var hasRole = false;
     for (var i in roles){
        if (roles[i] == 'admin' || roles[i] == 'manager'){
           hasRole = true;
        }
     }
     return hasRole;
  }
});

Template.profilebox.events({
   'click #logoutButton': function(){
      Meteor.logout(function(error){
         console.log('Error loggin out');
      });
   }
   
});
