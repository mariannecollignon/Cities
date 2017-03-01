Router.configure({
    layoutTemplate: "main",
    notFoundTemplate: "notFound"
});

Router.route('/', function () {
    this.render('home');          
    });


Router.route('city/:id', function () {
    this.render('city',{
        data: function () {
          return Cities.findOne({_id: this.params._id});
        }
    });
});


Router.route('profile', function () {
    this.render('profile');          
    });

Router.route('activity', function () {
    this.render('activity');          
    });

Router.route('about', function () {
    this.render('about');          
    });
