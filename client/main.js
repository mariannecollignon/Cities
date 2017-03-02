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

