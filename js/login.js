angular.module('login_app', [])
	.controller('login_controller', function($scope, $http)
	{
		$scope.baseUrl = 'http://scrumly-pi.azurewebsites.net/api/LoginAdministrator';
				
		$scope.login = function(){
			$scope.status = 'Creating User';
			$scope.id = JSON.stringify({ 'Email':$scope.email, 'Password':$scope.password });
			//alert($scope.id);
			$scope.loading = true;
			
			var req = {
				method:'POST',
				url:$scope.baseUrl,
				header:{ 'Access-Control-Allow-Origin':'*',
					'Content-Type':'text/json'},
					data:$scope.id
				};
			
			$http(req).then(function(data, status){
				//alert("Login successful");	
				var res = JSON.stringify(data.data);
				$scope.user = data.data;
				$scope.login = true;
				console.log(status);
				
				if(data.data !== null )
				{
					alert("Login is successful")
					window.location.href = ("dashboard.html");
				}
				else
					alert("Login failed. Please input correct credentials");
				$scope.loading = false;
				//alert($scope.user.Email);				
			}, function (data, status) {
				alert("Error logging, Please input correct credentials");				
				$scope.email = "";
				$scope.password = "";
				$scope.loading = false;
			});
		};
	});