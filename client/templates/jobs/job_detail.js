Template.jobDetail.helpers({
   shortSubmitted: function(){
      return moment(this.submitted).format('MMM Do YYYY');
   }
   
   
});

Template.jobDetail.events({
   
   'click #shareFB': function(){
      window.open('http://www.facebook.com/sharer/sharer.php?u=' + document.location.href);
   },
   
   'click #shareTwitter': function(){
      document.location.href='http://twitter.com/share';
   },
   
   'click #sharePrint' : function(){
      window.print();
   }
   
   
});