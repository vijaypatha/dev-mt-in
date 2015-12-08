angular.module('devMtIn')
.controller('homeCtrl', function( $scope, profileService ) {
	$scope.editing = false;

	$scope.saveProfile = function( profile ) {
		profileService.saveProfile(profile);
		$scope.editing = false;
	}

	$scope.deleteProfile = function() {
		profileService.deleteProfile();
		$scope.myProfile = profileService.checkForProfile();
	}

	$scope.myProfile = profileService.checkForProfile();

	$scope.sortOptions = [{
		  display: 'Ascending'
		, value: false
	},
	{
		  display: 'Descending'
		, value: true
	}
	];
});