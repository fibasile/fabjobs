Router.configure({
  layoutTemplate: 'layout',
  loadingTemplate: 'loading',
  notFoundTemplate: 'notFound',
  waitOn: function() {
     return [Meteor.subscribe('jobs', {sort: { '_id' : -1}, limit: 100})];
  }
});




Router.onBeforeAction('loading');