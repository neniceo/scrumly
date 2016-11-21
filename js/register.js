/**
 * Created by Nenice on 11/19/2016.
 */
angular.module('sign_up_app', [])
    .controller('signup_controller', function($scope, $http)
    {
        $scope.baseUrl = 'http://scrumly-pi.azurewebsites.net/api/AddAdministrator';

        $scope.create = function(){
            $scope.status = 'Creating User';
            $scope.id = JSON.stringify({ 'Name': $scope.name, 'Email': $scope.email, 'Password': $scope.password });
            alert($scope.id);
            $scope.loading = true;

            var req = {
                method: 'POST',
                url: $scope.baseUrl,
                header: {'Access-Control-Allow-Origin':'*',
                    'Content-Type': 'text/json'},
                data:$scope.id
            };

            $http(req).then(function(data, status){
                alert("User Created");
                $scope.loading = false;
                window.location.href = "login.html";
            }, function(data, status){
                alert("Error Creating User");
                $scope.loading = false;
            });

        };

        function generateUUID(){
            var d = new Date().getTime();
            var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
                var r = (d + Math.random()*16)%16 | 0;
                d = Math.floor(d/16);
                return (c=='x' ? r : (r&0x3|0x8)).toString(16);
            });
            return uuid;
        };
    });