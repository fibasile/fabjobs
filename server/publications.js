if (Meteor.isServer){

Meteor.publish('Jobs', function(options) {
  //check(options, {
  //  sort: Object,
  //  limit: Number
  //});
  return Jobs.find({published:true}, options);
});

Meteor.publish('adminJobs', function(options) {
    //check(options, {
    //    sort: Object,
    //    limit: Number
    //});
    //console.log('publish hook');
    var user=Meteor.users.findOne(this.userId);

    if (AuthHooks.isAdmin(user) || AuthHooks.isManager(user))
        return Jobs.find({}, options);
    
});


Meteor.publish('adminUsers', function(options){
	
	var user=Meteor.users.findOne(this.userId);

   if (AuthHooks.isAdmin(user) || AuthHooks.isManager(user)){
        options.fields = { 'username':true, 'profile.name' : true, 'emails' : true, 'roles' : true}
        return Meteor.users.find({}, options);
   }
	
});

Meteor.publish('adminUser', function(user_id){
   
	var user=Meteor.users.findOne(this.userId);
   if (AuthHooks.isAdmin(user) || AuthHooks.isManager(user)) {
      return Meteor.users.find({_id: user_id});
   } 
});



Meteor.publish('adminNotifications', function(options) {
    //check(options, {
    //    sort: Object,
    //    limit: Number
    //});
    //console.log('publish hook');
    var user=Meteor.users.findOne(this.userId);

    if (AuthHooks.isAdmin(user) || AuthHooks.isManager(user))
        return Notifications.find({}, options);

});





Meteor.publish('jobApplications', function(job_id){
	check(job_id, String);
	var user=Meteor.users.findOne(this.userId);

    if (AuthHooks.isAdmin(user) || AuthHooks.isManager(user))
		return JobApplications.find({jobId: job_id});

	
});


Meteor.publish('singleJob', function(id){
   check(id, String);
   return Jobs.find(id);
});

}