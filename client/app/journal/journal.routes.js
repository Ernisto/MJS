'use strict';

export default function($stateProvider) {
  'ngInject';
  $stateProvider
    .state('journal', {
      url: '/{journal:mjen|mjss|mjal|reforma}',
      template: '<journal></journal>'
    });
}
