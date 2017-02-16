'use strict';

export default function($stateProvider) {
  'ngInject';
  $stateProvider
    .state('submission', {
      url: '/submission',
      template: '<submission></submission>'
    });
}
