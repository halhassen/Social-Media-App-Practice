(function() {
	'use strict';
	angular.module('app')
	.factory('HomeFactory', HomeFactory);

	HomeFactory.$inject = ['$http', '$q'];

	function HomeFactory($http, $q) {
		var o = {};

		var getAuth = function() {
			var auth = {
				headers: {
					Authorization: "Bearer " + localStorage.getItem("token")
				}
			};
			return auth;
		};
		//do i need a get call for posts? We'll see
		o.getPost = function(id) {
			var q = $q.defer();
			$http.get('/api/posts/' + id).success(function(res) {
				q.resolve(res);
			});
			return q.promise;
		};

		o.getPosts = function() {
			var q = $q.defer();
			$http.get('/api/posts/').success(function(res) {
				q.resolve(res);
			});
			return q.promise;
		};
		//add  getAuth() later
		o.createPost = function(post) {
			var q = $q.defer();
			$http.post('/api/posts/', post, getAuth()).success(function(res) {
				console.log(res);
				q.resolve();
				
			});
			return q.promise;
		};

		o.editPost = function(post) {
			var auth = {
				headers: {
					Authorization: "Bearer " + localStorage.getItem("token")
				}
			};
			var q = $q.defer();
			$http.put('/api/posts/' + post._id, post).success(function(res) {
				q.resolve();
			});
			return q.promise;
		};

		o.deletePost = function(post) {
			var q = $q.defer();
			$http.delete('api/posts/' + post._id).success(function(res) {
			});
		};


		return o;
	}
})();