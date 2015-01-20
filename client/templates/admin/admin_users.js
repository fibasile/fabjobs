Template.adminUserRow.helpers({
   email: function(){
      if (this.emails && this.emails.length > 0 ){
         return this.emails[0].address;
      }
   }
});