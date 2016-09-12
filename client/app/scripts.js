'use strict';

import $ from 'jquery';

$('body').on('click', '.language-container', () => {
  $('#languages-list').toggle();
});

$('body').on('click', (event) => {
  if($(event.target).parents('.languages-item').length > 0 ||
    $(event.target).parents('.language-block').length == 0) {
    $('#languages-list').hide();
  }
});
