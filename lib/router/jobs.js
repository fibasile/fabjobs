var checkLoggedIn = function () {
      if (!Meteor.userId()) {
          // if the user is not logged in, render the Login template
          this.render('Login');
      } else {
          // otherwise don't hold up the rest of hooks or our route/action function
          // from running
          this.next();
      }  
};


JobListingController = RouteController.extend({
  template: 'jobsBrowser',
   data: {
      featuredJobs: function(){ return Jobs.find({'featured' : true},{sort: {  '_id' : -1}, limit: 10}); },
      topJobs: function(){ return Jobs.find({},{sort: { 'views' : -1, '_id' : -1}, limit: 10}); },
      recentJobs: function(){ return Jobs.find({},{sort: { 'submitted' : -1, '_id' : -1}, limit: 10}); }
   }
});

JobDetailController = RouteController.extend({
   template: 'jobDetail',
   data: function() { return Jobs.findOne(this.params._id); }
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
      var jobs = Jobs.find(q);
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
   onBeforeAction: checkLoggedIn
});

Router.route('/jobs/submitted',function(){
   this.render('jobPostFormSubmitted');
});


Router.route('/jobs/:_id/apply',{
   name: 'jobApplyForm',
   data: function() { return Jobs.findOne(this.params._id); }
});


Router.route('/jobs/search', {
   name: 'jobsSearch',
   controller: JobSearchController
})

Router.route('/jobs/:_id', {
   name:"jobDetail",
   controller: JobDetailController
});
