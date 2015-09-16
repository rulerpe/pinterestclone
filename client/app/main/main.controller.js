'use strict';

angular.module('pinterestCloneApp')
  .controller('MainCtrl', function ($scope, $http, socket, posts) {
    $scope.posts = posts;
    $scope.allMyPosts = posts.allMyPosts;
    $scope.bricks = [{'src':"https://unsplash.it/200/300"},{'src':"https://unsplash.it/200/100"},{'src':"https://unsplash.it/200/400"},{'src':"https://unsplash.it/200/100"},{'src':"https://unsplash.it/200/300"},{'src':"https://unsplash.it/200"},{'src':"https://unsplash.it/200/300"},{'src':"https://unsplash.it/200/100"},{'src':"https://unsplash.it/200/400"},{'src':"https://unsplash.it/200/100"},{'src':"https://unsplash.it/200/300"},{'src':"https://unsplash.it/200"}];

    $http.get('/api/things').success(function(awesomeThings) {
      $scope.awesomeThings = awesomeThings;
      socket.syncUpdates('thing', $scope.awesomeThings);
    });

    $scope.addThing = function() {
      if($scope.newThing === '') {
        return;
      }
      $http.post('/api/things', { name: $scope.newThing });
      $scope.newThing = '';
    };

    $scope.deleteThing = function(thing) {
      $http.delete('/api/things/' + thing._id);
    };

    $scope.$on('$destroy', function () {
      socket.unsyncUpdates('thing');
    });

    $scope.getAllPosts = function(){
      posts.getAllPosts();
    }

    $scope.getMyPosts = function(){
      posts.getMyPosts();
    }

    $scope.getAllPosts();

  });
