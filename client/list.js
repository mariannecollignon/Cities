Template.articlesList.helpers({
    Article : function(){
        return Activities.find();
    },
    
    City : function(id){
        var param = id;
        var city = Cities.findOne({"activities._id":param},{_id:0, 'name':1});
        console.log(city);
        return city.name;
    }
});