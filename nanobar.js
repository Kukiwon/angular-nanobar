'use strict';
angular.module('nanobar', [])
.directive('nanobar', function ($log) {
  return {
    restrict: 'A',
    scope: {
      percentage: '=',
      color: '='
    },
    link: function postLink(scope, element, attrs) {
      if (!Nanobar || element.length > 1) {
        $log.error('Nanobar unavailable or too many nanobars found');
        return;
      }

      // @TODO options
      var options = {
        target: element[0],
        bg: scope.color ? scope.color : '#000'
      };
      var nanobar = new Nanobar(options);
      
      function updatePercentage(percentage) {
        if (!nanobar || typeof(nanobar.go) !== 'function') {
          return;
        }
        nanobar.go(percentage);
      }
      scope.$watch('percentage', function(newPercentage, oldPercentage) {
        if (newPercentage) {
          updatePercentage(newPercentage);
        }
      });
    }
  };
});
