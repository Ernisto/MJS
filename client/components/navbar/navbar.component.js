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
    this.$http.get('/languages.json')
      .then( (response) => {
        this.languages = response.data;
      });
    this.currentLanguage = $translate.proposedLanguage();
  }

  toggleLanguage(){
    this.languagesListExpanded = !this.languagesListExpanded;
  }

  setLanguage(lang){
    this.currentLanguage = lang;
    this.$translate.use(lang);
    this.toggleLanguage();
  }

}

export default angular.module('directives.navbar', [])
  .component('navbar', {
    template: require('./navbar.html'),
    controller: NavbarComponent
  })
  .name;
