'use strict';

var app = angular.module('APP_NAME', ['ui.router', 'mgcrea.ngStrap']);

app.constant('tokenStorageKey', 'my-token');

app.config(function($stateProvider, $urlRouterProvider){
  $stateProvider
    .state('account', { url: '/', templateUrl: '/html/general/account.html', controller: 'accountCtrl' })

    .state('users', { abstract: true, templateUrl: '/html/users/users.html'})
    .state('users.login', { url: '/login', templateUrl: '/html/users/form.html', controller: 'usersCtrl'})
    .state('users.register', { url: '/register', templateUrl: '/html/users/form.html', controller: 'usersCtrl'})

  $urlRouterProvider.otherwise('/');
});
