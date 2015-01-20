Meteor.startup(function () {
  // logEvent({
  //   name: "firstRun",
  //   unique: true, // will only get logged a single time
  //   important: true
  // }) 
     
  Accounts.onCreateUser(function(options, user){
     if (user.emails && user.emails.length > 0){
        user.username = user.emails[0].address;
     }
     return user;
  });
     

});