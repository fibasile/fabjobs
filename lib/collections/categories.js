Categories = new Meteor.Collection(null);

Meteor.startup(function(){
    var cats = [
        { label:   '3D Modeling'},
        { label:   '3D Printing'},
        { label:   'CAD'},
        { label:   'CNC'},
        { label:   'Electronics'},
        { label:   'Embedded'},
        { label:   'IT'},
        { label:   'Manufacturing'},
        { label:   'Software Dev'},
        { label:   'Teaching'},
        { label:   'Wearable'},
    ];
    _.each(cats,function(cat){
    Categories.insert(cat);
    });
});