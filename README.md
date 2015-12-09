<img src="https://devmounta.in/img/logowhiteblue.png" width="250" align="right">

DevMtIn
===============

##Objective
By the end of this week you will have created a functional DevMountain social network that allows you to connect with other students and graduates. Along the way you will learn the core concepts of AngularJS, as well as learning how to access outside API's for data.

##Day One: Data binding, repeating, filtering.

###Step 1: Installing and including AngularJS.
To start things off we first need to include the Angular source code in our `index.html`, you can find this at https://cdnjs.com/libraries/angular.js . Scroll down until you see `https://cdnjs.cloudflare.com/ajax/libs/angular.js/_VERSIONNUMBER_/angular.js` and copy that link into a script tag at the bottom of your `<body>`.

Now that we have included the Angular script, our next step is to set up the bones of our first Angular application. The first step is to create an `app.js` file, inside this file we need to initialize our new Angular app which we will call 'devMtIn'.

```javascript
angular.module('devMtIn', []);
```
Be sure to include your `app.js` file in your `index.html` **underneath** the Angular script. If included above the Angular script, the app will not function. Our last step in including Angular in our new app is to add the `ng-app` attribute to our HTML. This attribute should be added to our `<html>` tag and should reference the name of our app. `<html ng-app="devMtIn">`.

Now we are ready to launch our app using `http-server` or `live-server`. You should see the page laid out with the included HTML and CSS, check the console to make sure there are no errors.

###Step 2: Creating and including a controller.
Now that Angular is up and running, let's actually *do* something with it. For this, we need a controller. A controller is the glue that Angular uses to connect your code to the view. To create our controller, let's create another new file called `homeCtrl.js`.

Inside of `homeCtrl.js` we will need to create a new controller on an `angular.module`, give that controller a name, and pass in a callback function that takes in the `$scope` parameter.
```javascript
angular.module('devMtIn')
.controller('homeCtrl', function( $scope ) {
	
});
```
Remember that we don't want to pass our `angular.module` an array here! When you pass in an array, you are declaring an entire new module rather than extending your current one. Now all we need to do is include the script in a new script tag and add the `ng-controller` attribute to our `<body>` tag and pass it "homeCtrl".

To test that everything is working so far, create a property on your `$scope` called 'myProfile' and set it equal to an object containing `name: _YOUR NAME_`. Inside of your HTML replace the header 'Your Name' with `{{ myProfile.name }}`. If everything is working you should see your name at the top of the page.

###Step 3: Data binding and repeating over data.
What you've just done in the above step is called data binding, we are binding the information inside of our controller to our view using the handlebars (`{{ }}`) notation. This binding can handle more than just displaying static data, it can also process simple evaluations.

To demonstrate this let's change our HTML name header to this: `{{ myProfile.name || 'Your Name' }}`. Now if you set `myProfile.name` to an empty string in your controller you will see the page is displaying the string 'Your Name' instead of the value of `myProfile.name`.

Let's add some data to repeat over, add a new property to your `myProfile` object named 'friends'.
```javascript
$scope.myProfile = {
	  name: 'John Doe'
	, friends: [{name: 'Ryan'}, {name: 'Bryan'}, {name: 'Sarah'}, {name: 'Zac'}, {name: 'Erin'}]
}
```

To repeat over this data we need to add an `ng-repeat` directive as an attribute to our `<div class="friendList"` and tell it to repeat over each 'friend' in `myProfile.friends`. Then inside of that div, in place of 'My Friends' we need to bind each friend to our view.
```html
<div class="friendList" ng-repeat="friend in myProfile.friends">
	<span class="closeBtn"></span>
	{{ friend.name }}
	<br />
	<div class="secondConnection friendList">
		My Second Connections
	</div>
</div>
```
Once you refresh the page you should see a list of your current friends' names.

###Step 4: ng-model and filtering.
So far we have bound data to our view from our controller, but there is no interactivity. None of our input boxes or buttons do anything, and all of our data is static on our controller. To begin to change that we need to utilize Angular's built in `ng-model` directive.

What `ng-model` does is create a two way data-binding from our controller to our view. This means that any changes made to the data by either the controller or the user will be reflected in both places. To demonstrate this let's add an `ng-model` attribute on our 'name' input box and pass it the value `myProfile.name`. Inside of your controller, delete the `name` property of `myProfile`.

Once you refresh the page, try typing your name into the input box you adjusted. You should see the header update as you type. What Angular is doing here is looking at your `$scope.myProfile` object, seeing that it doesn't contain a `name` property, and so creates that property for us.

Now we have some interactivity! Let's take it a step further by using `ng-model` to filter our data. To do this we will need to add a new `ng-model` to our 'Find Friends' input box named 'findFriend.name'. Angular will create the `findFriend` object on our `$scope` and assign the new property `name` to whatever value is inside the input box.

To use this to filter data takes only one more step. Inside of the friend list `ng-repeat` attribute add a new filter and pass it the value of `findFriend.name`. This should look something like this:
```html
<div class="friendList" ng-repeat="friend in myProfile.friends | filter : findFriend.name">
```
After refreshing the page you should now be able to type into the 'Find Friends' box and see your friend's list filter in real time.

###Step 5: ng-options and more filtering.
We want our users to be able to choose whether they want to sort their friends in ascending or descending order. To do this we will be using Angular's `ng-options` directive. `ng-options` works similarly to `ng-repeat` but creates a select box with dynamically generated options instead of repeating an element.

Before adding this directive to our HTML we need to create an array on our controller to give `ng-options` something to loop over. This will be an array of two objects containing a select value and a display value. It should look something like this:
```javascript
$scope.sortOptions = [{
		  display: 'Ascending'
		, value: false
	},
	{
		  display: 'Descending'
		, value: true
	}
];
```
Remember that `display` and `value` are just key names, they can be named whatever you like as long as you adjust the HTML accordingly.

Next we will need to add a select element into our `index.html` just below our search bar. The syntax for `ng-options` is very similar to `ng-repeat` with some extras added on. It will look like this:
```html
<select ng-model="sortReverse" ng-options="option.value as option.display for option in sortOptions"></select>
```
The syntax is a little odd, but what we are saying is that `option.value` will be the value we use for every `option.display` in our `sortOptions` array. It is also important to notice that I included an `ng-model` on the new select element. `ng-options` will not work at all without an `ng-model` to pass its data to.

To add this logic to our filter we only need to pass our `ng-repeat` a new filter called `orderBy`. The first argument passed to orderBy is the property we wish to sort on, the second is a boolean that tells `orderBy` whether or not we wish to reverse the array.
```html
<div class="friendList" ng-repeat="friend in myProfile.friends | filter : findFriend.name | orderBy : 'name' : sortReverse">
```

Well done! You've finished your first day of AngularJS, now you have the knowledge to allow users to interact with the `$scope`, repeat over data, filter data, bind data to the DOM, and dynamically generate select elements using `ng-options`.

___

##Day Two: Services, click handling, and localStorage.

###Step One: Creating and connecting a service.
To begin day two we need to start by creating a new file named `profileService.js`. This file will have an initial setup very similar to our `homeCtrl.js`. We need to invoke the `service` method on an `angular.module` and pass that method the name of our service and a callback function.
```javascript
angular.module('devMtIn')
.service('profileService', function() {
	
});
```
An important distinction between services and controllers is that services do not take in the `$scope` parameter. Services will have no direct link to the view, their primary purpose is to do the heavy lifting for the rest of the application and pass data to controllers.

Let's add a simple test function onto this service, this function should simply `console.log` 'profileService is connected!'. Remember that when creating properties in a service you use the `this` keyword.
```javascript
this.serviceTest = function() {
	console.log('profileService is connected!');
}
```
To make use of this function inside of our homeCtrl we need to add the service script to our `index.html` and inject our profileService the same way we injected `$scope` yesterday.
```javascript
angular.module('devMtIn')
.controller('homeCtrl', function( $scope, profileService ) {
//...
```
We can now access our `serviceTest` function by simply prefixing the function name with the name of our service and invoking it, `profileService.serviceTest()`. Once you refresh the page you should see the message inside of your console.

###Step Two: ng-click
Yesterday we started with some basic user interactivity using `ng-model` and `ng-options`, today we're going to go further by introducing `ng-click`, Angular's built in click handler directive.

For our first `ng-click` we'll start with a simple expression that disables profile editing unless the editing button is clicked. Begin by creating `$scope.editing` in your homeCtrl and setting its value to `false`.

To disable our form fields we need to use another built-in Angular directive, `ng-disabled`. `ng-disabled` simply evaluates the expression passed to it and disables its containing element based on the truthy or falsyness of the expression. Add `ng-disabled` as an attribute to the three profile inputs and pass them `!editing`. Once you refresh the page the profile form fields should now be disabled.

Now that we have our `ng-disabled` working, we just need to flip the value of `editing` anytime a user clicks on the editing button. To do this we need to add the `ng-click` attribute to our 'Editing' button and pass it `editing = !editing`. One last step for clarity, we should display the value of `editing` inside of the 'Editing' button to make it clear whether or not editing is active.

Once that is complete you should be able to lock and unlock the profile fields, displaying whether or not they are editable in the 'Editing' button.

###Step Three: Saving to local storage
The next step will be to set up local storage, letting our profiles persist between refreshes. We'll start in the html and work back to the service.

The first thing we need to do is add `ng-model`'s to the rest of our profile fields. Make sure these `ng-model`'s point to new properties on the `myProfile` object. Next, we will need an `ng-click` on the profile's 'Save' button. This `ng-cick` should invoke a function we will create on our controller named `saveProfile` and pass it `myProfile` as the only argument. This is all we need in our HTML, next step: controller.

In `homeCtrl.js` create the `saveProfile` function and make sure it accepts a `profile` parameter. This function should simply call `profileService.saveProfile`, passing in the `profile` parameter as an argument, then set `$scope.editing` to false. It may seem odd to have a function who's only job is to pass data from the view to a service, but remember that the primary use of controllers is to act as a sort of middle-man. Controllers exist to communicate between the view and the services.

We now need to create a `saveProfile` function inside of `profileService`. This function should also take a `profile` parameter and save that profile object to local storage. The function will look something like this:
```javascript
this.saveProfile = function( profile ) {
	localStorage.setItem('profile', JSON.stringify(profile));
}
```
To make sure this is working enter `console.log(localStorage.profile)` in your browser's console, you should see your profile information print to console, even after refreshing.

###Step Four: Retrieving from local storage.
Our profile is saving, but isn't yet returning to the view on page reloads, let's fix that.

To start, we'll create a new function inside of `profileService.js` named `checkForProfile`. This function will check local storage and return the profile if it exists, otherwise returning a default friends list.
```javascript
this.checkForProfile = function() {
	if (localStorage.getItem('profile')) {
		return JSON.parse(localStorage.getItem('profile'));
	}
	return {
		friends: [{name: 'Ryan'}, {name: 'Bryan'}, {name: 'Sarah'}, {name: 'Zac'}, {name: 'Erin'}]
	}
}
```
Now inside of `homeCtrl.js` instead of setting `$scope.myProfile` equal to a friends list, we can set it equal to `profileService.checkForProfile()`. Now your profile should load automatically on page refresh.

###Step Five: Deleting from local storage.
The last step for today will be adding functionality to our delete button. This will follow the same basic steps as adding to local storage.

Add an `ng-click` to the 'Delete' button that calls a `deleteProfile` function inside of our controller. Our controller should call a `profileService.deleteProfile` function that simply removes the profile from local storage (`localStorage.removeItem('profile')`). After deleting the profile, we need to get our basic friends list back, so set `$scope.myProfile` equal to `profileService.checkForProfile()` again.

You've completed Angular day two! Now you know how to create services, access services inside of your controllers, handle clicks, and save to local storage.

___

##Day Three: $http and CRUD.
So far our social network is lacking a social aspect. Today we will add the functionality to connect with an outside API, find and add friends, and save or update our profile remotely.

###Step One: Injecting $http and posting your profile.
Yesterday we stored our profiles in local storage, allowing them to persist between refreshes. Today we want to add our profile to a database, letting other users find and connect with us.

Before we start writing our new code, let's make some adjustments. Delete the array of friends from the `profileService.checkForProfile` function and run `localStorage.removeItem('myProfile')` in your console so we can start fresh.

To begin, we need to inject Angular's built in `$http` service into our `profileService`. `$http` will allow us to make HTTP requests for any CRUD operation (Create, Read, Update, Delete). We will also need to create a variable named `baseUrl` and set it equal to **--BASEURL FIXME--**.

We're going to adjust our `saveProfile` function inside of `profileService`, now instead of saving our whole profile to local storage, we want to post it to the database, and just save the unique _id the database sends back to us. Let's delete everything we currently have inside of the function and start from scratch.

Our uptated `saveProfile` function will make an HTTP request with the method of 'POST', data of `profile`, and a url of `baseUrl + '/api/profiles'`. It should look something like this:
```javascript
this.postProfile = function( profile ) {
	$http({
		  method: 'POST' // Request method.
		, url: baseUrl + '/api/profiles' // URL we are making the request to.
		, data: profile // The data we are requesting be posted.
	})
}
```
We will also want to add a `.then` method to the end of our `$http` request. `.then` takes in a callback function as an argument, and that callback function will take in a `profileResponse` parameter. Inside of our callback function we now want to set `localStorage.setItem('profile', JSON.stringify({ profileId: profileResponse.data._id }));`. Then `catch` any errors. The end result will look like this:
```javascript
this.saveProfile = function( profile ) {
	$http({ // Requests that your profile be added to the database
		  method: 'POST'
		, url: baseUrl + '/api/profiles'
		, data: profile
	})
		.then(function( profileResponse ) { // What to do after a response comes back from the server.
			localStorage.setItem('profileId', JSON.parse({ profileId: profileResponse.data._id })); // Save our unique _id to local storage
		})
		.catch(function( err ) {
			console.error(err);
		});
}
```
I also recommend a `console.log(profileResponse)` inside of your `.then` callback to see exactly what data the server is sending back to you.

###Step Two: Retrieving your profile from the server.
Our profile is now saving to the server, but we never retrieve it, and local storage is only saving our id. Let's fix this.

To make this work we're going to change our `profileService.checkForProfile` function. Just like before, let's delete what we currently have inside the function and start fresh. This updated function will take in a `profileId` parameter. All the function needs to do is return an HTTP request with the method of 'GET' and a URL of `baseUrl + '/api/profiles' + profileId`.
```javascript
this.checkForProfile = function( profileId ) {
	return $http({
		  method: 'GET'
		, url: baseUrl + '/api/profiles' + profileId
	});
}
```
For this to work we will also need to adjust our `homeCtrl`. Remove the line where we set `$scope.myProfile` equal to `profileService.checkForProfile` and create a new function named `$scope.checkForProfile`.

`$scope.checkForProfile` will first pull our `profileId` from local storage and save it to a variable named `profileId`, next it will need to check whether or not `profileId` exists. If `profileId` exists, we will want to invoke `profileService.checkForProfile` and call the `.then` method. Inside of the callback function for `.then` we will want to set `$scope.myProfile` equal to the response from our callback function, then `.catch` any errors.

The final function should look like this:
```javascript
$scope.checkForProfile = function() {
	var profileId = JSON.parse(localStorage.getItem('profileId'));

	if (profileId) {
		profileService.checkForProfile(profileId.profileId)
			.then(function( profile ) {
				$scope.myProfile = profile.data;	
			})
			.catch(function ( err ) {
				console.error(err);
			});
	}
}
```
The last step here is to invoke your `$scope.checkForProfile` function immediatly after declaring it.

You should now be able to create and retrieve your profile from the remote server.

###Step Three: Deleting your profile.
The last update to have all of our previous functionality working with a remote server is to update our profile deleting functions. As we have before, let's clear out our `profileService.deleteProfile` function and start fresh.

Our fresh `deleteProfile` function will need to retrieve our `profileId` from local storage, then return an HTTP request with a method of 'DELETE', to the URL `baseUrl + '/api/profiles/' + profileId`.

```javscript
this.deleteProfile = function() {
	var profileId = JSON.parse(localStorage.getItem('profileId')).profileId;

	return $http({
		  method: 'DELETE'
		, url: baseUrl + '/api/profiles/' + profileId	
	});
}
```

With that done, we need to update our `homeCtrl`. All we need to do here is add a `.then` to our current `profileService.deleteProfile()` call that removes the `profileId` from local storage and sets `$scope.myProfile` equal to an empty object.
```javascript
$scope.deleteProfile = function() {
	profileService.deleteProfile()
		.then(function( deletedProfile ) {
			localStorage.removeItem('profileId');
			$scope.myProfile = {};
		})
		.catch(function( err ) {
			console.error(err);
		});
}
```
Our app is now functional in all of the basic steps of creating, saving, retrieving, and deleting our profile on a remote server. Tomorrow we will cover promises, `$q`, and finding and adding friends.