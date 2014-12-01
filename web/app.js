'use strict';

angular.module('qaChecklist', [
	'ui.router',
	'ngResource',
	'ngMaterial',
	'ngCookies',
])

.config(function($locationProvider, $urlRouterProvider, $stateProvider) {
	$locationProvider.html5Mode(true).hashPrefix('!')
	$urlRouterProvider.otherwise('/login')
	$stateProvider
		// .state('root', {
		// 	url: '/',
		// 	abstract: true
		// 	template: '<ui-view />',
		// })
		.state('login', {
			url: '/login',
			views: {
				main: {
					templateUrl: 'login.html',
					controller: 'loginController',
				}
			}
		})
		.state('checklists', {
			url: '/checklists',
			views: {
				main: {
					templateUrl: 'checklists.html',
					controller: 'checklistController',
				}
			}
		})
		.state('checklists.item', {
			url: '/:checklistId',
			views: {
				'main@': {
					templateUrl: 'checklist.html',
					controller: 'checklistController',
				}
			}
		})
})

.controller('checklistController', function($cookieStore, $scope, $state, $stateParams, $mdDialog, checklistService) {
	if (!$cookieStore.get('auth')) {
		$state.go('login')
	}

	$scope.checklistItems = checklistService

	if ($stateParams.checklistId) {
		checklistService.checklists.get({checklistId: $stateParams.checklistId}).$promise.then(function(data) {
			console.log(data)
			if (!data.errorCode) {
				if (data.fields) {
					$scope.checklistItems = data.fields
				}
			} else {
				$scope.errorMessage = data.message
			}
		})
	} else {
		checklistService.checklists.query().$promise.then(function(data) {
			if (!data.errorCode) {
				$scope.checklists = data
			} else {
				$scope.errorMessage = data.message
			}
		})
	}

	$scope.addChecklist = function() {
		checklistService.checklists.save({
			userId: $cookieStore.get('auth').userId,
			fields: {},
		}).$promise.then(function(data) {
			if (!data.errorCode) {
				console.log(data)
				$state.go('checklists.item', {checklistId: data._id})
			} else {
				$scope.errorMessage = data.message
			}
		})
	}

	$scope.saveData = function(fields) {
		console.log(fields)
		checklistService.checklists.update({
			checklistId: $stateParams.checklistId,
			userId: $cookieStore.get('auth').userId,
			fields: fields,
		}).$promise.then(function(data) {
			console.log(data)
			if (data.errorMessage) {
				$scope.errorMessage = data.message
			}
		})
	}
})

.controller('checklistItemsController', function($scope) {
	$scope.checkboxOptions = {
		completed: {
			checked: 'did',
			unchecked: 'didn’t do'
		},
		tested: {
			checked:'PASS',
			unchecked: 'FAIL'
		}
	}
})

.directive('checklistItems', function() {
	return {
		templateUrl: 'checklist-items.html',
		restrict: 'E',
		scope: {
			fields: '=fields',
		}
	}
})

.service('checklistService', function($resource) {
	var urlBase = 'https://qa-checklist.herokuapp.com/'
	// var urlBase = 'http://localhost:3000/'
	this.checklists = $resource(urlBase + 'api/checklists/:checklistId', {
		checklistId: '', userId: '@id', fields: '@id'
	}, {
		update: {
			method: 'PUT',
			params: {
				checklistId: '@id',
			}
		},
	})

	this.websiteInfo = {
		name: 'Website Info',
		items: [
			{
				name: 'URL',
				desc: 'URL of the site being checked.',
			}, {
				name: 'Date',
				desc: 'The dates for Pre-Live and Post-Live testing.',
			},
		]
	}

	this.pageTests = {
		name: 'Page Tests',
		tests: true,
		items: [
			{
				name: 'Contact Us',
				desc: 'Fill out Contact Us page with a request to be forwarded to your email address',
			}, {
				name: 'Compliance',
				desc: 'Request compliance review from Buser right before going live and right after going live',
			}, {
				name: 'Popunder',
				desc: 'Is it the correct popunder page going from page 1 to page 2?  Is there ads on display?  Not applicable in mobile, chrome, or safari.',
			}, {
				name: 'Military',
				desc: 'Does it redirect to the correct military page from page 1 to page 2? Did the lead show up in roi-milbdst ONLY',
			}, {
				name: 'Reject',
				desc: 'Does the unsold lead redirect to the correct reject page? Did the lead show up in roi-unsold and roi-short?  Is there ads on display?',
			}, {
				name: 'Reject Login',
				desc: 'Does the unsold login lead redirect to the correct reject page? Did the lead show up in roi-unsold (possibly roi-short)?  Is there ads on display?',
			}, {
				name: 'Bad State',
				desc: 'Does it redirect to the correct bad state page from page 1 to page 2? Did the lead show up in roi-milbdst and roi-short?  Is there ads on display?',
			}, {
				name: 'Chat',
				desc: 'Does the chat function correctly on all 4 pages of the full form?',
			}, {
				name: 'Unsold',
				desc: 'Did the lead show up with all the fields you entered on the form correctly in the lead system and redirect correctly?  Did it show up in roi-unsold list?',
			}, {
				name: 'Sold',
				desc: 'Send through fakelead@cashcorner.com after turning on fakelead buyer in CCAPP.  Remember to turn off the fakelead buyer in CCAPP when finished testing.  Did the lead show correct values in the lead system and redirect correctly?  Did it show up in roi-sold list?',
			}, {
				name: 'Prepopulated Fields',
				desc: 'Copy and paste correct prepop link from the warehouse into the url bar.  Change personal inforamtion of the link in the url bar and then hit enter.  Ensure the prepop inforamtion is populated on page one and the address populates on page 2.  Did the lead show up in roi-short?  Test for login as well',
			}, {
				name: 'Login',
				desc: 'Use an existing test lead to test login functionality (returning customer login).  Did the correct reject page show up?  Did the lead show in the roi-unsold list?',
			}, {
				name: 'Login Edit',
				desc: 'Use an existing test lead to test login functionality (returning customer login) and make changes to the lead information on the form using the edit button.  Did the correct reject page show up?  Did the lead show in the roi-unsold list?',
			}, {
				name: 'Mobile',
				desc: 'Test a lead on a mobile phone.  Did it show up in the correct list?  Did the correct redirect page show (reject or sold)',
			}, {
				name: 'Mobile Login',
				desc: 'Test a login lead on a mobile phone.  Did it show up in the correct list?  Did the correct redirect page show (reject or sold)',
			}, {
				name: 'Pixel Test',
				desc: 'Send through a unique lead (using a hitpath link) to ensure correct unsold payout appears in hitpath.',
			}, {
				name: 'Custom 404',
				desc: 'Type earlypayday.net/junk in the url bar to see if there is a custom 404 page that allows user to redirect to the home page.',
			},
		]
	}

	this.listManagement = {
		name: 'List Management',
		tests: true,
		items: [
			{
				name: 'roi-short',
				desc: '',
			}, {
				name: 'roi-unsold',
				desc: '',
			}, {
				name: 'roi-sold',
				desc: '',
			}, {
				name: 'roi-milbdst',
				desc: '',
			},
		]
	}

	this.browserTests = {
		name: 'Browser Tests',
		tests: true,
		items: [
			{
				name: 'IE 8',
				desc: '',
			}, {
				name: 'IE 9',
				desc: '',
			}, {
				name: 'IE 10',
				desc: '',
			}, {
				name: 'IE 11',
				desc: '',
			}, {
				name: 'Firefox',
				desc: '',
			}, {
				name: 'Chrome',
				desc: '',
			}, {
				name: 'Safari',
				desc: '',
			}, {
				name: 'Android Internet',
				desc: '',
			}, {
				name: 'Android Chrome',
				desc: '',
			}, {
				name: 'iPad Safari',
				desc: '',
			}, {
				name: 'iPhone Safari',
				desc: '',
			},
		]
	}
})

.service('loginService', function() {
	this.fields = [
		{
			name: 'Email',
			type: 'email',
		}, {
			name: 'Password',
			type: 'password',
		}
	]
})

.controller('loginController', function($cookieStore, $scope, $state, userService, loginService) {
	$scope.user = {
		email: '',
		pass: '',
	}

	$scope.hideErrorMessage = function() {
		$scope.errorMessage = ''
	}

	$scope.loginUser = function() {
		userService.login.save($scope.user).$promise.then(function(data) {
			if (!data.errorCode) {
				$cookieStore.put('auth', data)
				$state.go('checklists')
			} else {
				$scope.errorMessage = data.message
			}
		})
	}

	userService.users.query().$promise.then(function(data) {
		$scope.usersTest = data
	})
})

.service('userService', function($resource) {
	var urlBase = 'https://qa-checklist.herokuapp.com/'
	// var urlBase = 'http://localhost:3000/'
	this.users = $resource(urlBase + 'api/users/:name', {name: ''}, {})
	this.login = $resource(urlBase + 'api/login', {email: '@id', password: '@id'}, {})
	this.auth = $resource(urlBase + 'api/auth', {userId: '@id', token: '@id'}, {})
})
