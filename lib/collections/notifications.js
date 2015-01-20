Notifications = new Meteor.Collection('notifications');

postNotification = function(noteType, noteMessage, keys){
	
	var user = Meteor.user();
	
	var notification = {
		userId: user._id,
		submitted: new Date(), 
		type: noteType,
		message: noteMessage,
		keys: keys
	};
	
	Notifications.insert(notification);
	
	
};