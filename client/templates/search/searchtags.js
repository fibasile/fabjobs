Template.searchtags.helpers({
   showCount: function(){
      return (this.count > 0);
   },
   tags: function(){
       return Categories.find();
   }
});

Template.searchtag.events({
   'click a.tag': function(e){
      e.preventDefault();
      tags = [ this.label ];
      filterQuery = 'tags=' + encodeURIComponent(JSON.stringify(tags));      
      Router.go('jobsSearch',{},{query: filterQuery});
      $(document).scrollTop(0);
   }
});