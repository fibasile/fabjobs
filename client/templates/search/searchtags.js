Template.searchtags.helpers({
   showCount: function(){
      return (this.count > 0);
   },
   tags: function(){
      return [
          { label:  'CAD', count: 0},
          { label:   '3D Modeling', count: 10},
          { label:   '3D Printing', count: 0},
          { label:   'CNC', count: 0},
          { label:   'Electronics', count: 0},
          { label:   'Software Dev', count: 0},
          { label:   'Embedded', count: 0},
          { label:   'Wearable', count: 0},
          { label:   'IT', count: 0},
          { label:   'Teaching', count: 0},
          { label:   'Manufacturing', count: 0}
      ];
     }
});

Template.searchtag.events({
   'click a.tag': function(e){
      e.preventDefault();
      tags = [ this.label ];
      filterQuery = 'tags=' + encodeURIComponent(JSON.stringify(tags));      
      Router.go('jobsSearch',{},{query: filterQuery});
   }
});