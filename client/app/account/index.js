'use strict';

import angular from 'angular';

import uiRouter from 'angular-ui-router';

import routing from './account.routes';
import login from './login';
import settings from './settings';
import signup from './signup';

export default angular.module('mjsApp.account', [uiRouter, login, settings, signup])
  .config(routing)
  .run(function($rootScope) {
    'ngInject';

    $rootScope.$on('$stateChangeStart', function(event, next, nextParams, current, currentParams) {
      if ((next.name === 'logout' || next.name === 'login')  && current && current.name && !current.authenticate) {
        next.referrer = current.name;
        next.params = currentParams;
      }
    });
  })
  .name;
