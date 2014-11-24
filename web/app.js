'use strict';

angular.module('qaChecklist', ['ui.router', 'ngMaterial'])

.config(function($locationProvider, $urlRouterProvider, $stateProvider) {
	$locationProvider.html5Mode(true).hashPrefix('!')
	$urlRouterProvider.otherwise('/')
	$stateProvider
		.state('root', {
			url: '/',
			templateUrl: 'checklist.html',
			controller: 'checklistController',
		})
		.state('test', {
			url: '/test',
			templateUrl: 'test.html',
			controller: 'testController',
		})
})

.controller('checklistController', function($scope, $mdDialog, checklistService) {
	$scope.checklistItems = checklistService
	$scope.showDesc = function(e, heading, desc) {
		$mdDialog.show({
			controller: 'moreInfoController',
			templateUrl: 'more-info.html',
			targetEvent: e,
			locals: {
				heading: heading,
				desc: desc
			}
		})
	}
})

.controller('moreInfoController', function($scope, heading, desc) {
	$scope.heading = heading
	$scope.desc = desc
})

.controller('testController', function($scope) {

})

.service('checklistService', function() {
	this.websiteInfo = {
		name: 'Website Info',
		subItems: [
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
		subItems: [
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
			},
		]
	}
	this.listManagement = {
		name: 'List Management',
		subItems: [
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
})
