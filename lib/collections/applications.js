JobApplications = new Meteor.Collection('job_applications');



Meteor.methods({
	submitApplication: function(application){
		var user = Meteor.user();

        if (!user){
            throw new Meteor.Error("logged out", 'You must be logged in to apply to a job');
        }
        if(!application.fullname)
          throw new Meteor.Error("fullname-missing", 'Please fill in your full name');
        if(!application.email)
          throw new Meteor.Error("email-missing", 'Please fill in your email address');
        if(!application.job_id)
          throw new Meteor.Error("job-missing", 'Cannot post an application without a job');

		var defaultProperties = {
			website: '',
			linkedin: '',
			bio: '',
			education:'',
			work_experience: '',
			notes: '',
		};
		
		application = _.extend(defaultProperties,application);

		console.log(application);
		var job_id = application.job_id;
		
		delete application.job_id;
		
		
		var duplicate = JobApplications.findOne({userId: user._id, jobId: job_id});
		if (duplicate){
			throw new Meteor.Error("job-duplicate", 'Cannot apply twice for the same job');
		}
		
		
		var appItem = {
			submitted: new Date(),
			author : user.profile.name,
            userId: user._id,
            jobId: job_id,
            application: application
		};
		
		appItem._id = JobApplications.insert(appItem);
		Jobs.update({_id: job_id},{$inc : {applications: 1}});

		var job = Jobs.findOne({_id:job_id});
		
		postNotification('submit-application', 'User ' + application.fullname + ' applied to job ' + job.job.title, {
			user: user._id, job: job_id
		});

	}

});