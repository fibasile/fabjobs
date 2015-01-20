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

    if (AuthHooks.isAdmin(user) || AuthHooks.isManager())
        return Jobs.find({}, options);
    else {
        return [];
    }
});


Meteor.publish('jobApplications', function(job_id){
	check(job_id, String);
	var user=Meteor.users.findOne(this.userId);

    if (AuthHooks.isAdmin(user) || AuthHooks.isManager())
		return JobApplications.find({jobId: job_id});
	return [];
	
});


Meteor.publish('singleJob', function(id){
   check(id, String);
   return Jobs.find(id);
});

}