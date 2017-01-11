Jobs = new Meteor.Collection("jobs");



Meteor.methods({
    submitJob: function(job){
        var user = Meteor.user();

        if (!user){
            throw new Meteor.Error("logged out", 'You must be logged in to post a job');
        }

        var isAdminOrManager = AuthHooks.isAdmin(user) || AuthHooks.isManager(user);
        
        if(!job.title)
          throw new Meteor.Error("title-missing", 'Please fill in a title');
        

        var defaultProperties = {
            title: 'untitled',
            website: 'http://',
            company_name: '',
            description: '',
            salary: 0,
            type: 'Full Time',
            category: '3D',
            location: '',
            lat: 0,
            long: 0,
            instructions: 0, 
        };
        
        job = _.extend(defaultProperties, job)

        
        
        var jobItem = {
            submitted: new Date(),
            author : user.profile.name,
            userId: user._id,
            featured: false,
            published: isAdminOrManager,
            completed: false,
            views: 0,
            applications: 0,
            job: job
        };
        
        jobItem._id = Jobs.insert(jobItem);
        
        
		postNotification('submit-job', 'User ' + user.profile.name + ' created job ' + job.title, {
			user: user._id, job: jobItem._id
		});

        
    },
    viewJob: function(jobId){
            Jobs.update(jobId, {$inc: {views:1}});	    
    },
    updateJob: function(job, modifier, jobId){
        var user = Meteor.user();
        console.log(jobId);
        console.log(modifier);
        if (!user)
            throw new Meteor.Error(601, 'You must be logged in to update a job');
        var jobItem = Jobs.findOne(jobId);
        var isAdminOrManager = AuthHooks.isAdmin(user) || AuthHooks.isManager(user);
        if (isAdminOrManager || jobItem.userId === user._id ){
            var set = {job: modifier.job};
            Jobs.update(job._id, {$set: set}, {validate: false});
        }
        
		postNotification('update-job', 'User ' + user.profile.name + ' updated job ' + modifier.job.title,  {
			user: user._id, job: job._id
		});

         
        return Jobs.findOne({_id: job._id});
        
    },
    publishJob: function(job,published){
        var user = Meteor.user();
        if (!user)
            throw new Meteor.Error(601, 'You must be logged in to publish a job');
        var isAdminOrManager = AuthHooks.isAdmin(user) || AuthHooks.isManager(user);
        if (isAdminOrManager){
            var set = {'published' : published}
            var result = Jobs.update(job._id, {$set: set}, {validate: false});  

			var action = published ? 'published' : 'unpublished';
			postNotification('publish-job', 'User ' + user.profile.name + ' ' + action + ' job ' + job.job.title, {
				user: user._id, job: job._id
			});


        } else{
            flashMessage('You need to be an admin to do that.', "error");
        }
    },
    completeJob: function(job,completed){
        var user = Meteor.user();
        if (!user)
            throw new Meteor.Error(601, 'You must be logged in to publish a job');
        var isAdminOrManager = AuthHooks.isAdmin(user) || AuthHooks.isManager(user);
        if (isAdminOrManager){
            var set = {'completed' : completed}
            var result = Jobs.update(job._id, {$set: set}, {validate: false});  

			var action = completed ? 'closed' : 'opened';
			postNotification('complete-job', 'User ' + user.profile.name + ' ' + action + ' job ' + job.job.title,  {
				user: user._id, job: job._id
			});


        } else{
            flashMessage('You need to be an admin to do that.', "error");
        }
        
    },
    featureJob: function(job,featured){
        var user = Meteor.user();
        if (!user)
            throw new Meteor.Error(601, 'You must be logged in to publish a job');
        var isAdminOrManager = AuthHooks.isAdmin(user) || AuthHooks.isManager(user);
        if (isAdminOrManager){
            var set = {'featured' : featured}
            var result = Jobs.update(job._id, {$set: set}, {validate: false});  

			var action = featured ? 'featured' : 'unfeatured';
			postNotification('feature-job', 'User ' + user.profile.name + ' ' + action + ' job ' + job.job.title,  {
				user: user._id, job: job._id
			});


        } else{
            flashMessage('You need to be an admin to do that.', "error");
        }
    },
    increaseJobViews: function(job_id){
        Jobs.update(job_id, {$inc: { views: 1 }});  
    },
    increaseJobApplications: function(job_id){
        Jobs.update(job_id, {$inc: { applications: 1 }});  
    },
    
    deleteJobById: function(job_id){
        var job = Jobs.findOne({_id: job_id});
        var user = Meteor.user();
        var isAdminOrManager = AuthHooks.isAdmin(user) || AuthHooks.isManager(user);
        if (isAdminOrManager){
            Jobs.remove(job_id);
			postNotification('delete-job', 'User ' + user.profile.name + ' deleted job ' + job.job.title,  {
				user: user._id, job: job._id
			});


        } else {
            throw new Meteor.Error(606, 'You need permission to edit or delete a job');
        }
    }
})