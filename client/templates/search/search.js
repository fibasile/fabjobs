Template.search.rendered = function(){
   $('#queryString').keypress(function (event) {
       if (event.which == 13) {
           event.preventDefault();
           $('#myForm').submit();
           // return true;
       }
   }); 
};

Template.search.events({
     'click #queryButton': function (ev){
        ev.preventDefault();
        // alert('search will start now!!');
        var queryString = $('#queryString').val();
        Router.go('jobsSearch',{}, {query: 'text=' + encodeURIComponent(queryString)});
     },
     'submit #myForm': function(e){
        ev.preventDefault();
        // alert('search will start now!!');
        var queryString = $('#queryString').val();
        Router.go('jobsSearch',{}, {query: 'text=' + encodeURIComponent(queryString)});        
     }
  });
  
