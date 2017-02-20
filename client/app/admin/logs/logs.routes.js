'use strict';

export default function($stateProvider) {
  'ngInject';
  $stateProvider
    .state('admin.logs', {
      url: '/logs',
      template: '<logs></logs>'
    });
}
