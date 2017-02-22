'use strict';
const angular = require('angular');

export default angular.module('mjsApp.progressBar', [])
  .directive('progressBar', function() {
    return {
      template: require('./progress-bar.html'),
      restrict: 'EA',
      scope: {
        isVisible: '='
      },
      link: function(scope, element, attrs) {
        scope.$watch('isVisible', (newValue) =>{
          console.log(newValue);
          if(newValue) {
            scope.isVisible = newValue;
          }
        })
      }
    };
  })
  .name;
