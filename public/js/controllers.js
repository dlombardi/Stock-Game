'use strict';

var app = angular.module('APP_NAME');

app.controller('accountCtrl', function($scope, stockFactory, auth) {

  $scope.stocks = [];

  auth.isLoggedIn() ? null : $state.go('users.login')

  stockFactory.getUser(auth.currentUser())
  .success(function(res){
    $scope.balance = res.balance;
    $scope.stocks = res.stocks;
  })

  $scope.stockLookup = function(input){
    stockFactory.lookupStock(input)
    .success(function(res){
      console.log(res);
      $scope.lookupResults = res;
    })
    .error(function(err){
      console.log(err);
    })
  }


  $scope.addStock = function(stock){
    var payload = auth.currentUser();
    console.log($scope.stocks);
    stockFactory.getStock(stock)
    .success(function(stock){
      console.log(stock)
      stockFactory.addStock({"payload": payload, "stock": stock})
      .success(function(res){
        console.log(res);
        $scope.balance = res.balance;
        $scope.stocks = res.stocks;
      })
    })
    .error(function(err){
      console.log(err);
    })
  }

  $scope.sellStock = function(stock){
    var payload = auth.currentUser();
    stockFactory.sellStock({"payload": payload, "stock": stock})
    .success(function(res){
      $scope.stocks = res.stocks;
      $scope.balance = res.balance;
    })
  }

});


app.controller('navCtrl', function($scope, $state, auth) {
  $scope.logout = function() {
    auth.logout();
    $state.go('users.login');
  };
});

app.controller('usersCtrl', function($scope, $state, auth){

  $scope.currentState = $state.current.name.split('.')[1].toUpperCase();
  console.log($scope.currentState);
  $scope.formState = $scope.currentState === "LOGIN" ? "Register" : "Login"
  $scope.toggleForm = function(){
    $scope.currentState === "LOGIN" ? $state.go('users.register') : $state.go('users.login');
  }
  $scope.submit = function(user) {
    var submitFunc = $scope.currentState === 'LOGIN' ? auth.login : auth.register;
    submitFunc(user).success(function(res){
      $state.go('account');
    }).error(function(res){
      $scope.user = {};
      alert(res.message);
    });
  };
});
