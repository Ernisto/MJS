'use strict';

export default function($stateProvider) {
  'ngInject';
  $stateProvider
    .state('journal', {
      url: '/:journal',
      template: '<journal></journal>'
    });
}
