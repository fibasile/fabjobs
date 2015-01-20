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
   }
});