'use strict';

import angular from 'angular';
import ngAnimate from 'angular-animate';
import ngCookies from 'angular-cookies';
import ngResource from 'angular-resource';
import ngSanitize from 'angular-sanitize';
import 'angular-socket-io';
import 'angular-translate';
import 'angular-translate-loader-static-files';
import 'angular-sweetalert';
import 'angular-local-storage';
import 'sweetalert';
import 'angular-ui-sortable';
import 'ng-tags-input';

import uiRouter from 'angular-ui-router';
import uiBootstrap from 'angular-ui-bootstrap';
// import ngMessages from 'angular-messages';
//import ngValidationMatch from 'angular-validation-match';


import {
  routeConfig
} from './app.config';

import _Auth from '../components/auth/auth.module';
import Modal from '../components/modal/modal.service';
import wysiwygEditor from '../components/wysiwyg-editor/wysiwyg-editor.directive';
import datatable from '../components/datatable/datatable.directive';
import account from './account';
import admin from './admin/admin.component';
import adminService from './admin/service/admin.service';
import adminNavbar from './admin/admin-navbar/admin-navbar.component';
import adminFooter from './admin/admin-footer/admin-footer.component';
import adminUsers from './admin/users/users.component';
import adminLogs from './admin/logs/logs.component';
import adminArchives from './admin/archives/archives.component';
import adminJournals from './admin/journals/journals.component';
import adminMonitoring from './admin/monitoring/monitoring.component';
import navbar from '../components/navbar/navbar.component';
import footer from '../components/footer/footer.component';
import main from './main/main.component';
import constants from './app.constants';
import util from '../components/util/util.module';
import socket from '../components/socket/socket.service';
import journal from './journal/journal.component';
import journalService from './journal/service/journal.service';
import archives from './archives/archives.component';
import archive from './archives/archive/archive.component';
import archiveService from './archives/service/archive.service';
import dashboard from './dashboard/dashboard.component';
import submission from './submission/submission.component';
import progressBar from '../components/progress-bar/progress-bar.directive';
import timestamp from '../components/timestamp/timestamp.filter';
import './scripts';

import './app.scss';

angular.module('mjsApp', [
  ngAnimate,
  ngCookies, ngResource, ngSanitize, 'btford.socket-io', uiRouter, uiBootstrap,
  'pascalprecht.translate', 'oitozero.ngSweetAlert', 'LocalStorageModule', 'ui.sortable', 'ngTagsInput',
  // ngMessages,

  // ngValidationMatch,
  _Auth, Modal, wysiwygEditor, datatable, account, admin, adminUsers, adminArchives,
  adminJournals, adminMonitoring, adminService, adminNavbar, adminFooter, adminLogs, navbar,
  footer, main, constants, socket, util, dashboard, submission, journal, journalService,
  archives, archive, archiveService, progressBar, timestamp
])
  .config(routeConfig)
  .controller('RootController', function ($rootScope) {
    'ngInject';

    var vm = this;
    vm.layout = 'default';

    $rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState, fromParams) {
      vm.layout = toState.data.layout;
      vm.bodyClass = toState.data.bodyClass ? toState.data.bodyClass : '';
    });
  })
  .run(function ($rootScope, $location, $state, Auth, $templateCache) {
    'ngInject';

    $templateCache.put('admin-main-sidebar.html', require('./admin/admin-main-sidebar/admin-main-sidebar.html'));

    // Redirect to login if route requires auth and you're not logged in

    $rootScope.$on('$stateChangeStart', function (event, next, params) {
      if (next.redirectTo) {
        event.preventDefault();
        $state.go(next.redirectTo, params, {location: 'replace'})
      }

      Auth.isLoggedIn(function (loggedIn) {
        if (next.authenticate && !loggedIn) {
          $location.path('/login');
        }
      });
    });
  });

angular.element(document)
  .ready(() => {
    angular.bootstrap(document, ['mjsApp'], {
      strictDi: true
    });
  });
