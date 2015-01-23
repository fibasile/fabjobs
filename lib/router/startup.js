Router.configure({
  layoutTemplate: 'layout',
  loadingTemplate: 'loading',
  notFoundTemplate: 'notFound',
  // waitOn: function() {
//      return [Meteor.subscribe('Jobs', {sort: { '_id' : -1}, limit: 100})];
//   },
  // onBeforeAction: function(){
//     $(document).scrollTop(0);
//     this.next();
//   }

});




Router.onBeforeAction('loading');