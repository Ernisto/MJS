'use strict';

export function routeConfig($urlRouterProvider, $locationProvider, $translateProvider, localStorageServiceProvider) {
  'ngInject';

  localStorageServiceProvider
    .setPrefix('mjs');

  $translateProvider.useStaticFilesLoader({
    prefix: '/translation/locale-',
    suffix: '.json'
  });

  $translateProvider.preferredLanguage('gb');
  $translateProvider.useSanitizeValueStrategy('escape');

  $urlRouterProvider.otherwise('/');

  $locationProvider.html5Mode(true);
}
