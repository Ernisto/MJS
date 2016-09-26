'use strict';

export default function($stateProvider) {
  'ngInject';
  $stateProvider
    .state('journal', {
      url: '/departments/:journal',
      template: '<journal></journal>'
    });
}
