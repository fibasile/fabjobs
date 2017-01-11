Template.searchfilters.helpers({
   
   filters: function(){
       return JobTypes.find();
   }
});


Template.searchfilter.helpers({
   showCount: function(){
      return (this.count > 0);
   }   
});

Template.searchfilter.events({
   'click a.filter': function(e){
      e.preventDefault();
      filters = [ this.label ];
      filterQuery = 'filter=' + encodeURIComponent(JSON.stringify(filters));      
      Router.go('jobsSearch',{},{query: filterQuery});
      $(document).scrollTop(0);
   }
});