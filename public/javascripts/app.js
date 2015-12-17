'use strict';

angular.module('todoApp', [])
        .controller('todoController', function ($scope, $http) {
                $scope.tasks = [{
                        "id": 1,
                        "name": "Julien",
                        "email": "garciagonzalez.julien@gmail.com"
                },
                        {
                                "id": 2,
                                "name": "Céline",
                                "email": "jgonzalez@wemanity.com"
                        }];
                $scope.shuffledItems = [];
                $scope.add = function () {
                        $scope.tasks.push({
                                "id": $scope.tasks.length + 1,
                                "name": $scope.name,
                                "email": $scope.email
                        });
                        
                        //$scope.name = "";
                        //$scope.email = "";
                }
                $scope.delete = function () {
                        $scope.tasks.splice(this.$index, 1);
                }
                $scope.shuffle = function () {
                        if ($scope.tasks.length > 1) {
                                var indexes = [];
                                $scope.tasks.forEach(function (element, index, array) {
                                        indexes.push(index);
                                })


                                var givers = $scope.tasks.slice();
                                var receivers = $scope.tasks.slice();

                                $scope.shuffledItems = [];
                                var counter = $scope.tasks.length, index;

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

                                $http.post('/users/mail', $scope.shuffledItems, postConfig)
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