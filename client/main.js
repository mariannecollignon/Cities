/*Meteor.startup(function() {  
  GoogleMaps.load();
});*/


Template.city.helpers({
    isEvent : function(nature){
        return nature == 'event';
    },
    
    isPlace : function(nature){
        return nature == 'place';
    },
    
    mapOptions: function() {
        if (GoogleMaps.loaded()) {
          return {
            center: new google.maps.LatLng(-37.8136, 144.9631),
            zoom: 8
          };
        }
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
    var name = $("#name").val();
    var description = $("#description").val();
    var url = $("#url").val();
    var dateStart = $("#dateStart").val();
    var dateEnd = $("#dateEnd").val();

    
    
    
    Cities.insert({
        name : cityName,lat :latitude, long : longtitude
    })
    
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
    var id = $('#id').val();
    var nature= $("#type").val();
    
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
        return Activities.find({"editor._id" : Meteor.user()._id});
    },
    
    City : function(id){
        var param = id;
        var city = Cities.findOne({"activities._id":param},{_id:0, 'name':1});
        console.log(city);
        return city.name;
    },
    
    User : function(){
        return Meteor.user()._id;
    },
    
    mailUser : function(){
        return Meteor.user().emails[0];
    }
});

Meteor.startup(function() {
    GoogleMaps.load();
  });
Template.city.helpers({
    
        mapOptions: function () {
        if (GoogleMaps.loaded()) {
            var temp = Cities.findOne({"_id": Template.parentData(1)._id});
            console.log("hello");
            var x = temp.coordinates.long;
            var y = temp.coordinates.lat;
            console.log(x + ", " + y);
            return {
                center: new google.maps.LatLng(x, y),zoom:10
                //center: new google.maps.LatLng(-37.8136, 144.9631),zoom:10
            };
        }
    }
  });


Template.city.onCreated(function() {
    GoogleMaps.ready('map', function(map) {
      console.log("I'm ready!");
      });
     });
