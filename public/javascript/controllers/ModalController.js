(function() {
	'use strict';
	angular.module('app')
	.controller('ModalController', ModalController);

	ModalController.$inject = ['$scope', 'close'];

	function ModalController($scope, close) {
		var vm = this;

		$scope.close = function(result) {
 	close(result, 500); // close, but give 500ms for bootstrap to animate
 };
}
})();