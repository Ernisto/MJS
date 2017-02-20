'use strict';

describe('Component: LogsComponent', function() {
  // load the controller's module
  beforeEach(module('mjsApp.logs'));

  var LogsComponent;

  // Initialize the controller and a mock scope
  beforeEach(inject(function($componentController) {
    LogsComponent = $componentController('logs', {});
  }));

  it('should ...', function() {
    expect(1).to.equal(1);
  });
});
