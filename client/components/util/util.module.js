'use strict';

import {
  UtilService
} from './util.service';

export default angular.module('mjsApp.util', [])
  .factory('Util', UtilService)
  .name;
