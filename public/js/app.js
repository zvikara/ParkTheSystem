var app = angular.module('ticket', ['firebase', 'google-maps'])
  .controller('Ticket', ['$scope', '$timeout', 'angularFireCollection',
    function($scope, $timeout, angularFireCollection) {
      var url = 'https://park-the-system-1.firebaseio.com/tickets';
      $scope.tickets = angularFireCollection(new Firebase(url).limit(20));
      var initForm = function() {
        $scope.name = 'Guest' + Math.floor(Math.random()*101);
        $scope.email = 'zvikara@gmail.com';
        $scope.date = new Date().toJSON().slice(0,10);
        $scope.number = Math.floor(Math.random()*10000000000);
        $scope.car = Math.floor(Math.random()*10000000);
        $scope.reason = 'Missing payment';
        $scope.city = 'Tel Aviv';
        $scope.latitude = 32.066158 + Math.random()/100;
        $scope.longitude = 34.777819 + Math.random()/100;
        $scope.total = 100 * Math.ceil(Math.random()*5);
        $scope.description = 'I was parking according to the sign instructions';
      };
      initForm();
      $scope.addTicket = function() {
        $scope.tickets.add(
        {
          name: $scope.name,
          email: $scope.email,
          date: $scope.date,
          number: $scope.number,
          car: $scope.car,
          reason: $scope.reason,
          city: $scope.city,
          longitude: $scope.longitude,
          latitude: $scope.latitude,
          total: $scope.total,
          description: $scope.description
        });
        initForm();
      };
      angular.extend($scope, {
        center: {
          latitude: 32.066158,
          longitude: 34.777819,
        },
        markers: [],
        zoom: 14,
      });
      $scope.$watchCollection('tickets', function(newTickets, oldTickets) {
        for (var i in newTickets) {
          $scope.markers.push({
            latitude: newTickets[i].latitude,
            longitude: newTickets[i].longitude
          });
        };
      });
    }
  ])
  .directive('autoScroll', function($timeout) {
    return function(scope, elements, attrs) {
      scope.$watch("tickets.length", function() {
        $timeout(function() {
          elements[0].scrollTop = elements[0].scrollHeight
        });
      });
    }
  });
