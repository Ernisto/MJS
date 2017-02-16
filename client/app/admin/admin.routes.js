'use strict';

export default function($stateProvider) {
  'ngInject';
  $stateProvider
    .state('admin', {
      url: '/admin',
      template: '<admin></admin>',
      authenticate: true,
      redirectTo: 'admin.monitoring',
      data: {
        layout: 'admin',
        bodyClass: 'skin-blue sidebar-mini'
      }
    })
    .state('admin.monitoring', {
      url: '/monitoring',
      template: require('./monitoring.html'),
      stateName: 'monitoring'
    })
}
