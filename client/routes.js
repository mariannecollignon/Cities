Router.configure({
    layoutTemplate: "main",
    notFoundTemplate: "notFound"
});

Router.route('/', function () {
    this.render('home');          
    });


Router.route('city', function () {
    this.render('city');          
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
