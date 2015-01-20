Template.profileEditForm.helpers({
   username: function () {
     return Meteor.user() && Meteor.user().username;
   },
   fullname: function(){
      return Meteor.user() && Meteor.user().profile.name;
   },
   email: function () {
     return Meteor.user() && Meteor.user().emails[0].address;
   }
});