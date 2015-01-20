Template.adminJobApplications.helpers({
	formatSubmitted: function(){
      return moment(this.job.submitted).format('MMM Do YYYY');
	}
	
});

Template.adminJobApplications.events({
	'click #backToListing': function(){
		history.go(-1);
	}
});

Template.adminJobApplication.helpers({
	formatSubmitted: function(){
      return moment(this.submitted).format('MMM Do YYYY hh:mm');
	}
	
	
});