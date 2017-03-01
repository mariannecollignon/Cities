Template.city.helpers({
    Events : function(id){
        Cities.find({_id:id, nature:"event"});
    }
});