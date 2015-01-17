Template.adminHome.helpers({
    activeIfRouteIs: function (template) {
          var currentRoute = Router.current();
          return currentRoute &&
            template === currentRoute.route.getName() ? 'active' : '';
    },
    routeName: function(){
        return  Router.current().route.getName();
    }
    
});