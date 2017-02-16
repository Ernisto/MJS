'use strict';
const angular = require('angular');

const uiRouter = require('angular-ui-router');

import routes from './submission.routes';

export class SubmissionComponent {
  /*@ngInject*/
  constructor() {
    this.message = 'Hello';
  }
}

export default angular.module('mjsApp.submission', [uiRouter])
  .config(routes)
  .component('submission', {
    template: require('./submission.html'),
    controller: SubmissionComponent,
    controllerAs: 'submissionCtrl'
  })
  .name;
