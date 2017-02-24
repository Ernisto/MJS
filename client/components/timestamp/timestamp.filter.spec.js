'use strict';

describe('Filter: timestamp', function() {
  // load the filter's module
  beforeEach(module('mjsApp.timestamp'));

  // initialize a new instance of the filter before each test
  var timestamp;
  beforeEach(inject(function($filter) {
    timestamp = $filter('timestamp');
  }));

  it('should return the input prefixed with "timestamp filter:"', function() {
    var text = 'angularjs';
    expect(timestamp(text)).to.equal('timestamp filter: ' + text);
  });
});
