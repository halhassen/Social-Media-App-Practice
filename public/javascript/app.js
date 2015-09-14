(function() {
	'use strict';
	angular.module('app', ['ui.router'])
	.config(Config);
	Config.$inject = ['$stateProvider', '$urlRouterProvider'];
	function Config($stateProvider, $urlRouterProvider) {
		$stateProvider.state('Home',{
			url: '/',
			templateUrl: 'views/Home.html'
		}).state('RegisterUser', {
			url: '/Register',
			templateUrl: 'views/register_user.html',
			controller: 'UserController',
			controllerAs: 'vm'
		}).state('LoginUser', {
			url: '/Login',
			templateUrl: 'views/login_user.html',
			controller: 'UserController',
			controllerAs: 'vm'
		}).state('ProfilePage', {
			url: "/Profile/:id",
			templateUrl: 'views/profile_page.html'/*,
			controller: 'ProfileController',
			controllerAs: 'vm'*/
		}).state('CreatePost', {
			url: '/Create',
			templateUrl: 'views/create_post.html',
			controller: 'HomeController',
			controllerAs: 'vm'
		});
		$urlRouterProvider.otherwise('/');
	}
})();
