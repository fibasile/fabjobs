Template.adminJobs.helpers({
    activeTab: function(routeName){
        return this.currentTab === routeName ? 'active' : '';  
    },
    currentRoute: function(){
        return this.currentTab;
    }
    
});

Template.adminJobsRow.helpers({
    hilightIfFeatured: function(){
        return this.featured ? 'success' : '';
    }

    
});

Template.adminJobsRow.events({
    'click #unfeature': function(ev){
        ev.preventDefault();

        Meteor.call("featureJob",this,false, function(error){
            if (error){
                console.log('Error in unfeature ' + error);
                throwError(error);
            }
        });
    },
    'click #feature': function(ev){
        ev.preventDefault();

        Meteor.call("featureJob",this,true, function(error){
            if (error){
                console.log('Error in feature ' + error);
                throwError(error);
            }            
        });
    },
    'click #unpublish': function(ev){
        ev.preventDefault();

        Meteor.call("publishJob",this,false, function(error){
            if (error){
                console.log('Error in unpublish ' + error);
                throwError(error);
            }
            
        });        
    },
    'click #publish': function(ev){
        ev.preventDefault();

        Meteor.call("publishJob",this,true, function(error){
            if (error){
                console.log('Error in publish ' + error);
                throwError(error);
                
            }
            
        });
    },
    'click #close': function(ev){
        ev.preventDefault();

        Meteor.call("completeJob",this,true, function(error){
            if (error){
                console.log('Error in close ' + error);
                throwError(error);
            }
            
        });
    },
    'click #reopen': function(ev){
        ev.preventDefault();

        Meteor.call("completeJob",this,false, function(error){
            if (error){
                console.log('Error in reopen ' + error);
                throwError(error);
            }
            
        });      
    },
    'click #delete': function(){
        var job_id = this._id;
        var message = 'Do you really want to delete this job listing?'
        var callback = function(result){
            if(result)
                Meteor.call("deleteJobById",job_id); 
        };
        bootbox.confirm(message, callback);
    },
    'click #details': function(ev){
        ev.preventDefault();
        var destination = '/admin/jobs/edit/' + this._id;
        console.log(destination);
        Router.go(destination);
    }
});

Template.adminJobsPaging.helpers({

    pages: function(){
        pArray = new Array();
        var current = Template.currentData().currentPage;
        var total = Template.currentData().totalPages;
        var tab = Template.currentData().currentTab;
        for (var i=0; i<total; i++){
            pArray.push({
               link:  '/admin/jobs/list/' +tab+ '?page=' + i,
                num: i+1,
               blank: (i == current) ? 'active' : ''
            });
        }
        return pArray;
    }
    // init bootpag
    //console.log('bootpag');

    //console.log(this);
    //
    //var total = Template.currentData().total;
    //var currentPage = Template.currentData().currentPage;
    //var currentTab = Template.currentData().currentTab;
    //this.$('#page-selection').bootpag({
    //    total: total,
    //    page: currentPage+1
    //}).on("page", function(event, num){
    //    //event.preventDefault();
    //    console.log('page ' + num);
    //    Router.go('/admin/jobs/list/' + currentTab +'?page=' + num);
    //});



});
