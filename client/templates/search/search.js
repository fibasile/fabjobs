Template.search.events({
     'click #queryButton': function (ev){
        ev.preventDefault();
        // alert('search will start now!!');
        var queryString = $('#queryString').val();
        Router.go('jobsSearch',{}, {query: 'text=' + encodeURIComponent(queryString)});
     },
     'submit form': function(e){
        ev.preventDefault();
        // alert('search will start now!!');
        var queryString = $('#queryString').val();
        Router.go('jobsSearch',{}, {query: 'text=' + encodeURIComponent(queryString)});        
     }
  });
  
