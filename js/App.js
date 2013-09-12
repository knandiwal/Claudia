'use strict';

var Routes = angular.module('MyCla', ['ui.bootstrap', 'ngDragDrop']) //other dependencies
    .config(function ($compileProvider){
        $compileProvider.urlSanitizationWhitelist(/^\s*(https?|ftp|mailto|file|tel):/);
    })
    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/', {templateUrl: 'partials/mainView.html', controller: 'homeController'});
//        $routeProvider.when('/view3', {templateUrl: 'partials/accelerometerView.html'});
//        $routeProvider.when('/view4', {templateUrl: 'partials/deviceInfoView.html'});
//        $routeProvider.when('/view5', {templateUrl: 'partials/cameraView.html'});
//        $routeProvider.when('/view6', {templateUrl: 'partials/contactsView.html'});
//        $routeProvider.when('/view7', {templateUrl: 'partials/compassView.html'});
//        $routeProvider.when('/view8', {templateUrl: 'partials/hackerNewsView.html'});
        $routeProvider.otherwise({redirectTo: '/'});
}]);
