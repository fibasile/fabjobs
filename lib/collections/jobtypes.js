JobTypes = new Meteor.Collection(null);

Meteor.startup(function(){
    var jobTypes = [
        { label:  'Part Time'},
        { label:  'Full Time'},
        { label:  'Contract'},
        { label:  'Freelance'},
        { label:  'Internship'}
    ];
    _.each(jobTypes,function(j){
        JobTypes.insert(j);
    });
});