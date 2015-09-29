// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
var climaApp = angular.module('climaApp', ['ionic']);

climaApp.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})

climaApp.controller("climaCtrl",["$scope","$ionicLoading","climaSvc",climaCtrl]);

function climaCtrl($scope,$ionicLoading,climaSvc){
    $scope.cidade           = "Lins";
    $scope.temperatura      = "ND";
    $scope.temp_min         = "ND";
    $scope.temp_max         = "ND";
    $scope.latitude         = "ND";
    $scope.longitude        = "ND";
    $scope.pressure         = "ND";
    $scope.humidity         = "ND";   
    $scope.temp_description = "ND";
    $scope.temp_icon        = "ND";
    
    climaSvc.loadClima();
    
    
    $scope.$on("climaApp.temperatura",function(_,result){
        $scope.temperatura = result.main.temp;
        $scope.temp_min    = result.main.temp_min;
        $scope.temp_max    = result.main.temp_max;          
        $scope.latitude    = result.coord.lat;    
        $scope.longitude   = result.coord.lon;            
        $scope.pressure    = result.main.pressure;
        $scope.humidity    = result.main.humidity; 
        $scope.temp_icon   = "http://openweathermap.org/img/w/" + result.weather[0].icon + ".png";
        $scope.temp_description = result.weather[0].description;
        
        
        
    }
              
              );// fim do climaApp.temperatura
    $scope.reloadClima = function(){
    climaSvc.loadClima();
        console.log("Passei reload");
    $scope.$broadcast("scroll.infiniteScrollComplete");
    $scope.$broadcast("scroll.refreshComplete");    
        
    }
    
    
}// fim do contrroler

climaApp.service("climaSvc",["$http","$rootScope",climaSvc]);
function climaSvc($http,$rootScope){
    this.loadClima = function(){
        console.log("Carregando Clima");
        url = "http://api.openweathermap.org/data/2.5/weather?lat=-21.6692&lon=-49.6933&units=metric&lang=pt";
        $http.get(url,{params :""}).success(function(result){
            console.log("Temperatura Carregada");
            $rootScope.$broadcast("climaApp.temperatura",result);
            
        
        }).error(function(result){
            console.log("Erro ao Carregar Temperatura");
        
        });
    }
    
}// fim do service

