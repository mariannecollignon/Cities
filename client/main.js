Template.city.helpers({
    isEvent : function(nature){
        return nature == 'event';
    },
    
    isPlace : function(nature){
        return nature == 'place';
    }
});
    
Template.article.events({
   
   'submit.addCity': function(event)
   {
    event.preventDefault();
    const target = event.target;
    var cityName = $("#cityName").val();
    var latitude = $("#latitude").val();
    var longtitude = $("#longtitude").val();
    
    Cities.insert({
        name : cityName,lat :latitude, long : longtitude
    });
   }
});