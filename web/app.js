'use strict'

angular.module('qaChecklist', ['ui.router', 'ngMaterial'])

.config(function($locationProvider, $urlRouterProvider, $stateProvider) {
	$locationProvider.html5Mode(true).hashPrefix('!')
	$urlStateProvider.otherwise('/')
	$stateProvider
		.state('/', {
			templateUrl: 'checklist.html',
			controller: 'checklistController'
		})
		.state('/test', {
			templateUrl: 'test.html',
			controller: 'testController'
		})
})

.controller('checklistController', function($scope) {

})

.controller('testController', function($scope) {

})
