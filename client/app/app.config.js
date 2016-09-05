'use strict';

export function routeConfig($urlRouterProvider, $locationProvider, $translateProvider) {
  'ngInject';

  $translateProvider.useStaticFilesLoader({
    prefix: '/translation/locale-',
    suffix: '.json'
  });

  $translateProvider.preferredLanguage('en');

  $urlRouterProvider.otherwise('/');

  $locationProvider.html5Mode(true);
}
