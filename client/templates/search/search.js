Template.search.events({
     'click .queryButton': function (){
        // alert('search will start now!!');
        Router.go('jobsSearch',{}, {query: 'q=s'});
     }
  });
  
