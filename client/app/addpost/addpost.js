'use strict';

angular.module('pinterestCloneApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('addpost', {
        url: '/addpost',
        templateUrl: 'app/addpost/addpost.html',
        controller: 'AddpostCtrl'
      });
  });