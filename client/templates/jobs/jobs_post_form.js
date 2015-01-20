var submitForm = function(){
    var form = $('#jobForm');
    var attributes = form.serializeArray();
    var job = {};
    _.each(attributes,function(attr){
        var k = attr.name;
        var v = attr.value;
        if (k == 'geolocation-address')
            k = 'location';
        if (k == 'geolocation-latitude')
            k = 'lat';
        if (k == 'geolocation-longitude')
            k = 'long';
        if (k == 'job_category')
            k = 'category';
        if (k == 'job_type')
            k = 'type';
        if (k == 'job_salary')
            k = 'salary';
        job[k]=v;
    });
    console.log(job);

    Meteor.call('submitJob',job,
        function (error) {
            // identify the error
            if (error){
                Errors.insert(error);
                $(document).scrollTop(0);
            } else {
                Router.go('/jobs/submitted');
            }
        });
};

Template.jobPostForm.rendered= function(){
   //setup validation
        $('#jobForm').formValidation({
            // I am validating Bootstrap form
            message: 'This value is not valid',
            icon: {
                valid: 'glyphicon glyphicon-ok',
                invalid: 'glyphicon glyphicon-remove',
                validating: 'glyphicon glyphicon-refresh'
            },
            fields: {
                title: {
                    validators: {
                        notEmpty: {
                            message: 'The title is required and cannot be empty'
                        },
                    }
                },
                description: {
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
            submitForm();

        });
        $('#geolocation-address').keypress(function (event) {
            if (event.which == 13) {
                event.preventDefault();
                return false;
            }
        });
};



Template.jobPostForm.events({
    //'click #submitButton': function(event){
    //    event.preventDefault();
    //
    //
    //},
    //'form submit': function(event){
    //    event.preventDefault();
    //}
       
    
});


