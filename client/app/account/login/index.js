'use strict';

import LoginController from './login.controller';

export default angular.module('mjsApp.login', [])
  .controller('LoginController', LoginController)
  .name;
