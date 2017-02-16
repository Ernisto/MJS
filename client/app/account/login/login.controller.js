'use strict';

export default class LoginController {

  /*@ngInject*/
  constructor(Auth, $state) {
    this.Auth = Auth;
    this.$state = $state;
  }

  login(form) {
    this.submitted = true;

    if (form.$valid) {
      this.Auth.login({
          email: this.user.email,
          password: this.user.password
        })
        .then(() => {
          // Logged in, redirect to previous state
          var referrer = this.$state.params.referrer || this.$state.current.referrer || 'main';
          var params = this.$state.current.params || {};
          this.$state.go(referrer, params);
        })
        .catch(err => {
          this.errors.login = err.message;
        });
    }
  }
}
