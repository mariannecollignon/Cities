
Template.city.helpers({
    isEvent : function(nature){
        return nature == 'event';
    },
    
    isPlace : function(nature){
        return nature == 'place';
    }
});

Template.activity.events({
    'click .addComment #addcomment' : function(event){
        var comment = $('#comment').val();
        var id = $('#id').val();
        
        console.log(id);
        Activities.update(
            {_id: Template.currentData()._id},
            {$push:{comments:
                        {
                        "user" : {
                            "_id" : Meteor.user()._id,
                            "email" : Meteor.user().emails[0].adress
                            },
                        "date" : new Date(),
                        "text" : comment
                        }                
                }
            
            }
        
        );
    }
});

Template.cities.helpers({
    City : function(){
        return Cities.find();
    }
});
    
Template.article.events({
   
   'submit.addCity': function(event)
   {
    var cityName = $("#cityName").val();
    var latitude = $("#latitude").val();
    var longtitude = $("#longtitude").val();
    
    Cities.insert({
        name : cityName,lat :latitude, long : longtitude
    });
   }
});

Template.addActivity.events({
   
   'submit.addEvent': function(event)
   {
    var name = $("#name").val();
    var description = $("#description").val();
    var url = $("#url").val();
    var dateStart = $("#dateStart").val();
    var dateEnd = $("#dateEnd").val();

    
    Activities.insert({
        name : name,description :description, url : url,dateStart:dateStart,dateEnd: dateEnd
    });
   }
});

Template.addActivity.helpers({
    City : function(){
        return Cities.find();
    },
    isEvent : function(){
        var e = document.getElementById("type");
        var type = e.options[e.selectedIndex].value;
        
        return type == 'event';
    }
    
});

Template.profile.helpers({
    Activity : function(){
        return Activities.find();
    }
});

Markers = new Mongo.Collection('markers');

if (Meteor.isClient) {
  Template.map.onCreated(function() {
    GoogleMaps.ready('map', function(map) {
      google.maps.event.addListener(map.instance, 'click', function(event) {
        Markers.insert({ lat: event.latLng.lat(), lng: event.latLng.lng() });
      });

      var markers = {};

      Markers.find().observe({
        added: function (document) {
          var marker = new google.maps.Marker({
            draggable: true,
            animation: google.maps.Animation.DROP,
            position: new google.maps.LatLng(document.lat, document.lng),
            map: map.instance,
            id: document._id
          });

          google.maps.event.addListener(marker, 'dragend', function(event) {
            Markers.update(marker.id, { $set: { lat: event.latLng.lat(), lng: event.latLng.lng() }});
          });

          markers[document._id] = marker;
        },
        changed: function (newDocument, oldDocument) {
          markers[newDocument._id].setPosition({ lat: newDocument.lat, lng: newDocument.lng });
        },
        removed: function (oldDocument) {
          markers[oldDocument._id].setMap(null);
          google.maps.event.clearInstanceListeners(markers[oldDocument._id]);
          delete markers[oldDocument._id];
        }
      });
    });
  });

  Meteor.startup(function() {
    GoogleMaps.load();
  });

  Template.map.helpers({
    mapOptions: function() {
      if (GoogleMaps.loaded()) {
        return {
          center: new google.maps.LatLng(-37.8136, 144.9631),
          zoom: 8
        };
      }
    }
  });
}

