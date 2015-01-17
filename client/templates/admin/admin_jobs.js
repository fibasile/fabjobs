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
    'click #unfeature': function(){
        Meteor.call("featureJob",this,false, function(error){
            if (error){
                console.log('Error in unfeature ' + error);
                throwError(error);
            }
        });
    },
    'click #feature': function(){
        Meteor.call("featureJob",this,true, function(error){
            if (error){
                console.log('Error in feature ' + error);
                throwError(error);
            }            
        });
    },
    'click #unpublish': function(){
        Meteor.call("publishJob",this,false, function(error){
            if (error){
                console.log('Error in unpublish ' + error);
                throwError(error);
            }
            
        });        
    },
    'click #publish': function(){
        Meteor.call("publishJob",this,true, function(error){
            if (error){
                console.log('Error in publish ' + error);
                throwError(error);
                
            }
            
        });
    },
    'click #close': function(){
        Meteor.call("completeJob",this,true, function(error){
            if (error){
                console.log('Error in close ' + error);
                throwError(error);
            }
            
        });
    },
    'click #reopen': function(){
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
    'click #details': function(){
        alert('details');
    }
});

