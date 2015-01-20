if (Jobs.find().count() === 0) {
   var now = new Date().getTime();


   Jobs._ensureIndex({ "job.company_name": 1, "job.type" : 1, "job.description" : 1, "job.location" : 1, "job.category" : 1});

   var users = [{
      username: 'normal',
      name: "Normal User",
      email: "normal@example.com",
      roles: []
   }, {
      username: 'fibasile',
      name: "Fiore Basile",
      email: "fiore.basile@gmail.com",
      roles: ['manager']
   }, {
      username: 'admin',
      name: "Admin User",
      email: "admin@example.com",
      roles: ['admin', 'manager']
   }];

   _.each(users, function(user) {
      var id;

      id = Accounts.createUser({
         username: user.username,
         email: user.email,
         password: "apple1",
         profile: {
            name: user.name
         }
      });

      if (user.roles.length > 0) {
         // Need _id of existing user record so this call must come 
         // after `Accounts.createUser` or `Accounts.onCreate`
         Roles.addUsersToRoles(id, user.roles);
      }

   });

   // var fibasileId = Meteor.users.insert({
   //    // username: 'fibasile',
   //    profile: { name: 'Fiore Basile'},
   //    // emails: [
   //    //    {'address' : 'fiore.basile@gmail.com', verified: true}
   //    // ]
   // });
   var fibasile = Meteor.users.findOne({
      'username': 'fibasile'
   });




   var job1 = Jobs.insert({
      userId: fibasile._id,
      author: fibasile.profile.name,
      submitted: new Date(now - 7 * 3600 * 1000),
      featured: true,
      completed: false,
      published: true, 
      views: 2000,
      applications: 0,
      job: {
         company_name: 'Acme Inc.',
         website: 'http://acmeinc.com',
         title: 'Senior Research Engineer',
         type: 'Full Time',
         description: 'An interesting position. Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
         category: '3D',
         salary: 0,
         location: 'Cascina, Pisa, Italy',
         lat: 43.6870722,
         long: 10.485989,
         instructions: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
      }
   });

   var job12 = Jobs.insert({
      userId: fibasile._id,
      author: fibasile.profile.name,
      submitted: new Date(now - 24 * 3600 * 1000),
      featured: false,
      completed: false,
      published: true, 
      views: 35550,
      applications: 0,
      job: {
         company_name: 'Acme Inc.',
         website: 'http://acmeinc.com',
         title: 'Fab Lab Manager',
         type: 'Part Time',
         description: 'An interesting position. Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
         category: '3D',
         salary: 0,
         location: 'Cascina, Pisa, Italy',
         lat: 43.6870722,
         long: 10.485989,
         instructions: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
      }
   });

   var job13 = Jobs.insert({
      userId: fibasile._id,
      author: fibasile.profile.name,
      submitted: new Date(now - 48 * 3600 * 1000),
      featured: false,
      completed: false,
      published: false,
      views: 10000,
      applications: 0,
      job: {
         company_name: 'Acme Inc.',
         website: 'http://acmeinc.com',
         title: 'Web developer',
         type: 'Freelance',
         description: 'An interesting position. Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
         category: '3D',
         salary: 0,
         location: 'Cascina, Pisa, Italy',
         lat: 43.6870722,
         long: 10.485989,
         instructions: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
      }
   });

   for (var i=0;i<100;i++){

      var job13 = Jobs.insert({
         userId: fibasile._id,
         author: fibasile.profile.name,
         submitted: new Date(now - 48 * 3600 * 1000),
         featured: false,
         completed: false,
         published: true,
         views: 10000,
         applications: 0,
         job: {
            company_name: 'Acme Inc.',
            website: 'http://acmeinc.com',
            title: 'Web developer nr.' + i,
            type: 'Freelance',
            description: 'An interesting position. Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
            category: '3D',
            salary: 0,
            location: 'Cascina, Pisa, Italy',
            lat: 43.6870722,
            long: 10.485989,
            instructions: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
         }
      });


   }


}
