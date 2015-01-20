Template.jobDetail.helpers({
   shortSubmitted: function(){
      return moment(this.submitted).format('MMM Do YYYY');
   },
   formattedDescription: function(){
       // todo add markdown parsing and rendering
   }
   
});

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