angular.module('clientApp', []);

angular.module("clientApp").factory('HttpRequest', function ($http) {
    return {
        Request: function (url, param, method) {
            return $http({
                method: method,
                url: url,
                data: $.param(param),
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            });
        }
    };
});

angular.module('clientApp').controller("CommonController", function ($scope, HttpRequest) {
    $scope.API_URL = "http://localhost:3000/api/cars/";

    //GET
    $scope.GetCarBrands = function(){
        HttpRequest.Request($scope.API_URL, [], "GET").success(function (data) {
            $scope.Cars = data;
        });
    }

    //SET
    $scope.SetCarBrandParam = {};
    $scope.SetCarBrand = function (){
        HttpRequest.Request($scope.API_URL, $scope.SetCarBrandParam, "POST").success(function (data) {
            if(data.result){
                alert("Car Added!");
                $scope.GetCarBrands();
                $scope.SetCarBrandParam = {};
            }
        });
    }

    //DELETE
    $scope.DeleteCarBrand = function (id){
        HttpRequest.Request($scope.API_URL + id, [], "DELETE").success(function (data) {
            if(data.result){
                alert("Car Deleted!");
                $scope.GetCarBrands();
            }
        });
    }

    //SET EDIT FIELD
    $scope.UpdateCarBrandParam = {};
    $scope.SetActiveEdit = function (car){
        if(!car){
            //RESET
            $scope.ActiveEdit = undefined;
            $scope.UpdateCarBrandParam = {};
            return;
        }
        $scope.ActiveEdit = car.id;
        $scope.UpdateCarBrandParam.id = car.id;
        $scope.UpdateCarBrandParam.brand_name = car.brand_name;
    }

    $scope.UpdateCarBrand = function (){
        HttpRequest.Request($scope.API_URL, $scope.UpdateCarBrandParam, "PUT").success(function (data) {
            if(data.result){
                alert("Car Updated!");
                $scope.GetCarBrands();
                $scope.ActiveEdit = undefined;
                $scope.UpdateCarBrandParam = {};
            }
        });
    }

});
