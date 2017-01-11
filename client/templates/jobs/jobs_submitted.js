Template.jobPostFormSubmitted.events({
    'click button': function(ev){
        ev.preventDefault();
        //todo check if admin user
        //send user to the dashboard
        Router.go('/');
    } 
});