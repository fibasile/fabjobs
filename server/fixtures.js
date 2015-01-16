if (Jobs.find().count() === 0){
   var now = new Date().getTime();
   
   var fibasileId = Meteor.users.insert({
      // username: 'fibasile',
      profile: { name: 'Fiore Basile'},
      // emails: [
      //    {'address' : 'fiore.basile@gmail.com', verified: true}
      // ]
   });
   var fibasile = Meteor.users.findOne(fibasileId);
   
   var job1 = Jobs.insert({
      userId: fibasile._id,
      author: fibasile.profile.name,
      submitted: new Date(now - 7 * 3600 * 1000),
      featured: true,
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
   
   var job12 =  Jobs.insert({
      userId: fibasile._id,
      author: fibasile.profile.name,
      submitted: new Date(now - 24 * 3600 * 1000),
      featured: false,
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
   
   var job13 =  Jobs.insert({
      userId: fibasile._id,
      author: fibasile.profile.name,
      submitted: new Date(now - 48 * 3600 * 1000),
      featured: false,
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
   
   
   
   
}