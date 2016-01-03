/**
 * Main AngularJS Web Application
 */


var app = angular.module('HRAgencyWebApp', [
    'ngRoute', 'satellizer'
]);
var myConfig = {
    "apiUrl": "http://pensoft.localhost.bg/api/",
    "port": "80"
};
console.log(myConfig.apiUrl);
/**
 * Configure the Routes
 */
app.config(['$routeProvider', function ($routeProvider) {
        $routeProvider
            
                .when("/", {templateUrl: "partials/login.html", controller: "AuthController"})
                .when("/register", {templateUrl: "partials/register.html", controller: "AuthController"})
                .when("/login", {templateUrl: "partials/login.html", controller: "AuthController"})
              
                .when("/candiates", {templateUrl: "partials/candidates.html", controller: "candidatesController"})
                .when("/joboffers", {templateUrl: "partials/joboffers/list.html", controller: "joboffersController"})
                .when("/jobofferslist", {templateUrl: "partials/jobofferslist.html", controller: "joboffersController"})
                
                //.when("/joboffers/", {templateUrl: "partials/joboffers/new.html", controller: "joboffersController"})
                .when("/joboffers/:id", {title: 'Edit Job Offer', templateUrl: "partials/joboffers/edit.html", controller: "editJoboffersController"})
                .when("/joboffers-delete/:id", {templateUrl: "partials/joboffers/delete.html", controller: "editJoboffersController"})
                .when("/joboffers-apply/:id/:candidateid", {templateUrl: "partials/joboffers/applied.html", controller: "appliedJoboffersController"})
               
                // else 404
                .otherwise("/404", {templateUrl: "partials/404.html", controller: "PageCtrl"});
    }]);

/**
 * Controls the Blog
 */
app.controller('BlogCtrl', function (/* $scope, $location, $http */) {
    console.log("Blog Controller reporting for duty.");
});

/**
 * Controls all other Pages
 */
app.controller('PageCtrl', function (/* $scope, $location, $http */) {
    console.log("Page Controller reporting for duty.");

    // Activates the Carousel
    $('.carousel').carousel({
        interval: 5000
    });

    // Activates Tooltips for Social Links
    $('.tooltip-social').tooltip({
        selector: "a[data-toggle=tooltip]"
    })
});