Router.configure({
    layoutTemplate: "main",
    notFoundTemplate: "notFound"
});

Router.route('/', function () {
    this.render('home');          
    });


Router.route('city/:id', {
    template:'city',
    data: function () {
      return Cities.findOne({_id: this.params.id});
    }
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

Router.route('article', function () {
    this.render('article');          
    });
Router.route('cities', function () {
    this.render('cities');          
    });
Router.route('addActivity', function () {
    this.render('addActivity');          
    });


