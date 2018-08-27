let myApp = angular.module('myApp', ['ngRoute', 'ngMaterial']);

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

myApp.config(function($mdThemingProvider){
    $mdThemingProvider.theme('default')
    .primaryPalette('blue-grey')
    .accentPalette('amber');
});