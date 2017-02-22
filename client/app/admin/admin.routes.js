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
      template: '<admin-monitoring></admin-monitoring>'
    })
    .state('admin.journals', {
      url: '/journals',
      template: '<admin-journals></admin-journals>'
    })
    .state('admin.archives', {
      url: '/archives',
      template: '<admin-archives></admin-archives>'
    })
    .state('admin.users', {
      url: '/users',
      template: '<admin-users></admin-users>'
    })
    .state('admin.logs', {
      url: '/logs',
      template: '<admin-logs></admin-logs>'
    });
}
