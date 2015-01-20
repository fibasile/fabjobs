Template.adminDashboard.helpers({
	 notifications: function(){
	    return Notifications.find({},{sort : { 'submitted': -1, '_id' : -1}, limit: 5})
    }
});