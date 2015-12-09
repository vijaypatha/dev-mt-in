angular.module('devMtIn')
.service('profileService', function( $http ) {
	var baseUrl = 'http://localhost:8081'

	this.saveProfile = function( profile ) {
		$http({
			  method: 'POST'
			, url: baseUrl + '/api/profiles'
			, data: profile
		})
			.then(function( profileResponse ) {
				localStorage.setItem('profileId', JSON.stringify({ profileId: profileResponse.data._id }));
			})
			.catch(function( err ) {
				console.error(err);
			});
	}

	this.checkForProfile = function( profileId ) {
		return $http({
			  method: 'GET'
			, url: baseUrl + '/api/profiles/' + profileId
		});
	}

	this.deleteProfile = function() {
		localStorage.removeItem('profile');
	}

});