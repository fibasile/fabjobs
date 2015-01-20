Router.route('/admin',  function(){
   this.render('adminHome');
   
   this.render('adminDashboard', {to: 'panel'});
},{
    onBeforeAction: AuthHooks.checkAdminOrManager,
    waitOn: function(){ Meteor.subscribe('adminNotifications', {sort: {'submitted' : -1, '_id' : 1}, limit: 5})},
});

Router.route('/admin/users',  function(){
    var data = { users:  Meteor.users.find({},{sort: {'username': -1, '_id' : -1}}) };
    this.render('adminHome');
    this.render('adminUsers', {to: 'panel', data: data});
},{
	waitOn: function(){ Meteor.subscribe('adminUsers', { sort: {'username' : -1, '_id' : -1} }) },
   onBeforeAction: AuthHooks.checkAdminOrManager
});

Router.route('/admin/user/:user_id',  function(){
    var data = { user:  Meteor.users.findOne({_id: this.params.user_id}) };
    this.render('adminHome');
    this.render('adminUserDetail', {to: 'panel', data: data});
},{
	waitOn: function(){ Meteor.subscribe('adminUser', this.params.user_id)},
   onBeforeAction: AuthHooks.checkAdminOrManager
});



Router.route('/admin/jobs', function(){
    Router.go('/admin/jobs/list/all')
},{
    onBeforeAction: AuthHooks.checkAdminOrManager
});

Router.route('/admin/jobs/applications/:job_id', function(){
		var job_id = this.params.job_id;
		var data = {
			job: Jobs.findOne({ _id: job_id }),
			applications: JobApplications.find( {jobId: job_id}, { sort: { _id: -1}})
		};	
		this.render('adminJobApplications', { data: data });	
		
},{
	
	waitOn: function(){  
		Meteor.subscribe('jobApplications', this.params.job_id); 
		Meteor.subscribe('adminJobs', {sort: { 'submitted' : -1,'_id' : -1}});
	}, 
    onBeforeAction: AuthHooks.checkAdminOrManager
});


Router.route('/admin/jobs/edit/:_id', function(){
    var job_id = this.params._id;
    this.render('adminHome');
    var data =  {job : Jobs.findOne({_id:job_id})};
    this.render('adminJobEditForm', {to: 'panel', data: data});
},{
    onBeforeAction: AuthHooks.checkAdminOrManager
});

Router.route('/admin/jobs/list/:q', function(){
    this.render('adminHome');
    var query = {};
    var f = this.params.q;
    if (f === 'published'){
        query = { 'published' : true}
    }
    if (f === 'pending'){
        query = { 'published' : false}
    }
    if (f === 'featured'){
        query = { 'featured' : true};
    }
    if (f === 'completed'){
        query = { 'completed' : true};
    }
    var limit = 10;
    var page = this.params.query && parseInt(this.params.query.page) || 0;
    var total = Jobs.find(query, { sort: { 'submitted' : -1, '_id' : -1 }}).count();
    var jobs=  Jobs.find(query, { sort: { 'submitted' : -1,'_id' : -1 }, limit: 10, skip: page*limit});
    var data =  {jobs: jobs, currentTab: f,currentPage:page, total: total, totalPages: Math.ceil(total / limit)};
    this.render('adminJobs', {to: 'panel', data: data});
},{
    waitOn: function(){ Meteor.subscribe('adminJobs', {sort: {'submitted' : -1, '_id' : -1}});},
    onBeforeAction: AuthHooks.checkAdminOrManager
});

/*
AdminJobPages = new Meteor.Pagination(Jobs,{
    router: 'iron-router',
    homeRoute: '/admin/jobs/',
    routerLayout: "layout",
    route: '/admin/jobs/list/:q',
    routerTemplate: 'adminHome',
    perPage: 20,
    sort: { submitted: -1, _id: -1 }
});
*/

Router.route('/admin/notifications', function(){
    this.render('adminHome');
    var data = { 'notifications' : Notifications.find({},{sort: { 'submitted' : -1, '_id' : 1}, limit: 100})};
    this.render('adminNotifications', {to: 'panel', data: data});    
},{
	waitOn: function(){ Meteor.subscribe('adminNotifications', {sort: { 'submitted' : -1,'_id' : 1}, limit: 100})},
    onBeforeAction: AuthHooks.checkAdminOrManager
});
