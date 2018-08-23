let myApp = angular.module('myApp', ['ngRoute']);

//Configuring routes to views
myApp.config(function($routeProvider){
    $routeProvider.when('/', {
        templateUrl: 'views/home.html',
        controller: 'HomeController as hc'
    }).when('/pets', {
        templateUrl: 'views/pets.html',
        controller: 'PetsController as pc'
    }).when('/owners', {
        templateUrl: 'views/owners.html',
        controller: 'OwnersController as oc'
    }).otherwise({
        templateUrl: 'views/404.html'
    });
}); 