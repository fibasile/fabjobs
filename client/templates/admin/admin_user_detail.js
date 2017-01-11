Template.adminUserDetail.helpers({
   email: function () {
      
      if (this.emails && this.emails.length > 0) return this.emails[0].address;
      return 'N/A';
  },
  checkedIf: function(role){
     var roles = this.roles;
     if (!roles || roles.length == 0){
        if(role === '') return 'checked'; 
     } 
     for (var i in roles){
        if (role === roles[i]) return 'checked';
     }
     return '';
  }
   
});


Template.adminUserDetail.events({
   
   'click #back': function(e){
      e.preventDefault();
      history.go(-1);
   },
   
   'click #updateUser': function(e){
      e.preventDefault();
      var selection = [];
      if ($('#normalRadio').prop('checked')) 
          selection = [];  
      if ($('#managerRadio').prop('checked') )
          selection = ['manager'];
      if ($('#adminRadio').prop('checked'))
          selection = ['admin'];
      
      Meteor.call('updateUserRoles', { userId: this.user._id, roles: selection},function (error) {
            // identify the error
            if (error){
                Errors.insert(error);
                $(document).scrollTop(0);
            } else {
                bootbox.alert('User roles successfully updated.', function(){
                    Router.go('/admin/users');
                });
            }
        });
   }
   
});