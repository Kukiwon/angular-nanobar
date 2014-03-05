(function() {
  'use strict';
  angular.module('nanobar')
    .directive('nanobar', function ($log) {
      return {
        restrict: 'A',
        link: function postLink(scope, element, attrs) {
          if (!Nanobar) {
            $log.error('Nanobar unavailable');
            return;
          }
          
          // @TODO options
          var options = {
            target: element
          };
          var nanobar = new Nanobar(options);
          
          function updatePercentage(percentage) {
            if (!nanobar || typeof(nanobar.go) !== 'function') {
              return;
            }
            nanobar.go(percentage);
          }

          scope.$watch('percentage', function(oldPercentage, newPercentage) {
            if (newPercentage) {
              updatePercentage(newPercentage);
            }
          });
        }
      };
    });
})();
