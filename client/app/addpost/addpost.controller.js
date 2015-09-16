'use strict';

angular.module('pinterestCloneApp')
  .controller('AddpostCtrl', function ($scope, posts) {
    $scope.message = 'Hello';

    $scope.addPost = function(){
      posts.addPost($scope.newpost);
    }
  });
