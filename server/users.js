Meteor.methods({
   updateUserRoles: function(options){
         var user = Meteor.user();
         var isAdmin = AuthHooks.isAdmin(user);
         if (isAdmin){
            var target_user_id=options.userId;
            var roles=options.roles;
            if (target_user_id) {
                Roles.setUserRoles(target_user_id, roles);
                var targetUser = Meteor.users.findOne({_id: target_user_id})
                postNotification('change-role', 'User ' + user.username + ' updated roles for ' + targetUser.username, {
                   userId: user._id, targetId: targetUser._id
                });
            }
         } else {
             throw new Meteor.Error(607, 'You need permission to update user roles');
         }
   },
   updateUserProfile: function(profile){
      var userId = Meteor.userId();
      var user = Meteor.users.findOne({_id:userId});
      if (!user){
         throw new Meteor.Error(500, 'You must be logged in to update your profile');         
      }
      if (profile.fullname){
         Meteor.users.update({_id: userId}, {$set: {'profile.name' : profile.fullname}}, function(error){
            if (error){
               throw new Meteor.Error(500, error);
            }
         });
      }
      if (profile.password){
         if (profile.password && profile.password.length > 6) {            
            Accounts.setPassword(userId, profile.password);
         }
      }
      
      
   }
   
   
});