Router.route('/admin',  function(){
   this.render('adminHome');
   this.render('adminDashboard', {to: 'panel'});
});

Router.route('/admin/users',  function(){
    this.render('adminHome');
    this.render('adminUsers', {to: 'panel'});
    
});

Router.route('/admin/jobs', function(){
    Router.go('/admin/jobs/all')
});

Router.route('/admin/jobs/:q', function(){
    this.render('adminHome');
    var query = {};
    var f = this.params.q;
    if (f === 'published'){
        query = { 'published' : true}
    }
    if (f === 'pending'){
        query = { 'published' : false}
    }
    if (f === 'featured'){
        query = { 'featured' : true};
    }
    if (f === 'completed'){
        query = { 'completed' : true};
    }
    var data =  {jobs:  Jobs.find(query), currentTab: f};
    this.render('adminJobs', {to: 'panel', data: data});    
});

Router.route('/admin/notifications', function(){
    this.render('adminHome');
    this.render('adminNotifications', {to: 'panel'});    
});
