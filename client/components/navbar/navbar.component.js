'use strict';

export class NavbarComponent {

  constructor($scope, Auth, $translate, $http, localStorageService) {
    'ngInject';

    this.isLoggedIn = Auth.isLoggedInSync;
    this.isAdmin = Auth.isAdminSync;
    this.getCurrentUser = Auth.getCurrentUserSync;
    this.languagesListExpanded = false;
    this.$translate = $translate;
    this.$http = $http;
    this.$http.get('/translation/languages.json')
      .then( (response) => {
        this.languages = response.data;
      });
    this.localStorageService = localStorageService;
    this.currentLanguage = this.localStorageService.get('selected-lang') ?
      this.localStorageService.get('selected-lang') : $translate.proposedLanguage();
    this.setLanguage(this.currentLanguage);
  }

  setLanguage(lang){
    this.currentLanguage = lang;
    this.$translate.use(lang);
    this.localStorageService.set('selected-lang', lang);
  }

}

export default angular.module('directives.navbar', [])
  .component('navbar', {
    template: require('./navbar.html'),
    controller: NavbarComponent
  })
  .name;
