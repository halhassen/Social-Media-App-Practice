(function() {
	"use strict";
	angular.module('app').controller('CreatePostController', CreatePostController);
	CreatePostController.$inject = ['HomeFactory', '$state'];

	function CreatePostController(HomeFactory, $state) {
		var vm = this;
		vm.post = {};
		vm.createPost = function(post) {
			vm.post.created = new Date(vm.post.created + '-1-1');
			HomeFactory.createPost(vm.post).then(function() {
				$state.go('Home');
			});
		};

		vm.submitPost = function() {
			vm.post.created = new Date(vm.post.created + '-1-1');
			HomeFactory.submitPost(vm.post).then(function() {
				$state.go('Home');
			});
		};
	}
})();