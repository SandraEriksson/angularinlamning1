
/*Sortera efter*/
var app = angular.module("sortApp", ["ngRoute", "ngCookies"]);

app.config(function ($routeProvider) {
    $routeProvider
        .when("/", {
            templateUrl: "view/home.html",
            controller: "sortController"
        })

        .when("/list", {
            templateUrl: "view/list.html",
            controller: "sortController"
        })

        .when("/cart", {
            templateUrl: "view/shoppingcart.html",
            controller: "sortController"
        })

        .when("/yourpage", {
            templateUrl: "view/yourpage.html",
            controller: "registerController"
        })

        .when("/register", {
            templateUrl: "view/register.html",
            controller: "registerController"
        })
});

app.controller("registerController", function ($scope, $http, $window, $cookies) {
    var loggedInCookie = $cookies.get('loggedIn');

    if (loggedInCookie != undefined)
        $scope.loggedIn = JSON.parse(loggedInCookie);
    else
        $scope.loggedIn = false;

    $scope.submitRegistration = function (firstName, lastName, email, password) {
        var regigsterModel = { firstName, lastName, email, password };

        let bodyString = JSON.stringify(regigsterModel);

        let headers = new Headers({ 'Content-Type': 'application/json' });

        $http({
            method: 'POST',
            url: "http://localhost:5000/register",
            headers: { 'Content-Type': 'application/json' },
            data: bodyString
        }).then(
            function (response) {
                var data = response.data;
                console.log("Registration Request is successful ", data);
                location.reload();
            }, function (error) {
                var data = error.data;
                console.log("Error", error);
            });
    }

    $scope.login = function (email, password) {
        var regigsterModel = { email, password };

        let bodyString = JSON.stringify(regigsterModel);

        $http({
            method: 'POST',
            url: "http://localhost:5000/login",
            headers: { 'Content-Type': 'application/json' },
            data: bodyString
        }).then(
            function (response) {
                var data = response.data;
                console.log("Login successful ", data);
                $scope.loggedIn = true;

                var expireDate = new Date();
                expireDate.setMinutes(expireDate.getMinutes() + 60);
                $cookies.put("loggedIn", $scope.loggedIn, { "expires": expireDate });

                location.reload();
            }, function (error) {
                var data = error.data;
                console.log("Error", error);
            });
    }

    $scope.logOut = function (email, password) {
        $scope.loggedIn = false;
        $cookies.put("loggedIn", $scope.loggedIn);
        $window.location.href = location.origin;
    }
});

app.controller("sortController", function ($scope, $http, $cookies) {
    $http.get("http://localhost:5000/books").then(function (res) {
        $scope.products = res.data;
    });

    const starsTotal = 5;

    $scope.rating = function (input) {
        return `${Math.round(((input / starsTotal) * 100) / 10) * 10}%`;
    }

    var cartCookie = $cookies.get("localCart");
    if (cartCookie != undefined)
        $scope.cart = JSON.parse(cartCookie);
    else
        $scope.cart = [];


    $scope.addItem = function (product) {
        var expireDate = new Date();
        expireDate.setDate(expireDate.getDate() + 7);

        $scope.cart.push(angular.copy(product));
        $cookies.put("localCart", JSON.stringify($scope.cart), { "expires": expireDate });
    }

    $scope.removeItem = function (product) {
        var expireDate = new Date();
        expireDate.setDate(expireDate.getDate() + 7);

        var index = $scope.cart.indexOf(product);
        $scope.cart.splice(index, 1);

        $cookies.put("localCart", JSON.stringify($scope.cart), { "expires": expireDate });
    }

    $scope.getProductCost = function (product) {
        return product.quantity * product.price;
    }

    $scope.getTotal = function () {
        var total = _.reduce($scope.cart, function (sum, product) {
            return sum + $scope.getProductCost(product);
        }, 0);

        if ($scope.cart.length === 0)
            $scope.emptycart = "Your cart is empty."
        else
            $scope.emptycart = ""

        return total;
    }
});