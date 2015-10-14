'use strict';

var app = angular.module('APP_NAME');

app.factory('stockFactory', function($window, $http, tokenStorageKey) {
  var stockFactory = {};

  stockFactory.lookupStock = function(input){
    console.log(input);
    return $http.jsonp('http://dev.markitondemand.com/MODApis/Api/v2/Lookup/jsonp?input=+'+input+'+&callback=JSON_CALLBACK')
  }

  stockFactory.getStock = function(input){
    return $http.jsonp('http://dev.markitondemand.com/MODApis/Api/v2/Quote/jsonp?symbol='+input+'&callback=JSON_CALLBACK')
  }

  stockFactory.addStock = function(data){
    return $http.post('/users/addStock', data)
  }

  stockFactory.sellStock = function(data){
    return $http.post('/users/sellStock', data)
  }

  stockFactory.getUser = function(payload){
    console.log(payload);
    return $http.get('/users/getUser/' + payload._id)
  }



  return stockFactory;
});
