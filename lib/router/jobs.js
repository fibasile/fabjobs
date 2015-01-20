


JobListingController = RouteController.extend({
  template: 'jobsBrowser',
   data: {
      featuredJobs: function(){ return Jobs.find({'featured' : true,'completed':false,'published': true},{sort: {  'submitted' : -1,'_id' : -1}, limit: 10}); },
      topJobs: function(){ return Jobs.find({'published':true,'completed':false,},{sort: { 'views' : -1, '_id' : -1}, limit: 10}); },
      recentJobs: function(){ return Jobs.find({'published':true,'completed':false,},{sort: { 'submitted' : -1, '_id' : -1}, limit: 10}); }
   }
});

JobDetailController = RouteController.extend({
   template: 'jobDetail',
   data: function() { 
	   var seen = Session.get('seen') || new Array();
	   if (seen.indexOf(this.params._id) == -1){
		   seen.push(this.params._id);
		   Session.set('seen',seen);
		   Meteor.call('viewJob', this.params._id);
	   }	   
	   return Jobs.findOne(this.params._id);    
   }
});


JobSearchController = RouteController.extend({
   template: 'jobsSearch',
   tags: [],
   filters: [],
   
   data: function() {
      var tags = this.tags | [];
      var filters = this.filters | [];
      if (this.params.query && this.params.query.tags) {
         tags = JSON.parse(decodeURIComponent(this.params.query.tags));
      }
      if (this.params.query && this.params.query.filter) {
         filters = JSON.parse(decodeURIComponent(this.params.query.filter)); 
      } 
      this.tags = tags;
      this.filters = filters;
      var q = {};
      if (this.tags.length){
         q['job.category'] = { '$in' : this.tags};
      }
      if (this.filters.length){
         q['job.type'] = { '$in' : this.filters}
      }
      var jobs = Jobs.find(q, {sort: {'submitted' : -1,'_id' : -1}});
      return { 
         jobs: jobs,
         count: jobs.count(), 
         filters: filters,
         tags: tags
      };
   }
});

Router.route('/', {
   name:'home',
   controller: JobListingController
});


Router.route('/jobs/post',function(){
   this.render('jobPostForm');
},{
   onBeforeAction: AuthHooks.checkLoggedIn
});

Router.route('/jobs/submitted',function(){
   this.render('jobPostFormSubmitted');
});


Router.route('/jobs/:_id/apply',{
   name: 'jobApplyForm',
   data: function() { return Jobs.findOne(this.params._id); },
   onBeforeAction: AuthHooks.checkLoggedIn
});

Router.route('/jobs/thankyou', function(){
	this.render('thankyou');
});


Router.route('/jobs/search', {
   name: 'jobsSearch',
   controller: JobSearchController
})

Router.route('/jobs/:_id', {
   name:"jobDetail",
   controller: JobDetailController
});
