'use strict';

export default function($stateProvider) {
  'ngInject';
  $stateProvider
    .state('department', {
      url: '/:department',
      template: '<department></department>'
    });
}
