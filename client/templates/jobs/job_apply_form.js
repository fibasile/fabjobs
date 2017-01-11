var submitApplicationForm=function(job_id){
	var form = $('#applicationForm');
    var attributes = form.serializeArray();
    var application = {};
    _.each(attributes,function(attr){
        var k = attr.name;
        var v = attr.value;
        application[k]=v;
    });
    
    application.job_id = job_id;
    
	Meteor.call('submitApplication',application,
	        function (error) {
	            // identify the error
	            if (error){
	                Errors.insert(error);
	                $(document).scrollTop(0);
	            } else {
					Router.go('/jobs/thankyou');
	            }
	});
	
};

Template.jobApplyForm.helpers({
	fullname: function(){
		return Meteor.user().profile.name;
	},
	email: function(){
		return Meteor.user().emails[0].address;
	}
	
	
});

Template.thankyou.events({
	'click button': function(ev){
		ev.preventDefault();
		Router.go('/');
	}
});


Template.jobApplyForm.rendered= function(){
   //setup validation
   		var job_id = this.data._id;
        $('#applicationForm').formValidation({
            // I am validating Bootstrap form
            message: 'This value is not valid',
            icon: {
                valid: 'glyphicon glyphicon-ok',
                invalid: 'glyphicon glyphicon-remove',
                validating: 'glyphicon glyphicon-refresh'
            },
            fields: {
                fullname: {
                    validators: {
                        notEmpty: {
                            message: 'The title is required and cannot be empty'
                        },
                    }
                },
                email: {
                    validators: {
                        notEmpty: {
                            message: 'The description is required and cannot be empty'
                        },
                    }
                }
            }
        }).on('success.form.fv', function(e) {
            // Prevent form submission
            e.preventDefault();
            submitApplicationForm(job_id);

        });

};
