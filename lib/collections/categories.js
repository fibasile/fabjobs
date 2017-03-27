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
        { label:   'Lab Manager'},
        { label:   'Manufacturing'},
        { label:   'Software Dev'},
        { label:   'Teaching'},
        { label:   'Wearable'},
        { label:   'Communications'},
        { label:   'Graphic design'},
        { label:   'Various'},
    ];
    _.each(cats,function(cat){
    Categories.insert(cat);
    });
});
