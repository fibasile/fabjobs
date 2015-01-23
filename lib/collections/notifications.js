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
	
   if(Meteor.isServer){
	
      var defaultTo='fabeconomy@gmail.com';
      var defaultCC='fiore.basile@gmail.com';
      var defaultFrom='www@jobs.fabeconomy.com';
      
   
      if (noteType == 'submit-job') {
       
         var subject = '[FabJobs] New job listing'
         var text = noteMessage;
         text += '\nSee the job listing here: http://jobs.fabeconomy.com/jobs/' + keys.job;
         text += '\nRegards,\nthe Fab Jobs Team';
         
         Email.send({
               to: defaultTo,
               bcc: defaultCC, 
               from: defaultFrom,
               subject: subject,
               text: text
             });
      
      } else if (noteType == 'submit-application') {
    
         var subject = '[FabJobs]New job application'
         var text = noteMessage;
         text+= '\n' + 'See the application here: http://jobs.fabeconomy.com/admin/jobs/applications/' + keys.job;
         text+= '\n';
         text+= '\nRegards,\nthe Fab Jobs Team';
         Email.send({
               to: defaultTo,
               bcc: defaultCC, 
               from: defaultFrom,
               subject: subject,
               text: text
             });
      
      }
   }
   
   
};