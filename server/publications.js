Meteor.publish('jobs', function(options) {
  check(options, {
    sort: Object,
    limit: Number
  });
  return Jobs.find({}, options);
});


Meteor.publish('singleJob', function(id){
   check(id, String);
   return Jobs.find(id);
});