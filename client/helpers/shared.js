
Template.registerHelper("formatShortDate", function(date){
		return moment(date).format('MMM Do YYYY');
});


Template.registerHelper("formatShortDateTime",  function(date){
		return moment(date).format('MMM Do YYYY hh:mm');
	});
