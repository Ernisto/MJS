'use strict';

export default function routes($stateProvider) {
  'ngInject';

  $stateProvider.state('login', {
      url: '/login',
      template: require('./login/login.html'),
      controller: 'LoginController',
      controllerAs: 'vm',
      data: {
        layout: 'default',
        bodyClass: ''
      }
  })
    .state('logout', {
      url: '/logout?referrer',
      referrer: 'main',
      template: 'GOOGLE',
      data: {
        layout: 'default',
        bodyClass: ''
      },
      controller: function($state, Auth) {
        'ngInject';

        var referrer = $state.params.referrer || $state.current.referrer || 'main';
        var params = $state.current.params || {};
        Auth.logout();
        $state.go(referrer, params);
      }
    })
    .state('signup', {
      url: '/signup',
      template: require('./signup/signup.html'),
      controller: 'SignupController',
      controllerAs: 'vm',
      data: {
        layout: 'default',
        bodyClass: ''
      }
    })
    .state('settings', {
      url: '/settings',
      template: require('./settings/settings.html'),
      controller: 'SettingsController',
      controllerAs: 'vm',
      authenticate: true,
      data: {
        layout: 'default',
        bodyClass: ''
      }
    });
}
