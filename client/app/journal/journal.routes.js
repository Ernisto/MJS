'use strict';

export default function($stateProvider) {
  'ngInject';
  $stateProvider
    .state('journal', {
      url: '/journal/:journal',
      template: '<journal></journal>'
    });
}
