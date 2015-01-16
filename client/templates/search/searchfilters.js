Template.searchfilters.helpers({
   
   filters: function(){
      return [
          { label:  'Part Time', count: 0},
          { label:  'Full Time', count: 10},
          { label:  'Contract', count: 0},
          { label:  'Freelance', count: 0},
         
      ];
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
   }
});