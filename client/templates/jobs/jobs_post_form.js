Template.jobPostForm.rendered= function(){
   //start the map widget
   window.initializeMaps();
   //setup validation
   $('#jobForm').formValidation({
           // I am validating Bootstrap form
           message: 'This value is not valid',
           icon: {
               valid: 'glyphicon glyphicon-ok',
               invalid: 'glyphicon glyphicon-remove',
               validating: 'glyphicon glyphicon-refresh'
           },
           fields: {
               title: {
                    validators: {
                        notEmpty: {
                            message: 'The title is required and cannot be empty'
                        },
                    }
               },
               description: {
                   validators: {
                       notEmpty: {
                           message: 'The description is required and cannot be empty'
                       },
                   }                   
               }
           }
    });
    $('#geolocation-address').keypress(function(event){
            if (event.which == 13) {
                event.preventDefault();
                return false;   
            }
     });
};

Template.jobPostForm.helpers({
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
    ]
});

Template.jobPostForm.events({
    'click button[type="submit"]': function(event){
        event.preventDefault();
        var form = $('#jobForm'); 
        var attributes = form.serializeArray();
        var job = {};
        _.each(attributes,function(attr){
            var k = attr.name;
            var v = attr.value;
            if (k == 'geolocation-address')
                k = 'location';
            if (k == 'geolocation-latitude')
                k = 'lat';
            if (k == 'geolocation-longitude')
                k = 'long';
            if (k == 'job_category')
                k = 'category';
            if (k == 'job_type')
                k = 'type';
            if (k == 'job_salary')
                k = 'salary';
            job[k]=v;
        });
        console.log(job);
        
        Meteor.call('submitJob',job, 
            function (error) {
              // identify the error
                if (error){
                      Errors.insert(error);                  
                      $(document).scrollTop(0);
                } else {
                    Router.go('/jobs/submitted');
                }
        });
        
    },
    'form submit': function(event){
        event.preventDefault();
    }
       
    
});



window.initializeMaps = function(){
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
