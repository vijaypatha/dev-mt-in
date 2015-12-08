angular.module('devMtIn')
.service('profileService', function() {

	this.saveProfile = function( profile ) {
		localStorage.setItem('profile', JSON.stringify(profile));
	}

	this.checkForProfile = function() {
		if (localStorage.getItem('profile')) {
			console.log('test')
			return JSON.parse(localStorage.getItem('profile'));
		}

		return { friends: [{name: 'Ryan'}, {name: 'Bryan'}, {name: 'Sarah'}, {name: 'Zac'}, {name: 'Erin'}] }
	}

	this.deleteProfile = function() {
		localStorage.removeItem('profile');
	}

});