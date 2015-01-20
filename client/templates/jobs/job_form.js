Template.jobForm.rendered= function() {
    //start the map widget
    Template.jobForm.initializeMaps();
};


Template.jobForm.helpers({
    types: JobTypes.find(),
    categories: Categories.find(),
    salaries: [
        {value: 'N/A', label: 'Select a salary'},
        {value: "20000", label: 'Up to 20,000'},
        {value: "40000", label: '20,000 – 40,000'},
        {value: "60000", label: '40,000 – 60,000'},
        {value: "80000", label: '60,000 – 80,000'},
        {value: "100000", label: '80,000 – 100,000'},
        {value:"100000+", label: '100,000 and above'}
    ],
    selectedIf: function(ctx, a,b){
        if (ctx && ctx.job) {
            if (a === 'job.category' && ctx.job.category === b)
                return true;
            if (a === 'job.type' && ctx.job.type === b)
                return true;
            if (a === 'job.salary' && ctx.job.salary === b)
                return true;
        }
        return false;
    }
});


Template.jobForm.initializeMaps = function(){
    var map;
    var hasLocation = false;
    var center = new google.maps.LatLng(0.0,0.0);
    var postLatitude =  '';
    var postLongitude =  '';

    if((postLatitude != '') && (postLongitude != '') ) {
        center = new google.maps.LatLng(postLatitude, postLongitude);
        hasLocation = true;
        $("#geolocation-latitude").val(center.lat());
        $("#geolocation-longitude").val(center.lng());
        reverseGeocode(center);
    }

    var myOptions = {
        'zoom': 1,
        'center': center,
        'mapTypeId': google.maps.MapTypeId.ROADMAP
    };

    if($('#geolocation-map').length > 0 && $('#geolocation-map div').length == 0) {
        map = new google.maps.Map(document.getElementById('geolocation-map'), myOptions);
        if(!hasLocation) {
            map.setZoom(1);
        }
        google.maps.event.addListener(map, 'click', function(event) {
            reverseGeocode(event.latLng);
        });


        $("#geolocation-load").click(function(){
            if($("#geolocation-address").val() != '') {
                customAddress = true;
                currentAddress = $("#geolocation-address").val();
                geocode(currentAddress);
                return false;
            } else {
                marker.setMap(null);
                marker = '';
                $("#geolocation-latitude").val('');
                $("#geolocation-longitude").val('');
                return false;
            }
            return false;
        });

        $("#geolocation-address").keyup(function(e) {
            if(e.keyCode == 13)
                $("#geolocation-load").click();
        });


    }
    var marker = '';





    var currentAddress;
    var customAddress = false;

    function placeMarker(location) {
        if (marker=='') {
            marker = new google.maps.Marker({
                position: center,
                map: map,
                title:'Job Location'
            });
        }
        marker.setPosition(location);
        map.setCenter(location);
        if((location.lat() != '') && (location.lng() != '')) {
            $("#geolocation-latitude").val(location.lat());
            $("#geolocation-longitude").val(location.lng());
        }
    }

    function geocode(address) {
        var geocoder = new google.maps.Geocoder();
        if (geocoder) {
            geocoder.geocode({"address": address}, function(results, status) {
                if (status == google.maps.GeocoderStatus.OK) {
                    placeMarker(results[0].geometry.location);
                    reverseGeocode(results[0].geometry.location);
                    if(!hasLocation) {
                        map.setZoom(9);
                        hasLocation = true;
                    }
                }
            });
        }
    }

    function reverseGeocode(location) {
        var geocoder = new google.maps.Geocoder();
        if (geocoder) {
            geocoder.geocode({"latLng": location}, function(results, status) {
                if (status == google.maps.GeocoderStatus.OK) {

                    var address, city, country, state;

                    for ( var i in results ) {

                        var address_components = results[i]['address_components'];

                        for ( var j in address_components ) {

                            var types = address_components[j]['types'];
                            var long_name = address_components[j]['long_name'];
                            var short_name = address_components[j]['short_name'];

                            if ( $.inArray('locality', types)>=0 && $.inArray('political', types)>=0 ) {
                                city = long_name;
                            }
                            else if ( $.inArray('administrative_area_level_1', types)>=0 && $.inArray('political', types)>=0 ) {
                                state = long_name;
                            }
                            else if ( $.inArray('country', types)>=0 && $.inArray('political', types)>=0 ) {
                                country = long_name;
                            }

                        }

                    }

                    if((city) && (state) && (country))
                        address = city + ', ' + state + ', ' + country;
                    else if((city) && (state))
                        address = city + ', ' + state;
                    else if((state) && (country))
                        address = state + ', ' + country;
                    else if(country)
                        address = country;

                    $("#geolocation-address").val(address);
                    placeMarker(location);

                    return true;
                }

            });
        }
        return false;
    }

}
