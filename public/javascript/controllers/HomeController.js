(function() {
	'use strict';
	angular.module('app')
	.controller('HomeController', HomeController);

	HomeController.$inject = ['HomeFactory', '$state', '$scope', '$rootScope'];

	function HomeController(HomeFactory, $state, $scope, $rootScope) {
		var vm = this;
		vm.post = {};
		vm.status = $rootScope._user;
		vm.title = 'Welcome to our App!';

		var getPosts = function() {	
			HomeFactory.getPosts().then(function(res) {
				vm.posts = res;
				console.log(res);
			});
		}
		getPosts();

		vm.createPost = function(post) {
			vm.post.created = new Date(vm.post.created + '-1-1');
			HomeFactory.createPost(vm.post).then(function() {
				getPosts();
				vm.post.body = ""
			});
		};


		vm.submitPost = function() {
			vm.post.created = new Date(vm.post.created + '-1-1');
			HomeFactory.submitPost(vm.post).then(function() {
				$state.go('Home');
			});
		};

		vm.editPost = function() {
			HomeFactory.editPost(vm.post).then(function() {
				$state.go('Home')
				//getPosts();
			});
		}

		vm.deletePost = function(post) {
			vm.posts.splice(vm.posts.indexOf(post), 1);
			HomeFactory.deletePost(post)
		};


	}
})();