


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

JobApplyController = RouteController.extend({
   data: function() { return Jobs.findOne(this.params._id); },
   template: 'jobApplyForm'
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
      var hasSearch=false;
      if (this.tags().length){
         hasSearch = true;
         q['job.category'] = { '$in' : this.tags()};
      }
      if (this.filters().length){
         hasSearch = true;
         q['job.type'] = { '$in' : this.filters()}
      }
      if (this.text().length){
         hasSearch = true;
         var like = { $regex:  '.*' + this.text() + '.*' , $options: 'i'};
         q['$or']= [ {'job.description' :  like }, {'job.title' : like}, {'job.category' : like}, {'job.location' : like} , {'job.company_name' : like}]; 
      }
      
      var jobs = Jobs.find(q, {sort: {'submitted' : -1,'_id' : -1}, limit: this.limit()});
      var count = Jobs.find(q, {sort: {'submitted' : -1,'_id' : -1}}).count();
      
      
      var ret = { 
         jobs: jobs,
         count: count, 
         text: this.text(),
         filters: this.filters(),
         tags: this.tags(),
         hasSearch: hasSearch
         
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


Router.route('/jobs/apply/:_id',{
   controller: JobApplyController,
   onBeforeAction: AuthHooks.checkLoggedIn,
   waitOn: function(){ return [Meteor.subscribe('Jobs', {sort: { '_id' : -1}, limit: 100})]; }
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
   controller: JobDetailController,
   waitOn: function(){ 
      var subs = [
         Meteor.subscribe('Jobs', {sort: { '_id' : -1}, limit: 100})
      ];
      if (Meteor.user() && (
         AuthHooks.isAdmin(Meteor.user()) 
         || AuthHooks.isManager(Meteor.user()))){
            subs.push( Meteor.subscribe('jobApplications', this.params._id) );
      }
      return subs;
   }
});
