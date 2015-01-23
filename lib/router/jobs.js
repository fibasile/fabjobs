


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
   step: function(){
      return 20;
   },
   limit: function() {
      if (this.params.query && this.params.query.limit){
         return parseInt( this.params.query.limit);
      }
      return this.step();
   },
   tags: function(){
      if (this.params.query && this.params.query.tags) {
         return JSON.parse(decodeURIComponent(this.params.query.tags));
      }
      return [];
   },
   filters: function(){
      if (this.params.query && this.params.query.filter) {
         return JSON.parse(decodeURIComponent(this.params.query.filter)); 
      } 
      return []
   },
   text: function(){
      if (this.params.query && this.params.query.text) {
         return decodeURIComponent(this.params.query.text);
      }
      return '';
   },
   data: function() {
      var q = {};
      if (this.tags().length){
         q['job.category'] = { '$in' : this.tags()};
      }
      if (this.filters().length){
         q['job.type'] = { '$in' : this.filters()}
      }
      if (Meteor.isServer){
         if (this.text().length){
            q['$text']= { $search: this.text()} 
         }
      }
      
      var jobs = Jobs.find(q, {sort: {'submitted' : -1,'_id' : -1}, limit: this.limit()});
      var count = Jobs.find(q, {sort: {'submitted' : -1,'_id' : -1}}).count();
      
      
      var ret = { 
         jobs: jobs,
         count: count, 
         text: this.text(),
         filters: this.filters(),
         tags: this.tags()
      };
      
      if (ret.count > this.limit()){
         var nextAction = '/jobs/search?';
         if (this.tags.length)
            nextAction += 'tags=' + encodeURIComponent(JSON.stringify(this.tags())) + '&';
         if (this.filters.length)
            nextAction += 'filter=' + encodeURIComponent(JSON.stringify(this.filters()))  + '&';
         if (this.text.length)
            nextAction += 'text=' + encodeURIComponent(this.text()) + '&';
         
         nextAction += 'limit=' + (this.limit()+this.step());
         ret.nextAction = nextAction;
      }
      return ret;
      
   }
});

Router.route('/', {
   name:'home',
   controller: JobListingController,
   waitOn: function(){ return [Meteor.subscribe('Jobs', {sort: { '_id' : -1}, limit: 100})]; },
   fastRender: true
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
   controller: JobSearchController,
   waitOn: function(){ return [Meteor.subscribe('Jobs', {sort: { '_id' : -1}, limit: 100})]; }
})

Router.route('/jobs/:_id', {
   name:"jobDetail",
   controller: JobDetailController
});
