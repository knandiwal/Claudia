'use strict';

var eulaAccepted = false;

var Routes = angular.module('MyCla', ['ui.bootstrap', 'ngDragDrop', 'ngResource']) //other dependencies
    .config(function ($compileProvider){
        $compileProvider.urlSanitizationWhitelist(/^\s*(https?|ftp|mailto|file|tel):/);
    })
    .config(['$routeProvider', '$httpProvider', '$resourceProvider', function ($routeProvider, $httpProvider, $resourceProvider) {
    	$httpProvider.defaults.useXDomain = true;
        delete $httpProvider.defaults.headers.common['X-Requested-With'];
        
        console.log(eulaAccepted);
        if(eulaAccepted) {
	        $routeProvider.when('/', {templateUrl: 'partials/mainView.html', controller: 'homeController'});
	//        $routeProvider.when('/view3', {templateUrl: 'partials/accelerometerView.html'});
	//        $routeProvider.when('/view4', {templateUrl: 'partials/deviceInfoView.html'});
	//        $routeProvider.when('/view5', {templateUrl: 'partials/cameraView.html'});
	//        $routeProvider.when('/view6', {templateUrl: 'partials/contactsView.html'});
	//        $routeProvider.when('/view7', {templateUrl: 'partials/compassView.html'});
	//        $routeProvider.when('/view8', {templateUrl: 'partials/hackerNewsView.html'});
	        $routeProvider.otherwise({redirectTo: '/'});
        }
        
        $routeProvider.when('/', {templateUrl: 'partials/eulaView.html', controller: 'eulaController'});
        $routeProvider.otherwise({redirectTo: '/'});
}]);
