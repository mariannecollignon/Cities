Router.configure({
    layoutTemplate: "main",
    notFoundTemplate: "notFound"
});

Router.route(
        '/', {
            name: 'Home'
        }
);

Router.route('city/:id', {
    template:'city',
    data: function () {
      return Cities.findOne({_id: this.params.id});
    }
});

Router.route('profile', function() {
    this.render('profile');          
    });

Router.route('activity/:id', {
    template:'activity',
    data: function () {
      return Activities.findOne({_id: this.params.id});
    }         
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

Router.route('charts', function () {
    this.render('charts');          
    });

