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
})

.controller('checklistController', function($scope) {

})
