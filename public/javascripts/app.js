'use strict';

angular.module('cacahuetasApp', [])
        .controller('cacahuetasController', function ($scope, $http) {
                $scope.cacahuetas = [];
                $scope.shuffledItems = [];
                $scope.add = function () {
                        $scope.cacahuetas.push({
                                "id": $scope.cacahuetas.length + 1,
                                "name": $scope.name,
                                "email": $scope.email
                        });
                }
                $scope.delete = function () {
                        $scope.cacahuetas.splice(this.$index, 1);
                }
                $scope.shuffle = function () {
                        if ($scope.cacahuetas.length > 1) {
                                var indexes = [];
                                $scope.cacahuetas.forEach(function (element, index, array) {
                                        indexes.push(index);
                                })


                                var givers = $scope.cacahuetas.slice();
                                var receivers = $scope.cacahuetas.slice();

                                $scope.shuffledItems = [];
                                var counter = $scope.cacahuetas.length, index;

                                while (givers.length > 0) {
                                        var giverIndex = Math.floor(Math.random() * givers.length);
                                        var giver = givers[giverIndex];
                                        givers.splice(giverIndex, 1);

                                        var receiverIndex = 0;
                                        do {
                                                receiverIndex = Math.floor(Math.random() * receivers.length)
                                        } while (receivers[receiverIndex].id == giver.id)


                                        $scope.shuffledItems.push({
                                                "giver": giver,
                                                "receiver": receivers.splice(receiverIndex, 1)[0]
                                        });
                                }

                                var postConfig = {
                                        headers: {
                                                'Content-Type': 'application/json'
                                        }
                                };

                                $http.post('/cacahuetas/mail', $scope.shuffledItems, postConfig)
                                        .then(
                                                function (response) {
                                                        $scope.shuffledItems = {}; // clear the form so our user is ready to enter another
                                                        console.log("Success");
                                                },
                                                function (response) {
                                                        console.log('Error: ' + response);
                                                });
                                

                        } else {
                                console.log("Need more than 1 users.");
                        }
                }
        });