'use strict';

export class NavbarComponent {

  constructor(Auth, $translate, $http) {
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
    this.currentLanguage = $translate.proposedLanguage();
  }

  setLanguage(lang){
    this.currentLanguage = lang;
    this.$translate.use(lang);
  }

}

export default angular.module('directives.navbar', [])
  .component('navbar', {
    template: require('./navbar.html'),
    controller: NavbarComponent
  })
  .name;
