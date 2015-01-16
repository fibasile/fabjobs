Template.profilebox.helpers({
  username: function () {
    return Meteor.user() && Meteor.user().emails[0].address;
  }
});

Template.profilebox.events({
   'click #logoutButton': function(){
      Meteor.logout(function(error){
         console.log('Error loggin out');
      });
   }
   
});
