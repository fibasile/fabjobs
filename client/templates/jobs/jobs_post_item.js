Template.jobItem.helpers({
   shortSubmitted: function(){
      var d = this.submitted;
      return moment(d).format("MMM Do YYYY");
   }
});