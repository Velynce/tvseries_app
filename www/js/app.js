// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
var TVapp = angular.module('TVapp', ['ionic', 'ngRoute', 'ngSanitize'])

.run(function($ionicPlatform, $rootScope, $location) {
$rootScope.goHome = function() {
  $location.path('/list');
};

  $ionicPlatform.ready(function() {
    if(window.cordova && window.cordova.plugins.Keyboard) {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

      // Don't remove this line unless you know what you are doing. It stops the viewport
      // from snapping when text inputs are focused. Ionic handles this internally for
      // a much nicer keyboard experience.
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})

TVapp.config(['$routeProvider', function($routeProvider) {
  $routeProvider
  .when('/list', {
    controller: 'ListController',
    templateUrl: 'partials/list.html'
  })
  .when('/details/:itemId', {
    controller: 'DetailController',
    templateUrl: 'partials/details.html'
  })
  .otherwise({redirectTo: '/list'});
}]);

TVapp.controller('ListController', ['$scope', '$http', '$ionicLoading', '$routeParams', function($scope, $http, $ionicLoading, $routeParams) {
  $scope.loadShows = function() {
    $ionicLoading.show();
    $http.get('https://www.episodate.com/api/most-popular?page=2')
         .success(function(response) {
            //console.log(response['tv_shows']);
            $scope.tvshows = response['tv_shows'];
            $ionicLoading.hide();
         })
         .finally(function() {
          $scope.$broadcast('scroll.refreshComplete');
         });
  }
  $scope.loadShows();
}]);

TVapp.controller('DetailController', ['$scope', '$http', '$ionicLoading', '$routeParams', function($scope, $http, $ionicLoading, $routeParams) {
    $ionicLoading.show();
    //console.log($routeParams.itemId);

    $http.get('https://www.episodate.com/api/show-details?q=' + $routeParams.itemId)
         .success(function(response) {
          //console.log(response.tvShow);
            $scope.tvDetail = response.tvShow;

            $scope.episodes = [];
            for(var i = 0; i < response.tvShow.episodes.length; i++) {
              $scope.episodes.push(response.tvShow.episodes[i]);
            }
            //console.log($scope.episodes);

            $ionicLoading.hide();
         }); 
}]);