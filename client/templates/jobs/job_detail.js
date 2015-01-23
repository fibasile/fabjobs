Template.jobDetail.helpers({
   shortSubmitted: function(){
      return moment(this.submitted).format('MMM Do YYYY');
   },
   formattedDescription: function(){
       // todo add markdown parsing and rendering
   },
   similarJobs: function(){
      return Jobs.find({'published' : true,  _id: {$ne: this._id}, $or : [{ 'job.category': this.job.category},{'job.company' : this.job.company_name}, {'job.location' : this.job.location }]}, { sort: { submitted: -1, _id: -1}, limit: 5});
   }
   
});

Template.jobDetail.rendered = function(){
   
   var disqus_shortname = 'fabeconomy'; // required: replace example with your forum shortname

   /* * * DON'T EDIT BELOW THIS LINE * * */
   (function() {
       var dsq = document.createElement('script'); dsq.type = 'text/javascript'; dsq.async = true;
       dsq.src = '//' + disqus_shortname + '.disqus.com/embed.js';
       (document.getElementsByTagName('head')[0] || document.getElementsByTagName('body')[0]).appendChild(dsq);
   })();
   
   
};

Template.jobDetail.events({
   
   'click #shareFB': function(e){
	   e.preventDefault();
      window.open('http://www.facebook.com/sharer/sharer.php?u=' + document.location.href);
   },
   
   'click #shareTwitter': function(e){
	   e.preventDefault();
      document.location.href='http://twitter.com/share';
   },
   
   'click #sharePrint' : function(e){
	   e.preventDefault();
      window.print();
   },
   'click #goBack' : function(e){
	   e.preventDefault();
	   history.go(-1);
   }
   
   
});