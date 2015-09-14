(function() {
	"use strict";
	angular.module('app').controller('UserController', UserController);
	UserController.$inject = ['$state', 'UserFactory', 'HomeFactory', "$rootScope", "$stateParams"];

	function UserController($state, UserFactory, HomeFactory, $rootScope, $stateParams) {
		var vm = this;
		vm.user = {};
		vm.status = $rootScope._user;

		var getPosts = function() {	
			HomeFactory.getPosts().then(function(res) {
				vm.posts = res;
				console.log(res);
			});
		};

		vm.register = function() {
			UserFactory.register(vm.user).then(function() {
				console.log('signed up');
				$state.go('Home');
			});
		};

		vm.login = function() {
			UserFactory.login(vm.user).then(function() {
				vm.status = $rootScope._user;
				$state.go('Home');
				getPosts();
			});
		};

		vm.logout = function() {
			UserFactory.logout();
			vm.status = $rootScope._user;
			getPosts();
			$state.go('Home');
			
		};

		vm.friends = function() {
			UserFactory.friendsList() 
			vm.status = $rootScope._user
			$state.go('FriendList')
		};
		//$stateParams gives access to the id passed
		vm.profilePage = function($stateParams) {
			console.log('profile')
			UserFactory.profilePage();
			vm.status = $rootScope._user
			$state.go('Profile')
		}

	}
})();