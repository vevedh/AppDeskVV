'use strict';

appDesk = angular.module('appdeskvv', ['ionic'])
  .run(function($rootScope, $window, $ionicLoading) {

      $rootScope.openwins = [];
      $rootScope.show = function(text) {
        this.modal = $ionicLoading.show({
          content: text ? text : 'Loading..',
          animation: 'fade-in',
          showBackdrop: true,
          maxWidth: 200,
          showDelay: 0
        });
      };
      $rootScope.hide = function() {
        this.modal.hide();
      };
      $rootScope.notify = function(text) {
        $rootScope.show(text);
        $window.setTimeout(function() {
          $rootScope.hide();
        }, 1999);
      };
      $rootScope.logout = function() {
        //$window.location.href = '#/';
        //$state.go('app.imprimantes',{},{location:'replace'});
      };

  })
  .config(function($stateProvider, $urlRouterProvider) {
      $stateProvider
      .state('login', {
        url: '/',
        templateUrl: 'partials/login.html'
      });
      /*.state('signup', {
        url: '/signup',
        templateUrl: 'partials/signup.html'
      }).state('home', {
        url: '/home',
        templateUrl: 'partials/home.html'
      }).state('chat', {
        url: '/chat/:chatToUser/:loggedInUser',
        templateUrl: 'partials/chat.html'
      });*/
      $urlRouterProvider.otherwise('/');
  });
