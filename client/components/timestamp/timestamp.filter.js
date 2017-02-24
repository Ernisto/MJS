'use strict';
const angular = require('angular');

/*@ngInject*/
export function timestampFilter() {
  return function(input) {
    return new Date(input).getTime();
  };
}


export default angular.module('mjsApp.timestamp', [])
  .filter('timestamp', timestampFilter)
  .name;
