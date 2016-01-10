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

/**
 * Configure the Routes
 */
app.config(['$routeProvider', function ($routeProvider) {
        $routeProvider

                .when("/", {templateUrl: "partials/login.html", controller: "authController"})
                .when("/register", {templateUrl: "partials/register.html", controller: "authController"})
                .when("/login", {templateUrl: "partials/login.html", controller: "authController"})
                .when("/logout", {templateUrl: "partials/logout.html", controller: "authController"})
                .when("/candidates", {templateUrl: "partials/candidates.html", controller: "candidatesController"})
                .when("/candidate-edit/:id", {title: 'Edit Candidate', templateUrl: "partials/candidates/edit.html", controller: "editCandidatesController"})
                .when("/joboffers", {templateUrl: "partials/joboffers/list.html", controller: "joboffersController"})
                .when("/jobofferslist", {templateUrl: "partials/jobofferslist.html", controller: "joboffersController"})

                //.when("/joboffers/", {templateUrl: "partials/joboffers/new.html", controller: "joboffersController"})
                .when("/joboffers/:id", {title: 'Edit Job Offer', templateUrl: "partials/joboffers/edit.html", controller: "editJoboffersController"})
                .when("/joboffers-delete/:id", {templateUrl: "partials/joboffers/delete.html", controller: "editJoboffersController"})
                .when("/joboffers-apply/:id/:candidateid", {templateUrl: "partials/joboffers/apply.html", controller: "applyJoboffersController"})
                .when("/joboffers-applied/:id", {templateUrl: "partials/joboffers/applied.html", controller: "appliedJoboffersController"})
              //  .when("/select-applied/:id/:statusid/:jobid", {templateUrl: "partials/joboffers/applied.html", controller: "appliedJoboffersController"})
                // else 404
                .otherwise("/404", {templateUrl: "partials/404.html", controller: "PageCtrl"});
    }]);

app.run(['$rootScope', '$location', 'AuthService', 'SessionService', function ($rootScope, $location, AuthService, SessionService) {
        user = AuthService.isAuthenticated()
        if (!user) {
            SessionService.set('user', false);
            event.preventDefault();
            $location.path('/login');
        }
        else {
            console.log('ALLOW');
            console.log(user.role);
            
        }

    }]);