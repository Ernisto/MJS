'use strict';
const angular = require('angular');

export default angular.module('mjsApp.progressBar', [])
  .directive('progressBar', function() {
    return {
      template: require('./progress-bar.html'),
      restrict: 'EA',
      link: function(scope, element, attrs) {}
    };
  })
  .name;
