var submitForm= function(){
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


    Meteor.call('updateJob',this, { job: job}, this._id,
        function (error) {
            // identify the error
            if (error){
                Errors.insert(error);
                $(document).scrollTop(0);
            } else {
                //Router.go('/admin/jobs/updated');
                bootbox.alert('Job listing successfully updated.', function(){
                    Router.go('/admin/jobs');
                });
            }
        });
};

Template.adminJobEditForm.rendered= function(){
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
    });;
    $('#geolocation-address').keypress(function(event){
        if (event.which == 13) {
            event.preventDefault();
            return false;
        }
    });
};



Template.adminJobEditForm.events({
    //'click button[type="submit"]': function(event){
    //    event.preventDefault();
    //
    //
    //
    //},
    //'form submit': function(event){
    //    event.preventDefault();
    //}


});


