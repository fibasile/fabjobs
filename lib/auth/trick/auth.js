
AuthHooks ={};

AuthHooks.isAdmin= function(user){
        var ret = false;
        if (user && user.roles){
           _.each(user.roles, function(role){
               if (role==='admin'){
                   ret =true;
               }
           });
        }
        return ret;
};

AuthHooks.isManager=function(user){
        var ret = false;
        if (user && user.roles) {
           _.each(user.roles, function(role){
               if (role==='manager'){
                   ret =true;
               }
           });
        }
        return ret;
};

AuthHooks.checkLoggedIn = function () {
        if (!Meteor.userId()) {
            // if the user is not logged in, render the Login template
            this.render('Login');
            pause();


        } else {
            // otherwise don't hold up the rest of hooks or our route/action function
            // from running
            this.next();
        }
};

AuthHooks.checkAdminOrManager = function(){
        var user = Meteor.user();
        //console.log(user);
        if (!user){
            this.render('Login');
            pause();
        } else {
            if (AuthHooks.isManager(user) || AuthHooks.isAdmin(user)){
                this.next();
            } else {
                this.render('unauthorized');
                pause();
            }
        }
};
