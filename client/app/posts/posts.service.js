'use strict';

angular.module('pinterestCloneApp')
  .factory('posts', function ($http,$location) {
    // AngularJS will instantiate a singleton by calling "new" on this function
    var posts = {
    	allposts: [],
    	allMyPosts: []
    };

    posts.getAllPosts = function(){
    	posts.allposts = [];
    	return $http.get('api/posts').success( function(data){
          posts.allposts = data;
          console.log(posts.allposts);
        })
    };

    posts.getMyPosts = function(){
    	posts.allMyPosts = [];
    	return $http.get('api/posts/myposts').success( function(data){
          posts.allMyPosts = data;
        })
    };

    posts.addPost = function(newPost){
    	return $http.post('api/posts',newPost).success(
	        function(data){
	          posts.getAllPosts();
              posts.getMyPosts();
              $location.path('/');
	        })
    };

    posts.removePost = function(postID){
    	return $http.delete('api/posts/'+ postID).success(function(data){
        	posts.getAllPosts();
        	posts.getMyPosts();
      	})
    }
    return posts;
  });
